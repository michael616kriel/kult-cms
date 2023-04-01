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
const core_1 = require("@kult/core");
const graphql_1 = require("@kult/graphql");
const schema_1 = require("../utils/schema");
let ContentController = class ContentController extends core_1.ControllerBase {
    constructor(app) {
        super(app);
        this.init();
    }
    async init() {
        this.schemas = await (0, schema_1.getSchemas)();
    }
    getModelSchema(name) {
        return this.schemas.find((schema) => schema.options.tableName === name);
    }
    mapToResponse(name, obj) {
        const out = {
            name,
            fields: [],
        };
        for (const key in obj) {
            out.fields.push({
                name: key,
                value: obj[key],
                type: 'string',
            });
        }
        return out;
    }
    constructWhereQuery(where) {
        const out = {};
        if (where) {
            for (const key in where) {
                out[where[key].key] = where[key].value;
            }
        }
        return out;
    }
    async getContentItem(ctx, { input: { name, where } }) {
        var _a;
        const schema = this.getModelSchema(name);
        if (schema) {
            const repo = (_a = this.app.database.datasource) === null || _a === void 0 ? void 0 : _a.getRepository(schema);
            const row = await (repo === null || repo === void 0 ? void 0 : repo.findOne({
                where: this.constructWhereQuery(where),
            }));
            return this.mapToResponse(name, row);
        }
        return null;
    }
    async getContent(ctx, { input: { name, where } }) {
        var _a;
        const schema = this.getModelSchema(name);
        if (schema) {
            const repo = (_a = this.app.database.datasource) === null || _a === void 0 ? void 0 : _a.getRepository(schema);
            const rows = await (repo === null || repo === void 0 ? void 0 : repo.find({
                where: this.constructWhereQuery(where),
            }));
            return rows === null || rows === void 0 ? void 0 : rows.map((row) => this.mapToResponse(name, row));
        }
        return [];
    }
    async createContent(ctx, { input: { name, fields } }) {
        var _a;
        const schema = this.getModelSchema(name);
        if (schema) {
            const repo = (_a = this.app.database.datasource) === null || _a === void 0 ? void 0 : _a.getRepository(schema);
            const result = await (repo === null || repo === void 0 ? void 0 : repo.insert(this.constructWhereQuery(fields)));
            return await (repo === null || repo === void 0 ? void 0 : repo.find({
                where: {
                    id: result === null || result === void 0 ? void 0 : result.raw[0],
                },
            }));
        }
    }
    async updateContent(ctx, { input: { id, name, fields } }) {
        var _a;
        const schema = this.getModelSchema(name);
        if (schema) {
            const repo = (_a = this.app.database.datasource) === null || _a === void 0 ? void 0 : _a.getRepository(schema);
            await (repo === null || repo === void 0 ? void 0 : repo.update({
                id,
            }, this.constructWhereQuery(fields)));
            return await (repo === null || repo === void 0 ? void 0 : repo.find({
                where: {
                    id,
                },
            }));
        }
    }
    async removeContent(ctx, { input: { id, name } }) {
        var _a;
        const schema = this.getModelSchema(name);
        if (schema) {
            const repo = (_a = this.app.database.datasource) === null || _a === void 0 ? void 0 : _a.getRepository(schema);
            const row = await (repo === null || repo === void 0 ? void 0 : repo.findOne({
                where: {
                    id,
                },
            }));
            await (repo === null || repo === void 0 ? void 0 : repo.remove(row));
            return this.mapToResponse(name, row);
        }
        return null;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Get)('/get-item'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContentItem", null);
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContent", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Post)('/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createContent", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Post)('/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateContent", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Post)('/remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "removeContent", null);
ContentController = __decorate([
    (0, core_1.Controller)('/content'),
    __metadata("design:paramtypes", [core_1.Application])
], ContentController);
exports.default = ContentController;
