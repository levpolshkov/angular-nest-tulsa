import { BadRequestException, HttpException, Injectable }					from '@nestjs/common';
import { InjectModel }									from '@nestjs/mongoose';

import { DocumentService, mongoose }					from '@app/database';
import { SearchParams, SearchResult, SearchService }	from '@app/search';
import { User }											from '../user/user.interface';
import { SurveyPage, SurveyPageDocument }				from './survey-page.schema';
export { SurveyPage, SurveyPageDocument };

@Injectable()
export class SurveyPageService {
	constructor(
		@InjectModel('SurveyPage') public surveyPageModel:mongoose.Model<SurveyPageDocument>,
		private documentService:DocumentService,
		private searchService:SearchService
	) {}

	searchSurveyPages(queryParams:object):Promise<SearchResult<SurveyPageDocument>> {
		return this.searchService.searchModelFromQueryParams<SurveyPageDocument>(this.surveyPageModel, queryParams, {
			filterFunction: async (params:SearchParams) => {
				const query:any = {deleted:{$ne:true}};
				if(!params.filter) return query;
				if(params.filter.name) query.name = this.searchService.regexMatch(params.filter.name);
				return query;
			},
			lean: true
		});
	}

	getSurveyPageById(surveyPageId:string):Promise<SurveyPageDocument> {
		return this.surveyPageModel.findById(surveyPageId).populate('company').exec();
	}

	saveSurveyPage(surveyPage:SurveyPage, savingUser:User) {
		if(savingUser) {
			if(!surveyPage._id) {
				surveyPage.createUser = savingUser;
				surveyPage.createDate = new Date();
			} else {
				surveyPage.updateUser = savingUser;
				surveyPage.updateDate = new Date();
			}
		}
		return this.documentService.saveDocument<SurveyPageDocument>(this.surveyPageModel, surveyPage);
	}

	async deleteSurveyPageById(surveyPageId:string, deletingUser:User) {
		const surveyPage = await this.getSurveyPageById(surveyPageId);
		if(!surveyPage) throw new HttpException({message:'SurveyPage not found.', surveyPageId}, 404);

		surveyPage.deleted = true;
		surveyPage.deleteUser = deletingUser;
		surveyPage.deleteDate = new Date();
		return surveyPage.save();
	}
}
