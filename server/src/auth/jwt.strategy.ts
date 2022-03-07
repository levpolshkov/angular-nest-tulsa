import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService, private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET')
		});
	}

	async validate(payload: any) {
		// console.log('JwtStrategy.validate: %o', payload);
		const user = await this.userService.getUserById(payload.userId);
		return user;
	}
}
