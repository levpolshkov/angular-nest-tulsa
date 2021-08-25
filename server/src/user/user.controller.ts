import { Controller, Get, Post, Body, Param, Request, Patch, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService:UserService, private authService:AuthService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	searchUsers(@Request() req) {
		return this.userService.searchUsers(req.query);
	}

	@Get('/dashboard')
	async getDashboardUserData() {
		return await this.userService.getDashboardUserData();
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	getUserById(@Param('id') id:string) {
		return this.userService.getUserById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	saveUser(@Body() body) {
		return this.userService.saveUser(body);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	deleteUserById(@Param('id') id:string, @Request() req) {
		return this.userService.deleteUserById(id, req.user);
	}

	@Get('/resetCode/:resetCode')
	async getUserByResetCode(@Param('resetCode') resetCode:string) {
		let user = await this.userService.getUserByResetCode(resetCode);
		return this.authService.login(user);
	}

	@Post('/reset')
	async resetPasswordStart(@Body() body) {
		await this.userService.resetPasswordStart(body.username);
		return true;
	}
}
