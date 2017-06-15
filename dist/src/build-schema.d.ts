/**
 * Gets the mongoose schema for a decorated class
 * @param {Function} target
 * @param {boolean} loadClass indicating if load setters + getters, static methods, and instance methods from the target class to schema
 */
export declare function buildSchema(target: Function, loadClass?: boolean): any;
