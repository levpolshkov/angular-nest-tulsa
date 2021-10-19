import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes:Routes = [
	{
		path:'',					component:AdminComponent,
		children: [
			{path:'user',				loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
			{path:'application',		loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)}
		]
	}
];

@NgModule({
	imports: [
		FormsModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
