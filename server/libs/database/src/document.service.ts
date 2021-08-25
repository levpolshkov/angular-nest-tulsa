import { Injectable }				from '@nestjs/common';
import { Model, Document, Types }	from 'mongoose';

export interface BeforeSaveCallback {
	(newObj:object, oldDoc:Document):Promise<void>
};
export interface AfterSaveCallback {
	(newDoc:Document, oldDoc:Document):Promise<void>
};

export interface SaveDocumentOptions {
	beforeSave?: BeforeSaveCallback,
	afterSave?: AfterSaveCallback,
	query?: object					// Query used to be find the document
};

@Injectable()
export class DocumentService {
	async saveDocument<T extends Document>(model:Model<T>, doc:any, options:SaveDocumentOptions={}):Promise<T> {
		if(doc.toObject) doc = doc.toObject();
	
		if(!options.query) options.query = {_id:doc._id || Types.ObjectId()};

		// console.log('saveDocument query=%j, doc=%j', options.query, doc);
	
		const oldDoc = await model.findOne(options.query).exec();
		if(options.beforeSave) await options.beforeSave(doc,oldDoc);
		if(!oldDoc) doc.createDate = new Date();
		else doc.updateDate = new Date();
		// console.log('saveDocument: doc=%j', doc);
		return model.findOneAndUpdate(options.query, doc, {new:true, upsert:true}).exec().then(async newDoc => {
			if(options.afterSave) await options.afterSave(newDoc,oldDoc);
			// saveChanges(model, newDoc,oldDoc);
			return newDoc;
		});
	}

	isObjectId(id:any):boolean {
		if(id instanceof Types.ObjectId) return true;
		if(!Types.ObjectId.isValid(id)) return false;
		const objectId = new Types.ObjectId(id);
		return String(objectId)===id;
	}
}
