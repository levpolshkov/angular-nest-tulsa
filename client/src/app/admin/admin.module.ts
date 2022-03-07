import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserAdminGuard } from './user-admin.guard';
import { UserGuard } from './user.guard';
import { SiteModule } from './site/site.module';
import { SearchModule } from '../shared/search/search.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [AdminComponent],
	imports: [CommonModule, AdminRoutingModule, SiteModule, SearchModule, SharedModule],
	providers: [UserGuard, UserAdminGuard]
})
export class AdminModule {}
