import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationPage, ApplicationQuestion, ApplicationQuestionOption, ApplicationSection } from '@server/application/application.interface';
import { Application, ApplicationService } from './application.service';
import { DateTime } from 'luxon';
import { GoogleMapsService } from 'src/app/shared/google-maps.service';
import { ApplicationResponse } from '@server/application-response/application-response.interface';
import { ApplicationResponseService } from './application-response.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  application: Application;
  section: ApplicationSection;
  page: ApplicationPage;

  pageIndex: number = 0;
  sectionIndex: number = 0;

  answers: any = {};
  response: ApplicationResponse;

  inputReady: Boolean;

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
    console.log('ApplicationComponent.loadResponse: response=%o', this.response);
  }
  async saveResponse() {
    this.response.questionAnswers = Object.keys(this.answers).map(questionKey => {
      return {
        questionKey,
        answer: this.answers[questionKey]
      };
    });
    this.response.application = this.application;
    console.log('ApplicationComponent.saveResponse: response=%o', this.response);
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
        console.log('hey, ' + question.key + ' already exists in the answers array! the answer is ' + this.answers[question.key]);
        this.getSelectedQuestionValue(question);
      }
    });

    this.inputReady = true;

    if (this.page.type === 'submit') await this.submitResponse();
    if (this.page.type === 'reject') await this.rejectReponse();

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

    if (this.page.name === '14.5a') {
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
    let optArr = question.options.map(function (item) { return item.value });
    let isDuplicate = optArr.some(function (item, idx) {
      return optArr.indexOf(item) != idx;
    });

    // if (isDuplicate) {
    //   let selectedOpt = question.options.find(el => el.value == this.answers[question.key]);
    //   console.log(selectedOpt['label']);
    //   return this.answers[question.key] === selectedOpt;
    // }
    // else {
    return this.answers[question.key] === (option.value || option.label);
    // }
  }

  getSelectedQuestionValue(question: ApplicationQuestion) {
    if (question.type == 'radio') {
      let selectedOpt = question.options.find(el => el.value == this.answers[question.key]);
      this.page.nextPageName = selectedOpt.nextPageName;
    }
    else if (question.type == 'text') {
      this.onQuestionAnswer(question);
    }

  }

  async onQuestionAnswer(question: ApplicationQuestion) {
    const value = this.answers[question.key];
    if (question.key === 'birthDate') {		// Check and reject if they are under 18
      const duration = DateTime.fromISO(value).diffNow('years');
      const age = -duration.years;
      // console.log('dateOfBirth=%o, age=%o', value, age);
      if (age < 18) this.page.nextPageName = '6a.1';
    }

    if (question.key === 'zipcode') {		// Check and reject if they are inside of Oklahoma
      this.inputReady = false;
      const info = await this.googleMapsService.lookupAddress(value);
      console.log('lookupAddress: %o', info);
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

    if (question.key === 'address') {
      this.inputReady = false;
      const info = await this.googleMapsService.lookupAddress(value);
      console.log('lookupAddress: %o', info);
      if (!info) {
        //  TODO: Handle if they enter something invalid
      } else {
        this.inputReady = true;
        if (info.formatted) {
          this.answers[question.key] = info.formatted;
          this.answers['address.street'] = info.street;
          this.answers['address.city'] = info.city;
          this.answers['address.state'] = info.stateName;
          this.answers['address.zipcode'] = info.zipcode;
        }
      }
    }
  }

  async rejectReponse() {
    this.response.status = 'rejected';
    this.response = await this.responseService.submitResponse(this.response);
    console.log('rejectReponse: response=%o', this.response);
    this.saveResponse();
  }

  async submitResponse() {
    this.response.status = 'submitted';
    this.response = await this.responseService.submitResponse(this.response);
    console.log('submitResponse: response=%o', this.response);
    this.saveResponse();
  }

  get canNext() {
    return this.page.questions.every(q => q.type === 'label' || this.answers[q.key]);
  }
}
