export declare class DataFactory {
    registeredTypes: Map<any, any>;
    register(objectName: string, objectValues: Function): void;
    create(objectName: string, count?: number, objectOptions?: object | null): any[];
    instantiateObject(objectName: string, objectOptions: object | null): object;
}
