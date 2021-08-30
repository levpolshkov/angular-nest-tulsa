import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
	constructor(private readonly applicationService:ApplicationService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	searchApplications(@Request() req) {
		return this.applicationService.searchApplications(req.query);
	}

	@Get('/:id')
	getApplicationById(@Param('id') applicationId:string) {
		return this.applicationService.getApplicationById(applicationId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveApplication(@Body() body, @Request() req) {
		return this.applicationService.saveApplication(body, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	deleteApplicationById(@Param('id') applicationId:string, @Request() req) {
		return this.applicationService.deleteApplicationById(applicationId, req.user);
	}
}
