import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApplicationSection } from '../../../models';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
	selector: 'wayfinder',
	templateUrl: './wayfinder.component.html',
	styleUrls: ['./wayfinder.component.scss']
})
export class WayfinderComponent implements OnInit {
	@ViewChild('canvas') canvas:CanvasComponent;
	@Input() sections:any[] = [];

	constructor() { }

	ngOnInit() {

	}

	ngAfterViewInit() {
		console.log('AppComponent canvas: %o', this.canvas);

		// this.canvas.drawCircle(10,10,5,'blue','blue');

		this.sections = [1,2,3,4,5];

		const sectionWidth = (this.canvas.width)/this.sections.length;
	
		this.sections.forEach((section,i) => {
			const x = (i+0.5)*sectionWidth;
			this.canvas.context.lineWidth = 3;
			this.canvas.context.imageSmoothingEnabled = true;
			this.canvas.drawCircle(x, 20, 9, '#4e40f3');
		});

	}

}
