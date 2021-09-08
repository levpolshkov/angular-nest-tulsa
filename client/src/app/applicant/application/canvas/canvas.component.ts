/* Sergei Golimbievsky sergei202.
 * 
 */

import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {
	@ViewChild('canvas', {static:true}) private canvasRef:ElementRef<HTMLCanvasElement>;
	context:CanvasRenderingContext2D;

	@Input() width:any = 500;
	@Input() height:any = 500;

	constructor() {
		// this.width = window.innerWidth-2;
		// this.height = window.innerHeight-90;
		console.log('CanvasComponent: width=%o, height=%o', this.width, this.height);
	}

	ngOnInit() {
	
	}

	private ngAfterViewInit() {
		console.log('CanvasComponent.ngAfterViewInit: canvasEl: %o', this.canvasRef);
		this.context = this.canvasRef.nativeElement.getContext('2d');
		
		console.log('CanvasComponent.ngAfterViewInit: context: %o', this.context);

		const el = this.canvasRef.nativeElement;
		el.onmousemove = e => this.onMouseMove(e.offsetX, this.height-e.offsetY, e);
		el.onmousedown = e => this.onMouseDown(e.offsetX, this.height-e.offsetY, e.buttons, e);
		el.onmouseup = e => this.onMouseUp(e.offsetX,this.height-e.offsetY, e.buttons, e);
	}

	public onMouseMove(x:number, y:number, event:MouseEvent) {
		// console.log('onMouseMove: x=%o, y=%o, event=%o', x,y, event);
	}
	public onMouseDown(x:number, y:number, buttons:number, event:MouseEvent) {
		// console.log('onMouseDown: x=%o, y=%o, buttons=%o, event=%o', x,y, buttons, event);
	}
	public onMouseUp(x:number, y:number, buttons:number, event:MouseEvent) {
		// console.log('onMouseUp: x=%o, y=%o, buttons=%o, event=%o', x,y, buttons, event);
	}

	public clear() {
		this.context.clearRect(0,0,this.width, this.height);
	}

	public drawLine(x1:number,y1:number, x2:number,y2:number, strokeStyle:string='black') {
		this.context.beginPath();
		this.context.moveTo(x1,this.height-y1);
		this.context.lineTo(x2,this.height-y2);
		if(strokeStyle) {
			this.context.strokeStyle = strokeStyle;
			this.context.stroke();
		}
	}

	public drawRect(x:number,y:number, w:number,h:number, strokeStyle:string='black', fillStyle:string=null) {
		if(strokeStyle) {
			this.context.strokeStyle = strokeStyle;
			this.context.strokeRect(x,this.height-y, w,h);
		}
		if(fillStyle) {
			this.context.fillStyle = fillStyle;
			this.context.fillRect(x,this.height-y, w,h);
		}
	}

	public drawCircle(x:number, y:number, radius:number, strokeStyle:string='black', fillStyle:string=null) {
		this.context.beginPath();
		this.context.arc(x, this.height-y, radius, 0, 2*Math.PI);
		if(strokeStyle) {
			this.context.strokeStyle = strokeStyle;
			this.context.stroke();
		}
		if(fillStyle) {
			this.context.fillStyle = fillStyle;
			this.context.fill();
		}
	}

	public drawText(x:number, y:number, text:string, font:string='20px sans', strokeStyle:string=null, fillStyle:string='black') {
		this.context.font = font;
		if(strokeStyle) {
			this.context.strokeStyle = strokeStyle;
			this.context.strokeText(text, x,y);
		}
		if(fillStyle) {
			this.context.fillStyle = fillStyle;
			this.context.fillText(text, x,y);
		}
	}

}
