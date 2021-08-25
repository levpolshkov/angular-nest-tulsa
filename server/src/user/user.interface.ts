export type UserType = 'admin' | 'user';

export interface User {
	_id?: any,

	active?: boolean,
	locked?: boolean,				// If too many failed login attempts
	type: UserType,
	
	company?: string, 

	firstName: string,
	lastName: string,
	fullName?: string,
	email?: string,
	phone?: string,

	password?: string,
	resetCode?: string,
	attempts?: number,				// Failed attempts
	passwordDate?: Date,			// Date of last password change

	createDate?: Date,
	updateDate?: Date,
	createUser?: User,
	updateUser?: User,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
