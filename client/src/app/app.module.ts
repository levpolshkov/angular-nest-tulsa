import { DatePipe, CurrencyPipe }		from '@angular/common';
import { HttpClientModule }				from '@angular/common/http';
import { NgModule }						from '@angular/core';
import { BrowserModule }				from '@angular/platform-browser';
import { FormsModule }					from '@angular/forms';

import { NgbModule }					from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule }		 		from 'ngx-mask';


import { AppRoutingModule }				from './app-routing.module';
import { SearchModule }					from './shared/search/search.module';

import { AppComponent }					from './app.component';
import { SiteModule }					from './site/site.module';
import { UserGuard } from './user.guard';
import { UserAdminGuard } from './user-admin.guard';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		NgxMaskModule.forRoot(),
		SearchModule,
		SiteModule
	],
	providers: [
		DatePipe,
		CurrencyPipe,
		UserGuard,
		UserAdminGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
