import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models';
import { SearchTableComponent } from 'src/app/shared/search/search-table/search-table.component';
import { ProductService } from '../product.service';

@Component({
	selector: 'app-product-search-page',
	templateUrl: './product-search-page.component.html',
	styleUrls: ['./product-search-page.component.scss']
})
export class ProductSearchPageComponent implements OnInit {
	@ViewChild('searchTable', {static:true}) searchTable:SearchTableComponent;

	constructor(private router:Router, public productService:ProductService) { }

	ngOnInit() {
		this.searchTable.searchUrl = '/product';
		this.searchTable.columns = [
			{field:'sku',				header:'Product SKU'},
			{field:'name',				header:'Product Name'},
			{field:'type',				header:'Product Type',		hide:'sm',		renderer: product => this.productService.productTypeRenderer(product.type)},
		];
		this.searchTable.onRowClick = p => this.onRowClick(p);
		this.searchTable.defaultFilter = {type:null};
		this.searchTable.addNewUrl = '/product/new';
	}

	onRowClick(product:Product) {
		this.router.navigate(['/product', product._id]);
	}
}
