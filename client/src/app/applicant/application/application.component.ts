import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationPage, ApplicationQuestion, ApplicationQuestionOption, ApplicationSection } from '@server/application/application.interface';
import { Application, ApplicationService } from './application.service';
import { DateTime } from 'luxon';
import { GoogleMapsService } from 'src/app/shared/google-maps.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
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
	answerLabels: any = {};
	response: ApplicationResponse;

	inputReady: Boolean;
	emptyFields: Boolean;
	landingPage: Boolean;

	bummerSubmitted = false;

	nextPageLoading = false;

    today = new Date();

	constructor(public applicationService:ApplicationService, private responseService:ApplicationResponseService, private route:ActivatedRoute, private router:Router, private googleMapsService:GoogleMapsService, private googleTagManagerService: GoogleTagManagerService) { }

	async ngOnInit() {
		this.application = await this.applicationService.searchApplications({ filter: {} }).then(r => r.records[0]);
		await this.loadResponse();

		// const sectionIndex = +this.route.snapshot.queryParams['section'] || 0;
		// const pageIndex = +this.route.snapshot.queryParams['page'] || 0;
		// this.loadPage(sectionIndex, pageIndex);

		// this.route.queryParams.subscribe(queryParams => {
		// 	const sectionIndex = +queryParams['section'] || 0;
		// 	const pageIndex = +queryParams['page'] || 0;
		// 	console.log('ApplicationComponent: queryParams subscribe: sectionIndex=%o, pageIndex=%o', sectionIndex,pageIndex);
		// 	this.loadPage(sectionIndex, pageIndex);
		// });
	}

	async loadResponse() {
		if(this.route.snapshot.queryParams['viewPage']) {
			const viewPageId = this.route.snapshot.queryParams['viewPage'];
			const viewSection = this.application.sections.find(s => s.pages.find(p => p._id===viewPageId))
			const viewPage = viewSection && viewSection.pages.find(p => p._id===viewPageId);
			if(viewPage) {
				this.response = {
					status: 'pending',
					application: this.application,
					questionAnswers: [],
					createDate: new Date(),
					lastPage: viewPage.name
				};
				this.applicationService.debugMode = true;
				await this.responseService.saveResponseLocal(this.response);
			}
		}

		this.response = await this.responseService.loadResponseLocal();
		if(!this.response) {
			this.response = {
				status: 'pending',
				application: this.application,
				questionAnswers: [],
				createDate: new Date(),
				lastPage: '1a'
			};
		} else {
			this.application = this.response.application;		// To make sure we restore page.nextPageName for Back button functionality
		}

		

		this.response.questionAnswers.forEach(qa => {
			this.answers[qa.questionKey] = qa.answer;
		});
		console.log('ApplicationComponent.loadResponse: response=%o', this.response);
		
		if(this.response.lastPage) {
			// const sectionIndex = this.findSectionIndexByPageName(this.response.lastPage);
			// const pageIndex = this.findPageIndexByPageName(this.response.lastPage);
			// this.gotoPage(sectionIndex, pageIndex);
			// this.loadPage(sectionIndex, pageIndex);
			this.loadPageByName(this.response.lastPage);
		}

		this.responseService.http.getPublicIpAddress().then(ipAddress => {
			console.log('Got ipAddress=%o', ipAddress);
			this.response.ipAddress = ipAddress;
		}, err => console.error('Failed to get ipAddress: %o', err));
	}
	async saveResponse() {
		this.response.questionAnswers = Object.keys(this.answers).map(questionKey => {
			return {
				questionKey,
				answer: this.answers[questionKey],
				answerLabel: this.answerLabels[questionKey]
			};
		});
		this.response.application = this.application;
		this.response.lastPage = this.page.name;
		this.response.updateDate = new Date();
		console.log('ApplicationComponent.saveResponse: response=%o', this.response);
		this.response = await this.responseService.submitResponse(this.response);
		await this.responseService.saveResponseLocal(this.response);
	}


	// gotoPage(sectionIndex:number, pageIndex:number) {
	// 	console.log('gotoPage: sectionIndex=%o, pageIndex=%o', sectionIndex,pageIndex);
	// 	this.router.navigate(['/applicant/application'], {
	// 		queryParams: {
	// 			section: sectionIndex,
	// 			page: pageIndex
	// 		},
	// 		skipLocationChange: false
	// 		// replaceUrl: false
	// 	});
	// }



	loadPageByName(pageName:string) {
		const sectionIndex = this.findSectionIndexByPageName(pageName);
		const pageIndex = this.findPageIndexByPageName(pageName);
		this.loadPage(sectionIndex,pageIndex);
	}

	loadPageById(pageId:string) {
		const sectionIndex = this.findSectionIndexByPageId(pageId);
		const pageIndex = this.findPageIndexByPageId(pageId);
		this.loadPage(sectionIndex,pageIndex);
	}

	async loadPage(sectionIndex:number, pageIndex:number) {
		console.log('loadPage: sectionIndex=%o, pageIndex=%o', sectionIndex, pageIndex);
		this.sectionIndex = sectionIndex;
		this.pageIndex = pageIndex;

		this.section = this.application.sections[sectionIndex];
		this.page = this.section.pages[pageIndex];

		if(this.page.type==='reject') {
			this.response.bummerEmail = this.answers.email;
		}

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

		const gtmTag = {
			event: 'loadPage',
			pageName: this.page.name
		};
		this.googleTagManagerService.pushTag(gtmTag);

		if(this.page.type==='submit') await this.submitResponse();
		if(this.page.type==='reject') await this.rejectResponse();
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
		if (this.page.name === '5a.1') {
			if (this.answers['primaryIncomeSourceFromCompany'] === "Yes") {
				this.answers['employmentType'] = "Full Time Employee";
			}
		}

		this.nextPageLoading = true;
		await this.saveResponse();
		this.nextPageLoading = false;

		if(!this.page.nextPageName && this.page.nextPageId) {
			const nextPage = this.findPageByPageId(this.page.nextPageId);
			this.page.nextPageName = nextPage?.name;
		}
		console.log('onNextBtn: nextPageName=%o', this.page.nextPageName);
		this.loadPageByName(this.page.nextPageName);
	}
	onPrevBtn() {
		const currentPageName = this.page.name;
		if (!currentPageName) return;

		const allPages = this.application.sections.map(s => s.pages).reduce((a, b) => a.concat(b), []);
		const prevPage = allPages.find(p => p.nextPageName === currentPageName);
		const prevPageName = prevPage?.name;

		console.log('onPrevBtn: sectionIndex=%o, pageIndex=%o, currentPageName=%o, prevPageName=%o', this.sectionIndex, this.pageIndex, currentPageName, prevPageName);

		if (prevPageName) {
			// const sectionIndex = this.findSectionIndexByPageName(prevPageName);
			// const pageIndex = this.findPageIndexByPageName(prevPageName);
			// this.gotoPage(sectionIndex, pageIndex);
			this.loadPageByName(prevPageName);
		}

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

	findSectionIndexByPageName(pageName:string) {
		return this.application.sections.findIndex(s => s.pages.find(p => p.name === pageName));
	}
	findSectionIndexByPageId(pageId:string) {
		return this.application.sections.findIndex(s => s.pages.find(p => p._id === pageId));
	}

	findPageIndexByPageName(pageName:string) {
		const sectionIndex = this.findSectionIndexByPageName(pageName);
		if (sectionIndex === -1) return -1;
		const pageIndex = this.application.sections[sectionIndex].pages.findIndex(p => p.name === pageName);
		return pageIndex;
	}
	findPageIndexByPageId(pageId:string) {
		const sectionIndex = this.findSectionIndexByPageId(pageId);
		if (sectionIndex === -1) return -1;
		const pageIndex = this.application.sections[sectionIndex].pages.findIndex(p => p._id === pageId);
		return pageIndex;
	}
	findPageByPageId(pageId:string) {
		const sectionIndex = this.findSectionIndexByPageId(pageId);
		if (sectionIndex === -1) return null;
		return this.application.sections[sectionIndex].pages.find(p => p._id === pageId);
	}

	isActiveSection(section) {
		return section === this.section;
	}

	selectQuestionOption(question: ApplicationQuestion, option: ApplicationQuestionOption) {
		this.answers[question.key] = option.value || option.label;
		this.answerLabels[question.key] = option.label || option.value;
		console.log('selectQuestionOption: question=%o, option=%o', question, option);
		if(option.nextPageId) {
			this.page.nextPageId = option.nextPageId;
			if(this.page.nextPageId) {
				const nextPage = this.findPageByPageId(this.page.nextPageId);
				console.log('getSelectedQuestionValue: nextPage=%o', nextPage);
				this.page.nextPageName = nextPage?.name;
			}
		}
		
	}

	isQuestionOptionSelected(question: ApplicationQuestion, option: ApplicationQuestionOption) {
		return this.answers[question.key] === (option.value || option.label);
	}

	getSelectedQuestionValue(question: ApplicationQuestion) {
		if (question.type == 'radio') {
			let option = question.options.find(el => el.value == this.answers[question.key]);
			if(option) {
				this.page.nextPageId = option.nextPageId;
				if(this.page.nextPageId) {
					const nextPage = this.findPageByPageId(this.page.nextPageId);
					console.log('getSelectedQuestionValue: nextPage=%o', nextPage);
					this.page.nextPageName = nextPage?.name;
				}
			}
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
				if (info.state === 'OK') this.page.nextPageName = '8a.1';
			}
		}
	}

	onBummerSubmit() {
		console.log('onBummerSubmit() bummerEmail=%o', this.response.bummerEmail);
		this.bummerSubmitted = true;
		this.saveResponse();
	}


	async rejectResponse() {
		this.response.status = 'rejected';
		this.response.lastPage = this.page.name;
		this.response = await this.responseService.submitResponse(this.response);
		console.log('rejectResponse: response=%o', this.response);
		this.saveResponse();

		this.googleTagManagerService.pushTag({
			event: 'bummer',
			pageName: this.page.name
		});
	}

	async submitResponse() {
		if(this.response.status==='submitted') {
			console.warn('submitResponse: Response status already submitted, bailing.');
			return;
		}
		this.response.status = 'submitted';
		this.response.lastPage = this.page.name;
		this.response = await this.responseService.submitResponse(this.response);
		console.log('submitResponse: response=%o', this.response);
		await this.saveResponse();

		try {
			this.googleTagManagerService.pushTag({
				event: 'submit',
				pageName: this.page.name
			});

			if(window['gtag']) {
				window['gtag']('event', 'conversion', {
					'send_to': 'AW-10781414996/TxfPCL2QxIMDENSs_ZQo',
					'value': 1.0,
					'currency': 'USD'
				});
			}

			if(window['lintrk']) {
				window['lintrk']('track', {conversion_id:5582972});
			}

			if(window['fbq']) {
				window['fbq']('track', 'SubmitApplication');
			}
		} catch(err) {
			console.error('submitResponse: tracker threw error: %o', err);
		}
	}

	get canNext() {
		return this.page.questions.every(q => this.isQuestionValid(q));
	}

	isQuestionValid(question:ApplicationQuestion) {
		const value = this.answers[question.key];
		if(question.optional && !value) return true;
		if(question.key === 'birthDate') return this.isBirthDateValid(value);
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
		return !!(url && url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/));
	}
	isBirthDateValid(birthDate:string) {
		const birthDateObject = new Date(birthDate);
		birthDateObject.setUTCHours(this.today.getUTCHours(), this.today.getUTCMinutes(), this.today.getUTCSeconds());

		console.log('birthDateObject :>> ', birthDateObject);
		console.log('this.today :>> ', this.today);

		const isFutureDate = birthDateObject > this.today;

		return birthDate.startsWith('19') || (birthDate.startsWith('2') && !isFutureDate);
	}
}
