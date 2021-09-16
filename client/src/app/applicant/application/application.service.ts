import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Application, ApplicationSection, ApplicationPage, ApplicationQuestion, SearchParams, SearchResult } from 'src/app/models';
import { HttpService } from 'src/app/shared/http.service';
import { SearchService } from 'src/app/shared/search/search.service';
import { StorageService } from 'src/app/shared/storage.service';
export { Application, ApplicationSection, ApplicationPage, ApplicationQuestion };

@Injectable({
	providedIn: 'root'
})
export class ApplicationService {
	debugMode = false;

	constructor(private http:HttpService, private searchService:SearchService, private storageService:StorageService) { }

	searchApplications(params:SearchParams):Promise<SearchResult<Application>> {
		return this.searchService.search<Application>('/application', params);
	}

	getApplicationById(applicationId:string):Promise<Application> {
		return this.http.get(`/application/${applicationId}`);
	}

	// saveApplication(application:Application) {
	// 	return this.http.post('/application', application);
	// }

	// deleteApplicationById(applicationId:string) {
	// 	return this.http.delete(`/application/${applicationId}`);
	// }
}
