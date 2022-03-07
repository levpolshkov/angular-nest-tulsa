import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './date-input/date-input.component';

const components = [DateInputComponent];

@NgModule({
	imports: [CommonModule],
	declarations: components,
	exports: components
})
export class SharedModule {}
