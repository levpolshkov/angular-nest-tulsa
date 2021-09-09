
import { ApplicationModule } from './application/application.module';
import { BullhornModule } from './bullhorn/bullhorn.module';
import { ApplicationResponseModule } from './application-response/application-response.module';
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
		ApplicationModule,
		BullhornModule,
		ApplicationResponseModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
