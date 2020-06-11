"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFactory = void 0;
var DataFactory = /** @class */ (function () {
    function DataFactory() {
        this.registeredTypes = new Map();
    }
    DataFactory.prototype.register = function (objectName, objectValues) {
        if (!this.registeredTypes.has(objectName)) {
            this.registeredTypes.set(objectName, objectValues);
        }
        else {
            throw new Error(objectName + " already exists in data factory");
        }
    };
    DataFactory.prototype.create = function (objectName, count, objectOptions) {
        if (count === void 0) { count = 1; }
        if (objectOptions === void 0) { objectOptions = null; }
        if (!this.registeredTypes.has(objectName)) {
            throw new Error(objectName + " does not exist in data factory");
        }
        var objects = [];
        for (var i = count; i--;) {
            objects.push(this.instantiateObject(objectName, objectOptions));
        }
        return objects;
    };
    DataFactory.prototype.instantiateObject = function (objectName, objectOptions) {
        var object = this.registeredTypes.get(objectName);
        return __assign(__assign({}, object()), objectOptions);
    };
    return DataFactory;
}());
exports.DataFactory = DataFactory;
