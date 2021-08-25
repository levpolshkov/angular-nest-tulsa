import { Module }				from '@nestjs/common';
import { MongooseModule }		from '@nestjs/mongoose';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { ProductService }		from './product.service';
import { ProductController }	from './product.controller';
import { productSchema } 		from './product.schema';


@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{name:'Product', schema:productSchema}
		]),
		SearchModule
	],
	controllers: [ProductController],
	providers: [ProductService],
	exports: [ProductService]
})
export class ProductModule {}
