import { Injectable } from '@angular/core';
import { Application, ApplicationSection, ApplicationPage, ApplicationQuestion, ApplicationResponse } from 'src/app/models';
import { HttpService } from 'src/app/shared/http.service';
import { SearchService } from 'src/app/shared/search/search.service';
import { StorageService } from 'src/app/shared/storage.service';
export { Application, ApplicationSection, ApplicationPage, ApplicationQuestion };

@Injectable({
	providedIn: 'root'
})
export class ApplicationResponseService {
	debugMode = true;

	constructor(private http:HttpService, private searchService:SearchService, private storageService:StorageService) { }


	saveResponseLocal(response:ApplicationResponse) {
		return this.storageService.set('tuslaRemoteApplicationResponse', response);
	}
	loadResponseLocal():Promise<ApplicationResponse> {
		return this.storageService.get('tuslaRemoteApplicationResponse');
	}

	// searchApplications(params:SearchParams):Promise<SearchResult<Application>> {
	// 	return this.searchService.search<Application>('/application', params);
	// }

	// getApplicationById(applicationId:string):Promise<Application> {
	// 	return this.http.get(`/application/${applicationId}`);
	// }

	submitResponse(response:ApplicationResponse):Promise<ApplicationResponse> {
		return this.http.post('/response', response);
	}

	// deleteApplicationById(applicationId:string) {
	// 	return this.http.delete(`/application/${applicationId}`);
	// }
}
