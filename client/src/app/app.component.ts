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
	constructor(private applicationService: ApplicationService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.route.queryParams.subscribe((e) => {
			// sanitize for only utm query params
			if (e.utm_source) {
				this.applicationService.utm_codes['utm_source'] = e.utm_source;
			}

			if (e.utm_medium) {
				this.applicationService.utm_codes['utm_medium'] = e.utm_medium;
			}

			if (e.utm_content) {
				this.applicationService.utm_codes['utm_content'] = e.utm_content;
			}

			if (e.utm_campaign) {
				this.applicationService.utm_codes['utm_campaign'] = e.utm_campaign;
			}

			if (e.utm_term) {
				this.applicationService.utm_codes['utm_term'] = e.utm_term;
			}

			if (e.utm_source) {
				this.router.navigate([window.location.pathname], {
					queryParams: {
						...e,
						utm_source: undefined,
						utm_medium: undefined,
						utm_content: undefined,
						utm_campaign: undefined,
						utm_term: undefined
					},
					queryParamsHandling: 'merge'
				});
			}
		});
	}
}
