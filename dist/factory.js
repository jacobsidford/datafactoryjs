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
    DataFactory.prototype.register = function (modelName, objectValues) {
        if (!this.registeredTypes.has(modelName)) {
            this.registeredTypes.set(modelName, objectValues);
        }
        else {
            throw new Error(modelName + " already exists in data factory");
        }
    };
    DataFactory.prototype.create = function (modelName, count, modelExtensions, extendModel) {
        if (count === void 0) { count = 1; }
        if (modelExtensions === void 0) { modelExtensions = {}; }
        if (extendModel === void 0) { extendModel = false; }
        var factoryModel = this.registeredTypes.get(modelName);
        if (!factoryModel) {
            throw new Error(modelName + " does not exist in data factory");
        }
        if (modelExtensions && !extendModel) {
            modelExtensions = this.filterExtensionValues(factoryModel(), modelExtensions);
        }
        var objects = [];
        for (var i = count; i--;) {
            objects.push(this.instantiateObject(modelName, modelExtensions));
        }
        return objects;
    };
    DataFactory.prototype.instantiateObject = function (modelName, modelExtensions) {
        var model = this.registeredTypes.get(modelName);
        return __assign(__assign({}, model()), modelExtensions);
    };
    DataFactory.prototype.filterExtensionValues = function (factoryModel, modelExtensions) {
        var extensionKeys = Object.keys(modelExtensions);
        var extensions = modelExtensions;
        for (var i = extensionKeys.length; i--;) {
            var key = extensionKeys[i];
            if (!factoryModel[key]) {
                delete extensions[key];
            }
        }
        return extensions;
    };
    return DataFactory;
}());
exports.DataFactory = DataFactory;
