import { BadRequestException, HttpException, Injectable }	from '@nestjs/common';
import { InjectModel }										from '@nestjs/mongoose';

import { DocumentService, mongoose }						from '@app/database';
import { SearchParams, SearchResult, SearchService }		from '@app/search';
import { User }												from '../user/user.interface';
import { Application, ApplicationDocument }					from './application.schema';
export { Application, ApplicationDocument };

@Injectable()
export class ApplicationService {
	constructor(
		@InjectModel('Application') public applicationModel:mongoose.Model<ApplicationDocument>,
		private documentService:DocumentService,
		private searchService:SearchService
	) {
		// this.createTestApplication();
	}

	searchApplications(queryParams:object):Promise<SearchResult<ApplicationDocument>> {
		return this.searchService.searchModelFromQueryParams<ApplicationDocument>(this.applicationModel, queryParams, {
			filterFunction: async (params:SearchParams) => {
				const query:any = {deleted:{$ne:true}};
				if(!params.filter) return query;
				if(params.filter.name) query.name = this.searchService.regexMatch(params.filter.name);
				return query;
			},
			lean: true
		});
	}

	getApplicationById(applicationId:string):Promise<ApplicationDocument> {
		return this.applicationModel.findById(applicationId).populate('company').exec();
	}

	saveApplication(application:Application, savingUser:User) {
		if(savingUser) {
			if(!application._id) {
				application.createUser = savingUser;
				application.createDate = new Date();
			} else {
				application.updateUser = savingUser;
				application.updateDate = new Date();
			}
		}
		return this.documentService.saveDocument<ApplicationDocument>(this.applicationModel, application);
	}

	async deleteApplicationById(applicationId:string, deletingUser:User) {
		const application = await this.getApplicationById(applicationId);
		if(!application) throw new HttpException({message:'Application not found.', applicationId}, 404);

		application.deleted = true;
		application.deleteUser = deletingUser;
		application.deleteDate = new Date();
		return application.save();
	}

	async createTestApplication() {
		const application:Application = {
			name: 'Test Application',
			sections: [{
				title: 'Part 1: You',
				order: 1,
				pages: [{
					title: 'Demographics',
					order: 1,
					questions: [{
						order: 1,
						type: 'text',
						label: 'First Name'
					},{
						order: 2,
						type: 'text',
						label: 'Last Name'
					}]
				},{
					title: 'Income',
					order: 2,
					questions: [{
						order: 1,
						type: 'currency',
						label: 'Annual Income'
					},{
						order: 2,
						type: 'currency',
						label: 'Liquid Assets'
					}]
				},{
					title: 'Banking Info',
					order: 2,
					questions: [{
						order: 1,
						type: 'text',
						label: 'Name of Bank'
					},{
						order: 2,
						type: 'text',
						label: 'Last 4 of SSN'
					},{
						order: 3,
						type: 'text',
						label: 'Mother\'s Maiden Name'
					}]
				}]
			}]
		};
		await this.applicationModel.remove({});
		return this.saveApplication(application, null);
	}
}
