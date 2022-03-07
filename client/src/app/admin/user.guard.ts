import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {
	constructor(private userService: UserService, private router: Router) {}

	async authCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
		// console.group('UserGuard:authCheck()');
		// console.log('route=%o', route.toString());
		const user = await this.userService.getCurrentUser();
		// console.log('user=%o', user);
		if (user) {
			console.groupEnd();
			return true;
		}
		// this.userService.redirect = state.url;
		// console.log('redirecting back to /users/login');
		console.groupEnd();
		return this.router.parseUrl('/user/login');
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		// console.log('AuthGuard.canActivate()');
		return this.authCheck(route, state);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		// console.log('AuthGuard.canActivateChild()');
		return this.authCheck(route, state);
	}
}
