import { Application } from '../application/application.interface';
import { User } from '../user/user.interface';

export interface ApplicationResponseQuestionAnswer {
	questionKey: string,
	answer: any
};


export interface ApplicationResponse {
	_id?: any,

	application: Application,
	questionAnswers: ApplicationResponseQuestionAnswer[],

	createDate?: Date,
	updateDate?: Date,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
