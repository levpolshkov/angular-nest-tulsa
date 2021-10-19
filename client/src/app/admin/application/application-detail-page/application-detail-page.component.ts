import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models';
import { AlertService } from 'src/app/admin/site/alert.service';
import { ConfirmService } from 'src/app/admin/site/confirm.service';
import { AdminApplicationService } from '../application.service';

@Component({
	selector: 'app-application-detail-page',
	templateUrl: './application-detail-page.component.html',
	styleUrls: ['./application-detail-page.component.scss']
})
export class ApplicationDetailPageComponent implements OnInit {
	application:Application;
	readonly = false;

	constructor(public applicationService:AdminApplicationService, private route:ActivatedRoute, private router:Router, private alertService:AlertService, private confirmService:ConfirmService) { }


	async ngOnInit() {
		const applicationId = this.route.snapshot.params.applicationId;
		console.log('ApplicationDetailPageComponent: applicationId=%o', applicationId);

		if(applicationId==='new') {
			this.application = <Application>{};
		} else {
			this.application = await this.applicationService.getApplicationById(applicationId);
		}
	}

	get isNew() {
		return !this.application?._id;
	}

	async onSaveBtn() {
		this.application = await this.applicationService.saveApplication(this.application);
		this.alertService.info('Application saved.');
		this.router.navigate(['/application/search']);
	}

	async onDeleteBtn() {
		this.confirmService.confirm({
			text: 'Are you sure you want to delete this application?'
		}).then(async answer => {
			if(!answer) return;
			await this.applicationService.deleteApplicationById(this.application._id);
			this.alertService.warning('Application deleted.');
			this.router.navigate(['/application/search']);
		});
	}


}
