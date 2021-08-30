import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationPageService } from './application-page.service';

@Controller('applicationPage')
export class ApplicationPageController {
	constructor(private readonly applicationPageService:ApplicationPageService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	searchApplicationPages(@Request() req) {
		return this.applicationPageService.searchApplicationPages(req.query);
	}

	@Get('/:id')
	getApplicationPageById(@Param('id') applicationPageId:string) {
		return this.applicationPageService.getApplicationPageById(applicationPageId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveApplicationPage(@Body() body, @Request() req) {
		return this.applicationPageService.saveApplicationPage(body, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	deleteApplicationPageById(@Param('id') applicationPageId:string, @Request() req) {
		return this.applicationPageService.deleteApplicationPageById(applicationPageId, req.user);
	}
}
