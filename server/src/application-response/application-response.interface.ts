import { Application } from '../application/application.interface';
import { User } from '../user/user.interface';

export interface ApplicationResponseQuestionAnswer {
	questionKey: string,
	answer: any
};

export type ApplicationResponseStatus = 'rejected' | 'submitted' | 'pending';

export interface ApplicationResponse {
	_id?: any,

	status: ApplicationResponseStatus,

	application: Application,
	questionAnswers: ApplicationResponseQuestionAnswer[],

	createDate?: Date,
	updateDate?: Date,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
