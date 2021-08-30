import { User } from '../user/user.interface';

export interface ApplicationPage {
	_id?: any,

	name: string,

	createDate?: Date,
	updateDate?: Date,
	createUser?: User,
	updateUser?: User,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
