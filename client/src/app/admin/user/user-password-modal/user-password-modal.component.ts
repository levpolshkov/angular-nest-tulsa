import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/admin/site/alert.service';
import { User, UserService } from '../user.service';

@Component({
	selector: 'app-user-password-modal',
	templateUrl: './user-password-modal.component.html',
	styleUrls: ['./user-password-modal.component.scss']
})
export class UserPasswordModalComponent implements OnInit {
	@Input() user: User;
	password1 = '';
	password2 = '';

	constructor(private userService: UserService, private alertService: AlertService, private modalRef: NgbActiveModal) {}

	ngOnInit() {}

	onChangePasswordBtn() {
		const payload = <User>{
			_id: this.user._id,
			password: this.password1
		};
		this.userService.saveUser(payload).then(
			(user) => {
				this.alertService.info('Password changed successfully.');
			},
			(err) => {
				this.alertService.error(err.message || 'There was an error.  Please contact support.');
			}
		);
		this.modalRef.close(true);
	}

	onCancelBtn() {
		this.modalRef.close(false);
	}

	get canChangePassword() {
		return this.password1 && this.password2 && this.password1 === this.password2 && this.password1.length >= 4;
	}
}
