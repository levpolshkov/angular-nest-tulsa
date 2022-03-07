import { Test, TestingModule } from '@nestjs/testing';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
	let service: UtilityService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UtilityService]
		}).compile();
		service = module.get<UtilityService>(UtilityService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('serialPromise([]) should resolve to an empty array', async () => {
		const result = await service.serialPromise([], (item) => item);
		expect(result).toBeDefined();
		expect(result.length).toBe(0);
	});

	it('serialPromise([1,2,3]) should resolve to [1,2,3]', async () => {
		const items = [1, 2, 3];
		const func = (value) => {
			return new Promise((resolve) => {
				setTimeout(() => resolve(value), 10 * Math.random()); // Resolve in a random order to mock async function
			});
		};
		const result = await service.serialPromise(items, func);
		expect(result).toBeDefined();
		expect(result).toEqual([1, 2, 3]);
	});
});
