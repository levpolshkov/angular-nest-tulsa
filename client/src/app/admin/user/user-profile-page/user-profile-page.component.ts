import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from '../user.service';
import { AlertService } from 'src/app/admin/site/alert.service';

@Component({
	selector: 'app-user-profile-page',
	templateUrl: './user-profile-page.component.html',
	styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
	user: User;

	constructor(private router: Router, private route: ActivatedRoute, public userService: UserService, private alertService: AlertService) {}

	async ngOnInit() {
		this.user = await this.userService.getCurrentUser();
		console.log('UserProfilePageComponent: user=%o', this.user);
		if (this.route.snapshot.queryParams.changePassword) this.onChangePasswordBtn();
	}

	async onSaveBtn() {
		const user = await this.userService.saveUser(this.user);
		this.alertService.info(`Successfully saved user profile`);
		this.router.navigate(['/admin/user']);
	}

	async onChangePasswordBtn() {
		this.userService.openPasswordModal(this.user);
	}
}
