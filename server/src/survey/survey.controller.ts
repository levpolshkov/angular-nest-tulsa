import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
	constructor(private readonly surveyService:SurveyService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	searchSurveys(@Request() req) {
		return this.surveyService.searchSurveys(req.query);
	}

	@Get('/:id')
	getSurveyById(@Param('id') surveyId:string) {
		return this.surveyService.getSurveyById(surveyId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveSurvey(@Body() body, @Request() req) {
		return this.surveyService.saveSurvey(body, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	deleteSurveyById(@Param('id') surveyId:string, @Request() req) {
		return this.surveyService.deleteSurveyById(surveyId, req.user);
	}
}
