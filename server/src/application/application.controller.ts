import { Body, Controller, Delete, Get, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
	constructor(private readonly applicationService:ApplicationService) {}

	// @UseGuards(JwtAuthGuard)
	@Get('/')
	searchApplications(@Request() req) {
		return this.applicationService.searchApplications(req.query);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:applicationId')
	getApplicationById(@Param('applicationId') applicationId:string) {
		return this.applicationService.getApplicationById(applicationId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveApplication(@Body() body, @Request() req) {
		return this.applicationService.saveApplication(body, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:applicationId')
	deleteApplicationById(@Param('applicationId') applicationId:string, @Request() req) {
		return this.applicationService.deleteApplicationById(applicationId, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:applicationId/page/:pageId')
	deleteApplicationPageById(@Param('applicationId') applicationId:string, @Param('pageId') pageId:string, @Request() req) {
		return this.applicationService.deleteApplicationPageById(applicationId, pageId, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:applicationId/section/:sectionId')
	deleteApplicationSectionyId(@Param('applicationId') applicationId:string, @Param('sectionId') sectionId:string, @Request() req) {
		return this.applicationService.deleteApplicationSectionById(applicationId, sectionId, req.user);
	}
}
