import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Router }	from '@angular/router';
import { User }						from 'src/app/models';
import { UserService }				from '../user.service';
import { AlertService }				from 'src/app/admin/site/alert.service';
import { ConfirmService }			from 'src/app/admin/site/confirm.service';

@Component({
	selector: 'app-user-detail-page',
	templateUrl: './user-detail-page.component.html',
	styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit {
	user:User;

	constructor(private route:ActivatedRoute, private router:Router, public userService:UserService, private alertService:AlertService, private confirmService:ConfirmService) { }

	async ngOnInit() {
		const userId = this.route.snapshot.params.userId;
		console.log('UserDetailComponent: userId=%o', userId);
		if(userId==='new') {
			this.user = <User>{
				active: true,
				type: 'user'
			};
		} else {
			this.user = await this.userService.getUserById(userId);
		}

		console.log('UserDetailComponent: user=%o', this.user);
	}

	async onSaveBtn() {
		const user = await this.userService.saveUser(this.user);
		this.alertService.info(`Successfully saved user`);
		this.router.navigate(['/admin/user']);
	}

	async onDeleteBtn() {
		this.confirmService.confirm({
			text: 'Are you sure you want to delete this user?'
		}).then(async answer => {
			console.log('onDelete: answer=%o', answer);
			if(!answer) return;
			await this.userService.deleteUserById(this.user._id);
			this.alertService.info('User deleted.');
			this.router.navigate(['/admin/user']);
		});
	}

	async onResetPasswordBtn() {
		this.confirmService.confirm({
			text: 'This will email the user a link to reset their password.  Continue?'
		}).then(async answer => {
			if(!answer) return;
			await this.userService.resetPassword({username:this.user.email, reason:'reset'});
			this.alertService.info('User password email sent.');
			this.router.navigate(['/admin/user']);
		});
	}
}
