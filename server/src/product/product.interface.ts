import { User } from '../user/user.interface';

export type ProductType = 'kit' | 'sample' | 'report';
export interface Product {
	_id?: any;

	sku: string;
	type: ProductType;
	name: string;

	createDate?: Date;
	updateDate?: Date;
	createUser?: User;
	updateUser?: User;

	deleted?: boolean;
	deleteDate?: Date;
	deleteUser?: User;
}
