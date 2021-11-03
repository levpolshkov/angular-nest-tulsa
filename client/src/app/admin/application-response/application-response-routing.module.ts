import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationResponseDetailPageComponent } from './application-response-detail-page/application-response-detail-page.component';
import { ApplicationResponseSearchPageComponent } from './application-response-search-page/application-response-search-page.component';

const routes:Routes = [
	{path:'',					redirectTo:'search'},
	{path:'search',				component:ApplicationResponseSearchPageComponent},
	{path:':applicationResponseId',			component:ApplicationResponseDetailPageComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApplicationResponseRoutingModule { }
