import { DatePipe, CurrencyPipe, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		NgxMaskModule.forRoot(),
		GoogleTagManagerModule.forRoot({
			id: 'GTM-5PLRRM9'
		})
	],
	providers: [DatePipe, CurrencyPipe],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private route: ActivatedRoute, private location: Location) {
		// const queryParams = Object.fromEntries(
		// 	this.location
		// 		.path()
		// 		.slice(1)
		// 		.split('&')
		// 		.map((pair) => pair.split('='))
		// );
		// console.log('AppModule()\t queryParams=%o', queryParams);
		// debugger;
		this.route.queryParams.subscribe((params) => {
			console.log('AppModule()\t queryParams=%o', params);
		});
	}
}
