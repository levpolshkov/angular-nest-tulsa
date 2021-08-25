import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(err, user, info) {
		// console.log('JwtAuthGuard: err=%o, user=%o, info=%o', err,user,info);
		if(err || !user) {
			throw err || new UnauthorizedException({message:'Unauthorized.', type:'access'});
		}
		return user;
	}
}
