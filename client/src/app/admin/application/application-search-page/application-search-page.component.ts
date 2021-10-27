import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/models';
import { SearchTableComponent } from 'src/app/shared/search/search-table/search-table.component';
import { AdminApplicationService } from '../application.service';

@Component({
	selector: 'app-application-search-page',
	templateUrl: './application-search-page.component.html',
	styleUrls: ['./application-search-page.component.scss']
})
export class ApplicationSearchPageComponent implements OnInit {
	@ViewChild('searchTable', {static:true}) searchTable:SearchTableComponent;

	constructor(private router:Router, public applicationService:AdminApplicationService) { }

	ngOnInit() {
		this.searchTable.searchUrl = '/application';
		this.searchTable.columns = [
			// {field:'sku',				header:'Application SKU'},
			{field:'name',				header:'Application Name'},
			// {field:'type',				header:'Application Type',		hide:'sm',		renderer: application => this.applicationService.applicationTypeRenderer(application.type)},
		];
		this.searchTable.onRowClick = p => this.onRowClick(p);
		this.searchTable.defaultFilter = {type:null};
		// this.searchTable.addNewUrl = '/admin/application/new';
	}

	onRowClick(application:Application) {
		this.router.navigate(['/admin/application', application._id]);
	}
}
