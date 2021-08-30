import { BadRequestException, HttpException, Injectable }					from '@nestjs/common';
import { InjectModel }									from '@nestjs/mongoose';

import { DocumentService, mongoose }					from '@app/database';
import { SearchParams, SearchResult, SearchService }	from '@app/search';
import { User }											from '../user/user.interface';
import { ApplicationPage, ApplicationPageDocument }				from './application-page.schema';
export { ApplicationPage, ApplicationPageDocument };

@Injectable()
export class ApplicationPageService {
	constructor(
		@InjectModel('ApplicationPage') public applicationPageModel:mongoose.Model<ApplicationPageDocument>,
		private documentService:DocumentService,
		private searchService:SearchService
	) {}

	searchApplicationPages(queryParams:object):Promise<SearchResult<ApplicationPageDocument>> {
		return this.searchService.searchModelFromQueryParams<ApplicationPageDocument>(this.applicationPageModel, queryParams, {
			filterFunction: async (params:SearchParams) => {
				const query:any = {deleted:{$ne:true}};
				if(!params.filter) return query;
				if(params.filter.name) query.name = this.searchService.regexMatch(params.filter.name);
				return query;
			},
			lean: true
		});
	}

	getApplicationPageById(applicationPageId:string):Promise<ApplicationPageDocument> {
		return this.applicationPageModel.findById(applicationPageId).populate('company').exec();
	}

	saveApplicationPage(applicationPage:ApplicationPage, savingUser:User) {
		if(savingUser) {
			if(!applicationPage._id) {
				applicationPage.createUser = savingUser;
				applicationPage.createDate = new Date();
			} else {
				applicationPage.updateUser = savingUser;
				applicationPage.updateDate = new Date();
			}
		}
		return this.documentService.saveDocument<ApplicationPageDocument>(this.applicationPageModel, applicationPage);
	}

	async deleteApplicationPageById(applicationPageId:string, deletingUser:User) {
		const applicationPage = await this.getApplicationPageById(applicationPageId);
		if(!applicationPage) throw new HttpException({message:'ApplicationPage not found.', applicationPageId}, 404);

		applicationPage.deleted = true;
		applicationPage.deleteUser = deletingUser;
		applicationPage.deleteDate = new Date();
		return applicationPage.save();
	}
}
