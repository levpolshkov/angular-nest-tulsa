import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApplicationSection } from '../../../models';


interface Title {
	x: number,
	y: number,
	color: string,
	text: string
}
interface Circle {
	x: number,
	y: number,
	color: string
};

interface Line {
	x1: number,
	x2: number,
	y: number,
	color: string
};

interface Section extends ApplicationSection {
	completed?: number,
	current?: boolean
};

@Component({
	selector: 'wayfinder',
	templateUrl: './wayfinder.component.html',
	styleUrls: ['./wayfinder.component.scss']
})
export class WayfinderComponent implements OnInit {
	@Input() sections:Section[] = [];
	@Input() sectionIndex:number;		// Currently active sectionIndex

	width = 700;
	height = 100;

	titles:Title[] = [];
	circles:Circle[] = [];
	lines:Line[] = [];

	completedColor = '#4e40f3';
	grayColor = '#ccc';

	constructor() { }


	ngOnChanges(changes:SimpleChanges) {
		if(changes.sectionIndex && changes.sectionIndex.currentValue) {
			console.log('ngOnChanges: changes=%o', changes);
			this.sections.forEach(s => s.current=false);
			this.sections[changes.sectionIndex.currentValue].current = true;
			this.draw();
		}
	}

	ngOnInit() {
		this.draw();
	}

	draw() {
		const sectionWidth = (this.width)/this.sections.length;

		this.sections[0].completed = 1;
		this.sections[1].completed = 0.3;
		this.sections[this.sectionIndex].current = true;

		this.circles = [];
		this.titles = [];
		this.lines = [];
		this.sections.forEach((section,i) => {
			if(!section.completed) section.completed = 0;
			const x = (i+0.5)*sectionWidth;
			this.titles.push({
				x,
				y: 30,
				text: section.title,
				color: section.current ? 'black' : this.grayColor
			});
			this.circles.push({
				x,
				y: 50,
				color: section.completed ? this.completedColor : this.grayColor
			});

			if(i) {
				const previousCircle = this.circles[i-1];
				const x1 = previousCircle.x;
				const x3 = this.circles[i].x;
				const x2 = x1 + (x3-x1)*this.sections[i-1].completed;

				this.lines.push({
					x1,
					x2,
					y: 50,
					color: this.completedColor
				});

				this.lines.push({
					x1: x2,
					x2: x3,
					y: 50,
					color: this.grayColor
				});
			}
		});
	}

}
