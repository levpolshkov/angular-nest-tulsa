import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Application } from 'src/app/models';
import { SearchTableComponent } from 'src/app/shared/search/search-table/search-table.component';
import { AdminApplicationService } from '../application.service';

@Component({
	selector: 'app-application-search-modal',
	templateUrl: './application-search-modal.component.html',
	styleUrls: ['./application-search-modal.component.scss']
})
export class ApplicationSearchModalComponent implements OnInit {
	@ViewChild('searchTable', {static:true}) searchTable:SearchTableComponent;

	constructor(public applicationService:AdminApplicationService, private modalRef:NgbActiveModal) { }

	ngOnInit() {
		this.searchTable.searchUrl = '/application';
		this.searchTable.columns = [
			// {field:'company.name',		header:'Company'},
			// {field:'sku',				header:'Application SKU'},
			// {field:'name',				header:'Application Name'},
			// {field:'type',				header:'Application Type',		hide:'sm',		renderer: application => this.applicationService.applicationTypeRenderer(application.type)},
		];
		this.searchTable.onRowClick = p => this.onRowClick(p);
		this.searchTable.noRouting = true;			// Disable SearchTable from changing the url
		this.searchTable.defaultFilter = {type:null};
	}

	onRowClick(application:Application) {
		this.modalRef.close(application);
	}
	onCancelBtn() {
		this.modalRef.close(null);
	}
}
