import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	searchProducts(@Request() req) {
		return this.productService.searchProducts(req.query);
	}

	@Get('/:id')
	getProductById(@Param('id') productId: string) {
		return this.productService.getProductById(productId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveProduct(@Body() body, @Request() req) {
		return this.productService.saveProduct(body, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	deleteProductById(@Param('id') productId: string, @Request() req) {
		return this.productService.deleteProductById(productId, req.user);
	}
}
