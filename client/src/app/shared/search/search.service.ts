import { Injectable } from '@angular/core';
import { SearchParams,SearchResult,SearchSort } from '../../models';
import { HttpService } from 'src/app/shared/http.service';

export function regexMatch(value:string):RegExp {
	return new RegExp(escapeRegex(value), 'gi');
}
function escapeRegex(str:string):string {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	constructor(private httpService:HttpService) { }

	search<T>(url:string, params:SearchParams):Promise<SearchResult<T>> {
		const qs = this.searchParamsToString(params);
		return this.httpService.get(`${url}?${qs}`);
	}

	searchParamsToString(params:SearchParams) {
		const urlParams = new URLSearchParams();
		for(let key in params) {
			if(key==='filter') continue;
			if(key==='sort') {
				urlParams.set('sort', this.toSearchString(params[key]));
				continue;
			}
			let value = params[key];
			urlParams.set(key, value);
		}
		for(let key in params.filter) {
			let value = params.filter[key];
			urlParams.set(`filter.${key}`, value);
		}
		return urlParams.toString();
	}

	toSearchString(sort:SearchSort):string {
		return (sort.dir===-1 ? '-':'') + sort.prop;
	}
	fromSortString(str:string):SearchSort {
		const sort = {dir:1, prop:''};
		if(str[0]==='-') {
			sort.dir = -1;
			str.slice(1);
		}
		sort.prop = str;
		return sort;
	}

	objectIdCompare(a:any, b:any) {
		if(!a && !b) return true;
		return a && b && a._id===b._id;
	}
}
