import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-applicant',
	templateUrl: './applicant.component.html',
	styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {
	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		if (window['gtag']) window['gtag']('config', 'AW-10781414996');
	}
}
