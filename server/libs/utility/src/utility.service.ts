import { Injectable } from '@nestjs/common';

export function serialPromise(items:any[], func:Function):Promise<any[]> {
	let results=[], i=0;
	return items.reduce((promise,item) => {
		return promise.then(() => func(item,i++)).then(r => results.push(r));
	}, Promise.resolve()).then(() => results);
}


@Injectable()
export class UtilityService {
	serialPromise = serialPromise;
}
