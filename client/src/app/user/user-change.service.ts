import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'src/app/models';
export { User };

@Injectable({
	providedIn: 'root'
})
export class UserChangeService {
	private event = new EventEmitter<User>();
	private user:User;

	constructor() {}

	onChange(user:User, force=false) {
		if(!user && !this.user) return;
		if(!this.user || !user || user._id!==this.user._id || force) {
			this.user = user;
			this.event.emit(this.user);
			// console.log('UserChangeService.onChange()\tuser=%o', user);
		}
	}

	getUser():User {
		return this.user;
	}

	subscribe(handler:Function) {
		const sub = this.event.subscribe(handler);
		handler(this.user);
		return sub;
	}
}
