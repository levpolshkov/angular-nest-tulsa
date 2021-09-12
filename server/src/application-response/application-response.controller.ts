import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApplicationResponseService } from './application-response.service';

@Controller('response')
export class ApplicationResponseController {
	constructor(private readonly responseService:ApplicationResponseService) {}

	// @UseGuards(JwtAuthGuard)
	@Post()
	saveApplication(@Body() body, @Request() req) {
		return this.responseService.saveResponse(body);
	}
}
