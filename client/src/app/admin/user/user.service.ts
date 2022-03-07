import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchParams, SearchResult, User } from 'src/app/models';
import { SearchService } from 'src/app/shared/search/search.service';
import { HttpService } from 'src/app/shared/http.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UserChangeService } from './user-change.service';
import { UserPasswordModalComponent } from './user-password-modal/user-password-modal.component';
export { User };

export interface UserJwt {
	jwt: string;
	user: User;
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	currentUser: User;

	readonly userTypes = [
		{ id: 'admin', name: 'Admin' },
		{ id: 'regular', name: 'Regular' }
	];

	constructor(
		private http: HttpService,
		private searchService: SearchService,
		private storageService: StorageService,
		private userChangeService: UserChangeService,
		private modalService: NgbModal
	) {
		this.userChangeService.subscribe((user) => {
			this.currentUser = user;
		});
	}

	searchUsers(params: SearchParams): Promise<SearchResult<User>> {
		return this.searchService.search<User>('/user', params);
	}

	getUserById(id: string): Promise<User> {
		return this.http.get(`/user/${id}`);
	}

	getUserJwtByResetCode(resetCode: string): Promise<UserJwt> {
		return this.http.get(`/user/resetCode/${resetCode}`);
	}

	saveUser(user: User) {
		return this.http.post('/user', user).then((user) => {
			if (this.currentUser && this.currentUser._id === user._id) {
				this.userChangeService.onChange(user, true);
			}
			return user;
		});
	}

	deleteUserById(userId: string) {
		return this.http.delete(`/user/${userId}`);
	}

	resetPassword(params: { username: string; reason: string }): Promise<any> {
		return this.http.post(`/user/reset`, params);
	}

	/******************************************************** Auth-related ******************************************************/
	login(creds): Promise<User> {
		return this.http.post(`/auth/login`, creds).then((result) => {
			return this.loginWithUserJwt(result);
		});
	}

	loginWithUserJwt(userJwt: UserJwt) {
		this.storageService.set('jwt', userJwt.jwt);
		this.userChangeService.onChange(userJwt.user);
		return userJwt.user;
	}

	logout() {
		this.storageService.remove('jwt');
		this.userChangeService.onChange(null);
		// setTimeout(() => this.router.navigate(['/login']), 1000);
	}

	getCurrentUser(): Promise<User> {
		// console.log('getCurrentUser()');
		return this.http
			.get(`/auth/user`)
			.then((user) => {
				this.userChangeService.onChange(user);
				return user;
			})
			.catch((err) => Promise.resolve(null));
	}

	get isCurrentUserAdmin() {
		return this.currentUser && this.currentUser.type === 'admin';
	}

	userTypeRenderer(typeId: string) {
		const userType = this.userTypes.find((t) => t.id === typeId);
		return userType ? userType.name : `[${typeId}]`;
	}

	openPasswordModal(user: User) {
		let sub = null;
		return new Promise((resolve, reject) => {
			const modalRef = this.modalService.open(UserPasswordModalComponent);
			modalRef.componentInstance.user = user;
			sub = modalRef.closed.subscribe((result) => {
				console.log('UserService.openPasswordModal: result=%o', result);
				sub.unsubscribe();
				resolve(result);
			});
		});
	}
}
