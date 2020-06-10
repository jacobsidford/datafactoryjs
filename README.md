# DataFactoryJs

Simple javascript factory for generating test data

## Install

```
$ npm install --save-dev datafactoryjs
```

## Usage

```js
// Register objects into the factory

const factory = require('datafactoryjs');

factory.register('user', () => {
	return {
		id: '1',
		name: 'John Smith'
	};
});

// Generate N objects

const users = factory.create('user', 2);
// [{ id:'1', name: 'John Smith' }, { id:'1', name: 'John Smith' }]
```

You can overwrite data with custom attributes if you want to assert a value

```js
const users = factory.create('user', 1, { name: 'Joe Doe' });
// [{ id:'1', name: 'Joe Doe' }]
```

The benefit of registering functions is being able to generate randomized data, I use [Faker](https://www.npmjs.com/package/faker) for this

```js
const factory = require("datafactoryjs");
const faker = require('faker');

   factory.register('user', () => {
        return {
           id: faker.random.uuid(),
           name: faker.name.firstName(),
    }

    factory.create('user', 50);
// This will return an array of 50 unique users
```