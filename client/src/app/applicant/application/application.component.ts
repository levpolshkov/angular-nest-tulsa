import { Component, OnInit }					from '@angular/core';
import { ActivatedRoute, Router }				from '@angular/router';
import { ApplicationPage, ApplicationQuestion, ApplicationQuestionOption, ApplicationSection } from '@server/application/application.interface';
import { Application, ApplicationService }		from './application.service';
import { DateTime }								from 'luxon';
import { GoogleMapsService } from 'src/app/shared/google-maps.service';
import { ApplicationResponse } from '@server/application-response/application-response.interface';
import { ApplicationResponseService } from './application-response.service';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
	application:Application;
	section:ApplicationSection;
	page:ApplicationPage;

	pageIndex:number = 0;
	sectionIndex:number = 0;

	answers:any = {};
	response:ApplicationResponse;

	// prevPageName:string = null;		// For back button

	constructor(public applicationService:ApplicationService, private responseService:ApplicationResponseService, private route:ActivatedRoute, private router:Router, private googleMapsService:GoogleMapsService) { }

	async ngOnInit() {
		this.application = await this.applicationService.searchApplications({filter:{}}).then(r => r.records[0]);
		await this.loadResponse();

		const sectionIndex = +this.route.snapshot.queryParams['section'] || 0;
		const pageIndex = +this.route.snapshot.queryParams['page'] || 0;

		this.loadPage(sectionIndex,pageIndex);
	}

	async loadResponse() {
		this.response = await this.responseService.loadResponseLocal();
		if(!this.response) {
			this.response = {
				application: this.application,
				questionAnswers: []
			};
		}
		this.response.questionAnswers.forEach(qa => {
			this.answers[qa.questionKey] = qa.answer;
		});
		console.log('ApplicationComponent.loadResponse: response=%o', this.response);
	}
	async saveResponse() {
		this.response.questionAnswers = Object.keys(this.answers).map(questionKey => {
			return {
				questionKey,
				answer: this.answers[questionKey]
			};
		});
		console.log('ApplicationComponent.saveResponse: response=%o', this.response);
		await this.responseService.saveResponseLocal(this.response);
	}


	async loadPage(sectionIndex:number, pageIndex:number) {
		this.sectionIndex = sectionIndex;
		this.pageIndex = pageIndex;
		this.section = this.application.sections[sectionIndex];

		this.page = this.section.pages[pageIndex];

		if(!this.page.questions) this.page.questions = [];
		this.page.questions.forEach((question,i) => {
			if(!question.key) question.key = `question_${this.sectionIndex}_${this.pageIndex}_${i}`;
		});

		if(this.page.type==='submit') await this.submitResponse();

		this.router.navigate([], {queryParams:{section:this.sectionIndex,page:this.pageIndex}, replaceUrl:true});
	}

	get lastPageIndex() {
		if(!this.section || !this.section.pages?.length) return 0;
		return this.section.pages.length-1;
	}
	get lastSectionIndex() {
		if(!this.application || !this.application.sections?.length) return 0;
		return this.application.sections.length-1;
	}

	async onNextBtn() {
		console.log('onNextBtn: answers=%o', this.answers);

		let nextPageIndex = this.pageIndex+1;
		if(this.page.nextPageName) {
			nextPageIndex = this.findPageIndexByName(this.page.nextPageName);
			console.log('onNextBtn: nextPageName=%o, nextPageIndex=%o', this.page.nextPageName, nextPageIndex);
			if(nextPageIndex===-1) nextPageIndex = this.pageIndex+1;
		}

		if(this.page.name==='14.5a') {
			switch(this.answers['employmentType']) {
				case 'Full Time Employee':
					this.page.nextPageName='15FE.1';	break;
				case 'Business Owner':
					this.page.nextPageName='15BO.1';	break;
				case 'Independent Contractor':
					this.page.nextPageName='15IC.1';	break;
				default:
					this.page.nextPageName='16a';	break;
			}
		}

		await this.saveResponse();

		console.log('onNextBtn: nextPageIndex=%o', nextPageIndex);

		if(nextPageIndex>this.lastPageIndex) {
			if(this.sectionIndex<this.lastSectionIndex) this.loadPage(this.sectionIndex+1, 0);
		} else {
			this.loadPage(this.sectionIndex,nextPageIndex);
		}
	}
	onPrevBtn() {
		console.log('onPrevBtn: sectionIndex=%o, pageIndex=%o', this.sectionIndex, this.pageIndex);
		if(this.pageIndex===0) {
			if(this.sectionIndex===0) return;		// Already at the start
			const lastPage = this.application.sections[this.sectionIndex-1].pages.length-1;
			this.loadPage(this.sectionIndex-1, lastPage);
		} else {
			this.loadPage(this.sectionIndex,this.pageIndex-1);
		}
	}

	findPageIndexByName(pageName:string) {
		return this.application.sections.find(s => s.pages.find(p => p.name===pageName))?.pages.findIndex(p => p.name===pageName);
	}

	isActiveSection(section) {
		return section===this.section;
	}

	selectQuestionOption(question:ApplicationQuestion, option:ApplicationQuestionOption) {
		this.answers[question.key] = option.value || option.label;
		if(option.nextPageName) this.page.nextPageName = option.nextPageName;
	}
	isQuestionOptionSelected(question:ApplicationQuestion, option:ApplicationQuestionOption) {
		return this.answers[question.key]===(option.value || option.label);
	}

	async onQuestionAnswer(question:ApplicationQuestion) {
		const value = this.answers[question.key];
		if(question.key==='birthDate') {		// Check and reject if they are under 18
			const duration = DateTime.fromISO(value).diffNow('years');
			const age = -duration.years;
			// console.log('dateOfBirth=%o, age=%o', value, age);
			if(age<18) this.page.nextPageName = '6a.1';
		}

		if(question.key==='zipcode') {		// Check and reject if they are inside of Oklahoma
			const info = await this.googleMapsService.lookupZipcode(value);
			if(!info) {
				//  TODO: Handle if they enter something invalid
			} else {
				console.log('lookupZipcode: %o', info);
				if(info.state==='OK') {
					this.page.nextPageName = '8a.1';
				} else {
					this.page.nextPageName = '9a';
				}
			}
		}
	}

	async submitResponse() {
		this.response = await this.responseService.submitResponse(this.response);
		console.log('submitResponse: response=%o', this.response);
		this.saveResponse();
	}
}
