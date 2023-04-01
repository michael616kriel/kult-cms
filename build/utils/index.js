"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const core_1 = require("@kult/core");
exports.utils = {
    getGetAllModels: async () => {
        const root = (0, core_1.getProjectRoot)();
        const path = (0, path_1.join)(root, './cms/collections');
        const models = await fs_1.default.readdirSync(path);
        return await Promise.all(models.map(async (model) => {
            return JSON.parse(await fs_1.default.readFileSync((0, path_1.join)(path, model)).toString());
        }));
    },
    createModel: async (model) => {
        const { tableName } = model;
        const root = (0, core_1.getProjectRoot)();
        const path = (0, path_1.join)(root, `./cms/collections/${tableName}.json`);
        await fs_1.default.writeFileSync(path, JSON.stringify(model, null, 2));
    },
    updateModel: async (model) => {
        const { tableName } = model;
        const root = (0, core_1.getProjectRoot)();
        const path = (0, path_1.join)(root, `./cms/collections/${tableName}.json`);
        await fs_1.default.writeFileSync(path, JSON.stringify(model, null, 2));
    },
    removeModel: async (model) => {
        const { tableName } = model;
        const root = (0, core_1.getProjectRoot)();
        const path = (0, path_1.join)(root, `./cms/collections/${tableName}.json`);
        await fs_1.default.rmSync(path);
    },
};
