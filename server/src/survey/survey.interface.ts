import { User } from '../user/user.interface';


export interface SurveyQuestion {
	order: number,
	type: string,
	label: string
};

export interface SurveyPage {
	order: number,
	title: string,
	questions: SurveyQuestion[]
};

export interface SurveySection {
	order: number,
	title: string,
	pages: SurveyPage[]
};

export interface Survey {
	_id?: any,

	name: string,

	sections: SurveySection[],

	createDate?: Date,
	updateDate?: Date,
	createUser?: User,
	updateUser?: User,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
