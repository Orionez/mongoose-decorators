export interface MongooseMeta {
    schemaObj: any;
    options: [[string, any]];
    statics: [[string, any]];
    methods: [[string, Function]];
    virtuals: [[string, PropertyDescriptor]];
}
export interface MongooseClass extends Object {
    __mongoose_meta__: MongooseMeta;
}
export declare function getMetadata(target: MongooseClass): MongooseMeta;
