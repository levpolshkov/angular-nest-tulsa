import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserSearchPageComponent } from './user-search-page/user-search-page.component';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';
import { UserRoutingModule } from './user-routing.module';
import { SearchModule } from '../../shared/search/search.module';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserPasswordModalComponent } from './user-password-modal/user-password-modal.component';

@NgModule({
	declarations: [UserLoginPageComponent, UserSearchPageComponent, UserDetailPageComponent, UserProfilePageComponent, UserPasswordModalComponent],
	imports: [CommonModule, FormsModule, UserRoutingModule, SearchModule]
})
export class UserModule {}
