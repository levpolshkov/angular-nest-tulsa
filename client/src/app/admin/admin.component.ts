import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from './site/sidenav/sidenav.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	@ViewChild('sidenav') sidenav:SidenavComponent;

	constructor() { }

	ngOnInit(): void {
	}

}
