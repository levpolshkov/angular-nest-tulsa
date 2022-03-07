import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as postmarkTransport from 'nodemailer-postmark-transport';
import * as EmailTemplate from 'email-templates';
import { FileService } from './file.service';
import { LoggerService } from './logger.service';

export interface MailerParams {
	to: string;
	from?: string;
	cc?: string;
	bcc?: string;
	subject: string;
	text?: string;
	html?: string;
}

export interface SendEmailTemplateOptions {
	template: string;
	data?: object;
	to: string;
	from?: string;
	subject: string;
}

@Injectable()
export class PostmarkService {
	private logger: LoggerService = new LoggerService('PostmarkService');
	transport;
	emailTemplate: EmailTemplate;

	constructor(private configService: ConfigService, private fileService: FileService) {
		const apiKey = this.configService.get('POSTMARK_APIKEY');
		if (apiKey) {
			this.transport = nodemailer.createTransport(
				postmarkTransport({
					auth: { apiKey }
				})
			);
		} else {
			this.logger.warn('POSTMARK_APIKEY not set.');
		}

		this.emailTemplate = new EmailTemplate({
			message: {},
			views: {
				root: this.fileService.relativePath('templates/emails'),
				options: { extension: 'handlebars' }
			}
		});
	}

	sendEmail(params: MailerParams) {
		if (!this.transport) return;
		if (!params.from) params.from = this.configService.get('POSTMARK_FROM');
		this.logger.log('sendEmail: to=%o, subject=%o', params.to, params.subject);
		if (!params) return Promise.reject({ error: 'mailer.sendEmail(): Missing params' });
		return new Promise((resolve, reject) => {
			this.transport.sendMail(params, (err, result) => {
				if (err) return reject(err);
				delete params.html;
				resolve(result);
			});
		});
	}

	async sendTemplateEmail(tplName: string, params: MailerParams, data: any) {
		// if(this.configService.get('notify.bcc')) params.bcc = this.configService.get('notify.bcc');

		data.backendUrl = this.configService.get('BACKEND_URL');
		data.frontendUrl = this.configService.get('FRONTEND_URL');
		let html = await this.emailTemplate.render(tplName, data);
		html = await this.emailTemplate.render('template', {
			html,
			backendUrl: data.backendUrl
		});
		params.html = html;
		return this.sendEmail(params);
	}

	async sendEmailTemplate(options) {
		let html = await this.emailTemplate.render(options.template, options.data || {});
		html = await this.emailTemplate.render('template', {
			html,
			backendUrl: this.configService.get('BACKEND_URL'),
			frontendUrl: this.configService.get('FRONTEND_URL')
		});

		return this.sendEmail({
			to: options.to,
			from: options.from,
			subject: options.subject,
			html: html
		}).catch((err) => {
			this.logger.error('sendEmail: err=%o', err);
			return Promise.reject(err);
		});
	}
}
