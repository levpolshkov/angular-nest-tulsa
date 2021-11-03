import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationResponse } from 'src/app/models';
import { AlertService } from 'src/app/admin/site/alert.service';
import { ConfirmService } from 'src/app/admin/site/confirm.service';
import { AdminApplicationResponseService } from '../application-response.service';

@Component({
	selector: 'app-application-response-detail-page',
	templateUrl: './application-response-detail-page.component.html',
	styleUrls: ['./application-response-detail-page.component.scss']
})
export class ApplicationResponseDetailPageComponent implements OnInit {
	response:ApplicationResponse;
	readonly = false;

	fullName = '';

	constructor(public responseService:AdminApplicationResponseService, private route:ActivatedRoute, private router:Router, private alertService:AlertService, private confirmService:ConfirmService) { }


	async ngOnInit() {
		const applicationResponseId = this.route.snapshot.params.applicationResponseId;
		console.log('ApplicationResponseDetailPageComponent: applicationResponseId=%o', applicationResponseId);

		if(applicationResponseId==='new') {
			this.response = <ApplicationResponse>{};
		} else {
			this.response = await this.responseService.getApplicationResponseById(applicationResponseId);
		}

		const firstName = this.responseService.getResponseQuestionAnswer(this.response,'firstName');
		const lastName = this.responseService.getResponseQuestionAnswer(this.response,'lastName');
		this.fullName = `${firstName} ${lastName}`;
	}

	get isNew() {
		return !this.response?._id;
	}

	async onSaveBtn() {
		this.response = await this.responseService.saveApplicationResponse(this.response);
		this.alertService.info('ApplicationResponse saved.');
		this.router.navigate(['/applicationResponse/search']);
	}

	async onDeleteBtn() {
		this.confirmService.confirm({
			text: 'Are you sure you want to delete this applicationResponse?'
		}).then(async answer => {
			if(!answer) return;
			await this.responseService.deleteApplicationResponseById(this.response._id);
			this.alertService.warning('ApplicationResponse deleted.');
			this.router.navigate(['/applicationResponse/search']);
		});
	}

	renderName(response:ApplicationResponse) {
		
	}

}
