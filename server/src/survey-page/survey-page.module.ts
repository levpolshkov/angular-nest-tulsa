import { Module }				from '@nestjs/common';
import { MongooseModule }		from '@nestjs/mongoose';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { SurveyPageService }	from './survey-page.service';
import { SurveyPageController }	from './survey-page.controller';
import { surveyPageSchema }		from './survey-page.schema';


@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{name:'SurveyPage', schema:surveyPageSchema}
		]),
		SearchModule
	],
	controllers: [SurveyPageController],
	providers: [SurveyPageService],
	exports: [SurveyPageService]
})
export class SurveyPageModule {}
