import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductSearchPageComponent } from './product-search-page/product-search-page.component';

const routes:Routes = [
	{path:'',					redirectTo:'search'},
	{path:'search',				component:ProductSearchPageComponent},
	{path:':productId',			component:ProductDetailPageComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule { }
