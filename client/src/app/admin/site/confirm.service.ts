import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

interface ConfirmOptions {
	title?: string;
	text?: string;
	html?: string;
	yesLabel?: string;
	noLabel?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
	sub: Subscription;

	constructor(private modalService: NgbModal) {}

	confirm(options: ConfirmOptions = {}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const modalRef = this.modalService.open(ConfirmModalComponent);
			modalRef.componentInstance.text = options.text;
			modalRef.componentInstance.html = options.html;
			this.sub = modalRef.closed.subscribe((reason) => {
				console.log('ConfirmService closed reason=%o', reason);
				this.sub.unsubscribe();
				resolve(reason);
			});
		});
	}
}
