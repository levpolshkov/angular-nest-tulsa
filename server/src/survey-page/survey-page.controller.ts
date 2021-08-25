import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SurveyPageService } from './survey-page.service';

@Controller('surveyPage')
export class SurveyPageController {
	constructor(private readonly surveyPageService:SurveyPageService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	searchSurveyPages(@Request() req) {
		return this.surveyPageService.searchSurveyPages(req.query);
	}

	@Get('/:id')
	getSurveyPageById(@Param('id') surveyPageId:string) {
		return this.surveyPageService.getSurveyPageById(surveyPageId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveSurveyPage(@Body() body, @Request() req) {
		return this.surveyPageService.saveSurveyPage(body, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	deleteSurveyPageById(@Param('id') surveyPageId:string, @Request() req) {
		return this.surveyPageService.deleteSurveyPageById(surveyPageId, req.user);
	}
}
