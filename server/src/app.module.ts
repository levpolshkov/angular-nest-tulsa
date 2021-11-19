

import { Module }				from '@nestjs/common';
import { ConfigModule }			from '@nestjs/config';
import { ScheduleModule }		from '@nestjs/schedule';
import { DatabaseModule }		from '@app/database';
import { SearchModule }			from '@app/search';
import { UtilityModule }		from '@app/utility';
import { AppController }		from './app.controller';
import { AppService }			from './app.service';
import { AuthModule }			from './auth/auth.module';
import { UserModule }			from './user/user.module';
import { ProductModule }		from './product';
import { ApplicationModule } from './application/application.module';
import { BullhornModule } from './bullhorn/bullhorn.module';
import { ApplicationResponseModule } from './application-response/application-response.module';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal:true}),
		ScheduleModule.forRoot(),
		DatabaseModule,
		UtilityModule,
		SearchModule,
		AuthModule,
		UserModule,
		ProductModule,
		ApplicationModule,
		BullhornModule,
		ApplicationResponseModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
