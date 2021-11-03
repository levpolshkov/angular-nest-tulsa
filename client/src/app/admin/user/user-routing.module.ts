import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../user.guard';
import { SearchModule } from '../../shared/search/search.module';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserSearchPageComponent } from './user-search-page/user-search-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';


const routes:Routes = [
	{path:'',					redirectTo:'search'},
	{path:'login',											component:UserLoginPageComponent},
	{path:'profile',			canActivate:[UserGuard],	component:UserProfilePageComponent},
	{path:'search',				canActivate:[UserGuard],	component:UserSearchPageComponent},
	{path:':userId',			canActivate:[UserGuard],	component:UserDetailPageComponent},
	
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SearchModule
	],
	exports: [RouterModule]
})
export class UserRoutingModule { }
