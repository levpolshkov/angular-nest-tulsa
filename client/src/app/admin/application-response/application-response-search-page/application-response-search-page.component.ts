import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationResponse } from 'src/app/models';
import { SearchTableComponent } from 'src/app/shared/search/search-table/search-table.component';
import { AdminApplicationResponseService } from '../application-response.service';

@Component({
	selector: 'app-applicationResponse-search-page',
	templateUrl: './application-response-search-page.component.html',
	styleUrls: ['./application-response-search-page.component.scss']
})
export class ApplicationResponseSearchPageComponent implements OnInit {
	@ViewChild('searchTable', {static:true}) searchTable:SearchTableComponent;

	constructor(private router:Router, public responseService:AdminApplicationResponseService) { }

	ngOnInit() {
		this.searchTable.searchUrl = '/response';
		this.searchTable.columns = [
			{field:'name',				header:'Applicant Name',		renderer: r => this.renderName(r)},
			{field:'status',			header:'Status',				hide:'sm', renderer: r => this.responseService.applicationResponseStatusRenderer(r.status)},
			{field:'createDate',		header:'Create Date',			renderer:'date:short'},
		];
		this.searchTable.onRowClick = p => this.onRowClick(p);
		this.searchTable.defaultFilter = {type:null};
		// this.searchTable.addNewUrl = '/application-response/new';
	}



	renderName(response:ApplicationResponse) {
		const firstName = this.responseService.getResponseQuestionAnswer(response,'firstName');
		const lastName = this.responseService.getResponseQuestionAnswer(response,'lastName');
		return `${firstName} ${lastName}`;
	}


	onRowClick(applicationResponse:ApplicationResponse) {
		this.router.navigate(['/admin/application-response', applicationResponse._id]);
	}
}
