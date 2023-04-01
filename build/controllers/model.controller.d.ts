import { Application, ControllerBase } from '@kult/core';
import { Model, ModelType } from '../utils';
declare class ModelController extends ControllerBase {
    constructor(app: Application);
    getModels(): Promise<{
        name: string;
        columns: {
            type: string;
            name: string;
            relationType?: string;
            relationCollection?: string;
        }[];
    }[]>;
    createModel(ctx: any, { model }: {
        model: Model;
    }): void;
    updateModel(ctx: any, { model }: {
        model: Model;
    }): void;
    removeModel(): string;
    constructModel({ columns, name }: Model): ModelType;
}
export default ModelController;
