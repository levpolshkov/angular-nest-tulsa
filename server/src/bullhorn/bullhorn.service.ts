import { LoggerService } from '@app/utility';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Bullhorn from 'bullhorn-api';

export type CandidateStatus = 'Active';
export type CandidateGender = 'F' | 'M' | 'U';
export type CandidateNoteType = 'Application Note' | 'Partner Note' | 'UTM Note' | 'Entire Application';

export interface Candidate {
	status: CandidateStatus;
	name?: string;
	firstName: string;
	lastName: string;
	dateOfBirth?: string;
	email?: string;
	educationDegree?: string;
	ethnicity?: string;
	gender?: CandidateGender;
	phone?: string;
	address?: {
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
	};
	companyName?: string;
}

@Injectable()
export class BullhornService {
	logger = new LoggerService('BullhornService');
	bullhorn: Bullhorn;

	constructor(private configService: ConfigService) {
		this.bullhorn = new Bullhorn({
			client_id: this.configService.get('BULLHORN_CLIENT_ID'),
			client_secret: this.configService.get('BULLHORN_CLIENT_SECRET'),
			username: this.configService.get('BULLHORN_USERNAME'),
			password: this.configService.get('BULLHORN_PASSWORD')
		});

		this.login();
		// this.testBullhorn();
	}

	async login() {
		const result = await this.bullhorn.login().catch((err) => {
			this.logger.error('BullhornService.login: err=%o', err);
		});
		this.logger.debug('BullhornService.login: result=%o', result);
	}

	async testBullhorn() {
		const loginResult = await this.bullhorn.login();
		console.log('testBullhorn: Login successful'); //: loginResult=%o', loginResult);

		// const personResult = await this.bullhorn.fetch('search/Candidate?query=Sergei');
		// personResult.json().then(r => console.log('presons=%o',r));

		// const candidate:Candidate = {
		// 	status: 'Active',
		// 	firstName: 'Test2',
		// 	lastName: 'Golimbievsky',
		// 	dateOfBirth: '1984-02-13',
		// 	address: {
		// 		address1: '2504 Williamsburg Drive',
		// 		address2: '1st Floor',
		// 		city: 'Melissa',
		// 		state: 'TX',
		// 		zip: '75454'
		// 	},
		// 	companyName: 'Gitwit',
		// 	gender: 'M',
		// 	ethnicity: 'White'
		// };
		// const candidateId = await this.addCandidate(candidate);
		const candidateId = 48165;
		console.log('candidateId=%o', candidateId);

		// const result = await this.addCandidateNote(candidateId, 'Application Note', 'Custom note here');
		// console.log('addCandidateNote: %o', result);

		// const result = await this.addJobSubmission(candidateId, 65);
		// console.log('addJobSubmission: %o', result);
	}

	async addCandidate(candidate: Candidate): Promise<number> {
		await this.login();
		candidate.name = [candidate.firstName, candidate.lastName]
			.map((p) => String(p).trim())
			.filter((p) => p)
			.join(' ');
		const result = await this.bullhorn.fetch(`entity/Candidate`, {
			method: 'PUT',
			body: JSON.stringify(candidate)
		});
		const data = await result.json();
		this.logger.debug('addCandidate: candidate=%o, result=%o', candidate, data);
		return data?.changedEntityId;
	}

	async addCandidateNote(candidateId: number, noteType: CandidateNoteType, noteBody: string): Promise<number> {
		const payload = {
			personReference: { id: candidateId },
			comments: noteBody,
			action: noteType,
			commentingPerson: { id: 9009 } // Tulsa Remote API
		};
		const result = await this.bullhorn.fetch(`entity/Note`, {
			method: 'PUT',
			body: JSON.stringify(payload)
		});
		const data = await result.json();
		this.logger.debug('addCandidateNote: payload=%o, result=%o', payload, data);
		return data?.changedEntityId;
	}

	async addJobSubmission(candidateId: number, jobId: number) {
		const result = await this.bullhorn.fetch(`entity/JobSubmission`, {
			method: 'PUT',
			body: JSON.stringify({
				candidate: { id: candidateId },
				jobOrder: { id: jobId },
				status: 'New Lead'
			})
		});
		const data = await result.json();
		this.logger.debug('addJobSubmission: candidateId=%o, jobId=%o, result=%o', data);
		return data?.changedEntityId;
	}
}
