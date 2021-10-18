import { Component }	from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-confirm-modal',
	templateUrl: './confirm-modal.component.html',
	styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
	title = 'Are you sure?';
	text = 'Are you sure you want to do this?';
	html = '';
	yesLabel = 'Yes';
	noLabel = 'Cancel';

	constructor(private modalRef:NgbActiveModal) { }

	no() {
		this.modalRef.close(false);
	}

	yes() {
		this.modalRef.close(true);
	}

}
