export declare class DataFactory {
    registeredTypes: Map<any, any>;
    register(modelName: string, objectValues: Function): void;
    create(modelName: string, count?: number, modelExtensions?: object, extendModel?: boolean): any[];
    instantiateObject(modelName: string, modelExtensions: object | null): object;
    filterExtensionValues(factoryModel: {
        [key: string]: any;
    }, modelExtensions: {
        [key: string]: any;
    }): object;
}
