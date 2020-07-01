# DataFactoryJs

![CircleCI](https://img.shields.io/circleci/build/github/jacobsidford/datafactoryjs?token=1b2fcb60222b79f423e1cde88a21bf26c4bdc94d)
![npm bundle size](https://img.shields.io/bundlephobia/min/datafactoryjs?color=green)

Simple typescript factory for generating test data

## Install

```
$ npm install --save-dev datafactoryjs
```

## Usage

```js
// Register models into the factory

const factory = require('datafactoryjs');

factory.register('user', () => {
	return {
		id: '1',
		name: 'John Smith'
	};
});

// Generate a model

const user = factory.createSingle('user');

// { id: '1', name: 'John Smith'}


// Generate N models

const users = factory.create('user', 2);

// [{ id: '1', name: 'John Smith' }, { id: '1', name: 'John Smith' }]
```

You can overwrite data with fixed attributes if you want to assert a value, this will match the keys of the original model by default or you can enable extending the model to allow new attributes

```js
const users = factory.create('user', 1, {
	name: 'Joe Doe',
	superPower: 'Super Strong'
});

// [{ id:'1', name: 'Joe Doe' }]

// Can enable extending the original model

const users = factory.create('user', 1, { name: 'Joe Doe', superPower: 'Super Strong' }, true);

// [{ id:'1', name: 'Joe Doe', superPower: 'Super Strong' }]
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
