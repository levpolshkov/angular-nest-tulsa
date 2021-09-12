import { Module } from '@nestjs/common';
import { ApplicationResponseService } from './application-response.service';
import { ApplicationResponseController } from './application-response.controller';
import { DatabaseModule } from '@app/database';
import { SearchModule } from '@app/search';
import { MongooseModule } from '@nestjs/mongoose';
import { applicationResponseSchema } from './application-response.schema';

@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{name:'ApplicationResponse', schema:applicationResponseSchema}
		]),
		SearchModule
	],
	controllers: [ApplicationResponseController],
	providers: [ApplicationResponseService],
	exports: [ApplicationResponseService]
})
export class ApplicationResponseModule {}
