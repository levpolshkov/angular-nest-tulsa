import * as mongoose from 'mongoose';
import { Application } from './application.interface';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const applicationSchema = new mongoose.Schema({
	name: String,

	sections: [{
		order: Number,
		title: String,
		pages: [{
			type: {type:String},
			order: Number,
			name: String,
			title: String,
			questions: [{
				order: Number,
				type: {type: String},
				label: String,
				options: [{
					value: mongoose.Schema.Types.Mixed,
					label: String,
					helperText: String,
					nextPageName: String
				}]
			}],
			heroImage: String,
			heroHtml: String,
			nextPageName: String
		}]
	}],

	__v: {type: Number, select: false},

	createDate: Date,
	updateDate: Date,
	createUser: {type: ObjectId, ref: 'User'},
	updateUser: {type: ObjectId, ref: 'User'},

	deleted: Boolean,
	deleteDate: Date,
	deleteUser: {type: ObjectId, ref: 'User'}
}, {
	minimize: false
});


export interface ApplicationDocument extends mongoose.Document, Application { };

export { Application };
