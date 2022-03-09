/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const schedule_1 = __webpack_require__(6);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const utility_1 = __webpack_require__(11);
const app_controller_1 = __webpack_require__(29);
const app_service_1 = __webpack_require__(30);
const auth_module_1 = __webpack_require__(31);
const user_module_1 = __webpack_require__(44);
const product_1 = __webpack_require__(48);
const application_module_1 = __webpack_require__(54);
const bullhorn_module_1 = __webpack_require__(59);
const application_response_module_1 = __webpack_require__(62);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            database_1.DatabaseModule,
            utility_1.UtilityModule,
            search_1.SearchModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            product_1.ProductModule,
            application_module_1.ApplicationModule,
            bullhorn_module_1.BullhornModule,
            application_response_module_1.ApplicationResponseModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mongoose = void 0;
const mongoose = __webpack_require__(8);
exports.mongoose = mongoose;
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(10);
const utility_1 = __webpack_require__(11);
const database_service_1 = __webpack_require__(23);
const document_service_1 = __webpack_require__(24);
const logger = new utility_1.LoggerService('DatabaseModule');
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    logger.log('Trying to connect to %o', configService.get('DATABASE'));
                    return {
                        uri: configService.get('DATABASE'),
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false
                    };
                }
            })
        ],
        providers: [database_service_1.DatabaseService, document_service_1.DocumentService],
        exports: [database_service_1.DatabaseService, document_service_1.DocumentService]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(12), exports);
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilityModule = void 0;
const common_1 = __webpack_require__(4);
const utility_service_1 = __webpack_require__(13);
const logger_service_1 = __webpack_require__(14);
const file_service_1 = __webpack_require__(16);
const postmark_service_1 = __webpack_require__(19);
let UtilityModule = class UtilityModule {
};
UtilityModule = __decorate([
    common_1.Module({
        providers: [utility_service_1.UtilityService, logger_service_1.LoggerService, file_service_1.FileService, postmark_service_1.PostmarkService],
        exports: [utility_service_1.UtilityService, logger_service_1.LoggerService, file_service_1.FileService, postmark_service_1.PostmarkService]
    })
], UtilityModule);
exports.UtilityModule = UtilityModule;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilityService = exports.serialPromise = void 0;
const common_1 = __webpack_require__(4);
function serialPromise(items, func) {
    let results = [], i = 0;
    return items
        .reduce((promise, item) => {
        return promise.then(() => func(item, i++)).then((r) => results.push(r));
    }, Promise.resolve())
        .then(() => results);
}
exports.serialPromise = serialPromise;
let UtilityService = class UtilityService {
    constructor() {
        this.serialPromise = serialPromise;
    }
};
UtilityService = __decorate([
    common_1.Injectable()
], UtilityService);
exports.UtilityService = UtilityService;


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(4);
const util = __webpack_require__(15);
let LoggerService = class LoggerService extends common_1.ConsoleLogger {
    testLogger() {
        this.debug('This is a debug message with a boolean=%o', false);
        this.log('This is a normal log message.  value=%d currently.', 5);
        this.warn('This is a warning with a %s.', 'dynamic string');
        this.error('This is an error with an object: %o', { part: 'here', count: 15, success: false });
    }
    debug(format, ...params) {
        const message = this.formatMessage(format, ...params);
        super.debug(message);
    }
    log(format, ...params) {
        const message = this.formatMessage(format, ...params);
        super.log(message);
    }
    warn(format, ...params) {
        const message = this.formatMessage(format, ...params);
        super.warn(message);
    }
    error(format, ...params) {
        const message = this.formatMessage(format, ...params);
        super.error(message);
    }
    formatMessage(format, ...params) {
        return util.formatWithOptions({ colors: true }, format, ...params);
    }
};
LoggerService = __decorate([
    common_1.Injectable()
], LoggerService);
exports.LoggerService = LoggerService;


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileService = void 0;
const common_1 = __webpack_require__(4);
const pathModule = __webpack_require__(17);
const fs = __webpack_require__(18);
let FileService = class FileService {
    constructor() {
        this.rootPath = pathModule.join(__dirname, '..');
    }
    readFile(path, format = 'utf8') {
        return new Promise((resolve, reject) => {
            fs.readFile(path, format, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
    writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, (err) => {
                if (err)
                    return reject(err);
                resolve(path);
            });
        });
    }
    copyFile(src, dest) {
        return new Promise((resolve, reject) => {
            fs.copyFile(src, dest, (err) => {
                if (err)
                    return reject(err);
                resolve(dest);
            });
        });
    }
    moveFile(src, dest) {
        return new Promise((resolve, reject) => {
            fs.rename(src, dest, (err) => {
                if (err)
                    return reject(err);
                resolve(dest);
            });
        });
    }
    async createDir(path) {
        if (await this.isDir(path))
            return path;
        return new Promise((resolve, reject) => {
            fs.mkdir(path, (err) => {
                if (err)
                    return reject(err);
                resolve(path);
            });
        });
    }
    async createDirRecursive(path) {
        const parts = path.split('/');
        parts.shift();
        let current = '/';
        return this.serialPromise(parts, (part) => {
            current += `${part}/`;
            return this.createDir(current);
        });
    }
    serialPromise(items, func) {
        let results = [], i = 0;
        return items
            .reduce((promise, item) => {
            return promise.then(() => func(item, i++)).then((r) => results.push(r));
        }, Promise.resolve())
            .then(() => results);
    }
    fileStats(file) {
        return new Promise((resolve, reject) => {
            fs.stat(file, (err, stats) => {
                if (err || !stats)
                    return resolve(null);
                resolve({
                    isFile: stats && stats.isFile(),
                    isDir: stats && stats.isDirectory()
                });
            });
        });
    }
    async isFile(path) {
        return this.fileStats(path).then((stats) => stats.isFile);
    }
    async isDir(path) {
        return this.fileStats(path).then((stats) => stats.isDir);
    }
    relativePath(path) {
        return pathModule.join(this.rootPath, path);
    }
};
FileService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], FileService);
exports.FileService = FileService;


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostmarkService = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const nodemailer = __webpack_require__(20);
const postmarkTransport = __webpack_require__(21);
const EmailTemplate = __webpack_require__(22);
const file_service_1 = __webpack_require__(16);
const logger_service_1 = __webpack_require__(14);
let PostmarkService = class PostmarkService {
    constructor(configService, fileService) {
        this.configService = configService;
        this.fileService = fileService;
        this.logger = new logger_service_1.LoggerService('PostmarkService');
        const apiKey = this.configService.get('POSTMARK_APIKEY');
        if (apiKey) {
            this.transport = nodemailer.createTransport(postmarkTransport({
                auth: { apiKey }
            }));
        }
        else {
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
    sendEmail(params) {
        if (!this.transport)
            return;
        if (!params.from)
            params.from = this.configService.get('POSTMARK_FROM');
        this.logger.log('sendEmail: to=%o, subject=%o', params.to, params.subject);
        if (!params)
            return Promise.reject({ error: 'mailer.sendEmail(): Missing params' });
        return new Promise((resolve, reject) => {
            this.transport.sendMail(params, (err, result) => {
                if (err)
                    return reject(err);
                delete params.html;
                resolve(result);
            });
        });
    }
    async sendTemplateEmail(tplName, params, data) {
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
};
PostmarkService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _b : Object])
], PostmarkService);
exports.PostmarkService = PostmarkService;


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("nodemailer-postmark-transport");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("email-templates");

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const common_1 = __webpack_require__(4);
let DatabaseService = class DatabaseService {
};
DatabaseService = __decorate([
    common_1.Injectable()
], DatabaseService);
exports.DatabaseService = DatabaseService;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(8);
let DocumentService = class DocumentService {
    async saveDocument(model, doc, options = {}) {
        if (doc.toObject)
            doc = doc.toObject();
        if (!options.query)
            options.query = { _id: doc._id || mongoose_1.Types.ObjectId() };
        const oldDoc = await model.findOne(options.query).exec();
        if (options.beforeSave)
            await options.beforeSave(doc, oldDoc);
        if (!oldDoc)
            doc.createDate = new Date();
        else
            doc.updateDate = new Date();
        return model
            .findOneAndUpdate(options.query, doc, { new: true, upsert: true })
            .exec()
            .then(async (newDoc) => {
            if (options.afterSave)
                await options.afterSave(newDoc, oldDoc);
            return newDoc;
        });
    }
    isObjectId(id) {
        if (id instanceof mongoose_1.Types.ObjectId)
            return true;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return false;
        const objectId = new mongoose_1.Types.ObjectId(id);
        return String(objectId) === id;
    }
};
DocumentService = __decorate([
    common_1.Injectable()
], DocumentService);
exports.DocumentService = DocumentService;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(27), exports);
__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchModule = void 0;
const common_1 = __webpack_require__(4);
const search_service_1 = __webpack_require__(27);
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    common_1.Module({
        providers: [search_service_1.SearchService],
        exports: [search_service_1.SearchService]
    })
], SearchModule);
exports.SearchModule = SearchModule;


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchService = exports.SearchOptions = exports.SearchResult = exports.SearchParams = void 0;
const common_1 = __webpack_require__(4);
const search_interface_1 = __webpack_require__(28);
Object.defineProperty(exports, "SearchParams", ({ enumerable: true, get: function () { return search_interface_1.SearchParams; } }));
Object.defineProperty(exports, "SearchResult", ({ enumerable: true, get: function () { return search_interface_1.SearchResult; } }));
Object.defineProperty(exports, "SearchOptions", ({ enumerable: true, get: function () { return search_interface_1.SearchOptions; } }));
let SearchService = class SearchService {
    searchModelFromQueryParams(model, queryParams, options = {}) {
        const searchParams = this.searchParamsFromQueryParams(queryParams);
        return this.searchModel(model, searchParams, options);
    }
    searchModel(model, searchParams = {}, options = {}) {
        if (!searchParams.page)
            searchParams.page = 1;
        if (!searchParams.size)
            searchParams.size = 10;
        const end = searchParams.page * searchParams.size;
        const start = end - searchParams.size;
        let filterQuery = {};
        let filterQueryPromise = Promise.resolve({});
        if (options.filterFunction) {
            filterQueryPromise = options.filterFunction(searchParams).then((fq) => (filterQuery = fq));
        }
        else {
            if (searchParams.filter) {
                Object.keys(searchParams.filter).forEach((key) => {
                    const value = searchParams.filter[key];
                    if (value && value !== 'null') {
                        filterQuery[key] = this.regexMatch(value);
                    }
                });
            }
        }
        return filterQueryPromise.then(() => {
            let sort = this.toSearchString(searchParams.sort);
            const query = model.find(filterQuery).sort({ active: -1 }).sort(sort).skip(start).limit(searchParams.size);
            if (options.select)
                query.select(options.select);
            if (options.populates)
                options.populates.forEach((p) => query.populate(p));
            if (options.lean)
                query.lean();
            return Promise.all([model.countDocuments(filterQuery).exec(), query.exec()]).then(([total, data]) => this.createSearchResult(searchParams, total, data));
        });
    }
    searchParamsFromQueryParams(queryParams) {
        const searchParams = {
            size: +queryParams.size || 10,
            page: +queryParams.page || 1,
            filter: {}
        };
        Object.keys(queryParams).forEach((key) => {
            let filterMatch = key.match(/^filter\.(.*)/);
            let value = queryParams[key];
            if (value === 'null')
                return;
            if (filterMatch)
                searchParams.filter[filterMatch[1]] = value;
            if (key === 'sort') {
                searchParams.sort = this.fromSortString(value);
            }
        });
        return searchParams;
    }
    toSearchString(sort) {
        if (!sort)
            return '';
        return (sort.dir === -1 ? '-' : '') + sort.prop;
    }
    fromSortString(str) {
        const sort = { dir: 1, prop: '' };
        if (str[0] === '-') {
            sort.dir = -1;
            str = str.slice(1);
        }
        sort.prop = str;
        return sort;
    }
    createSearchResult(params, total, records) {
        return {
            page: params.page,
            size: params.size,
            total: total,
            records: records
        };
    }
    regexMatch(value) {
        return new RegExp(this.escapeRegex(value), 'gi');
    }
    escapeRegex(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
};
SearchService = __decorate([
    common_1.Injectable()
], SearchService);
exports.SearchService = SearchService;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(30);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(4);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(32);
const jwt_1 = __webpack_require__(33);
const config_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(34);
const local_strategy_1 = __webpack_require__(37);
const jwt_strategy_1 = __webpack_require__(39);
const auth_controller_1 = __webpack_require__(41);
const user_module_1 = __webpack_require__(44);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            common_1.forwardRef(() => user_module_1.UserModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1d' }
                })
            })
        ],
        exports: [auth_service_1.AuthService],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(4);
const jwt_1 = __webpack_require__(33);
const crypto = __webpack_require__(35);
const user_service_1 = __webpack_require__(36);
const config_1 = __webpack_require__(5);
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(username, password) {
        username = String(username).trim().toLocaleLowerCase();
        const user = await this.userService.validateUser(username, this.hashPassword(password));
        if (!user)
            return null;
        return user;
    }
    hashPassword(password) {
        return this.hashString(password, this.configService.get('PASSWORD_SALT'));
    }
    login(user) {
        const payload = {
            userId: user._id
        };
        return {
            jwt: this.jwtService.sign(payload),
            user: user
        };
    }
    hashString(str, salt = '', rounds = 16) {
        for (let i = 0; i < rounds; i++)
            str = this.sha256(str + salt);
        return str;
    }
    sha256(str, digest = 'hex') {
        return crypto
            .createHash('sha256')
            .update(str)
            .digest(digest);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const config_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(34);
const search_1 = __webpack_require__(25);
const utility_1 = __webpack_require__(11);
const database_1 = __webpack_require__(7);
let UserService = class UserService {
    constructor(authService, userModel, documentService, searchService, configService, postmarkService) {
        this.authService = authService;
        this.userModel = userModel;
        this.documentService = documentService;
        this.searchService = searchService;
        this.configService = configService;
        this.postmarkService = postmarkService;
        this.logger = new utility_1.LoggerService('UserService');
        this.seedUser();
    }
    searchUsers(queryParams) {
        this.logger.log('searchUsers: queryParams=%o', queryParams);
        return this.searchService.searchModelFromQueryParams(this.userModel, queryParams, {
            filterFunction: async (params) => {
                const query = {
                    deleted: { $ne: true }
                };
                if (!params.filter)
                    return query;
                if (params.filter.fullName)
                    query.fullName = this.searchService.regexMatch(params.filter.fullName);
                if (params.filter.email)
                    query.email = this.searchService.regexMatch(params.filter.email);
                if (params.filter.phone)
                    query.email = this.searchService.regexMatch(params.filter.phone);
                if (params.filter.type)
                    query.type = { $in: params.filter.type.split(',') };
                return query;
            },
            lean: true,
            populates: []
        });
    }
    async getUserById(userId) {
        return this.userModel.findById(userId).exec();
    }
    async getUserByResetCode(resetCode) {
        return this.userModel.findOne({ resetCode }).select('-password').exec();
    }
    async saveUser(user) {
        if (!user._id) {
            user.active = true;
        }
        if (user.email) {
            user.email = String(user.email).toLowerCase().trim();
            if (await this.checkForDuplicateEmail(user))
                throw new common_1.ConflictException({ status: 409, message: 'Email address already in use.', type: 'email', email: user.email });
        }
        if (user.phone) {
            user.phone = String(user.phone).replace(/\D/g, '');
            if (await this.checkForDuplicatePhone(user))
                throw new common_1.ConflictException({ status: 409, message: 'Phone number already in use.', type: 'phone', phone: user.phone });
        }
        if (user.password) {
            user.password = this.authService.hashPassword(user.password);
        }
        if (user.firstName)
            user.fullName = [user.firstName, user.lastName].map((p) => p.trim()).join(' ');
        return this.documentService.saveDocument(this.userModel, user, {
            afterSave: (a, b) => this.afterUserSave(a, b)
        });
    }
    async afterUserSave(newUser, oldUser) {
        if (!oldUser) {
            this.sendWelcomeEmail(newUser.toObject());
        }
    }
    async deleteUserById(userId, deletingUser) {
        const user = await this.getUserById(userId);
        if (!user)
            throw new common_1.HttpException({ message: 'User not found.', userId }, 404);
        user.deleted = true;
        user.deleteUser = deletingUser;
        user.deleteDate = new Date();
        return user.save();
    }
    async checkForDuplicateEmail(user) {
        if (!user.email)
            return false;
        const dupUser = await this.userModel.findOne({ email: user.email });
        if (dupUser && !dupUser._id.equals(user._id))
            return true;
        return false;
    }
    async checkForDuplicatePhone(user) {
        if (!user.phone)
            return false;
        const dupUser = await this.userModel.findOne({ phone: user.phone });
        if (dupUser && !dupUser._id.equals(user._id))
            return true;
        return false;
    }
    async validateUser(username, password) {
        if (!username || !password)
            return null;
        let user = await this.userModel.findOne({ email: username, password }).select('-password').lean().exec();
        return user;
    }
    async resetPasswordStart(username, sendToUser = true) {
        username = String(username).toLowerCase().trim();
        if (!username)
            throw new common_1.HttpException({ message: 'Username empty.  Please contact support.', email: username, type: 'empty' }, 400);
        let user = await this.userModel.findOne({ email: username }).exec();
        if (!user)
            throw new common_1.HttpException({ message: 'Username not found.  Please contact support.', email: username, type: 'user' }, 400);
        if (!user.active)
            throw new common_1.HttpException({ message: 'User is disabled. Please contact support.', email: username, type: 'disabled' }, 400);
        const resetCode = this.authService.hashPassword(username + Date.now() + Math.random());
        const link = `${this.configService.get('FRONTEND_URL')}/admin/user/login?resetCode=${resetCode}`;
        console.log('resetPasswordStart: link=%o', link);
        user.resetCode = resetCode;
        await user.save();
        if (sendToUser) {
            if (!user.email)
                throw new common_1.HttpException({ message: 'User does not have an email address.' }, 400);
            await this.postmarkService.sendEmailTemplate({
                template: 'reset-password',
                to: username,
                from: 'sergei@gitwit.com',
                subject: 'Password Reset Request',
                data: { link: link, name: user.fullName }
            });
        }
        return link;
    }
    async resetPasswordVerify(resetCode) {
        if (!resetCode)
            return Promise.reject({ message: 'Invalid code', resetCode });
        const user = await this.userModel.findOne({ resetCode });
        if (!user)
            return Promise.reject({ message: 'Invalid code', resetCode });
        delete user.resetCode;
        user.locked = false;
        return user.save();
    }
    async sendWelcomeEmail(user) {
        console.log('sendWelcomeEmail: user=%o', user);
        const resetLink = await this.resetPasswordStart(user.email, false);
        return this.postmarkService.sendEmailTemplate({
            template: 'welcome-admin',
            from: 'sergei@gitwit.com',
            data: {
                user,
                resetLink
            },
            to: user.email,
            subject: 'Welcome to Tulsa Remote Admin!'
        });
    }
    async seedUser() {
        const count = await this.userModel.countDocuments({});
        if (!count) {
            const user = {
                active: true,
                type: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                email: this.configService.get('SEED_USER_EMAIL') || 'nitwit@gitwit.com',
                password: 'asdf'
            };
            this.logger.log('seedUser: Added admin user as %o/%o', user.email, user.password);
            return this.saveUser(user);
        }
    }
    async getDashboardUserData() {
        const userData = {
            userCount: null
        };
        userData.userCount = await this.userModel.countDocuments({});
        return userData;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof database_1.mongoose !== "undefined" && database_1.mongoose.Model) === "function" ? _b : Object, typeof (_c = typeof database_1.DocumentService !== "undefined" && database_1.DocumentService) === "function" ? _c : Object, typeof (_d = typeof search_1.SearchService !== "undefined" && search_1.SearchService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object, typeof (_f = typeof utility_1.PostmarkService !== "undefined" && utility_1.PostmarkService) === "function" ? _f : Object])
], UserService);
exports.UserService = UserService;


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(38);
const passport_1 = __webpack_require__(32);
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(34);
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
        this.authService = authService;
    }
    async validate(email, password) {
        const user = await this.authService.validateUser(email, password);
        if (!user)
            throw new common_1.UnauthorizedException({ message: 'Invalid email or password', type: 'login' });
        if (user.locked)
            throw new common_1.UnauthorizedException({ message: 'Account has been locked, please contact your clinic for more information.', type: 'login' });
        return user;
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(40);
const passport_1 = __webpack_require__(32);
const common_1 = __webpack_require__(4);
const user_service_1 = __webpack_require__(36);
const config_1 = __webpack_require__(5);
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(userService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
        this.userService = userService;
        this.configService = configService;
    }
    async validate(payload) {
        const user = await this.userService.getUserById(payload.userId);
        return user;
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(4);
const local_auth_guard_1 = __webpack_require__(42);
const auth_service_1 = __webpack_require__(34);
const jwt_auth_guard_1 = __webpack_require__(43);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return this.authService.login(req.user);
    }
    getUser(req) {
        return req.user;
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('user'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUser", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(32);
let LocalAuthGuard = class LocalAuthGuard extends passport_1.AuthGuard('local') {
};
LocalAuthGuard = __decorate([
    common_1.Injectable()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(32);
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException({ message: 'Unauthorized.', type: 'access' });
        }
        return user;
    }
};
JwtAuthGuard = __decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const utility_1 = __webpack_require__(11);
const common_1 = __webpack_require__(4);
const common_2 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const auth_module_1 = __webpack_require__(31);
const user_controller_1 = __webpack_require__(45);
const user_schema_1 = __webpack_require__(46);
const user_service_1 = __webpack_require__(36);
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_2.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: user_schema_1.userSchema
                }
            ]),
            utility_1.UtilityModule,
            search_1.SearchModule,
            database_1.DatabaseModule,
            common_1.forwardRef(() => auth_module_1.AuthModule)
        ],
        exports: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(34);
const jwt_auth_guard_1 = __webpack_require__(43);
const user_service_1 = __webpack_require__(36);
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    searchUsers(req) {
        return this.userService.searchUsers(req.query);
    }
    async getDashboardUserData() {
        return await this.userService.getDashboardUserData();
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    saveUser(body) {
        return this.userService.saveUser(body);
    }
    deleteUserById(id, req) {
        return this.userService.deleteUserById(id, req.user);
    }
    async getUserByResetCode(resetCode) {
        let user = await this.userService.getUserByResetCode(resetCode);
        return this.authService.login(user);
    }
    async resetPasswordStart(body) {
        await this.userService.resetPasswordStart(body.username);
        return true;
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "searchUsers", null);
__decorate([
    common_1.Get('/dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDashboardUserData", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "saveUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserById", null);
__decorate([
    common_1.Get('/resetCode/:resetCode'),
    __param(0, common_1.Param('resetCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByResetCode", null);
__decorate([
    common_1.Post('/reset'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordStart", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.userSchema = void 0;
const mongoose = __webpack_require__(8);
const user_interface_1 = __webpack_require__(47);
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_interface_1.User; } }));
const ObjectId = mongoose.Schema.Types.ObjectId;
exports.userSchema = new mongoose.Schema({
    active: Boolean,
    locked: Boolean,
    type: { type: String },
    company: String,
    firstName: String,
    lastName: String,
    fullName: String,
    email: { type: String, index: true, unique: true, sparse: true },
    phone: { type: String, index: true, unique: true, sparse: true },
    password: { type: String, select: false },
    resetCode: { type: String, select: false },
    attempts: { type: Number, default: 0, select: false },
    passwordDate: { type: Date, select: false },
    __v: { type: Number, select: false },
    createDate: Date,
    updateDate: Date,
    createUser: { type: ObjectId, ref: 'User' },
    updateUser: { type: ObjectId, ref: 'User' },
    deleted: Boolean,
    deleteDate: Date,
    deleteUser: { type: ObjectId, ref: 'User' }
});


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(50), exports);
__exportStar(__webpack_require__(52), exports);
__exportStar(__webpack_require__(51), exports);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const product_service_1 = __webpack_require__(50);
const product_controller_1 = __webpack_require__(53);
const product_schema_1 = __webpack_require__(51);
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [database_1.DatabaseModule, mongoose_1.MongooseModule.forFeature([{ name: 'Product', schema: product_schema_1.productSchema }]), search_1.SearchModule],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [product_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = exports.ProductDocument = exports.Product = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const product_schema_1 = __webpack_require__(51);
Object.defineProperty(exports, "Product", ({ enumerable: true, get: function () { return product_schema_1.Product; } }));
Object.defineProperty(exports, "ProductDocument", ({ enumerable: true, get: function () { return product_schema_1.ProductDocument; } }));
let ProductService = class ProductService {
    constructor(productModel, documentService, searchService) {
        this.productModel = productModel;
        this.documentService = documentService;
        this.searchService = searchService;
    }
    searchProducts(queryParams) {
        return this.searchService.searchModelFromQueryParams(this.productModel, queryParams, {
            filterFunction: async (params) => {
                const query = { deleted: { $ne: true } };
                if (!params.filter)
                    return query;
                if (params.filter.company)
                    query.company = params.filter.company;
                if (params.filter.type)
                    query.type = params.filter.type;
                if (params.filter.sku)
                    query.sku = this.searchService.regexMatch(params.filter.sku);
                if (params.filter.name)
                    query.name = this.searchService.regexMatch(params.filter.name);
                return query;
            },
            lean: true,
            populates: [{ path: 'company' }]
        });
    }
    getProductById(productId) {
        return this.productModel.findById(productId).populate('company').exec();
    }
    saveProduct(product, savingUser) {
        if (!product._id) {
            if (!product.sku)
                throw new common_1.BadRequestException({ message: 'Product must a SKU.' });
        }
        if (savingUser) {
            if (!product._id) {
                product.createUser = savingUser;
                product.createDate = new Date();
            }
            else {
                product.updateUser = savingUser;
                product.updateDate = new Date();
            }
        }
        return this.documentService.saveDocument(this.productModel, product);
    }
    async deleteProductById(productId, deletingUser) {
        const product = await this.getProductById(productId);
        if (!product)
            throw new common_1.HttpException({ message: 'Product not found.', productId }, 404);
        product.deleted = true;
        product.deleteUser = deletingUser;
        product.deleteDate = new Date();
        return product.save();
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [typeof (_a = typeof database_1.mongoose !== "undefined" && database_1.mongoose.Model) === "function" ? _a : Object, typeof (_b = typeof database_1.DocumentService !== "undefined" && database_1.DocumentService) === "function" ? _b : Object, typeof (_c = typeof search_1.SearchService !== "undefined" && search_1.SearchService) === "function" ? _c : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = exports.productSchema = void 0;
const mongoose = __webpack_require__(8);
const product_interface_1 = __webpack_require__(52);
Object.defineProperty(exports, "Product", ({ enumerable: true, get: function () { return product_interface_1.Product; } }));
const ObjectId = mongoose.Schema.Types.ObjectId;
exports.productSchema = new mongoose.Schema({
    sku: { type: String, index: true },
    type: { type: String, index: true },
    name: String,
    __v: { type: Number, select: false },
    createDate: Date,
    updateDate: Date,
    createUser: { type: ObjectId, ref: 'User' },
    updateUser: { type: ObjectId, ref: 'User' },
    deleted: Boolean,
    deleteDate: Date,
    deleteUser: { type: ObjectId, ref: 'User' }
});


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(4);
const jwt_auth_guard_1 = __webpack_require__(43);
const product_service_1 = __webpack_require__(50);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    searchProducts(req) {
        return this.productService.searchProducts(req.query);
    }
    getProductById(productId) {
        return this.productService.getProductById(productId);
    }
    saveProduct(body, req) {
        return this.productService.saveProduct(body, req.user);
    }
    deleteProductById(productId, req) {
        return this.productService.deleteProductById(productId, req.user);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "searchProducts", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductById", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "saveProduct", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProductById", null);
ProductController = __decorate([
    common_1.Controller('product'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationModule = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const application_service_1 = __webpack_require__(55);
const application_controller_1 = __webpack_require__(58);
const application_schema_1 = __webpack_require__(56);
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [database_1.DatabaseModule, mongoose_1.MongooseModule.forFeature([{ name: 'Application', schema: application_schema_1.applicationSchema }]), search_1.SearchModule],
        controllers: [application_controller_1.ApplicationController],
        providers: [application_service_1.ApplicationService],
        exports: [application_service_1.ApplicationService]
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationService = exports.ApplicationDocument = exports.Application = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const application_schema_1 = __webpack_require__(56);
Object.defineProperty(exports, "Application", ({ enumerable: true, get: function () { return application_schema_1.Application; } }));
Object.defineProperty(exports, "ApplicationDocument", ({ enumerable: true, get: function () { return application_schema_1.ApplicationDocument; } }));
let ApplicationService = class ApplicationService {
    constructor(applicationModel, documentService, searchService) {
        this.applicationModel = applicationModel;
        this.documentService = documentService;
        this.searchService = searchService;
    }
    searchApplications(queryParams) {
        return this.searchService.searchModelFromQueryParams(this.applicationModel, queryParams, {
            filterFunction: async (params) => {
                const query = { deleted: { $ne: true } };
                if (!params.filter)
                    return query;
                if (params.filter.name)
                    query.name = this.searchService.regexMatch(params.filter.name);
                return query;
            },
            lean: true
        });
    }
    getApplicationById(applicationId) {
        return this.applicationModel.findById(applicationId).populate('company').exec();
    }
    saveApplication(application, savingUser) {
        if (savingUser) {
            if (!application._id) {
                application.createUser = savingUser;
                application.createDate = new Date();
            }
            else {
                application.updateUser = savingUser;
                application.updateDate = new Date();
            }
        }
        return this.documentService.saveDocument(this.applicationModel, application);
    }
    async deleteApplicationById(applicationId, deletingUser) {
        const application = await this.getApplicationById(applicationId);
        if (!application)
            throw new common_1.HttpException({ message: 'Application not found.', applicationId }, 404);
        application.deleted = true;
        application.deleteUser = deletingUser;
        application.deleteDate = new Date();
        return application.save();
    }
    async deleteApplicationPageById(applicationId, pageId, deletingUser) {
        var _a;
        const application = await this.getApplicationById(applicationId);
        if (!application)
            throw new common_1.HttpException({ message: 'Application not found.', applicationId }, 404);
        const section = application.sections.find((s) => s.pages.find((p) => p._id.equals(pageId)));
        if (!section)
            throw new common_1.HttpException({ message: 'Page not found.', applicationId, pageId }, 404);
        (_a = section.pages.id(pageId)) === null || _a === void 0 ? void 0 : _a.remove();
        return application.save();
    }
    async deleteApplicationSectionById(applicationId, sectionId, deletingUser) {
        var _a;
        const application = await this.getApplicationById(applicationId);
        if (!application)
            throw new common_1.HttpException({ message: 'Application not found.', applicationId }, 404);
        (_a = application.sections.id(sectionId)) === null || _a === void 0 ? void 0 : _a.remove();
        return application.save();
    }
};
ApplicationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Application')),
    __metadata("design:paramtypes", [typeof (_a = typeof database_1.mongoose !== "undefined" && database_1.mongoose.Model) === "function" ? _a : Object, typeof (_b = typeof database_1.DocumentService !== "undefined" && database_1.DocumentService) === "function" ? _b : Object, typeof (_c = typeof search_1.SearchService !== "undefined" && search_1.SearchService) === "function" ? _c : Object])
], ApplicationService);
exports.ApplicationService = ApplicationService;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Application = exports.applicationSchema = void 0;
const mongoose = __webpack_require__(8);
const application_interface_1 = __webpack_require__(57);
Object.defineProperty(exports, "Application", ({ enumerable: true, get: function () { return application_interface_1.Application; } }));
const ObjectId = mongoose.Schema.Types.ObjectId;
exports.applicationSchema = new mongoose.Schema({
    name: String,
    sections: [
        {
            order: Number,
            title: String,
            pages: [
                {
                    type: { type: String },
                    order: Number,
                    name: String,
                    title: String,
                    subTitle: String,
                    questions: [
                        {
                            order: Number,
                            type: { type: String },
                            label: String,
                            key: String,
                            bullhornKey: String,
                            optional: Boolean,
                            options: [
                                {
                                    order: Number,
                                    value: mongoose.Schema.Types.Mixed,
                                    label: String,
                                    helperText: String,
                                    nextPageName: String,
                                    nextPageId: ObjectId
                                }
                            ]
                        }
                    ],
                    heroImage: String,
                    heroHtml: String,
                    nextPageName: String,
                    nextPageId: ObjectId
                }
            ]
        }
    ],
    __v: { type: Number, select: false },
    createDate: Date,
    updateDate: Date,
    createUser: { type: ObjectId, ref: 'User' },
    updateUser: { type: ObjectId, ref: 'User' },
    deleted: Boolean,
    deleteDate: Date,
    deleteUser: { type: ObjectId, ref: 'User' }
}, {
    minimize: false
});


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationController = void 0;
const common_1 = __webpack_require__(4);
const jwt_auth_guard_1 = __webpack_require__(43);
const application_service_1 = __webpack_require__(55);
let ApplicationController = class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    searchApplications(req) {
        return this.applicationService.searchApplications(req.query);
    }
    getApplicationById(applicationId) {
        return this.applicationService.getApplicationById(applicationId);
    }
    saveApplication(body, req) {
        return this.applicationService.saveApplication(body, req.user);
    }
    deleteApplicationById(applicationId, req) {
        return this.applicationService.deleteApplicationById(applicationId, req.user);
    }
    deleteApplicationPageById(applicationId, pageId, req) {
        return this.applicationService.deleteApplicationPageById(applicationId, pageId, req.user);
    }
    deleteApplicationSectionyId(applicationId, sectionId, req) {
        return this.applicationService.deleteApplicationSectionById(applicationId, sectionId, req.user);
    }
};
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "searchApplications", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:applicationId'),
    __param(0, common_1.Param('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getApplicationById", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveApplication", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:applicationId'),
    __param(0, common_1.Param('applicationId')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "deleteApplicationById", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:applicationId/page/:pageId'),
    __param(0, common_1.Param('applicationId')),
    __param(1, common_1.Param('pageId')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "deleteApplicationPageById", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:applicationId/section/:sectionId'),
    __param(0, common_1.Param('applicationId')),
    __param(1, common_1.Param('sectionId')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "deleteApplicationSectionyId", null);
ApplicationController = __decorate([
    common_1.Controller('application'),
    __metadata("design:paramtypes", [typeof (_a = typeof application_service_1.ApplicationService !== "undefined" && application_service_1.ApplicationService) === "function" ? _a : Object])
], ApplicationController);
exports.ApplicationController = ApplicationController;


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BullhornModule = void 0;
const common_1 = __webpack_require__(4);
const bullhorn_service_1 = __webpack_require__(60);
let BullhornModule = class BullhornModule {
};
BullhornModule = __decorate([
    common_1.Module({
        providers: [bullhorn_service_1.BullhornService],
        exports: [bullhorn_service_1.BullhornService]
    })
], BullhornModule);
exports.BullhornModule = BullhornModule;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BullhornService = void 0;
const utility_1 = __webpack_require__(11);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const bullhorn_api_1 = __webpack_require__(61);
let BullhornService = class BullhornService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new utility_1.LoggerService('BullhornService');
        this.bullhorn = new bullhorn_api_1.default({
            client_id: this.configService.get('BULLHORN_CLIENT_ID'),
            client_secret: this.configService.get('BULLHORN_CLIENT_SECRET'),
            username: this.configService.get('BULLHORN_USERNAME'),
            password: this.configService.get('BULLHORN_PASSWORD')
        });
        this.login();
    }
    async login() {
        const result = await this.bullhorn.login().catch((err) => {
            this.logger.error('BullhornService.login: err=%o', err);
        });
        this.logger.debug('BullhornService.login: result=%o', result);
    }
    async testBullhorn() {
        const loginResult = await this.bullhorn.login();
        console.log('testBullhorn: Login successful');
        const candidateId = 48165;
        console.log('candidateId=%o', candidateId);
    }
    async addCandidate(candidate) {
        await this.login();
        candidate.name = [candidate.firstName, candidate.lastName]
            .map((p) => String(p).trim())
            .filter((p) => p)
            .join(' ');
        const result = await this.bullhorn.fetch(`entity/Candidate`, {
            method: 'PUT',
            body: JSON.stringify(candidate)
        });
        const data = await result.json();
        this.logger.debug('addCandidate: candidate=%o, result=%o', candidate, data);
        return data === null || data === void 0 ? void 0 : data.changedEntityId;
    }
    async addCandidateNote(candidateId, noteType, noteBody) {
        const payload = {
            personReference: { id: candidateId },
            comments: noteBody,
            action: noteType,
            commentingPerson: { id: 9009 }
        };
        const result = await this.bullhorn.fetch(`entity/Note`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
        const data = await result.json();
        this.logger.debug('addCandidateNote: payload=%o, result=%o', payload, data);
        return data === null || data === void 0 ? void 0 : data.changedEntityId;
    }
    async addJobSubmission(candidateId, jobId) {
        const result = await this.bullhorn.fetch(`entity/JobSubmission`, {
            method: 'PUT',
            body: JSON.stringify({
                candidate: { id: candidateId },
                jobOrder: { id: jobId },
                status: 'New Lead'
            })
        });
        const data = await result.json();
        this.logger.debug('addJobSubmission: candidateId=%o, jobId=%o, result=%o', data);
        return data === null || data === void 0 ? void 0 : data.changedEntityId;
    }
};
BullhornService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], BullhornService);
exports.BullhornService = BullhornService;


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("bullhorn-api");

/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationResponseModule = void 0;
const common_1 = __webpack_require__(4);
const application_response_service_1 = __webpack_require__(63);
const application_response_controller_1 = __webpack_require__(68);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const mongoose_1 = __webpack_require__(10);
const application_response_schema_1 = __webpack_require__(65);
const bullhorn_module_1 = __webpack_require__(59);
const utility_1 = __webpack_require__(11);
let ApplicationResponseModule = class ApplicationResponseModule {
};
ApplicationResponseModule = __decorate([
    common_1.Module({
        imports: [database_1.DatabaseModule, mongoose_1.MongooseModule.forFeature([{ name: 'ApplicationResponse', schema: application_response_schema_1.applicationResponseSchema }]), search_1.SearchModule, bullhorn_module_1.BullhornModule, utility_1.UtilityModule],
        controllers: [application_response_controller_1.ApplicationResponseController],
        providers: [application_response_service_1.ApplicationResponseService],
        exports: [application_response_service_1.ApplicationResponseService]
    })
], ApplicationResponseModule);
exports.ApplicationResponseModule = ApplicationResponseModule;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationResponseService = exports.ApplicationResponseDocument = exports.ApplicationResponse = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const schedule_1 = __webpack_require__(6);
const luxon_1 = __webpack_require__(64);
const database_1 = __webpack_require__(7);
const search_1 = __webpack_require__(25);
const utility_1 = __webpack_require__(11);
const application_response_schema_1 = __webpack_require__(65);
Object.defineProperty(exports, "ApplicationResponse", ({ enumerable: true, get: function () { return application_response_schema_1.ApplicationResponse; } }));
Object.defineProperty(exports, "ApplicationResponseDocument", ({ enumerable: true, get: function () { return application_response_schema_1.ApplicationResponseDocument; } }));
const bullhorn_service_1 = __webpack_require__(60);
const config_1 = __webpack_require__(5);
let ApplicationResponseService = class ApplicationResponseService {
    constructor(responseModel, documentService, searchService, bullhornService, configService, postmarkService) {
        this.responseModel = responseModel;
        this.documentService = documentService;
        this.searchService = searchService;
        this.bullhornService = bullhornService;
        this.configService = configService;
        this.postmarkService = postmarkService;
        this.logger = new utility_1.LoggerService('ApplicationResponse');
        setTimeout(() => this.resubmitResponses(), 5000);
    }
    async resubmitResponses() {
        const responses = await this.responseModel.find({
            status: 'submitted',
            $or: [{ bullhornCandidateId: { $exists: false } }, { bullhornJobSubId: { $exists: false } }]
        });
        this.logger.log('resubmitResponses: responses=%o', responses.length);
        return utility_1.serialPromise(responses, (response) => {
            return this.submitResponseToBullhorn(response).catch((err) => {
                this.logger.error('resubmitResponses: submitResponseToBullhorn err=%o', err);
                return null;
            });
        });
    }
    searchResponses(queryParams) {
        return this.searchService.searchModelFromQueryParams(this.responseModel, queryParams, {
            filterFunction: async (params) => {
                const query = { deleted: { $ne: true } };
                if (!params.filter)
                    return query;
                if (params.filter.name) {
                    query['$or'] = [
                        {
                            questionAnswers: {
                                $elemMatch: {
                                    questionKey: 'firstName',
                                    answer: this.searchService.regexMatch(params.filter.name)
                                }
                            }
                        },
                        {
                            questionAnswers: {
                                $elemMatch: {
                                    questionKey: 'lastName',
                                    answer: this.searchService.regexMatch(params.filter.name)
                                }
                            }
                        }
                    ];
                }
                return query;
            },
            lean: true
        });
    }
    getResponseById(responseId) {
        return this.responseModel.findById(responseId).populate('company').exec();
    }
    onFailedBullhornSubmission(response, responseNote, error) {
        const to = this.configService.get('FAILED_BULLHORN_EMAIL');
        if (!to)
            return;
        const html = `<p>Bullhorn Failed with Error: <pre>${JSON.stringify(error)}</pre></p>` +
            `<hr><p>applicationResponseId: ${response._id}</p><hr>` +
            responseNote +
            `<hr><pre>${JSON.stringify(response.questionAnswers)}</pre>`;
        this.postmarkService.sendEmail({
            to,
            subject: 'Tulsa Remote - Failed Submission',
            html
        });
    }
    saveResponse(response) {
        return this.documentService.saveDocument(this.responseModel, response, {
            afterSave: (newDoc, oldDoc) => this.afterSave(newDoc, oldDoc)
        });
    }
    async afterSave(newDoc, oldDoc) {
        this.logger.log('saveResponse: %o', Object.assign(Object.assign({}, newDoc.toObject()), { application: undefined, questionAnswers: newDoc.questionAnswers.map((qa) => `${qa.questionKey}: ${qa.answer}`) }));
        if (newDoc.status === 'submitted' && (oldDoc === null || oldDoc === void 0 ? void 0 : oldDoc.status) !== 'submitted')
            this.submitResponseToBullhorn(newDoc);
    }
    async submitResponseToBullhorn(response) {
        this.logger.log('submitResponseToBullhorn: %o', Object.assign(Object.assign({}, response.toObject()), { application: undefined, questionAnswers: response.questionAnswers.map((qa) => `${qa.questionKey}: ${qa.answer}`) }));
        const candidate = {
            status: 'New Applicant'
        };
        const appNoteLines = [];
        const partnerNoteLines = [];
        const responseNoteLines = [];
        response.questionAnswers.map((qa) => {
            var _a, _b, _c, _d, _e;
            const question = this.findQuestionByQuestionKey(response.application, qa.questionKey);
            if (!question)
                return;
            if (question.type === 'url' && qa.answer) {
                qa.answer = `https://${qa.answer}`;
            }
            const bullhornKey = question === null || question === void 0 ? void 0 : question.bullhornKey;
            if (!bullhornKey)
                return;
            const noteLine = `<b>${question.label || question.key}</b><br>${qa.answerLabel || qa.answer}`;
            responseNoteLines.push(noteLine);
            switch (bullhornKey) {
                case 'dateOfBirth':
                    candidate['dateOfBirth'] = luxon_1.DateTime.fromISO(qa.answer).toMillis();
                    break;
                case 'customDate12':
                    candidate['customDate12'] = luxon_1.DateTime.fromISO(qa.answer).toMillis();
                    break;
                case 'note.application':
                    appNoteLines.push(noteLine);
                    break;
                case 'note.partner':
                    partnerNoteLines.push(noteLine);
                    break;
                case 'secondaryAddress':
                    candidate['secondaryAddress'] = {
                        address1: (_a = response.questionAnswers.find((qa) => qa.questionKey === 'address.street1')) === null || _a === void 0 ? void 0 : _a.answer,
                        address2: (_b = response.questionAnswers.find((qa) => qa.questionKey === 'address.street2')) === null || _b === void 0 ? void 0 : _b.answer,
                        city: (_c = response.questionAnswers.find((qa) => qa.questionKey === 'address.city')) === null || _c === void 0 ? void 0 : _c.answer,
                        state: (_d = response.questionAnswers.find((qa) => qa.questionKey === 'address.state')) === null || _d === void 0 ? void 0 : _d.answer,
                        zip: (_e = response.questionAnswers.find((qa) => qa.questionKey === 'address.zipcode')) === null || _e === void 0 ? void 0 : _e.answer
                    };
                    break;
                default:
                    candidate[bullhornKey] = qa.answer;
            }
        });
        const appNote = appNoteLines.join('<br><br>');
        const partnerNote = partnerNoteLines.join('<br><br>');
        const responseNote = responseNoteLines.join('<br><br>');
        try {
            if (!response.bullhornCandidateId) {
                const candidateId = await this.bullhornService.addCandidate(candidate);
                this.logger.log('submitResponseToBullhorn: candidateId=%o', candidateId);
                if (candidateId) {
                    const appNoteId = await this.bullhornService.addCandidateNote(candidateId, 'Application Note', appNote);
                    this.logger.log('submitResponseToBullhorn: appNoteId=%o', appNoteId);
                    if (partnerNote) {
                        const partnerNoteId = await this.bullhornService.addCandidateNote(candidateId, 'Partner Note', partnerNote);
                        this.logger.log('submitResponseToBullhorn: partnerNoteId=%o', partnerNoteId);
                    }
                    if (Object.keys(response.utmCodes).length) {
                        const utmNoteId = await this.bullhornService.addCandidateNote(candidateId, 'UTM Note', JSON.stringify(response.utmCodes));
                        this.logger.log('submitResponseToBullhorn: utmCodes=%o, utmNoteId=%o', response.utmCodes, utmNoteId);
                    }
                    const responseNoteId = await this.bullhornService.addCandidateNote(candidateId, 'Entire Application', responseNote);
                    this.logger.log('submitResponseToBullhorn: responseNoteId=%o', responseNoteId);
                    response.bullhornCandidateId = candidateId;
                }
            }
            const jobId = +this.configService.get('BULLHORN_JOBID') || 66;
            this.logger.debug('submitResponseToBullhorn: jobId=%o', jobId);
            if (jobId && response.bullhornCandidateId && !response.bullhornJobSubId) {
                response.bullhornJobSubId = await this.bullhornService.addJobSubmission(response.bullhornCandidateId, jobId);
                this.logger.log('submitResponseToBullhorn: bullhornJobSubId=%o', response.bullhornJobSubId);
            }
            if (response.bullhornCandidateId || response.bullhornJobSubId) {
                await response.save();
            }
        }
        catch (err) {
            this.onFailedBullhornSubmission(response, responseNote, (err === null || err === void 0 ? void 0 : err.stack) || err);
        }
    }
    findQuestionByQuestionKey(application, questionKey) {
        const section = application.sections.find((s) => s.pages.find((p) => p.questions.find((q) => q.key === questionKey)));
        if (!section)
            return null;
        const page = section.pages.find((p) => p.questions.find((q) => q.key === questionKey));
        if (!page)
            return null;
        return page.questions.find((q) => q.key === questionKey);
    }
};
__decorate([
    schedule_1.Cron('0 3 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationResponseService.prototype, "resubmitResponses", null);
ApplicationResponseService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('ApplicationResponse')),
    __metadata("design:paramtypes", [typeof (_a = typeof database_1.mongoose !== "undefined" && database_1.mongoose.Model) === "function" ? _a : Object, typeof (_b = typeof database_1.DocumentService !== "undefined" && database_1.DocumentService) === "function" ? _b : Object, typeof (_c = typeof search_1.SearchService !== "undefined" && search_1.SearchService) === "function" ? _c : Object, typeof (_d = typeof bullhorn_service_1.BullhornService !== "undefined" && bullhorn_service_1.BullhornService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object, typeof (_f = typeof utility_1.PostmarkService !== "undefined" && utility_1.PostmarkService) === "function" ? _f : Object])
], ApplicationResponseService);
exports.ApplicationResponseService = ApplicationResponseService;


/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("luxon");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationResponse = exports.applicationResponseSchema = void 0;
const mongoose = __webpack_require__(8);
const application_1 = __webpack_require__(66);
const application_response_interface_1 = __webpack_require__(67);
Object.defineProperty(exports, "ApplicationResponse", ({ enumerable: true, get: function () { return application_response_interface_1.ApplicationResponse; } }));
const ObjectId = mongoose.Schema.Types.ObjectId;
exports.applicationResponseSchema = new mongoose.Schema({
    name: String,
    utmCodes: Object,
    status: String,
    lastPage: String,
    ipAddress: String,
    application: application_1.applicationSchema,
    questionAnswers: [
        {
            questionKey: String,
            answer: mongoose.Schema.Types.Mixed,
            answerLabel: String
        }
    ],
    bullhornCandidateId: Number,
    bullhornJobSubId: Number,
    bummerEmail: String,
    __v: { type: Number, select: false },
    createDate: Date,
    updateDate: Date,
    deleted: Boolean,
    deleteDate: Date,
    deleteUser: { type: ObjectId, ref: 'User' }
}, {
    collection: 'applicationResponses'
});


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationResponseController = void 0;
const common_1 = __webpack_require__(4);
const jwt_auth_guard_1 = __webpack_require__(43);
const application_response_service_1 = __webpack_require__(63);
let ApplicationResponseController = class ApplicationResponseController {
    constructor(responseService) {
        this.responseService = responseService;
    }
    saveApplication(body, req) {
        return this.responseService.saveResponse(body);
    }
    searchApplications(req) {
        return this.responseService.searchResponses(req.query);
    }
    getApplicationById(applicationId) {
        return this.responseService.getResponseById(applicationId);
    }
};
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationResponseController.prototype, "saveApplication", null);
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationResponseController.prototype, "searchApplications", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:applicationId'),
    __param(0, common_1.Param('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationResponseController.prototype, "getApplicationById", null);
ApplicationResponseController = __decorate([
    common_1.Controller('response'),
    __metadata("design:paramtypes", [typeof (_a = typeof application_response_service_1.ApplicationResponseService !== "undefined" && application_response_service_1.ApplicationResponseService) === "function" ? _a : Object])
], ApplicationResponseController);
exports.ApplicationResponseController = ApplicationResponseController;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const body_parser_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const config_1 = __webpack_require__(5);
const utility_1 = __webpack_require__(11);
const logger = new utility_1.LoggerService('Main');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger
    });
    app.use(body_parser_1.json({ limit: '16MB' }));
    app.enableCors();
    app.setGlobalPrefix('/api');
    const configService = app.get(config_1.ConfigService);
    const port = +configService.get('PORT') || 5000;
    await app.listen(port);
    logger.log('Listening on port %o', port);
}
bootstrap();

})();

/******/ })()
;