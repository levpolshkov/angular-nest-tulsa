import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { SearchParams, SearchResult } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SearchService } from '../search.service';
import { HttpService } from 'src/app/shared/http.service';

export interface SearchColumn {
	field?: string,
	header: string,
	headerClass?: string,
	rowClass?: string,
	hide?: string,
	// show: boolean,
	// noDisplay?: boolean,			// Makes field not show up on list of options but allows it to still be searched
	renderer?: SearchColumnRenderer|string,
	classRenderer?: SearchColumnRenderer,
	onMouseOver?: any
};
export type SearchColumnRenderer = (row:any, column?:SearchColumn) => any;

@Component({
	selector: 'search-table',
	templateUrl: './search-table.component.html',
	styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
	public columns:SearchColumn[] = [];
	public searchUrl:string;
	public params:SearchParams;
	public result:SearchResult<any>;
	public resultEvent:EventEmitter<SearchResult<any>>;		// Emits when result is ready
	public addNewUrl:string = '';
	public noRouting = false;								// Disable SearchTable from changing the url
	public defaultFilter:any = {};
	public ready = false;
	private onFilterChangeTimer = null;


	constructor(private searchService:SearchService, private route:ActivatedRoute, private router:Router, private datePipe:DatePipe, private currencyPipe:CurrencyPipe, private httpService:HttpService) {
		this.params = {
			size: 10,
			page: 1,
			filter: {},
			// sort: this.searchTable.params?.sort || {prop:this.searchTable.columns[0].field, dir:1}
		};
		this.resultEvent = new EventEmitter<SearchResult<any>>();
	}

	ngOnInit() {
		// console.log('SearchTableComponent searchTable=%o', this.searchTable);
		if(!this.noRouting) {
			setTimeout(() => {
				this.route.queryParams.subscribe(queryParams => {
					this.onQueryParamsChange(queryParams);
				});
			}, 50);
		} else {
			this.doSearch();
		}
	}


	doSearch() {
		if(!this.searchUrl) return Promise.reject('SearchTableComponent: Missing searchUrl');
		return this.searchService.search<any>(this.searchUrl, this.params).then(result => {
			// console.debug('SearchTableComponent.doSearch() result=%o', result);
			this.result = result;
			this.resultEvent.emit(result);
		});
	}

	onRowClick(row:any, column:SearchColumn, event:MouseEvent) {
		console.debug('SearchTableComponent.onRowClick: row=%o, column=%o', row, column);
	}

	onFilterChange(instant=false) {		// instant: If we don't want to do a debounce
		if(this.onFilterChangeTimer) clearTimeout(this.onFilterChangeTimer);
		this.onFilterChangeTimer = setTimeout(() => {
			if(!this.noRouting) {
				const queryParams = this.searchParamsToQueryParams(this.params);
				this.router.navigate([], {queryParams:queryParams});
			} else {
				this.doSearch();
			}
		}, instant ? 0 : 350);
	}

	columnRenderer(row:any, column:SearchColumn) {
		if(!column.renderer) return this.expandProp(row, column.field);
		if(typeof(column.renderer)==='string') {
			let rendererParts = column.renderer.split(':');
			let rendererType = rendererParts[0];
			if(rendererType==='date') return this.dateRenderer(row,column, rendererParts[1],rendererParts[2]);
			if(rendererType==='currency') return this.currencyRenderer(row,column);
			return `Error: ${column.renderer} undefined`;
		}
		return (column.renderer as SearchColumnRenderer)(row,column);
	}

	private dateRenderer(row:any, column:SearchColumn, format?:string, timezone?:string):string {
		if(!row[column.field]) return '';
		return this.datePipe.transform(row[column.field], format, timezone);
	}

	private currencyRenderer(row:any, column:SearchColumn, format?:string) {
		return this.currencyPipe.transform(row[column.field], format);
	}


	private onQueryParamsChange(queryParams) {
		// console.log('SearchTableComponent.onQueryParamsChange() queryParams=%o', queryParams);
		this.params.page = +queryParams.page || 1;
		this.params.size = +queryParams.size;
		if(Number.isNaN(this.params.size)) this.params.size = 10;
		Object.keys(queryParams).forEach(key => {
			let match = key.match(/^filter\.(.*)/);
			let value = queryParams[key];
			if(value==='null') value = null;
			if(match) this.params.filter[match[1]] = value;
		});

		// Set default filter params if this is the first time running
		if(!this.ready) {
			Object.keys(this.defaultFilter).map(key => {
				if(this.params.filter[key] || this.params.filter[key]===null) return;		// Skip if we already a value passed from queryParams
				this.params.filter[key] = this.defaultFilter[key];
			})
		}
		// console.log('SearchTableComponent.onQueryParamsChange() queryParams=%o, params=%o', queryParams, this.params);
		this.doSearch();
	}

	private searchParamsToQueryParams(params:SearchParams) {
		const urlParams = new URLSearchParams();
		for(let key in params) {
			if(key==='filter') continue;
			const value = params[key];
			if(key==='sort') {
				urlParams.set('sort', this.searchService.toSearchString(value));
				continue;
			}
			urlParams.set(key, value);
		}
		for(let key in params.filter) {
			let value = params.filter[key];
			urlParams.set(`filter.${key}`, value);
		}
		const queryParams:any = {};
		urlParams.forEach((value,key) => {
			queryParams[key] = value;
		});
		// console.log('SearchTableComponent.searchParamsToQueryParams: params=%o, queryParams=%o', params, queryParams);
		return queryParams;
	}

	private expandProp(obj:object, prop:string):any {						// Takes key='prop1.prop2.prop3' and returns obj[prop1][prop2][prop3]
		const props = prop.split('.');
		props.forEach(prop => {
			obj = obj ? obj[prop] : null;
		});
		return obj;
	}

	sortBy(column:SearchColumn) {
		if(!this.params.sort) this.params.sort = {prop:'_id', dir:1};
		if(this.params.sort.prop===column.field) this.params.sort.dir *= -1;
		else this.params.sort.dir = 1;
		this.params.sort.prop = column.field;
		this.onFilterChange();
	}

	sortIcon(column:SearchColumn) {
		// console.log('SearchTableComponent.sortIcon: sort=%o, column=%o', this.searchTable.params.sort, column);
		if(!this.params.sort) return '';
		if(this.params.sort.prop!==column.field) return '';
		return this.params.sort.dir===1 ? 'fas fa-arrow-up':'fas fa-arrow-down';
	}

}
