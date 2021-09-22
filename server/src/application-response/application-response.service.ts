import { BadRequestException, HttpException, Injectable }		from '@nestjs/common';
import { InjectModel }											from '@nestjs/mongoose';
import { DateTime }												from 'luxon';

import { DocumentService, mongoose }							from '@app/database';
import { SearchParams, SearchResult, SearchService }			from '@app/search';
import { LoggerService, PostmarkService }						from '@app/utility';
import { ApplicationResponse, ApplicationResponseDocument }		from './application-response.schema';
import { BullhornService } from 'src/bullhorn/bullhorn.service';
import { Application } from 'src/application';
import { ConfigService } from '@nestjs/config';

export { ApplicationResponse, ApplicationResponseDocument };

@Injectable()
export class ApplicationResponseService {
	logger = new LoggerService('ApplicationResponse');

	constructor(
		@InjectModel('ApplicationResponse') public responseModel:mongoose.Model<ApplicationResponseDocument>,
		private documentService:DocumentService,
		private searchService:SearchService,
		private bullhornService:BullhornService,
		private configService:ConfigService,
		private postmarkService:PostmarkService
	) {
		
	}

	onFailedBullhornSubmission(response:ApplicationResponse, responseNote:string, error:any) {
		const to = this.configService.get('FAILED_BULLHORN_EMAIL');
		if(!to) return;

		const html = `<p>Bullhorn Failed with Error: <pre>${JSON.stringify(error)}</pre></p>`
			+ `<hr><p>applicationResponseId: ${response._id}</p><hr>`
			+ responseNote
			+ `<hr><pre>${JSON.stringify(response.questionAnswers)}</pre>`;

		this.postmarkService.sendEmail({
			to,
			subject: 'Tulsa Remote - Failed Submission',
			html
		});
	}

	saveResponse(response:ApplicationResponse) {
		return this.documentService.saveDocument<ApplicationResponseDocument>(this.responseModel, response, {
			afterSave: (newDoc:ApplicationResponseDocument,oldDoc:ApplicationResponseDocument) => this.afterSave(newDoc,oldDoc)
		});
	}

	async afterSave(newDoc:ApplicationResponseDocument,oldDoc:ApplicationResponseDocument) {
		this.logger.log('saveResponse: %o', {
			...newDoc.toObject(),
			application:undefined,
			questionAnswers: newDoc.questionAnswers.map(qa => `${qa.questionKey}: ${qa.answer}`)
		});
		if(newDoc.status==='submitted' && oldDoc?.status!=='submitted') this.submitResponseToBullhorn(newDoc);
	}

	async submitResponseToBullhorn(response:ApplicationResponseDocument) {
		this.logger.log('submitResponseToBullhorn: %o', {
			...response.toObject(),
			application:undefined,
			questionAnswers: response.questionAnswers.map(qa => `${qa.questionKey}: ${qa.answer}`)
		});
		const candidate:any = {
			status: 'New Applicant'
		};
		const appNoteLines = [];
		const partnerNoteLines = [];
		const responseNoteLines = [];
		
		response.questionAnswers.map(qa => {
			const question = this.findQuestionByQuestionKey(response.application, qa.questionKey);
			if(!question) return;
			if(question.type==='url' && qa.answer) {			// Prepend https:// for url type questions
				qa.answer = `https://${qa.answer}`;
			}

			const bullhornKey = question?.bullhornKey;
			// console.log('submitResponseToBullhorn: qa=%o, bullhornKey=%o', qa, bullhornKey);

			if(!bullhornKey) return;
			const noteLine = `<b>${question.label || question.key}</b><br>${qa.answer}`;
			responseNoteLines.push(noteLine);
			switch(bullhornKey) {
				case 'dateOfBirth':
					candidate['dateOfBirth'] = DateTime.fromISO(qa.answer).toMillis();
					break;
				case 'customDate12':
					candidate['customDate12'] = DateTime.fromISO(qa.answer).toMillis();
					break;
				case 'note.application':
					appNoteLines.push(noteLine);
					break;
				case 'note.partner':
					partnerNoteLines.push(noteLine);
					break;
				case 'secondaryAddress':
					candidate['secondaryAddress'] = {
						address1: response.questionAnswers.find(qa => qa.questionKey==='address.street1')?.answer,
						address2: response.questionAnswers.find(qa => qa.questionKey==='address.street2')?.answer,
						city: response.questionAnswers.find(qa => qa.questionKey==='address.city')?.answer,
						state: response.questionAnswers.find(qa => qa.questionKey==='address.state')?.answer,
						zip: response.questionAnswers.find(qa => qa.questionKey==='address.zipcode')?.answer
					};
					break;
				default:
					candidate[bullhornKey] = qa.answer;
			}
		});

		const appNote = appNoteLines.join('<br><br>');
		const partnerNote = partnerNoteLines.join('<br><br>');
		const responseNote = responseNoteLines.join('<br><br>');
		// console.log('submitResponseToBullhorn: candidate=%o', candidate);
		// console.log('submitResponseToBullhorn: appNote=%s', appNote);
		// console.log('submitResponseToBullhorn: partnerNote=%s', partnerNote);
		// console.log('submitResponseToBullhorn: responseNote=%s', responseNote);

		try {
			const candidateId = await this.bullhornService.addCandidate(candidate);
			this.logger.log('submitResponseToBullhorn: candidateId=%o', candidateId);

			if(candidateId) {
				const appNoteId = await this.bullhornService.addCandidateNote(candidateId, 'Application Note', appNote);
				this.logger.log('submitResponseToBullhorn: appNoteId=%o', appNoteId);

				if(partnerNote) {
					const partnerNoteId = await this.bullhornService.addCandidateNote(candidateId, 'Partner Note', partnerNote);
					this.logger.log('submitResponseToBullhorn: partnerNoteId=%o', partnerNoteId);
				}
				const responseNoteId = await this.bullhornService.addCandidateNote(candidateId, 'Entire Application', responseNote);
				this.logger.log('submitResponseToBullhorn: responseNoteId=%o', responseNoteId);

				const jobId = +this.configService.get('BULLHORN_JOBID') || 66;
				const jobSubId = await this.bullhornService.addJobSubmission(candidateId, jobId);
				this.logger.log('submitResponseToBullhorn: jobSubId=%o', jobSubId);
		
				response.bullhornCandidateId = candidateId;
				await response.save();
			}
		} catch(err) {
			this.onFailedBullhornSubmission(response, responseNote, err?.stack || err);
		}
	}


	private findQuestionByQuestionKey(application:Application, questionKey:string) {
		const section = application.sections.find(s => s.pages.find(p => p.questions.find(q => q.key===questionKey)));
		if(!section) return null;
		const page = section.pages.find(p => p.questions.find(q => q.key===questionKey));
		if(!page) return null;
		return page.questions.find(q => q.key===questionKey);
	}

}
