import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product, SearchParams, SearchResult } from 'src/app/models';
import { HttpService } from 'src/app/shared/http.service';
import { SearchService } from 'src/app/shared/search/search.service';
import { ProductSearchModalComponent } from './product-search-modal/product-search-modal.component';
export { Product };

export const productTypes = [
	{id:'kit',			name:'Kit',			class:''},
	{id:'sample',		name:'Sample',		class:''},
	{id:'report',		name:'Report',		class:''}
];

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	productTypes = productTypes;

	constructor(private http:HttpService, private searchService:SearchService, private modalService:NgbModal) {}


	searchProducts(params:SearchParams):Promise<SearchResult<Product>> {
		return this.searchService.search<Product>('/product', params);
	}

	getProductById(productId:string):Promise<Product> {
		return this.http.get(`/product/${productId}`);
	}

	saveProduct(product:Product) {
		return this.http.post('/product', product);
	}

	deleteProductById(productId:string) {
		return this.http.delete(`/product/${productId}`);
	}

	productTypeRenderer(id:string) {
		const status = this.productTypes.find(s => s.id===id);
		if(!status) return `${id}`;
		return `<span class="${status.class}">${status.name}</span>`;
	}
	productTypeName(id:string) {
		const status = this.productTypes.find(s => s.id===id);
		if(!status) return `${id}`;
		return status.name;
	}
	productTypeClass(id:string) {
		const status = this.productTypes.find(s => s.id===id);
		if(!status) return `${id}`;
		return status.class;
	}

	openProductSearchModal(defaultParams:any={}):Promise<Product> {
		let sub = null;
		return new Promise((resolve,reject) => {
			const modalRef = this.modalService.open(ProductSearchModalComponent, {size:'lg'});
			modalRef.componentInstance.defaultParams = defaultParams;
			sub = modalRef.closed.subscribe(reason => {
				sub.unsubscribe();
				resolve(reason);
			});
		});
	}
}
