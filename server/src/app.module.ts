
import { SurveyModule } from './survey/survey.module';
import { Module }				from '@nestjs/common';
import { ConfigModule }			from '@nestjs/config';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { UtilityModule }		from '@app/utility';
import { AppController }		from './app.controller';
import { AppService }			from './app.service';
import { AuthModule }			from './auth/auth.module';
import { UserModule }			from './user/user.module';
import { ProductModule }		from './product';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal:true}),
		DatabaseModule,
		UtilityModule,
		SearchModule,
		AuthModule,
		UserModule,
		ProductModule,
		SurveyModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
