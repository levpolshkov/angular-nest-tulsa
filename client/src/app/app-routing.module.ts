import { NgModule } 				from '@angular/core';
import { RouterModule, Routes } 	from '@angular/router';
import { UserGuard } from './user.guard';
import { BlankPageComponent } from './site/blank-page/blank-page.component';

const routes:Routes = [
	{path:'',					canActivate:[UserGuard],	component:BlankPageComponent},
	{path:'user',				loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
	{path:'product',			loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
	{path:'**',					redirectTo:'/'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
