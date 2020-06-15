export class DataFactory {
	registeredTypes = new Map();

	register(modelName: string, objectValues: Function) {
		if (!this.registeredTypes.has(modelName)) {
			this.registeredTypes.set(modelName, objectValues);
		} else {
			throw new Error(`${modelName} already exists in data factory`);
		}
	}

	create(
		modelName: string,
		count: number = 1,
		modelExtensions: object = {},
		extendModel: boolean = false
	): any[] {
		const factoryModel = this.registeredTypes.get(modelName);

		if (!factoryModel) {
			throw new Error(`${modelName} does not exist in data factory`);
		}

		if (modelExtensions && !extendModel) {
			modelExtensions = this.filterExtensionValues(
				factoryModel(),
				modelExtensions
			);
		}

		const objects = [];
		for (let i = count; i--; ) {
			objects.push(this.instantiateObject(modelName, modelExtensions));
		}
		return objects;
	}

	instantiateObject(modelName: string, modelExtensions: object | null): object {
		const model = this.registeredTypes.get(modelName);
		return {
			...model(),
			...modelExtensions
		};
	}

	filterExtensionValues(
		factoryModel: { [key: string]: any },
		modelExtensions: { [key: string]: any }
	): object {
		const extensionKeys = Object.keys(modelExtensions);
		const extensions = modelExtensions;

		for (let i = extensionKeys.length; i--; ) {
			const key = extensionKeys[i];
			if (!factoryModel[key]) {
				delete extensions[key];
			}
		}

		return extensions;
	}
}
