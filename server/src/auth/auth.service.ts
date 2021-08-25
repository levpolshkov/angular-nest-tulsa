import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.interface';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
	constructor(
		private userService:UserService,
		private jwtService:JwtService,
		private configService:ConfigService
	) {}

	async validateUser(username:string, password:string):Promise<User> {
		username = String(username).trim().toLocaleLowerCase();
		const user = await this.userService.validateUser(username, this.hashPassword(password));
		if(!user) return null;
		return user;
	}

	hashPassword(password:string):string {
		return this.hashString(password, this.configService.get('PASSWORD_SALT'));
	}

	login(user:User) {
		const payload = {
			userId: user._id
		};
		return {
			jwt: this.jwtService.sign(payload),
			user: user
		};
	}


	private hashString(str:string, salt:string='', rounds=16):string {
		for(let i=0;i<rounds;i++) str = this.sha256(str+salt);
		return str;
	}

	private sha256(str:string, digest='hex'):string {
		return crypto.createHash('sha256').update(str).digest(<any>digest);
	}
}
