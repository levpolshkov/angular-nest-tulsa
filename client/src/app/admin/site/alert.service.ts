import { Injectable } from '@angular/core';

type AlertType = 'info' | 'warning' | 'danger';

export interface Alert {
	type: AlertType;
	content: string;
	timeout: number;
}

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	alerts: Alert[] = [];

	constructor() {}

	add(type: AlertType, content: string, timeout = 5000) {
		const alert = { type, content, timeout };
		this.alerts.push(alert);
		setTimeout(() => {
			this.onClose(alert);
		}, timeout);
	}

	info(content: string, timeout = 5000) {
		this.add('info', content, timeout);
	}

	warning(content: string, timeout = 5000) {
		this.add('warning', content, timeout);
	}

	error(content: string, timeout = 5000) {
		this.add('danger', content, timeout);
	}

	onClose(alert: Alert) {
		const index = this.alerts.indexOf(alert);
		if (index === -1) return;
		this.alerts.splice(index, 1);
	}
}
