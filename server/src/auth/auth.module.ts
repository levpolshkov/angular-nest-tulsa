import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		PassportModule,
		forwardRef(() => UserModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '1d' }
			})
		})
	],
	exports: [AuthService],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
