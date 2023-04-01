"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemas = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const getSchemas = async () => {
    const models = await _1.utils.getGetAllModels();
    return models.map((model) => {
        return new typeorm_1.EntitySchema(model);
    });
};
exports.getSchemas = getSchemas;
