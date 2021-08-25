import { ConsoleLogger, Injectable }	from '@nestjs/common';
import * as util						from 'util';

@Injectable()
export class LoggerService extends ConsoleLogger {
	testLogger() {
		this.debug('This is a debug message with a boolean=%o', false);
		this.log('This is a normal log message.  value=%d currently.', 5);
		this.warn('This is a warning with a %s.', 'dynamic string');
		this.error('This is an error with an object: %o', {part:'here', count:15, success:false});
	}

	debug(format:string, ...params:any[]) {
		const message = this.formatMessage(format,...params);
		super.debug(message);
	}

	log(format:string, ...params:any[]) {
		const message = this.formatMessage(format,...params);
		super.log(message);
	}

	warn(format:string, ...params:any[]) {
		const message = this.formatMessage(format,...params);
		super.warn(message);
	}

	error(format:string, ...params:any[]) {
		const message = this.formatMessage(format,...params);
		super.error(message);
	}

	private formatMessage(format:string, ...params:any[]) {
		return util.formatWithOptions({colors:true}, format, ...params);
	}
}
