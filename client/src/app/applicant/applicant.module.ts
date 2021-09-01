import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantComponent } from './applicant.component';
import { ApplicantRoutingModule } from './applicant-routing.module';

@NgModule({
	declarations: [
		ApplicantComponent
	],
	imports: [
		CommonModule,
		ApplicantRoutingModule
	]
})
export class ApplicantModule { }
