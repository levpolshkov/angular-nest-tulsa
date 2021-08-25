import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchModule }						from 'src/app/shared/search/search.module';

import { ProductRoutingModule }				from './product-routing.module';
import { ProductSearchPageComponent }		from './product-search-page/product-search-page.component';
import { ProductDetailPageComponent }		from './product-detail-page/product-detail-page.component';
import { ProductSearchModalComponent }		from './product-search-modal/product-search-modal.component';



const components = [
	ProductSearchPageComponent,
	ProductDetailPageComponent,
	ProductSearchModalComponent
];

@NgModule({
	imports: [
		CommonModule,
		SearchModule,
		FormsModule,
		ProductRoutingModule
	],
	declarations: components,
	exports: components
})
export class ProductModule { }
