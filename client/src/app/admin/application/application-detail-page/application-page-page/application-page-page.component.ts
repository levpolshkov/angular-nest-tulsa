import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, ApplicationSection, ApplicationPage, ApplicationQuestion } from '@server/application/application.interface';
import { AlertService } from 'src/app/admin/site/alert.service';
import { ConfirmService } from 'src/app/admin/site/confirm.service';
import { AdminApplicationService } from '../../application.service';

const pageTypes = [
	{id:'question',				name:'Question Page'},
	{id:'hero',					name:'Hero Page'},
	{id:'single-question',		name:'Single Question Page'},
	{id:'reject',				name:'Bummer Page'},
	{id:'submit',				name:'Submit Page'}
];


@Component({
	selector: 'app-application-page-page',
	templateUrl: './application-page-page.component.html',
	styleUrls: ['./application-page-page.component.scss']
})
export class ApplicationPagePageComponent implements OnInit {
	application:Application;
	section:ApplicationSection;
	page:ApplicationPage;
	readonly = false;

	pageTypes = pageTypes;

	constructor(public applicationService:AdminApplicationService, private route:ActivatedRoute, private router:Router, private alertService:AlertService, private confirmService:ConfirmService) { }


	async ngOnInit() {
		const applicationId = this.route.snapshot.params.applicationId;
		const sectionId = this.route.snapshot.params.sectionId;
		const pageId = this.route.snapshot.params.pageId;
		console.log('ApplicationPagePageComponent: applicationId=%o, sectionId=%o, pageId=%o', applicationId, sectionId, pageId);

		if(applicationId==='new') {
			this.application = <Application>{};
		} else {
			this.application = await this.applicationService.getApplicationById(applicationId);
			this.section = this.application.sections.find(s => s._id===sectionId);
			this.page = this.section.pages.find(p => p._id===pageId);
		}
	}

	get isNew() {
		return !this.application?._id;
	}

	async onSaveBtn() {
		this.application = await this.applicationService.saveApplication(this.application);
		this.alertService.info('Application saved.');
		this.router.navigate(['/admin/application/search']);
	}

	async onDeleteBtn() {
		this.confirmService.confirm({
			text: 'Are you sure you want to delete this application?'
		}).then(async answer => {
			if(!answer) return;
			await this.applicationService.deleteApplicationById(this.application._id);
			this.alertService.warning('Application deleted.');
			this.router.navigate(['/admin/application/search']);
		});
	}

	onQuestionClick(question:ApplicationQuestion) {
		console.log('onQuestionClick: page=%o', question);
		// this.router.navigate(['/admin/application', this.application._id, 'section', this.page._id]);
	}

}

