import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor() {}

	set(key:string, value:any):Promise<void> {
		const json = JSON.stringify(value);
		return Promise.resolve(localStorage.setItem(key,json));
	}

	async get(key:string):Promise<any> {
		const value = localStorage.getItem(key);
		return Promise.resolve(JSON.parse(value));
	}

	remove(key:string):Promise<void> {
		return Promise.resolve(localStorage.removeItem(key));
	}
}
