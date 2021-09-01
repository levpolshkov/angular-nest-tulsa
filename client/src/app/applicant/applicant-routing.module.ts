import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantComponent } from './applicant.component';


const routes:Routes = [{
	path:'',					component:ApplicantComponent,
	children: [
		{path:'',					redirectTo:'application'},
		{path:'application',		loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)}
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApplicantRoutingModule { }
