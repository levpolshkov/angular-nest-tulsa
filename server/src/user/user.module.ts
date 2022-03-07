import { DatabaseModule } from '@app/database';
import { SearchModule } from '@app/search';
import { UtilityModule } from '@app/utility';
import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { userSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: userSchema
			}
		]),
		UtilityModule,
		SearchModule,
		DatabaseModule,
		forwardRef(() => AuthModule)
	],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
