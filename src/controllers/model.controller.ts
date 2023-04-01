import { Application, ControllerBase, Get, Controller, Post } from '@kult/core';
import { Mutation, Query } from '@kult/graphql';
import { omit } from 'lodash';
import { Model, ModelType, utils } from '../utils';

@Controller('/models')
class ModelController extends ControllerBase {
  constructor(app: Application) {
    super(app);
  }

  @Query()
  @Get('/get')
  async getModels() {
    const models = await utils.getGetAllModels();
    return models.map(({ columns, tableName, relations }) => {
      const result: {
        name: string;
        columns: {
          type: string;
          name: string;
          relationType?: string;
          relationCollection?: string;
        }[];
      } = {
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

  @Mutation()
  @Post('/create')
  createModel(ctx: any, { model }: { model: Model }) {
    utils.createModel(this.constructModel(model));
  }

  @Mutation()
  @Post('/update')
  updateModel(ctx: any, { model }: { model: Model }) {
    utils.updateModel(this.constructModel(model));
  }

  @Mutation()
  @Post('/remove-model')
  removeModel() {
    return 'Hello test';
  }

  constructModel({ columns, name }: Model) {
    const newColumns: {
      columns: {
        [key: string]: {
          type: string;
          name: string;
          default?: string | number;
          length?: string;
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
    } = {
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
      } else {
        newColumns.columns[columns[key].name] = {
          ...columns[key],
          default: columns[key].default
            ? columns[key].type === 'int'
              ? parseInt(columns[key].default)
              : columns[key].default
            : '',
          length: columns[key].length ? columns[key].length : '',
        };
        if (
          !columns[key].default &&
          !['text', 'varchar'].includes(columns[key].type)
        ) {
          newColumns.columns[columns[key].name] = omit(
            newColumns.columns[columns[key].name],
            ['default']
          );
        }
        if (
          !columns[key].length ||
          ['int', 'text'].includes(columns[key].type)
        ) {
          newColumns.columns[columns[key].name] = omit(
            newColumns.columns[columns[key].name],
            ['length']
          );
        }
      }
    }

    const model: ModelType = {
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
}

export default ModelController;
