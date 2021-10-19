import { NgModule }								from '@angular/core';
import { CommonModule }							from '@angular/common';
import { FormsModule }							from '@angular/forms';

import { SearchModule }							from 'src/app/shared/search/search.module';

import { ApplicationRoutingModule }				from './application-routing.module';
import { ApplicationSearchPageComponent }		from './application-search-page/application-search-page.component';
import { ApplicationDetailPageComponent }		from './application-detail-page/application-detail-page.component';
import { ApplicationSearchModalComponent }		from './application-search-modal/application-search-modal.component';
import { ApplicationSectionPageComponent }		from './application-detail-page/application-section-page/application-section-page.component';
import { ApplicationPagePageComponent }			from './application-detail-page/application-page-page/application-page-page.component';


const components = [
	ApplicationSearchPageComponent,
	ApplicationDetailPageComponent,
	ApplicationSearchModalComponent,
	ApplicationSectionPageComponent,
	ApplicationPagePageComponent
];

@NgModule({
	imports: [
		CommonModule,
		SearchModule,
		FormsModule,
		ApplicationRoutingModule
	],
	declarations: components,
	exports: components
})
export class ApplicationModule { }
