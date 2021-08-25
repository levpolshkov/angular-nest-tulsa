import { Module }							from '@nestjs/common';
import { ConfigModule, ConfigService }		from '@nestjs/config';
import { MongooseModule }					from '@nestjs/mongoose';
import { LoggerService }					from '@app/utility';
import { DatabaseService }					from './database.service';
import { DocumentService }					from './document.service';

const logger = new LoggerService('DatabaseModule');
@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService:ConfigService) => {
				logger.log('Trying to connect to %o', configService.get('DATABASE'));
				return {
					uri: configService.get('DATABASE'),
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false
				};
			}
		}),
	],
	providers: [DatabaseService, DocumentService],
	exports: [DatabaseService, DocumentService],
})
export class DatabaseModule {}
