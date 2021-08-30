import { Module }				from '@nestjs/common';
import { MongooseModule }		from '@nestjs/mongoose';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { ApplicationService }		from './application.service';
import { ApplicationController }	from './application.controller';
import { applicationSchema } 		from './application.schema';


@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{name:'Application', schema:applicationSchema}
		]),
		SearchModule
	],
	controllers: [ApplicationController],
	providers: [ApplicationService],
	exports: [ApplicationService]
})
export class ApplicationModule {}
