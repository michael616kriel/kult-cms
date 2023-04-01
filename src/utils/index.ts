import { join } from 'path';
import fs from 'fs';
import { getProjectRoot } from '@kult/core';

export type ModelType = {
  name: string;
  tableName: string;
  columns: {
    [key: string]: { type: string; primary?: boolean; generated?: boolean };
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

export const utils = {
  getGetAllModels: async (): Promise<ModelType[]> => {
    const root = getProjectRoot();
    const path = join(root, './cms/collections');
    const models = await fs.readdirSync(path);
    return await Promise.all(
      models.map(async (model) => {
        return JSON.parse(await fs.readFileSync(join(path, model)).toString());
      })
    );
  },
  createModel: async (model: ModelType) => {
    const { tableName } = model;
    const root = getProjectRoot();
    const path = join(root, `./cms/collections/${tableName}.json`);
    await fs.writeFileSync(path, JSON.stringify(model, null, 2));
  },
  updateModel: async (model: ModelType) => {
    const { tableName } = model;
    const root = getProjectRoot();
    const path = join(root, `./cms/collections/${tableName}.json`);
    await fs.writeFileSync(path, JSON.stringify(model, null, 2));
  },
  removeModel: async (model: ModelType) => {
    const { tableName } = model;
    const root = getProjectRoot();
    const path = join(root, `./cms/collections/${tableName}.json`);
    await fs.rmSync(path);
  },
};
