import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchModule }						from 'src/app/shared/search/search.module';

import { ApplicationResponseRoutingModule }				from './application-response-routing.module';
import { ApplicationResponseSearchPageComponent }		from './application-response-search-page/application-response-search-page.component';
import { ApplicationResponseDetailPageComponent }		from './application-response-detail-page/application-response-detail-page.component';



const components = [
	ApplicationResponseSearchPageComponent,
	ApplicationResponseDetailPageComponent
];

@NgModule({
	imports: [
		CommonModule,
		SearchModule,
		FormsModule,
		ApplicationResponseRoutingModule
	],
	declarations: components,
	exports: components
})
export class ApplicationResponseModule { }
