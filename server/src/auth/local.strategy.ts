import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'username',
			passwordField: 'password'
		});
	}

	async validate(email: string, password: string): Promise<User> {
		const user = await this.authService.validateUser(email, password);
		if (!user) throw new UnauthorizedException({ message: 'Invalid email or password', type: 'login' });
		if (user.locked) throw new UnauthorizedException({ message: 'Account has been locked, please contact your clinic for more information.', type: 'login' });
		return user;
	}
}
