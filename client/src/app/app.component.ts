import { Component, ViewChild } from '@angular/core';
import { SidenavComponent } from './site/sidenav/sidenav.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	@ViewChild('sidenav') sidenav:SidenavComponent;

	constructor() {}
}
