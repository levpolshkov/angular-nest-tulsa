import { BadRequestException, HttpException, Injectable }		from '@nestjs/common';
import { InjectModel }											from '@nestjs/mongoose';

import { DocumentService, mongoose }							from '@app/database';
import { SearchParams, SearchResult, SearchService }			from '@app/search';
import { ApplicationResponse, ApplicationResponseDocument }		from './application-response.schema';
export { ApplicationResponse, ApplicationResponseDocument };

@Injectable()
export class ApplicationResponseService {
	constructor(
		@InjectModel('ApplicationResponse') public responseModel:mongoose.Model<ApplicationResponseDocument>,
		private documentService:DocumentService,
		private searchService:SearchService
	) {
		// this.createTestApplication();
	}

	saveResponse(response:ApplicationResponse) {
		return this.documentService.saveDocument<ApplicationResponseDocument>(this.responseModel, response);
	}
}
