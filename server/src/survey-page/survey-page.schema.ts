import * as mongoose from 'mongoose';
import { SurveyPage } from './survey-page.interface';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const surveyPageSchema = new mongoose.Schema({
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


export interface SurveyPageDocument extends mongoose.Document, SurveyPage {};

export { SurveyPage };
