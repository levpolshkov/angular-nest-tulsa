import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {ApplicationService} from "./applicant/application/application.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	private queryParams = {};

	constructor(private applicationService: ApplicationService, private location: Location) {
	}

	ngOnInit() {
		this.queryParams = this.location.path().slice(1).split('&').map(p => p.split('=')).map(p => ({[p[0]]:p[1]})).reduce((a,b) => Object.assign(a,b), {});
		// sanitize for only utm query params
		this.queryParams['utm_source'] ? this.applicationService.utm_codes['utm_source'] = this.queryParams['utm_source'] : '';
		this.queryParams['utm_medium'] ? this.applicationService.utm_codes['utm_medium'] = this.queryParams['utm_medium'] : '';
		this.queryParams['utm_content'] ? this.applicationService.utm_codes['utm_content'] = this.queryParams['utm_content'] : '';
        this.queryParams['utm_campaign'] ? this.applicationService.utm_codes['utm_campaign'] = this.queryParams['utm_campaign'] : '';
        this.queryParams['utm_term'] ? this.applicationService.utm_codes['utm_term'] = this.queryParams['utm_term'] : '';
	}
}
