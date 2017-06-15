"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const meta_1 = require("./meta");
/**
 * Gets the mongoose schema for a decorated class
 * @param {Function} target
 * @param {boolean} loadClass indicating if load setters + getters, static methods, and instance methods from the target class to schema
 */
function buildSchema(target, loadClass = true) {
    let schema = new Mongoose.Schema(meta_1.getMetadata(target.prototype).schemaObj);
    // loadClass to map setters + getters, static methods, and instance methods to schema virtuals, statics, and methods
    if (loadClass) {
        setSchemaFromClass(target, schema);
    }
    // set schema based on meta inputs
    setSchemaFromMeta(target, schema);
    return schema;
}
exports.buildSchema = buildSchema;
function setSchemaFromMeta(target, schema) {
    const meta = meta_1.getMetadata(target.prototype);
    // set statics
    meta.statics.forEach(([name, fn]) => {
        schema.statics[name] = fn;
    });
    // set instance methods
    meta.methods.forEach(([name, fn]) => {
        schema.method(name, fn);
    });
    // set virtuals
    meta.virtuals.forEach(([name, fn]) => {
        // getter
        if (typeof fn.get === 'function') {
            schema.virtual(name).get(fn.get);
        }
        // setter
        if (typeof fn.set === 'function') {
            schema.virtual(name).set(fn.set);
        }
        // virtual refs
        if (typeof fn.value === 'object') {
            schema.virtual(name, fn.value);
        }
    });
    // set schema level opts
    meta.options.forEach(([option, value]) => {
        schema.set(option, value);
    });
}
function setSchemaFromClass(target, schema) {
    // mongoose Schema.loadClass method
    schema.loadClass(target);
    // add static properties as loadClass doesn't cover such
    Object.getOwnPropertyNames(target).forEach(function (name) {
        if (name.match(/^(length|name|prototype)$/)) {
            return;
        }
        if (!schema.statics[name]) {
            let prop = Object.getOwnPropertyDescriptor(target, name);
            schema.statics[name] = prop.value;
        }
    });
}
//# sourceMappingURL=build-schema.js.map