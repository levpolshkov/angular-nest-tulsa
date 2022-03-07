import { Component, OnInit, Input } from '@angular/core';
import { SearchTableComponent } from '../search-table/search-table.component';
import { SearchResult } from '../../../models';

@Component({
	selector: 'search-footer',
	templateUrl: './search-footer.component.html',
	styleUrls: ['./search-footer.component.scss']
})
export class SearchFooterComponent implements OnInit {
	@Input('searchTable') searchTable: SearchTableComponent;
	pagesToShow = 5;
	pages: number[] = [];

	constructor() {}

	ngOnInit() {
		this.searchTable.resultEvent.subscribe((result) => {
			this.calcPages(result);
		});
	}

	get start(): number {
		if (!this.searchTable || !this.searchTable.result || !this.searchTable.result.total) return 0;
		const start = this.searchTable.result.size * this.searchTable.result.page - this.searchTable.result.size + 1;
		return start;
	}
	get end(): number {
		if (!this.searchTable || !this.searchTable.result || !this.searchTable.result.total) return 0;
		const end = this.searchTable.result.page * this.searchTable.result.size;
		return end > this.searchTable.result.total ? this.searchTable.result.total : end;
	}
	get pageCount(): number {
		return Math.ceil(this.searchTable.result.total / this.searchTable.result.size) || 0;
	}

	prev() {
		if (this.canPrev) this.go(this.searchTable?.result?.page - 1);
	}
	next() {
		if (this.canNext) this.go(this.searchTable?.result?.page + 1);
	}
	get canPrev(): boolean {
		return this.searchTable?.result?.page > 1;
	}
	get canNext(): boolean {
		return this.searchTable?.result?.page < this.pageCount;
	}

	go(page: number) {
		if (page > this.pageCount) page = this.pageCount;
		if (this.searchTable.noRouting) {
			this.searchTable.params.page = page;
			this.searchTable.doSearch();
		}
	}

	calcPages(result: SearchResult<any>) {
		this.pages = [];
		this.pages.push(result.page);
		for (let i = 0; i < this.pagesToShow - 1; i++) {
			if (this.pages.length >= this.pagesToShow) break;
			const min = Math.min(...this.pages);
			const max = Math.max(...this.pages);
			if (min > 1) this.pages.push(min - 1);
			if (max < this.pageCount) this.pages.push(max + 1);
		}
		this.pages.sort((a, b) => a - b);
	}
}
