import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
	selector: 'date-input',
	templateUrl: './date-input.component.html',
	styleUrls: ['./date-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true
		}
	]
})
export class DateInputComponent implements OnInit {
	@Input() name: string;
	@Input('value') dateValue: Date;

	@Input() disabled: boolean;
	@Input() required: boolean;

	strValue: string; // 'YYYY-MM-DD' of dateValue

	constructor() {}

	ngOnInit() {}

	onChange: any = () => {};
	onTouched: any = () => {};

	get value() {
		return this.dateValue;
	}
	set value(value: Date) {
		this.dateValue = value;
		this.strValue = DateTime.fromJSDate(value, { zone: 'UTC' }).toISODate();
		this.onChange(value);
		this.onTouched();
	}

	writeValue(value) {
		this.value = value || null;
	}
	registerOnChange(fn) {
		this.onChange = fn;
	}
	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	parseStrDate(event: Event) {
		const str = (event.target as HTMLInputElement).value;
		this.dateValue = DateTime.fromFormat(str, 'yyyy-MM-dd', { zone: 'UTC' }).toJSDate();
		this.onChange(this.dateValue);
		this.onTouched();
	}
}
