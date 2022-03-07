import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { WayfinderComponent } from './wayfinder/wayfinder.component';
import { CanvasComponent } from './canvas/canvas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ApplicationComponent, WayfinderComponent, CanvasComponent],
	imports: [CommonModule, ApplicationRoutingModule, FormsModule]
})
export class ApplicationModule {}
