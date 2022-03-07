import { User } from '../user/user.interface';

export type ApplicationQuestionType = 'label' | 'text' | 'phone' | 'email' | 'currency' | 'date' | 'number' | 'radio' | 'textarea' | 'url';
export type ApplicationPageType = 'question' | 'hero' | 'single-question' | 'reject' | 'submit';
export interface ApplicationQuestionOption {
	order?: number;
	value: string | number | boolean;
	label: string;
	helperText?: string;
	nextPageName?: string; // Go to this page if option is selected
	nextPageId?: string;
}

export interface ApplicationQuestion {
	order: number;
	type: ApplicationQuestionType;
	key: string;
	bullhornKey?: string;
	label: string;
	options?: ApplicationQuestionOption[];
	optional?: boolean;
}

export interface ApplicationPage {
	_id?: any;
	order: number;
	type: ApplicationPageType;
	name: string; // Internal name for easy reference / branching logic

	title: string;
	subTitle?: string;
	questions: ApplicationQuestion[];

	heroImage?: string;
	heroHtml?: string;

	nextPageName?: string;
	nextPageId?: string;
}

export interface ApplicationSection {
	_id?: any;
	order: number;
	title: string;
	pages: ApplicationPage[];
}

export interface Application {
	_id?: any;

	name: string;

	sections: ApplicationSection[];

	createDate?: Date;
	updateDate?: Date;
	createUser?: User;
	updateUser?: User;

	deleted?: boolean;
	deleteDate?: Date;
	deleteUser?: User;
}
