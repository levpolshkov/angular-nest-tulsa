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
	lastPage?: string,
	ipAddress?: string,

	application: Application,
	questionAnswers: ApplicationResponseQuestionAnswer[],

	bullhornCandidateId?: number,

	bummerEmail?: string,		// If the user bummered out and left an email

	createDate?: Date,
	updateDate?: Date,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
