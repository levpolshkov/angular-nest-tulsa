import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationResponse, SearchParams, SearchResult } from 'src/app/models';
import { HttpService } from 'src/app/shared/http.service';
import { SearchService } from 'src/app/shared/search/search.service';
export { ApplicationResponse };

export const applicationResponseStatuses = [
	{ id: 'pending', name: 'Pending', class: 'text-warning' },
	{ id: 'submitted', name: 'Submitted', class: 'text-success' },
	{ id: 'rejected', name: 'Rejected', class: 'text-danger' }
];

@Injectable({
	providedIn: 'root'
})
export class AdminApplicationResponseService {
	applicationResponseStatuses = applicationResponseStatuses;

	constructor(private http: HttpService, private searchService: SearchService, private modalService: NgbModal) {}

	searchApplicationResponses(params: SearchParams): Promise<SearchResult<ApplicationResponse>> {
		return this.searchService.search<ApplicationResponse>('/response', params);
	}

	getApplicationResponseById(applicationResponseId: string): Promise<ApplicationResponse> {
		return this.http.get(`/response/${applicationResponseId}`);
	}

	saveApplicationResponse(applicationResponse: ApplicationResponse) {
		return this.http.post('/response', applicationResponse);
	}

	deleteApplicationResponseById(applicationResponseId: string) {
		return this.http.delete(`/response/${applicationResponseId}`);
	}

	applicationResponseStatusRenderer(id: string) {
		const status = this.applicationResponseStatuses.find((s) => s.id === id);
		if (!status) return `${id}`;
		return `<span class="${status.class}">${status.name}</span>`;
	}
	applicationResponseStatusName(id: string) {
		const status = this.applicationResponseStatuses.find((s) => s.id === id);
		if (!status) return `${id}`;
		return status.name;
	}
	applicationResponseStatusClass(id: string) {
		const status = this.applicationResponseStatuses.find((s) => s.id === id);
		if (!status) return `${id}`;
		return status.class;
	}

	getResponseQuestionAnswer(response: ApplicationResponse, questionKey: string) {
		const questionAnswer = response.questionAnswers.find((qs) => qs.questionKey === questionKey);
		if (!questionAnswer) return '[none]';
		return questionAnswer.answer;
	}
}
