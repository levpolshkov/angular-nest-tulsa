import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes:Routes = [
	{path:'',					component:AdminComponent},
	{path:'user',				loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@NgModule({
	imports: [
		FormsModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
