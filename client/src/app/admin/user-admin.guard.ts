import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable()
export class UserAdminGuard implements CanActivate, CanActivateChild {
	constructor(private userService: UserService, private router: Router) {}

	async authCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
		// console.group('UserAdminGuard:authCheck()');
		// console.log('route=%o', route.toString());
		const user = await this.userService.getCurrentUser();
		if (!user) return this.router.parseUrl('/users/login');
		return user.type === 'admin';

		// return this.router.parseUrl('/users/login');
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
