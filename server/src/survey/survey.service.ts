import { BadRequestException, HttpException, Injectable }					from '@nestjs/common';
import { InjectModel }									from '@nestjs/mongoose';

import { DocumentService, mongoose }					from '@app/database';
import { SearchParams, SearchResult, SearchService }	from '@app/search';
import { User }											from '../user/user.interface';
import { Survey, SurveyDocument }						from './survey.schema';
export { Survey, SurveyDocument };

@Injectable()
export class SurveyService {
	constructor(
		@InjectModel('Survey') public surveyModel:mongoose.Model<SurveyDocument>,
		private documentService:DocumentService,
		private searchService:SearchService
	) {}

	searchSurveys(queryParams:object):Promise<SearchResult<SurveyDocument>> {
		return this.searchService.searchModelFromQueryParams<SurveyDocument>(this.surveyModel, queryParams, {
			filterFunction: async (params:SearchParams) => {
				const query:any = {deleted:{$ne:true}};
				if(!params.filter) return query;
				if(params.filter.name) query.name = this.searchService.regexMatch(params.filter.name);
				return query;
			},
			lean: true
		});
	}

	getSurveyById(surveyId:string):Promise<SurveyDocument> {
		return this.surveyModel.findById(surveyId).populate('company').exec();
	}

	saveSurvey(survey:Survey, savingUser:User) {
		if(savingUser) {
			if(!survey._id) {
				survey.createUser = savingUser;
				survey.createDate = new Date();
			} else {
				survey.updateUser = savingUser;
				survey.updateDate = new Date();
			}
		}
		return this.documentService.saveDocument<SurveyDocument>(this.surveyModel, survey);
	}

	async deleteSurveyById(surveyId:string, deletingUser:User) {
		const survey = await this.getSurveyById(surveyId);
		if(!survey) throw new HttpException({message:'Survey not found.', surveyId}, 404);

		survey.deleted = true;
		survey.deleteUser = deletingUser;
		survey.deleteDate = new Date();
		return survey.save();
	}
}
