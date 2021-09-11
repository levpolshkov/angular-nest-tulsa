import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationPage, ApplicationQuestion, ApplicationQuestionOption, ApplicationSection } from '@server/application/application.interface';
import { Application, ApplicationService } from './application.service';

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

	// prevPageName:string = null;		// For back button

	constructor(public applicationService:ApplicationService, private route:ActivatedRoute, private router:Router) { }

	async ngOnInit() {
		
		this.application = await this.applicationService.searchApplications({filter:{}}).then(r => r.records[0]);

		const sectionIndex = +this.route.snapshot.queryParams['section'] || 0;
		const pageIndex = +this.route.snapshot.queryParams['page'] || 0;

		this.loadPage(sectionIndex,pageIndex);
	}

	loadPage(sectionIndex:number, pageIndex:number) {
		this.sectionIndex = sectionIndex;
		this.pageIndex = pageIndex;
		this.section = this.application.sections[sectionIndex];
		this.page = this.section.pages[pageIndex];

		if(!this.page.questions) this.page.questions = [];
		this.page.questions.forEach((question,i) => {
			if(!question.key) question.key = `question_${this.sectionIndex}_${this.pageIndex}_${i}`;
		});

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

	onNextBtn() {
		console.log('onNextBtn: answers=%o', this.answers);

		let nextPageIndex = this.pageIndex+1;
		if(this.page.nextPageName) {
			nextPageIndex = this.findPageIndexByName(this.page.nextPageName);
			if(nextPageIndex===-1) nextPageIndex = this.pageIndex+1;
		}

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
		return this.section.pages.findIndex(p => p.name===pageName);
	}

	isActiveSection(section) {
		return section===this.section;
	}



	selectQuestionOption(question:ApplicationQuestion, option:ApplicationQuestionOption) {
		this.answers[question.key] = option.value;
		if(option.nextPageName) this.page.nextPageName = option.nextPageName;
	}
	isQuestionOptionSelected(question:ApplicationQuestion, option:ApplicationQuestionOption) {
		return this.answers[question.key]===option.value;
	}
}
