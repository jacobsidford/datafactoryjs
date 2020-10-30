interface ICreateOptions {
	modelExtensions: object;
	extendModel: boolean;
};

export class DataFactory {
	registeredTypes = new Map();

	register<T>(modelName: string | (T & Function), objectValues: () => T) {
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
		options: ICreateOptions = {
			modelExtensions: {},
			extendModel: false
		}
	): T[] {
		const name = (typeof modelName === 'string'
			? modelName
			: (modelName as T & Function).name) as string;

		const factoryModel = this.registeredTypes.get(name);

		if (!factoryModel) {
			throw new Error(`${name} does not exist in data factory`);
		}

		if (options.modelExtensions && !options.extendModel) {
			options.modelExtensions = this.filterExtensionValues(
				factoryModel(),
				options.modelExtensions
			);
		}

		const objects: T[] = [];
		for (let i = count; i--; ) {
			objects.push(this.instantiateObject(name, options.modelExtensions));
		}
		return objects;
	}

	createSingle<T>(
		modelName: string | (T & Function),
		options: ICreateOptions = {
			modelExtensions: {},
			extendModel: false
		}
	): T {
		return this.create<T>(modelName, 1, { ...options })[0];
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
