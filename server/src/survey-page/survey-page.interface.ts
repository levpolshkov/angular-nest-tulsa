import { User } from '../user/user.interface';

export interface SurveyPage {
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
