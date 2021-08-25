import { Component, OnInit, Output, EventEmitter } 		from '@angular/core';
import { Router } 						from '@angular/router';
import packageJson 						from '../../../../package.json';
import { UserService, User } 			from 'src/app/user/user.service';
import { UserChangeService } 			from 'src/app/user/user-change.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
	version = `v${packageJson.version}`;
	user:User;

	private minWidth = 1280;
	isOpen = false;

	menuItems = [
		// {name:'Dashboard',		url:'/dashboard', 	icon:'fas fa-tachometer-alt'},
		{name:'Products',			url:'/product', 	icon:'fas fa-list-alt'},
		{name:'Users',				url:'/user',		icon:'fas fa-users'}
	];

	constructor(private userChangeService:UserChangeService, private userService:UserService, private router:Router) { }

	ngOnInit() {
		this.userChangeService.subscribe(user => {
			console.log('SidenavComponent: user=%o', user);
			this.user = user;
		});
		this.userService.getCurrentUser();

		window.onresize = () => this.onResize();
		this.onResize();
	}

	private onResize() {
		const windowWith = window.innerWidth;		// To avoid doing a ngZone
	}

	logout() {
		this.userService.logout();
		this.router.navigate(['/user/login']);
		console.log('logged out');
	}

	navigateToProfile() {
		this.router.navigate(['/user/profile']);
	}

	get isEnabled() {
		return !!this.user;
	}
	get isVisible() {
		return !!this.user && window.innerWidth >= this.minWidth;
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}

	onClick() {
		this.isOpen = false;
	}
}
