import { Module }				from '@nestjs/common';
import { MongooseModule }		from '@nestjs/mongoose';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { SurveyService }		from './survey.service';
import { SurveyController }	from './survey.controller';
import { surveySchema } 		from './survey.schema';


@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{name:'Survey', schema:surveySchema}
		]),
		SearchModule
	],
	controllers: [SurveyController],
	providers: [SurveyService],
	exports: [SurveyService]
})
export class SurveyModule {}
