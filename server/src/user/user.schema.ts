import * as mongoose from 'mongoose';
import { User } from './user.interface';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const userSchema = new mongoose.Schema({
	active: Boolean,
	locked: Boolean,
	type: {type:String},

	company: String,

	firstName: String,
	lastName: String,
	fullName: String,
	email: {type:String, index:true, unique:true, sparse:true},
	phone: {type:String, index:true, unique:true, sparse:true},

	password: {type:String, select:false},
	resetCode: {type:String, select:false},
	attempts: {type:Number, default:0, select:false},
	passwordDate: {type:Date, select:false},

	__v: {type:Number, select:false},

	createDate: Date,
	updateDate: Date,
	createUser: {type:ObjectId, ref:'User'},
	updateUser: {type:ObjectId, ref:'User'},

	deleted: Boolean,
	deleteDate: Date,
	deleteUser: {type:ObjectId, ref:'User'}
});

// userSchema.path('email', {type:String, index:true, unique:true});		// Manually add user index to DB


export interface UserDocument extends User, mongoose.Document {};

export { User };
