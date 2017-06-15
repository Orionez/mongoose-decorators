"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMetadata(target) {
    if (!target.__mongoose_meta__) {
        target.__mongoose_meta__ = {
            schemaObj: {},
            options: [],
            statics: [],
            // queries: [],
            methods: [],
            virtuals: []
        };
    }
    return target.__mongoose_meta__;
}
exports.getMetadata = getMetadata;
//# sourceMappingURL=meta.js.map