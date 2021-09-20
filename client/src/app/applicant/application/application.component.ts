import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationPage, ApplicationQuestion, ApplicationQuestionOption, ApplicationSection } from '@server/application/application.interface';
import { Application, ApplicationService } from './application.service';
import { DateTime } from 'luxon';
import { GoogleMapsService } from 'src/app/shared/google-maps.service';
import { ApplicationResponse } from '@server/application-response/application-response.interface';
import { ApplicationResponseService } from './application-response.service';
import packageJson					from '../../../../package.json';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
	application: Application;
	section: ApplicationSection;
	page: ApplicationPage;
	version = `v${packageJson.version}`;

	pageIndex: number = 0;
	sectionIndex: number = 0;

	answers: any = {};
	response: ApplicationResponse;

    inputReady: Boolean;
    emptyFields: Boolean;
    landingPage: Boolean;

	// prevPageName:string = null;		// For back button

	constructor(public applicationService: ApplicationService, private responseService: ApplicationResponseService, private route: ActivatedRoute, private router: Router, private googleMapsService: GoogleMapsService) { }

	async ngOnInit() {
		this.application = await this.applicationService.searchApplications({ filter: {} }).then(r => r.records[0]);
		await this.loadResponse();

		const sectionIndex = +this.route.snapshot.queryParams['section'] || 0;
		const pageIndex = +this.route.snapshot.queryParams['page'] || 0;

		this.loadPage(sectionIndex, pageIndex);
	}

	async loadResponse() {
		this.response = await this.responseService.loadResponseLocal();
		if (!this.response) {
			this.response = {
				status: 'pending',
				application: this.application,
				questionAnswers: []
			};
		} else {
			this.application = this.response.application;		// To make sure we restore page.nextPageName for Back button functionality
		}
		this.response.questionAnswers.forEach(qa => {
			this.answers[qa.questionKey] = qa.answer;
		});
		// console.log('ApplicationComponent.loadResponse: response=%o', this.response);
	}
	async saveResponse() {
		this.response.questionAnswers = Object.keys(this.answers).map(questionKey => {
			return {
				questionKey,
				answer: this.answers[questionKey]
			};
		});
		this.response.application = this.application;
		// console.log('ApplicationComponent.saveResponse: response=%o', this.response);
		await this.responseService.saveResponseLocal(this.response);
	}


	async loadPage(sectionIndex: number, pageIndex: number) {
		this.sectionIndex = sectionIndex;
		this.pageIndex = pageIndex;
		this.section = this.application.sections[sectionIndex];

		this.page = this.section.pages[pageIndex];

		if (!this.page.questions) this.page.questions = [];
		this.page.questions.forEach((question, i) => {
			if (!question.key) question.key = `question_${this.sectionIndex}_${this.pageIndex}_${i}`;

			if (question.key in this.answers) {
				// console.log('hey, ' + question.key + ' already exists in the answers array! the answer is ' + this.answers[question.key]);
				this.getSelectedQuestionValue(question);
			}
		});

        this.inputReady = true;
        this.emptyFields = false;
		this.page.questions.filter(q => q.key==='zipcode' || q.key==='address').forEach(q => this.onQuestionAnswer(q));

		if (this.page.name === '14.5a') {
			console.log("employment type=%o", this.answers);
			switch (this.answers['employmentType']) {
				case 'Full Time Employee':
					this.page.nextPageName = '15FE.1'; break;
				case 'Business Owner':
					this.page.nextPageName = '15BO.1'; break;
				case 'Independent Contractor':
					this.page.nextPageName = '15IC.1'; break;
				default:
					this.page.nextPageName = '16a'; break;
			}
			console.log('Employment: At 14.5a: employmentType=%o, nextPageName=%o', this.answers['employmentType'], this.page.nextPageName);
		}

		if (this.page.type === 'submit') await this.submitResponse();
		if (this.page.type === 'reject') await this.rejectResponse();

		this.router.navigate([], { queryParams: { section: this.sectionIndex, page: this.pageIndex }, replaceUrl: true });
	}

	get lastPageIndex() {
		if (!this.section || !this.section.pages?.length) return 0;
		return this.section.pages.length - 1;
	}
	get lastSectionIndex() {
		if (!this.application || !this.application.sections?.length) return 0;
		return this.application.sections.length - 1;
	}

	async onNextBtn() {
		let nextPageIndex = this.pageIndex + 1;
		let nextSectionIndex = this.sectionIndex;

		if (this.page.nextPageName) {
			nextSectionIndex = this.findSectionIndexByPageName(this.page.nextPageName);
			if (nextSectionIndex === -1) nextSectionIndex = this.sectionIndex;
			nextPageIndex = this.findPageIndexByPageName(this.page.nextPageName);
			console.log('onNextBtn: nextPageName=%o, nextSectionIndex=%o, nextPageIndex=%o', this.page.nextPageName, nextSectionIndex, nextPageIndex);
			if (nextPageIndex === -1) nextPageIndex = this.pageIndex + 1;
		}

		if (this.page.name === '5a.1') {
			if (this.answers['primaryIncomeSourceFromCompany'] === "Yes") {
				this.answers['employmentType'] = "Full Time Employee";
			}
		}

		await this.saveResponse();

		console.log('onNextBtn: nextPageIndex=%o', nextPageIndex);

		if (nextPageIndex > this.lastPageIndex) {
			nextSectionIndex++;
			if (this.sectionIndex < this.lastSectionIndex) this.loadPage(nextSectionIndex, 0);
		} else {
			this.loadPage(nextSectionIndex, nextPageIndex);
		}
	}
	onPrevBtn() {
		const currentPageName = this.page.name;
		if (!currentPageName) return;

		const allPages = this.application.sections.map(s => s.pages).reduce((a, b) => a.concat(b), []);
		const prevPage = allPages.find(p => p.nextPageName === currentPageName);
		const prevPageName = prevPage?.name;

		console.log('onPrevBtn: sectionIndex=%o, pageIndex=%o, currentPageName=%o, prevPageName=%o', this.sectionIndex, this.pageIndex, currentPageName, prevPageName);

		if (prevPageName) {
			const sectionIndex = this.findSectionIndexByPageName(prevPageName);
			const pageIndex = this.findPageIndexByPageName(prevPageName);
			this.loadPage(sectionIndex, pageIndex);
		}
		// if (this.pageIndex === 0) {
		// 	if (this.sectionIndex === 0) return;		// Already at the start
		// 	const lastPage = this.application.sections[this.sectionIndex - 1].pages.length - 1;
		// 	this.loadPage(this.sectionIndex - 1, lastPage);
		// } else {
		// 	this.loadPage(this.sectionIndex, this.pageIndex - 1);
		// }
    }
    
    async onEnter(question:ApplicationQuestion) {
        console.log('you pressed enter');
        await this.onQuestionAnswer(question);
        if (this.inputReady && this.page.questions.every(q => this.isQuestionValid(q))) {
            this.onNextBtn();
        }
        else if (!this.page.questions.every(q => this.isQuestionValid(q))) {
            this.emptyFields = true;
            console.log('please fill out all the fields');
        }


    }

	findSectionIndexByPageName(pageName: string) {
		return this.application.sections.findIndex(s => s.pages.find(p => p.name === pageName));
	}

	findPageIndexByPageName(pageName: string) {
		const sectionIndex = this.findSectionIndexByPageName(pageName);
		if (sectionIndex === -1) return -1;
		const pageIndex = this.application.sections[sectionIndex].pages.findIndex(p => p.name === pageName);
		// console.log('findPageIndexByName: pageName=%o, section=%o, pageIndex=%o', pageName, section, pageIndex);
		return pageIndex;
	}

	isActiveSection(section) {
		return section === this.section;
	}

	selectQuestionOption(question: ApplicationQuestion, option: ApplicationQuestionOption) {
		this.answers[question.key] = option.value || option.label;
		// console.log('logging', this.answers[question.key]);
		if (option.nextPageName) this.page.nextPageName = option.nextPageName;
	}

	isQuestionOptionSelected(question: ApplicationQuestion, option: ApplicationQuestionOption) {
		return this.answers[question.key] === (option.value || option.label);
	}

	getSelectedQuestionValue(question: ApplicationQuestion) {
		if (question.type == 'radio') {
			let selectedOpt = question.options.find(el => el.value == this.answers[question.key]);
			this.page.nextPageName = selectedOpt.nextPageName;
			console.log(this.page.nextPageName);
		}
		else if (question.type == 'text') {
			this.onQuestionAnswer(question);
		}
	}

	async onQuestionAnswer(question:ApplicationQuestion) {
		const value = this.answers[question.key];
		if (question.key === 'birthDate') {		// Check and reject if they are under 18
			const duration = DateTime.fromISO(value).diffNow('years');
			const age = -duration.years;

			if (age < 18) {
				this.page.nextPageName = '6a.1';		// Bummer
			} else {
				this.page.nextPageName = '7a';
			}
			console.log('dateOfBirth=%o, age=%o, nextPageName=%o', value, age, this.page.nextPageName);
		}

		if (question.key === 'zipcode' && value) {		// Check and reject if they are inside of Oklahoma
			this.inputReady = false;
			const info = await this.googleMapsService.lookupZipcode(value);
			console.log('lookupZipcode: %o', info);
			if (!info) {
				//  TODO: Handle if they enter something invalid
			} else {
				this.inputReady = true;  // show the button
				if (info.state === 'OK') {
					this.page.nextPageName = '8a.1';
				} else {
					this.page.nextPageName = '9a';
				}
			}
		}

		if (question.key === 'address' && value) {
			this.inputReady = false;
			const info = await this.googleMapsService.lookupAddress(value);
			console.log('lookupAddress: %o', info);
			if (!info) {
				//  TODO: Handle if they enter something invalid
			} else {
				this.inputReady = true;
				if (info.formatted) {
					this.answers[question.key] = info.formatted;
					this.answers['address.street1'] = info.street1;
					this.answers['address.street2'] = info.street2;
					this.answers['address.city'] = info.city;
					this.answers['address.state'] = info.stateName;
					this.answers['address.zipcode'] = info.zipcode;
				}
			}
		}
	}


	async rejectResponse() {
		this.response.status = 'rejected';
		this.response = await this.responseService.submitResponse(this.response);
		console.log('rejectResponse: response=%o', this.response);
		this.saveResponse();
	}

	async submitResponse() {
		if(this.response.status==='submitted') {
			console.warn('submitResponse: Response status already submitted, bailing.');
			return;
		}
		this.response.status = 'submitted';
		this.response = await this.responseService.submitResponse(this.response);
		console.log('submitResponse: response=%o', this.response);
		await this.saveResponse();
	}

	get canNext() {
		return this.page.questions.every(q => this.isQuestionValid(q));
	}

	isQuestionValid(question:ApplicationQuestion) {
		const value = this.answers[question.key];
		if(question.optional && !value) return true;
		switch(question.type) {
			case 'label':	return true;
			case 'radio':
			case 'text':
			case 'textarea':
			case 'date':
				return !!value;
			case 'email':	return this.isEmailValid(value);
			case 'phone':	return this.isPhoneValid(value);
			case 'url':		return this.isUrlValid(value);
		}
		return false;
	}

	isPhoneValid(phone:string) {
		return !!(phone && phone.match(/^[\d-\(\)\+\s]+$/g) && phone.replace(/[^\d]/g, '').match(/^[0-9]{10,12}$/));
	}
	isEmailValid(email:string) {
		return !!(email && email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
	}
	isUrlValid(url:string) {
		return !!(url && url.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/));
	}
}
