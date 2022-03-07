import * as mongoose from 'mongoose';
import { applicationSchema } from 'src/application';
import { ApplicationResponse } from './application-response.interface';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const applicationResponseSchema = new mongoose.Schema(
	{
		name: String,
		utmCodes: Object,
		status: String,
		lastPage: String,
		ipAddress: String,

		application: applicationSchema,
		questionAnswers: [
			{
				questionKey: String,
				answer: mongoose.Schema.Types.Mixed,
				answerLabel: String
			}
		],

		bullhornCandidateId: Number,
		bummerEmail: String,

		__v: { type: Number, select: false },

		createDate: Date,
		updateDate: Date,

		deleted: Boolean,
		deleteDate: Date,
		deleteUser: { type: ObjectId, ref: 'User' }
	},
	{
		collection: 'applicationResponses'
	}
);

export interface ApplicationResponseDocument extends mongoose.Document, ApplicationResponse {}

export { ApplicationResponse };
