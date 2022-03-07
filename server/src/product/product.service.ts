import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { DocumentService, mongoose } from '@app/database';
import { SearchParams, SearchResult, SearchService } from '@app/search';
import { User } from '../user/user.interface';
import { Product, ProductDocument } from './product.schema';
export { Product, ProductDocument };

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') public productModel: mongoose.Model<ProductDocument>, private documentService: DocumentService, private searchService: SearchService) {}

	searchProducts(queryParams: object): Promise<SearchResult<ProductDocument>> {
		return this.searchService.searchModelFromQueryParams<ProductDocument>(this.productModel, queryParams, {
			filterFunction: async (params: SearchParams) => {
				const query: any = { deleted: { $ne: true } };
				if (!params.filter) return query;
				if (params.filter.company) query.company = params.filter.company;
				if (params.filter.type) query.type = params.filter.type;
				if (params.filter.sku) query.sku = this.searchService.regexMatch(params.filter.sku);
				if (params.filter.name) query.name = this.searchService.regexMatch(params.filter.name);
				return query;
			},
			lean: true,
			populates: [{ path: 'company' }]
		});
	}

	getProductById(productId: string): Promise<ProductDocument> {
		return this.productModel.findById(productId).populate('company').exec();
	}

	saveProduct(product: Product, savingUser: User) {
		if (!product._id) {
			// We're creating a new product
			if (!product.sku) throw new BadRequestException({ message: 'Product must a SKU.' });
		}
		if (savingUser) {
			if (!product._id) {
				product.createUser = savingUser;
				product.createDate = new Date();
			} else {
				product.updateUser = savingUser;
				product.updateDate = new Date();
			}
		}
		return this.documentService.saveDocument<ProductDocument>(this.productModel, product);
	}

	async deleteProductById(productId: string, deletingUser: User) {
		const product = await this.getProductById(productId);
		if (!product) throw new HttpException({ message: 'Product not found.', productId }, 404);

		product.deleted = true;
		product.deleteUser = deletingUser;
		product.deleteDate = new Date();
		return product.save();
	}
}
