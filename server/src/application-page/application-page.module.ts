import { Module }				from '@nestjs/common';
import { MongooseModule }		from '@nestjs/mongoose';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { ApplicationPageService }	from './application-page.service';
import { ApplicationPageController }	from './application-page.controller';
import { applicationPageSchema }		from './application-page.schema';


@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{name:'ApplicationPage', schema:applicationPageSchema}
		]),
		SearchModule
	],
	controllers: [ApplicationPageController],
	providers: [ApplicationPageService],
	exports: [ApplicationPageService]
})
export class ApplicationPageModule {}
