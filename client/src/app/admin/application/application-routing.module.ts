import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationDetailPageComponent } from './application-detail-page/application-detail-page.component';
import { ApplicationSearchPageComponent } from './application-search-page/application-search-page.component';

const routes:Routes = [
	{path:'',					redirectTo:'search'},
	{path:'search',				component:ApplicationSearchPageComponent},
	{path:':applicationId',			component:ApplicationDetailPageComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApplicationRoutingModule { }
