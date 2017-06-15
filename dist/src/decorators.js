"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Mongoose = require("mongoose");
const meta_1 = require("./meta");
function schema(options) {
    if (options && typeof options !== 'function') {
        return (target) => {
            const meta = meta_1.getMetadata(target.prototype);
            Object.keys(options).forEach((key) => {
                meta.options.push([key, options[key]]);
            });
        };
    }
}
exports.schema = schema;
/**
 * Decorates a field to be a schema field
 * @param {Mongoose.SchemaTypeOpts<any>} options Field options as defined by mongoose
 */
exports.field = makeFieldDecorator({});
/**
 * Specialization of @Field which marks a field required
 */
exports.required = makeFieldDecorator({ required: true });
/**
 * Specialization of @Field which marks a field to be an index
 */
exports.indexed = makeFieldDecorator({ index: true });
/**
 * Specialization of @Field which marks a field to be unique
 */
exports.unique = makeFieldDecorator({ unique: true });
/**
 * statics decorators for adding static functions/properties to the schema
 * @param target
 * @param propertyKey
 */
function statics(target, propertyKey) {
    if (target[propertyKey]) {
        meta_1.getMetadata(target.prototype).statics.push([propertyKey, target[propertyKey]]);
    }
}
exports.statics = statics;
/**
 * methods decorators for adding instance methods to the schema
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function methods(target, propertyKey, descriptor) {
    if (typeof descriptor.value === 'function') {
        meta_1.getMetadata(target).methods.push([propertyKey, descriptor.value]);
    }
}
exports.methods = methods;
function virtuals(target, propertyKey, descriptor) {
    if (descriptor && (descriptor.get || descriptor.set)) {
        meta_1.getMetadata(target).virtuals.push([propertyKey, descriptor]);
    }
    else {
        // for virtual reference
        let options = target;
        return (target, propertyKey) => {
            meta_1.getMetadata(target).virtuals.push([propertyKey, { value: options }]);
        };
    }
}
exports.virtuals = virtuals;
/**
 * produces field decorators
 *
 * Notes/Limits:
 * Only primitive types `Boolean`, `Number`, `String` can be set implicitly, otherwise it will be set to `Mongoose.Schema.Types.Mixed`
 * For decorated `Array` property, make sure provide type information, otherwise, it will be given type as `[Mongoose.Schema.Types.Mixed]`
 *
 * To set mongoose array reference, please make sure provide options as following format:
 * i.e. [{type: Number, ref: 'model'}]
 *
 * @required
 * @field([String])
 * the above decorators will make options as: [{type: String, required: true}]
 *
 * if required options are like: {type: [String], required: true}, consider followings:
 * @required
 * @field({type: [String]})
 *
 *
 * @param defaults
 */
function makeFieldDecorator(defaults) {
    function fieldDecorator(options, propertyKey) {
        if (propertyKey) {
            setFieldOptions(options, propertyKey, mergeOptions(defaults));
        }
        else {
            return (target, propertyKey) => {
                setFieldOptions(target, propertyKey, mergeOptions(defaults, options));
            };
        }
    }
    return fieldDecorator;
}
/**
 * helper method to merge schema field options
 * @param defaults
 * @param options
 */
function mergeOptions(defaults, options) {
    let opts = Array.isArray(options) ? options[0] : options;
    // standardize type option
    if (typeof opts === 'function') {
        opts = { type: opts };
    }
    opts = Object.assign({}, defaults, opts);
    return Array.isArray(options) ? [opts] : opts;
}
/**
 * Sets schema field options
 * if type information not provided, gathers type information via `reflect-metadata` from the decorated property
 * @param target
 * @param propertyKey
 * @param options
 */
function setFieldOptions(target, propertyKey, options) {
    let schemaObj = meta_1.getMetadata(target).schemaObj;
    let opts = schemaObj[propertyKey];
    if (!opts) {
        // get default options with type information based on the decorated property
        const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
        opts = { type: normalizeType(propertyType) };
    }
    schemaObj[propertyKey] = mergeOptions(opts, options);
}
/**
 * Gets type from the decorated property, which can be used as a valid mongoose schema type
 * @param type type information gathered from `reflect-metadata` from the decorated property. It can be one of the followings:
 * `number` serialized as Number
 * `string` serialized as String
 * `boolean` serialized as Boolean
 * `any` serialized as Object
 * `void` serializes as undefined
 * `Array` serialized as Array
 * If a `Tuple`, serialized as Array
 * If a `class` serialized it as the class constructor
 * If an `Enum` serialized it as Number
 * If has at least one call signature, serialized as `Function`
 * Otherwise serialized as `Object` (Including interfaces)
 */
function normalizeType(type) {
    const acceptableTypes = [
        Boolean,
        Number,
        String,
    ];
    if (acceptableTypes.indexOf(type) > -1) {
        return type;
    }
    if (type.prototype instanceof Mongoose.SchemaType) {
        return type;
    }
    if (type == Mongoose.Types.ObjectId) {
        return Mongoose.Schema.Types.ObjectId;
    }
    if (type == Array) {
        return [Mongoose.Schema.Types.Mixed];
    }
    // default type
    return Mongoose.Schema.Types.Mixed;
}
//# sourceMappingURL=decorators.js.map