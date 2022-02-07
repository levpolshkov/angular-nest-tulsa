import { Component, ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationService} from "./applicant/application/application.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private route: ActivatedRoute, private applicationService: ApplicationService) {
	}

	ngOnInit() {
		this.applicationService.utm_codes['utm_source'] = this.route.snapshot.params['utm_source'];
		this.applicationService.utm_codes['utm_medium'] = this.route.snapshot.params['utm_medium'];
		this.applicationService.utm_codes['utm_content'] = this.route.snapshot.params['utm_content'];
		this.applicationService.utm_codes['utm_campaign'] = this.route.snapshot.params['utm_campaign'];
	}
}
