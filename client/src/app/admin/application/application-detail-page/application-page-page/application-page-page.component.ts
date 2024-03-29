import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, ApplicationSection, ApplicationPage, ApplicationQuestion, ApplicationQuestionOption } from '@server/application/application.interface';
import { AlertService } from 'src/app/admin/site/alert.service';
import { ConfirmService } from 'src/app/admin/site/confirm.service';
import { AdminApplicationService } from '../../application.service';

interface NextPage {
	label: string;
	pageId: string;
}

@Component({
	selector: 'app-application-page-page',
	templateUrl: './application-page-page.component.html',
	styleUrls: ['./application-page-page.component.scss']
})
export class ApplicationPagePageComponent implements OnInit {
	application: Application;
	section: ApplicationSection;
	page: ApplicationPage;
	readonly = false;

	pageTypes = this.applicationService.pageTypes;
	questionTypes = this.applicationService.questionTypes;

	nextPages: NextPage[] = [];

	constructor(
		public applicationService: AdminApplicationService,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private confirmService: ConfirmService
	) {}

	get multipleNextPages(): boolean {
		return this.page?.questions.some((question) => question.type === 'radio');
	}

	async ngOnInit() {
		const applicationId = this.route.snapshot.params.applicationId;
		const sectionId = this.route.snapshot.params.sectionId;
		const pageId = this.route.snapshot.params.pageId;
		console.log('ApplicationPagePageComponent: applicationId=%o, sectionId=%o, pageId=%o', applicationId, sectionId, pageId);

		this.application = await this.applicationService.getApplicationById(applicationId);
		this.section = this.application.sections.find((s) => s._id === sectionId);
		if (pageId === 'new') {
			this.page = <ApplicationPage>{
				questions: []
			};
			this.section.pages.push(this.page);
		} else {
			this.page = this.section.pages.find((p) => p._id === pageId);
		}

		this.nextPages = this.application.sections
			.map((section) => {
				return section.pages.map((page) => {
					return {
						label: page.name,
						pageId: page._id
					};
				});
			})
			.reduce((a, b) => a.concat(b), []);
	}

	get isNew() {
		return !this.application?._id;
	}

	async onSaveBtn() {
		this.page.questions.forEach((question) => {
			if (question.options) question.options.sort((a, b) => a.order - b.order);
		});
		this.page.questions.sort((a, b) => a.order - b.order);
		this.section.pages.sort((a, b) => a.order - b.order);
		this.application = await this.applicationService.saveApplication(this.application);
		this.alertService.info('Application Page saved.');
		this.router.navigate(['/admin/application', this.application._id, 'section', this.section._id]);
	}

	async onDeleteBtn() {
		const ans = await this.confirmService.confirm({ text: 'Are you sure you want to delete this page?  This cannot be undone.' });
		if (!ans) return;
		await this.applicationService.deleteApplicationPageById(this.application._id, this.page._id);
		this.alertService.warning('Application Page deleted.');
		this.router.navigate(['/admin/application', this.application._id, 'section', this.section._id]);
	}

	addQuestion() {
		this.page.questions.push({
			order: 0,
			key: 'new',
			type: 'label',
			label: 'New Question'
		});
	}
	async removeQuestion(question: ApplicationQuestion) {
		const ans = await this.confirmService.confirm({ text: 'Are you sure you want to delete this question?' });
		if (!ans) return;
		const index = this.page.questions.indexOf(question);
		if (index === -1) return;
		this.page.questions.splice(index, 1);
	}

	onViewBtn() {
		window.open(`/applicant/application?viewPage=${this.page._id}`, '_blank', '');
	}

	addQuestionOption(question: ApplicationQuestion) {
		question.options.push({
			label: 'New Option',
			value: 'New Value'
		});
	}
	async removeQuestionOption(question: ApplicationQuestion, option: ApplicationQuestionOption) {
		const ans = await this.confirmService.confirm({ text: 'Are you sure you want to delete this option?' });
		if (!ans) return;
		const index = question.options.indexOf(option);
		if (index === -1) return;
		question.options.splice(index, 1);
	}
}
