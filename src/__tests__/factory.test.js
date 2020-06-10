import { DataFactory } from 'datafactoryjs';

const user = {
	id: '1',
	firstName: 'John',
	lastName: 'Smith'
};

describe('DataFactory.register', () => {
	test('should store object generating functions in the factory', () => {
		const factory = new DataFactory();
		factory.register('user', () => {
			return user;
		});

		expect(factory.registeredTypes.has('user')).toBe(true);
		expect(factory.registeredTypes.get('user')()).toBe(user);
	});

	test('should error if object function exists in factory already', () => {
		const factory = new DataFactory();
		factory.register('user', () => {
			return user;
		});

		expect(() => {
			factory.register('user', null);
		}).toThrow('user already exists in data factory');
	});
});

describe('DataFactory.create', () => {
	const factory = new DataFactory();
	factory.register('user', () => {
		return user;
	});

	test('should return an empty array if passed zero count', () => {
		const createdUsers = factory.create('user', 0);
		expect(createdUsers).toEqual([]);
	});

	test('should return an array with 1 user if passed count of 1', () => {
		const createdUsers = factory.create('user', 1);
		expect(createdUsers).toEqual([user]);
	});

	test('should return an array with 2 users if passed count of 2', () => {
		const createdUsers = factory.create('user', 2);
		expect(createdUsers.length).toEqual(2);
		expect(createdUsers[0]).toEqual(user);
		expect(createdUsers[1]).toEqual(user);
	});

	test('should return an array with 2 randomUsers if passed count of 2 & registered function returning randomized data', () => {
		factory.register('randomizedUser', () => {
			return {
				id: Math.floor(Math.random() * 10000 + 1),
				name: 'John'
			};
		});

		const randomizedUsers = factory.create('randomizedUser', 2);
		expect(randomizedUsers.length).toEqual(2);
		expect(randomizedUsers[0] === randomizedUsers[1]).toEqual(false);
	});

	test('should error if object you are trying to create does not exist', () => {
		expect(() => {
			factory.create('non-existant', 0);
		}).toThrow('non-existant does not exist in data factory');
	});
});
