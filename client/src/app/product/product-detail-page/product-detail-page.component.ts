import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models';
import { AlertService } from 'src/app/site/alert.service';
import { ConfirmService } from 'src/app/site/confirm.service';
import { ProductService } from '../product.service';

@Component({
	selector: 'app-product-detail-page',
	templateUrl: './product-detail-page.component.html',
	styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
	product:Product;
	readonly = false;

	constructor(public productService:ProductService, private route:ActivatedRoute, private router:Router, private alertService:AlertService, private confirmService:ConfirmService) { }


	async ngOnInit() {
		const productId = this.route.snapshot.params.productId;
		console.log('ProductDetailPageComponent: productId=%o', productId);

		if(productId==='new') {
			this.product = <Product>{};
		} else {
			this.product = await this.productService.getProductById(productId);
		}
	}

	get isNew() {
		return !this.product?._id;
	}

	async onSaveBtn() {
		this.product = await this.productService.saveProduct(this.product);
		this.alertService.info('Product saved.');
		this.router.navigate(['/product/search']);
	}

	async onDeleteBtn() {
		this.confirmService.confirm({
			text: 'Are you sure you want to delete this product?'
		}).then(async answer => {
			if(!answer) return;
			await this.productService.deleteProductById(this.product._id);
			this.alertService.warning('Product deleted.');
			this.router.navigate(['/product/search']);
		});
	}


}
