import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { LoggerService } from './logger.service';
import { FileService } from './file.service';
import { PostmarkService } from './postmark.service';

@Module({
	providers: [UtilityService, LoggerService, FileService, PostmarkService],
	exports: [UtilityService, LoggerService, FileService, PostmarkService]
})
export class UtilityModule {}
