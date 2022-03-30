import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApplicationService } from './applicant/application/application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private applicationService: ApplicationService, private route: ActivatedRoute, private router: Router, private location: Location) {
		const queryParams = Object.fromEntries(
			this.location
				.path()
				.slice(1)
				.split('&')
				.map((pair) => pair.split('='))
		);

		if (queryParams.utm_source) {
			this.applicationService.utm_codes['utm_source'] = queryParams.utm_source;
		}

		if (queryParams.utm_medium) {
			this.applicationService.utm_codes['utm_medium'] = queryParams.utm_medium;
		}

		if (queryParams.utm_content) {
			this.applicationService.utm_codes['utm_content'] = queryParams.utm_content;
		}

		if (queryParams.utm_campaign) {
			this.applicationService.utm_codes['utm_campaign'] = queryParams.utm_campaign;
		}

		if (queryParams.utm_term) {
			this.applicationService.utm_codes['utm_term'] = queryParams.utm_term;
		}

		if (queryParams.utm_source) {
			this.applicationService.utm_codes['utm_source'] = queryParams.utm_source;
		}
	}

	ngOnInit() {}
}
