import { Body, Controller, Get, Post, Request, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationResponseService } from './application-response.service';

@Controller('response')
export class ApplicationResponseController {
	constructor(private readonly responseService: ApplicationResponseService) {}

	// @UseGuards(JwtAuthGuard)
	@Post('/')
	saveApplication(@Body() body, @Request() req) {
		return this.responseService.saveResponse(body);
	}

	@Get('/')
	searchApplications(@Request() req) {
		return this.responseService.searchResponses(req.query);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:applicationId')
	getApplicationById(@Param('applicationId') applicationId: string) {
		return this.responseService.getResponseById(applicationId);
	}
}
