"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const src_1 = require("../src");
class ServiceClass extends Mongoose.Model {
}
__decorate([
    src_1.field(Mongoose.Schema.Types.ObjectId),
    __metadata("design:type", Mongoose.Schema.Types.ObjectId)
], ServiceClass.prototype, "_id", void 0);
__decorate([
    src_1.field,
    __metadata("design:type", String)
], ServiceClass.prototype, "product", void 0);
__decorate([
    src_1.field,
    __metadata("design:type", String)
], ServiceClass.prototype, "description", void 0);
__decorate([
    src_1.field({ ref: 'Customer' }),
    __metadata("design:type", Number)
], ServiceClass.prototype, "customer", void 0);
const ServiceSchema = src_1.buildSchema(ServiceClass);
let CustomerClass = class CustomerClass extends Mongoose.Model {
    static Search(term) {
        let reg = new RegExp(term, 'i');
        return this.find({ name: reg }).exec();
    }
    get myGetter() {
        return 'sample getter';
    }
};
__decorate([
    src_1.indexed,
    src_1.unique,
    __metadata("design:type", Number)
], CustomerClass.prototype, "_id", void 0);
__decorate([
    src_1.field,
    src_1.indexed,
    src_1.unique,
    __metadata("design:type", String)
], CustomerClass.prototype, "name", void 0);
__decorate([
    src_1.field(Date),
    __metadata("design:type", Date)
], CustomerClass.prototype, "createdDate", void 0);
__decorate([
    src_1.virtuals({
        ref: 'Service',
        localField: '_id',
        foreignField: 'customer',
        justOne: false
    }),
    __metadata("design:type", Array)
], CustomerClass.prototype, "services", void 0);
CustomerClass = __decorate([
    src_1.schema({
        toJSON: {
            getters: true,
            virtuals: true
        }
    })
], CustomerClass);
const CustomerSchema = src_1.buildSchema(CustomerClass);
//# sourceMappingURL=sample.js.map