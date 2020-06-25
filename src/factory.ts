export class DataFactory {
	registeredTypes = new Map();

	register<T>(modelName: string | (T & Function), objectValues: Function) {
		const name = (typeof modelName === 'string'
			? modelName
			: (modelName as T & Function).name) as string;

		if (!this.registeredTypes.has(name)) {
			this.registeredTypes.set(name, objectValues);
		} else {
			throw new Error(`${name} already exists in data factory`);
		}
	}

	create<T>(
		modelName: string | (T & Function),
		count: number = 1,
		modelExtensions: object = {},
		extendModel: boolean = false
	): T[] {
		const name = (typeof modelName === 'string'
			? modelName
			: (modelName as T & Function).name) as string;

		const factoryModel = this.registeredTypes.get(name);

		if (!factoryModel) {
			throw new Error(`${name} does not exist in data factory`);
		}

		if (modelExtensions && !extendModel) {
			modelExtensions = this.filterExtensionValues(
				factoryModel(),
				modelExtensions
			);
		}

		const objects: T[] = [];
		for (let i = count; i--; ) {
			objects.push(this.instantiateObject(name, modelExtensions));
		}
		return objects;
	}

	createSingle<T>(
		modelName: string | (T & Function),
		modelExtensions: object = {},
		extendModel: boolean = false
	): T {
		return this.create<T>(modelName, 1, modelExtensions, extendModel)[0];
	}

	instantiateObject<T>(modelName: string, modelExtensions: object | null): T {
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
