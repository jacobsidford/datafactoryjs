export class DataFactory {
	registeredTypes = new Map();

	register(objectName, objectValues) {
		if (!this.registeredTypes.has(objectName)) {
			this.registeredTypes.set(objectName, objectValues);
		} else {
			throw new Error(`${objectName} already exists in data factory`);
		}
	}

	create(objectName, count = 1, objectOptions = null) {
		if (!this.registeredTypes.has(objectName)) {
			throw new Error(`${objectName} does not exist in data factory`);
		}

		const objects = [];
		for (let i = count; i--; ) {
			objects.push(this.instantiateObject(objectName, objectOptions));
		}
		return objects;
	}

	instantiateObject(objectName, objectOptions) {
		const object = this.registeredTypes.get(objectName);
		return {
			...object(),
			...objectOptions
		};
	}
}
