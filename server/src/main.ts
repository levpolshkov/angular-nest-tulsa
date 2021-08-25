import { NestFactory }						from '@nestjs/core';
import { json }								from 'body-parser';
import { AppModule }						from './app.module';
import { ConfigModule, ConfigService }		from '@nestjs/config';
import { LoggerService }					from '@app/utility';

const logger = new LoggerService('Main');

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger
	});
	app.use(json({limit:'16MB'}));
	app.enableCors();
	app.setGlobalPrefix('/api');

	const configService = app.get(ConfigService);
	const port = +configService.get('PORT') || 5000;
	await app.listen(port);
	logger.log('Listening on port %o', port);
}
bootstrap();
