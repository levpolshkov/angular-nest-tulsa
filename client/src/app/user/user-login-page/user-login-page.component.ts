import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/site/alert.service';
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-login-page',
	templateUrl: './user-login-page.component.html',
	styleUrls: ['./user-login-page.component.scss']
})
export class UserLoginPageComponent implements OnInit {
	creds = {username:'', password:''};
	ForgotPasswordEnabled = false;
	forgotPasswordBusy = false;
	forgotPasswordDone = false;

	constructor(private userService:UserService, private alertService:AlertService, private router:Router, private route:ActivatedRoute) { }

	ngOnInit() {
		console.log('UserLoginPageComponent.ngOnInit()');
		if(this.route.snapshot.queryParams.resetCode) this.loginWithResetCode(this.route.snapshot.queryParams.resetCode);
	}

	async loginWithResetCode(resetCode:string) {
		console.log('UserResetComponent: resetCode=%o', resetCode);
		const userJwt = await this.userService.getUserJwtByResetCode(resetCode);
		console.log('UserResetComponent: userJwt=%o', userJwt);
		const user = await this.userService.loginWithUserJwt(userJwt);
		if(user) {
			this.router.navigate(['/user/profile'], {queryParams:{changePassword:true}})
		}
	}

	async onLoginBtn() {
		this.userService.login(this.creds).then(user => {
			console.log('login: user=%o', user);
			this.alertService.info(`Successfully logged in as <b>${user.fullName}</b>`);
			this.router.navigate(['/dashboard']);
		}, err => {
			console.log('login err=%o', err);
			this.alertService.error(err.message || 'There was a login error');
			this.ForgotPasswordEnabled = true;
		});
	}

	onForgotPasswordBtn() {
		this.forgotPasswordBusy = true;
		this.userService.resetPassword({username:this.creds.username, reason:'forgot'}).then(result => {
			this.alertService.info('Reset email was sent.  Please check your inbox.');
			console.log('UserLoginComponent.forgotPassword: result=%o', result);
			this.forgotPasswordDone = true;
			this.forgotPasswordBusy = false;
		}).catch(err => {
			this.alertService.error(err.message || 'There was an error.');
			this.forgotPasswordBusy = false;
		});
	}
}

