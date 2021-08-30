import * as mongoose from 'mongoose';
import { ApplicationPage } from './application-page.interface';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const applicationPageSchema = new mongoose.Schema({
	name: String,

	__v: {type:Number, select:false},

	createDate: Date,
	updateDate: Date,
	createUser: {type:ObjectId, ref:'User'},
	updateUser: {type:ObjectId, ref:'User'},

	deleted: Boolean,
	deleteDate: Date,
	deleteUser: {type:ObjectId, ref:'User'}
});


export interface ApplicationPageDocument extends mongoose.Document, ApplicationPage {};

export { ApplicationPage };
