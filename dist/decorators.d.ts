/// <reference types="mongoose" />
import "reflect-metadata";
import * as Mongoose from 'mongoose';
/**
 * Decorates a class to be a mongoose schema/model
 * @param {Mongoose.SchemaTypeOpts<any>} options for schema
 */
export declare function schema(options?: Mongoose.SchemaTypeOpts<any>): ClassDecorator;
export declare function schema(target: Function): void;
/**
 * Decorates a field to be a schema field
 * @param {Mongoose.SchemaTypeOpts<any>} options Field options as defined by mongoose
 */
export declare const field: {
    (options?: Mongoose.SchemaTypeOpts<any>): PropertyDecorator;
    (target: any, propertyKey: string): void;
};
/**
 * Specialization of @Field which marks a field required
 */
export declare const required: {
    (options?: Mongoose.SchemaTypeOpts<any>): PropertyDecorator;
    (target: any, propertyKey: string): void;
};
/**
 * Specialization of @Field which marks a field to be an index
 */
export declare const indexed: {
    (options?: Mongoose.SchemaTypeOpts<any>): PropertyDecorator;
    (target: any, propertyKey: string): void;
};
/**
 * Specialization of @Field which marks a field to be unique
 */
export declare const unique: {
    (options?: Mongoose.SchemaTypeOpts<any>): PropertyDecorator;
    (target: any, propertyKey: string): void;
};
/**
 * statics decorators for adding static functions/properties to the schema
 * @param target
 * @param propertyKey
 */
export declare function statics(target: any, propertyKey: string): void;
/**
 * methods decorators for adding instance methods to the schema
 * @param target
 * @param propertyKey
 * @param descriptor
 */
export declare function methods(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
/**
 * virtuals decorators for adding getter/setter or virtual property reference via options
 * i.e.
 * use mongoose virtuals for relationships between documents
 * @virtual({
 *   ref: 'Service', // The model to use
 *   localField: 'name', // Find people where `localField`
 *   foreignField: 'customer', // is equal to `foreignField`
 *   // If `justOne` is false, 'services' will be a single doc as opposed to
 *   // an array. `justOne` is false by default.
 *   justOne: false
 * })
 * @param options
 */
export declare function virtuals(options?: any): PropertyDecorator;
export declare function virtuals(target: any, propertyKey: string, descriptor?: PropertyDescriptor): void;
