export type ModelType = {
    name: string;
    tableName: string;
    columns: {
        [key: string]: {
            type: string;
            primary?: boolean;
            generated?: boolean;
        };
    };
    relations: {
        [key: string]: {
            target: string;
            type: string;
            joinTable: boolean;
            cascade: boolean;
        };
    };
};
export type ModelColumn = {
    type: string;
    name: string;
    default: string;
    length: string;
    relationType: string;
    relationCollection: string;
};
export type Model = {
    name: string;
    columns: ModelColumn[];
};
export declare const utils: {
    getGetAllModels: () => Promise<ModelType[]>;
    createModel: (model: ModelType) => Promise<void>;
    updateModel: (model: ModelType) => Promise<void>;
    removeModel: (model: ModelType) => Promise<void>;
};
