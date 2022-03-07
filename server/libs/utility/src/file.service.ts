import { Injectable } from '@nestjs/common';
import * as pathModule from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
	rootPath = pathModule.join(__dirname, '..');

	constructor() {
		// console.log('FileService: rootPath=%o', this.rootPath);
	}

	readFile(path: string, format = 'utf8'): Promise<any> {
		return new Promise((resolve, reject) => {
			fs.readFile(path, format, (err, data) => {
				if (err) return reject(err);
				resolve(data);
			});
		});
	}

	writeFile(path: string, content: Buffer): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, content, (err) => {
				if (err) return reject(err);
				resolve(path);
			});
		});
	}

	copyFile(src: string, dest: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.copyFile(src, dest, (err) => {
				if (err) return reject(err);
				resolve(dest);
			});
		});
	}

	moveFile(src: string, dest: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.rename(src, dest, (err) => {
				if (err) return reject(err);
				resolve(dest);
			});
		});
	}

	async createDir(path: string): Promise<string> {
		if (await this.isDir(path)) return path;
		return new Promise((resolve, reject) => {
			fs.mkdir(path, (err) => {
				if (err) return reject(err);
				resolve(path);
			});
		});
	}
	async createDirRecursive(path: string) {
		const parts = path.split('/');
		parts.shift();
		let current = '/';
		return this.serialPromise(parts, (part) => {
			current += `${part}/`;
			return this.createDir(current);
		});
	}

	serialPromise(items: any[], func: Function) {
		let results = [],
			i = 0;
		return items
			.reduce((promise, item) => {
				return promise.then(() => func(item, i++)).then((r) => results.push(r));
			}, Promise.resolve())
			.then(() => results);
	}

	fileStats(file: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fs.stat(file, (err, stats) => {
				if (err || !stats) return resolve(null);
				resolve({
					isFile: stats && stats.isFile(),
					isDir: stats && stats.isDirectory()
				});
			});
		});
	}

	async isFile(path: string): Promise<boolean> {
		return this.fileStats(path).then((stats) => stats.isFile);
	}

	async isDir(path: string): Promise<boolean> {
		return this.fileStats(path).then((stats) => stats.isDir);
	}

	// Return path relative to root of project
	relativePath(path: string): string {
		return pathModule.join(this.rootPath, path);
	}
}
