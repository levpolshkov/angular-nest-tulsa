import { DatePipe, CurrencyPipe }		from '@angular/common';
import { HttpClientModule }				from '@angular/common/http';
import { NgModule }						from '@angular/core';
import { BrowserModule }				from '@angular/platform-browser';
import { FormsModule }					from '@angular/forms';

import { NgbModule }					from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule }		 		from 'ngx-mask';

import { AppRoutingModule }				from './app-routing.module';
import { AppComponent }					from './app.component';

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
		NgxMaskModule.forRoot()
	],
	providers: [
		DatePipe,
		CurrencyPipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
