import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationDetailPageComponent } from './application-detail-page/application-detail-page.component';
import { ApplicationPagePageComponent } from './application-detail-page/application-page-page/application-page-page.component';
import { ApplicationSectionPageComponent } from './application-detail-page/application-section-page/application-section-page.component';
import { ApplicationSearchPageComponent } from './application-search-page/application-search-page.component';

const routes: Routes = [
	{ path: '', redirectTo: 'search' },
	{ path: 'search', component: ApplicationSearchPageComponent },
	{ path: ':applicationId', component: ApplicationDetailPageComponent },
	{ path: ':applicationId/section/:sectionId', component: ApplicationSectionPageComponent },
	{ path: ':applicationId/section/:sectionId/page/:pageId', component: ApplicationPagePageComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {}
