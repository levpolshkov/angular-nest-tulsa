import { User } from '../user/user.interface';

export type ApplicationQuestionType = 'label' | 'text' | 'phone' | 'email' | 'currency' | 'date' | 'number' | 'radio' | 'textarea';
export type ApplicationPageType = 'question' | 'hero' | 'rejection';
export interface ApplicationQuestionOption {
	value: string | number | boolean,
	label: string,
	helperText?: string,
	nextPageName?: string			// Go to this page if option is selected
};

export interface ApplicationQuestion {
	order: number,
	type: ApplicationQuestionType,
	key: string,
	label: string,
	options?: ApplicationQuestionOption[]
};



export interface ApplicationPage {
	order: number,
	type: ApplicationPageType,
	name: string,			// Internal name for easy reference / branching logic

	title: string,
	questions: ApplicationQuestion[],

	heroImage?: string,
	heroHtml?: string,

	nextPageName?: string
};

export interface ApplicationSection {
	order: number,
	title: string,
	pages: ApplicationPage[]
};

export interface Application {
	_id?: any,

	name: string,

	sections: ApplicationSection[],

	createDate?: Date,
	updateDate?: Date,
	createUser?: User,
	updateUser?: User,

	deleted?: boolean,
	deleteDate?: Date,
	deleteUser?: User
};
