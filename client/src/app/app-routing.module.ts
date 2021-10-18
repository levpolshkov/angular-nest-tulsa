import { NgModule } 				from '@angular/core';
import { RouterModule, Routes } 	from '@angular/router';

const routes:Routes = [
	{path:'',					redirectTo:'/applicant/application', pathMatch:'full'},
	{path:'applicant',			loadChildren: () => import('./applicant/applicant.module').then(m => m.ApplicantModule)},
	// {path:'product',			loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
	{path:'admin',				loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
	{path:'**',					redirectTo:'/applicant/application', pathMatch:'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
