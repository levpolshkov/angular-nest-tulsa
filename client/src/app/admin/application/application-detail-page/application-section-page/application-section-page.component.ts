import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, ApplicationPage, ApplicationSection } from '@server/application/application.interface';
import { AlertService } from 'src/app/admin/site/alert.service';
import { ConfirmService } from 'src/app/admin/site/confirm.service';
import { AdminApplicationService } from '../../application.service';

@Component({
	selector: 'app-application-section-page',
	templateUrl: './application-section-page.component.html',
	styleUrls: ['./application-section-page.component.scss']
})
export class ApplicationSectionPageComponent implements OnInit {
	application:Application;
	section:ApplicationSection;
	readonly = false;

	constructor(public applicationService:AdminApplicationService, private route:ActivatedRoute, private router:Router, private alertService:AlertService, private confirmService:ConfirmService) { }


	async ngOnInit() {
		const applicationId = this.route.snapshot.params.applicationId;
		const sectionId = this.route.snapshot.params.sectionId;
		console.log('ApplicationSectionPageComponent: applicationId=%o, sectionId=%o', applicationId, sectionId);

		if(applicationId==='new') {
			this.application = <Application>{};
		} else {
			this.application = await this.applicationService.getApplicationById(applicationId);
			this.section = this.application.sections.find(s => s._id===sectionId);
		}
	}

	get isNew() {
		return !this.application?._id;
	}

	async onSaveBtn() {
		this.application = await this.applicationService.saveApplication(this.application);
		this.alertService.info('Application Section saved.');
		this.router.navigate(['/admin/application', this.application._id]);
	}

	async onDeleteBtn() {
		const ans = await this.confirmService.confirm({text:'Are you sure you want to delete this section?  This cannot be undone.'});
		if(!ans) return;
		await this.applicationService.deleteApplicationSectionById(this.application._id, this.section._id);
		this.alertService.warning('Application Section deleted.');
		this.router.navigate(['/admin/application', this.application._id]);
	}

	onPageClick(page:ApplicationPage) {
		console.log('onSectionClick: page=%o', page);
		this.router.navigate(['/admin/application', this.application._id, 'section', this.section._id, 'page', page._id]);
	}

}
