import { ConflictException, forwardRef, HttpException, Inject, Injectable }	from '@nestjs/common';
import { InjectModel }									from '@nestjs/mongoose';
import { ConfigService }								from '@nestjs/config';
import { AuthService }									from 'src/auth/auth.service';
import { User, UserDocument }							from './user.schema';
import { SearchParams, SearchResult, SearchService }	from '@app/search';
import { LoggerService, PostmarkService }				from '@app/utility';
import { DocumentService, mongoose }					from '@app/database';

@Injectable()
export class UserService {
	private logger:LoggerService = new LoggerService('UserService');

	constructor(
		@Inject(forwardRef(() => AuthService)) private authService:AuthService,
		@InjectModel('User') public userModel:mongoose.Model<UserDocument>,
		private documentService:DocumentService,
		private searchService:SearchService,
		private configService:ConfigService,
		private postmarkService:PostmarkService) {
			this.seedUser();
		}

	searchUsers(queryParams:object):Promise<SearchResult<UserDocument>> {
		this.logger.log('searchUsers: queryParams=%o', queryParams)
		return this.searchService.searchModelFromQueryParams<UserDocument>(this.userModel, queryParams, {
			filterFunction: async (params:SearchParams) => {
				const query:any = {
					deleted: {$ne:true}
				};
				if(!params.filter) return query;
				if(params.filter.fullName) query.fullName = this.searchService.regexMatch(params.filter.fullName);
				if(params.filter.email) query.email = this.searchService.regexMatch(params.filter.email);
				if(params.filter.phone) query.email = this.searchService.regexMatch(params.filter.phone);
				if(params.filter.type) 	query.type = {$in:params.filter.type.split(',')};
				return query;
			},
			lean: true,
			populates: [
				// {path:'dm', select:'fullName'}
			]
		});
	}

	async getUserById(userId:string):Promise<UserDocument> {
		return this.userModel.findById(userId).exec();
	}

	async getUserByResetCode(resetCode:string):Promise<UserDocument> {
		return this.userModel.findOne({resetCode}).select('-password').exec();
	}

	async saveUser(user:User):Promise<UserDocument> {
		if(!user._id) {		// This is a new user
			user.active = true;
		}
		if(user.email) {
			user.email = String(user.email).toLowerCase().trim();
			if(await this.checkForDuplicateEmail(user)) throw new ConflictException({status:409, message:'Email address already in use.', type:'email', email:user.email});
		}
		if(user.phone) {
			user.phone = String(user.phone).replace(/\D/g, '');
			if(await this.checkForDuplicatePhone(user)) throw new ConflictException({status:409, message:'Phone number already in use.',  type:'phone', phone:user.phone});
		}
		if(user.password) {
			user.password = this.authService.hashPassword(user.password);
		}
		if(user.firstName) user.fullName = [user.firstName,user.lastName].map(p => p.trim()).join(' ');

		return this.documentService.saveDocument(this.userModel, user, {
			afterSave: (a:UserDocument,b:UserDocument) => this.afterUserSave(a,b)
		});
	}

	async afterUserSave(newUser:UserDocument, oldUser:UserDocument) {
		if(!oldUser) {
			this.sendWelcomeEmail(newUser.toObject());
		}
	}

	async deleteUserById(userId:string, deletingUser:User) {
		const user = await this.getUserById(userId);
		if(!user) throw new HttpException({message:'User not found.', userId}, 404);

		user.deleted = true;
		user.deleteUser = deletingUser;
		user.deleteDate = new Date();
		return user.save();
	}

	async checkForDuplicateEmail(user:User) {
		if(!user.email) return false;
		const dupUser = await this.userModel.findOne({email:user.email});
		if(dupUser && !dupUser._id.equals(user._id)) return true;
		return false;
	}

	async checkForDuplicatePhone(user:User) {
		if(!user.phone) return false;
		const dupUser = await this.userModel.findOne({phone:user.phone});
		if(dupUser && !dupUser._id.equals(user._id)) return true;
		return false;
	}


	async validateUser(username:string, password:string):Promise<User> {
		if(!username || !password) return null;
		let user = await this.userModel.findOne({email:username,password}).select('-password').lean().exec();
		return user;
	}

	async resetPasswordStart(username:string, sendToUser=true):Promise<string> {
		username = String(username).toLowerCase().trim();
		if(!username) throw new HttpException({message:'Username empty.  Please contact support.', email:username, type:'empty'}, 400);
		let user = await this.userModel.findOne({email:username}).exec();
		if(!user) throw new HttpException({message:'Username not found.  Please contact support.', email:username, type:'user'}, 400);
		if(!user.active) throw new HttpException({message:'User is disabled. Please contact support.', email:username, type:'disabled'}, 400);
		const resetCode = this.authService.hashPassword(username + Date.now() + Math.random());
		const link = `${this.configService.get('FRONTEND_URL')}/users/reset/${resetCode}`;

		console.log('resetPasswordStart: link=%o', link);
		user.resetCode = resetCode;
		await user.save();

		if(sendToUser) {
			if(!user.email) throw new HttpException({message:'User does not have an email address.'}, 400);
			await this.postmarkService.sendEmailTemplate({
				template:'reset-password', 
				to: username, 
				from: 'sergei@gitwit.com',
				subject:'Password Reset Request',
				data: {link:link, name:user.fullName}
			});
		}
		return link;
	}

	async resetPasswordVerify(resetCode:string) {
		if(!resetCode) return Promise.reject({message:'Invalid code', resetCode});
		const user = await this.userModel.findOne({resetCode});
		if(!user) return Promise.reject({message:'Invalid code', resetCode});
		delete user.resetCode;
		user.locked = false;
		return user.save();
	}


	async sendWelcomeEmail(user:User) {
		console.log('sendWelcomeEmail: user=%o', user);
		const resetLink = await this.resetPasswordStart(user.email, false);
		return this.postmarkService.sendEmailTemplate({
			template: 'welcome-admin',
			from: 'sergei@gitwit.com',
			data: {
				user,
				resetLink
			},
			to: user.email,
			subject: 'Welcome to Brand!'
		});
	}

	async seedUser() {
		const count = await this.userModel.countDocuments({})
		if(!count) {
			const user:User = {
				active: true,
				type: 'admin',
				firstName: 'Admin',
				lastName: 'User',
				email: this.configService.get('SEED_USER_EMAIL') || 'nitwit@gitwit.com',
				password: 'asdf'
			};
			this.logger.log('seedUser: Added admin user as %o/%o', user.email, user.password);
			return this.saveUser(user);
		}
	}

	async getDashboardUserData() {
		const userData = {
			userCount: null
		};
		userData.userCount = await this.userModel.countDocuments({});
		return userData;
	}
}
