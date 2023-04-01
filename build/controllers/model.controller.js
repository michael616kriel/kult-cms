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
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
let ModelController = class ModelController extends core_1.ControllerBase {
    constructor(app) {
        super(app);
    }
    async getModels() {
        const models = await utils_1.utils.getGetAllModels();
        return models.map(({ columns, tableName, relations }) => {
            const result = {
                name: tableName,
                columns: [],
            };
            for (const key in columns) {
                if (key !== 'id') {
                    result.columns.push({
                        type: columns[key].type,
                        name: key,
                    });
                }
            }
            for (const key in relations) {
                result.columns.push({
                    type: 'relation',
                    name: key,
                    relationType: relations[key].type,
                    relationCollection: relations[key].target,
                });
            }
            return result;
        });
    }
    createModel(ctx, { model }) {
        utils_1.utils.createModel(this.constructModel(model));
    }
    updateModel(ctx, { model }) {
        utils_1.utils.updateModel(this.constructModel(model));
    }
    removeModel() {
        return 'Hello test';
    }
    constructModel({ columns, name }) {
        const newColumns = {
            columns: {},
            relations: {},
        };
        for (const key in columns) {
            if (columns[key].type === 'relation') {
                newColumns.relations[columns[key].name] = {
                    target: columns[key].relationCollection,
                    type: columns[key].relationType,
                    joinTable: true,
                    cascade: true,
                };
            }
            else {
                newColumns.columns[columns[key].name] = {
                    ...columns[key],
                    default: columns[key].default
                        ? columns[key].type === 'int'
                            ? parseInt(columns[key].default)
                            : columns[key].default
                        : '',
                    length: columns[key].length ? columns[key].length : '',
                };
                if (!columns[key].default &&
                    !['text', 'varchar'].includes(columns[key].type)) {
                    newColumns.columns[columns[key].name] = (0, lodash_1.omit)(newColumns.columns[columns[key].name], ['default']);
                }
                if (!columns[key].length ||
                    ['int', 'text'].includes(columns[key].type)) {
                    newColumns.columns[columns[key].name] = (0, lodash_1.omit)(newColumns.columns[columns[key].name], ['length']);
                }
            }
        }
        const model = {
            name: name,
            tableName: name,
            columns: {
                id: {
                    primary: true,
                    type: 'int',
                    generated: true,
                },
                ...newColumns.columns,
            },
            relations: {
                ...newColumns.relations,
            },
        };
        return model;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    (0, core_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModelController.prototype, "getModels", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Post)('/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "createModel", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Post)('/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "updateModel", null);
__decorate([
    (0, graphql_1.Mutation)(),
    (0, core_1.Post)('/remove-model'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "removeModel", null);
ModelController = __decorate([
    (0, core_1.Controller)('/models'),
    __metadata("design:paramtypes", [core_1.Application])
], ModelController);
exports.default = ModelController;
