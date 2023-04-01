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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCmsGraphqlSchema = void 0;
const core_1 = require("@kult/core");
const helpers_1 = require("./utils/helpers");
const content_controller_1 = __importDefault(require("./controllers/content.controller"));
const model_controller_1 = __importDefault(require("./controllers/model.controller"));
const schema_1 = require("./utils/schema");
const fs_1 = require("fs");
const path_1 = require("path");
const koa_static_1 = __importDefault(require("koa-static"));
const koa_mount_1 = __importDefault(require("koa-mount"));
let KultCMS = class KultCMS extends core_1.PluginBase {
    constructor(app) {
        super(app);
    }
    async initialize() {
        const models = await (0, schema_1.getSchemas)();
        const config = await (0, core_1.loadConfig)('cms');
        this.app.database.registerEntities(models);
        this.app.server.server.use((0, koa_mount_1.default)(config.basePath, (0, koa_static_1.default)((0, path_1.join)((0, helpers_1.getModuleRoot)(), '../client/build'))));
    }
};
KultCMS = __decorate([
    (0, core_1.Plugin)({
        name: 'Kult CMS',
        controllers: [content_controller_1.default, model_controller_1.default],
    }),
    __metadata("design:paramtypes", [core_1.Application])
], KultCMS);
exports.default = KultCMS;
const getCmsGraphqlSchema = () => {
    const rootPath = (0, helpers_1.getModuleRoot)();
    return (0, fs_1.readFileSync)((0, path_1.join)(rootPath, './schema.graphql'));
};
exports.getCmsGraphqlSchema = getCmsGraphqlSchema;
