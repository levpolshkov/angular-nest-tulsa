import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models';
import { SearchTableComponent } from 'src/app/shared/search/search-table/search-table.component';
import { ProductService } from '../product.service';

@Component({
	selector: 'app-product-search-modal',
	templateUrl: './product-search-modal.component.html',
	styleUrls: ['./product-search-modal.component.scss']
})
export class ProductSearchModalComponent implements OnInit {
	@ViewChild('searchTable', {static:true}) searchTable:SearchTableComponent;

	constructor(public productService:ProductService, private modalRef:NgbActiveModal) { }

	ngOnInit() {
		this.searchTable.searchUrl = '/product';
		this.searchTable.columns = [
			{field:'company.name',		header:'Company'},
			{field:'sku',				header:'Product SKU'},
			{field:'name',				header:'Product Name'},
			{field:'type',				header:'Product Type',		hide:'sm',		renderer: product => this.productService.productTypeRenderer(product.type)},
		];
		this.searchTable.onRowClick = p => this.onRowClick(p);
		this.searchTable.noRouting = true;			// Disable SearchTable from changing the url
		this.searchTable.defaultFilter = {type:null};
	}

	onRowClick(product:Product) {
		this.modalRef.close(product);
	}
	onCancelBtn() {
		this.modalRef.close(null);
	}
}
