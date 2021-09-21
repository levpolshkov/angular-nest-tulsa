import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment }		from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	httpUrl = environment.httpUrl;
	// uploadUrl = environment.uploadUrl;

	constructor(private http:HttpClient, private router:Router, private location:Location, private storageService:StorageService) {	}

	async get(url:string):Promise<any> {
		const headers = await this.getHeaders();
		return this.http.get(`${this.httpUrl}${url}`, {headers}).toPromise().catch(err => this.onError(err));
	}

	async post(url:string, data):Promise<any> {
		const headers = await this.getHeaders();
		return this.http.post(`${this.httpUrl}${url}`, data, {headers}).toPromise().catch(err => this.onError(err));
	}

	async put(url:string, data):Promise<any> {
		const headers = await this.getHeaders();
		return this.http.put(`${this.httpUrl}${url}`, data, {headers}).toPromise().catch(err => this.onError(err));
	}

	async patch(url:string, body?):Promise<any> {
		const headers = await this.getHeaders();
		return this.http.patch(`${this.httpUrl}${url}`, body, {headers}).toPromise().catch(err => this.onError(err));
	}

	async delete(url:string):Promise<any> {
		const headers = await this.getHeaders();
		return this.http.delete(`${this.httpUrl}${url}`, {headers}).toPromise().catch(err => this.onError(err));
	}

	// async upload(file:any, url:string) {
	// 	const headers = await this.getHeaders();
	// 	const formData: FormData = new FormData();
	// 	formData.append('fileKey', file, file.name);
	// 	return this.http.post(`${this.rootUrl}${url}`, formData, {headers}).toPromise().catch(err => this.onError(err));
	// }

	private onError(err) {
		const url = this.location.path();
		const redirectOnError = !url.match(/^\/(users\/reset)|(login)\/?/);
		// console.log('HttpService.onError: err=%o', err);
		if(redirectOnError && err.status===401 && err.error && err.error.type!=='login') {
			// console.log('route: %o', this.route.snapshot);
			// this.router.navigate(['/login']);
			// if(!this.route.snapshot.url[0].path.match('\/reset')) this.router.navigate(['/login']);
			// this.userChangeService.onChange(null);
		}
		return Promise.reject(err.error ? err.error : err);
	}

	async getHeaders() {
		const jwt = await this.storageService.get('jwt');
		return {
			Authorization: `Bearer ${jwt}`
		};
	}

	loadScript(url:string):Promise<any> {
		return new Promise((resolve,reject) => {
			const script = document.createElement('script');
			script.src = url;
			document.body.appendChild(script);
			script.onload = event => resolve(event);
			script.onerror = err => reject(err);
		});
	}

	// getPublicIpAddress():Promise<string> {
	// 	return this.http.get('https://api.ipify.org/?format=json').toPromise()

	// 		.catch(err => {
	// 			return null;
	// 		});
	// }
}
