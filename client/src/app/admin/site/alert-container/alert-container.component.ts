import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from '../alert.service';

@Component({
	selector: 'alert-container',
	templateUrl: './alert-container.component.html',
	styleUrls: ['./alert-container.component.scss']
})
export class AlertContainerComponent implements OnInit {
	alerts: Alert[] = [];

	constructor(private alertService: AlertService) {}

	ngOnInit() {
		this.alerts = this.alertService.alerts;
	}

	onClose(alert: Alert) {
		this.alertService.onClose(alert);
	}
}
