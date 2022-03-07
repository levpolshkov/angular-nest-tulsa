import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlertContainerComponent } from './alert-container/alert-container.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

const components = [SidenavComponent, AlertContainerComponent, BlankPageComponent, ConfirmModalComponent];

@NgModule({
	declarations: components,
	imports: [CommonModule, RouterModule, NgbModule],
	exports: components
})
export class SiteModule {}
