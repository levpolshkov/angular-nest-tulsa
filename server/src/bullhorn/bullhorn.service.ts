import { Injectable }		from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Bullhorn				from 'bullhorn-api';


@Injectable()
export class BullhornService {
	bullhorn:Bullhorn;

	constructor(private configService:ConfigService) {
		this.bullhorn = new Bullhorn({
			client_id: this.configService.get('BULLHORN_CLIENT_ID'),
			client_secret: this.configService.get('BULLHORN_CLIENT_SECRET'),
			username: this.configService.get('BULLHORN_USERNAME'),
			password: this.configService.get('BULLHORN_PASSWORD')
		});

		// this.bullhorn.login()
		// 	.then(data => {
		// 		const query = encodeURIComponent('dateAvailable:[20210901 TO 20211001]');
		// 		this.bullhorn.fetch(`search/Candidate?query=${query}&fields=name`)
		// 			.then(req => {
		// 				return req.json();
		// 			}).then((req) => {
		// 				console.log('candidates: %o', req);
		// 			});
		// });
	}

}
