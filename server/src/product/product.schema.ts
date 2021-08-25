import * as mongoose from 'mongoose';
import { Product } from './product.interface';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const productSchema = new mongoose.Schema({
	sku: {type:String, index:true},
	type: {type:String, index:true},
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


export interface ProductDocument extends mongoose.Document, Product {};

export { Product };
