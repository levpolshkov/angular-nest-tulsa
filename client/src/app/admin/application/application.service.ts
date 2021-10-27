import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Application, SearchParams, SearchResult } from 'src/app/models';
import { HttpService } from 'src/app/shared/http.service';
import { SearchService } from 'src/app/shared/search/search.service';
import { ApplicationSearchModalComponent } from './application-search-modal/application-search-modal.component';
export { Application };

export const pageTypes = [
	{id:'question',				name:'Question Page',			class:''},
	{id:'hero',					name:'Hero Page',				class:''},
	{id:'single-question',		name:'Single Question Page',	class:''},
	{id:'reject',				name:'Bummer Page',				class:''},
	{id:'submit',				name:'Submit Page',				class:''}
];

export const questionTypes = [
	{id:'label',				name:'Label Only',				class:''},
	{id:'text',					name:'Text Input',				class:''},
	{id:'textarea',				name:'Textarea Input',			class:''},
	{id:'phone',				name:'Phone Input',				class:''},
	{id:'email',				name:'Email Input',				class:''},
	// {id:'currency',				name:'Currency Input',			class:''},
	{id:'date',					name:'Date Input',				class:''},
	{id:'number',				name:'Number Input',			class:''},
	{id:'url',					name:'URL Input',				class:''},
	{id:'radio',				name:'Radio Choices',			class:''}
];

@Injectable({
	providedIn: 'root'
})
export class AdminApplicationService {
	pageTypes = pageTypes;
	questionTypes = questionTypes;

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
	deleteApplicationSectionById(applicationId:string, section:string) {
		return this.http.delete(`/application/${applicationId}/section/${section}`);
	}
	deleteApplicationPageById(applicationId:string, pageId:string) {
		return this.http.delete(`/application/${applicationId}/page/${pageId}`);
	}

	pageTypeRenderer(id:string) {
		const status = this.pageTypes.find(s => s.id===id);
		if(!status) return `${id || ''}`;
		return `<span class="${status.class}">${status.name}</span>`;
	}
	pageTypeName(id:string) {
		const status = this.pageTypes.find(s => s.id===id);
		if(!status) return `${id || ''}`;
		return status.name;
	}
	pageTypeClass(id:string) {
		const status = this.pageTypes.find(s => s.id===id);
		if(!status) return `${id || ''}`;
		return status.class;
	}


	questionTypeRenderer(id:string) {
		const status = this.questionTypes.find(s => s.id===id);
		if(!status) return `${id || ''}`;
		return `<span class="${status.class}">${status.name}</span>`;
	}
	questionTypeName(id:string) {
		const status = this.questionTypes.find(s => s.id===id);
		if(!status) return `${id || ''}`;
		return status.name;
	}
	questionTypeClass(id:string) {
		const status = this.questionTypes.find(s => s.id===id);
		if(!status) return `${id || ''}`;
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
