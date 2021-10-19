import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Application, SearchParams, SearchResult } from 'src/app/models';
import { HttpService } from 'src/app/shared/http.service';
import { SearchService } from 'src/app/shared/search/search.service';
import { ApplicationSearchModalComponent } from './application-search-modal/application-search-modal.component';
export { Application };

export const applicationTypes = [
	{id:'kit',			name:'Kit',			class:''},
	{id:'sample',		name:'Sample',		class:''},
	{id:'report',		name:'Report',		class:''}
];

@Injectable({
	providedIn: 'root'
})
export class AdminApplicationService {
	applicationTypes = applicationTypes;

	constructor(private http:HttpService, private searchService:SearchService, private modalService:NgbModal) {}


	searchApplications(params:SearchParams):Promise<SearchResult<Application>> {
		return this.searchService.search<Application>('/application', params);
	}

	getApplicationById(applicationId:string):Promise<Application> {
		return this.http.get(`/application/${applicationId}`);
	}

	saveApplication(application:Application) {
		return this.http.post('/application', application);
	}

	deleteApplicationById(applicationId:string) {
		return this.http.delete(`/application/${applicationId}`);
	}

	applicationTypeRenderer(id:string) {
		const status = this.applicationTypes.find(s => s.id===id);
		if(!status) return `${id}`;
		return `<span class="${status.class}">${status.name}</span>`;
	}
	applicationTypeName(id:string) {
		const status = this.applicationTypes.find(s => s.id===id);
		if(!status) return `${id}`;
		return status.name;
	}
	applicationTypeClass(id:string) {
		const status = this.applicationTypes.find(s => s.id===id);
		if(!status) return `${id}`;
		return status.class;
	}

	openApplicationSearchModal(defaultParams:any={}):Promise<Application> {
		let sub = null;
		return new Promise((resolve,reject) => {
			const modalRef = this.modalService.open(ApplicationSearchModalComponent, {size:'lg'});
			modalRef.componentInstance.defaultParams = defaultParams;
			sub = modalRef.closed.subscribe(reason => {
				sub.unsubscribe();
				resolve(reason);
			});
		});
	}
}
