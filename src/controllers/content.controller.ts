import { Application, ControllerBase, Get, Controller, Post } from '@kult/core';
import { Mutation, Query } from '@kult/graphql';
import { EntitySchema } from 'typeorm';
import { getSchemas } from '../utils/schema';

type ContentTypeUpdateInput = {
  input: {
    id: number;
    name: string;
    fields?: { key: string; value: string }[];
  };
};

type ContentTypeRemoveInput = {
  input: {
    id: number;
    name: string;
  };
};

type ContentTypeQueryInput = {
  input: {
    name: string;
    where?: {
      key: string;
      value: string;
    }[];
  };
};

@Controller('/content')
class ContentController extends ControllerBase {
  schemas: EntitySchema[];
  constructor(app: Application) {
    super(app);
    this.init();
  }

  async init() {
    this.schemas = await getSchemas();
  }

  getModelSchema(name: string) {
    return this.schemas.find((schema) => schema.options.tableName === name);
  }

  mapToResponse(name: string, obj: { [key: string]: string | number }) {
    const out: { name: string; fields: { [key: string]: string | number }[] } =
      {
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

  constructWhereQuery(where?: { key: string; value: string }[]) {
    const out: { [key: string]: string | number } = {};
    if (where) {
      for (const key in where) {
        out[where[key].key] = where[key].value;
      }
    }
    return out;
  }

  @Query()
  @Get('/get-item')
  async getContentItem(ctx: any, { input: { name, where } }: ContentTypeQueryInput) {
    const schema = this.getModelSchema(name);
    if (schema) {
      const repo = this.app.database.datasource?.getRepository(schema);
      const row = await repo?.findOne({
        where: this.constructWhereQuery(where),
      });
      return this.mapToResponse(name, row);
    }
    return null;
  }

  @Query()
  @Get('/get')
  async getContent(ctx: any, { input: { name, where } }: ContentTypeQueryInput) {
    const schema = this.getModelSchema(name);
    if (schema) {
      const repo = this.app.database.datasource?.getRepository(schema);
      const rows = await repo?.find({
        where: this.constructWhereQuery(where),
      });
      return rows?.map((row) => this.mapToResponse(name, row));
    }
    return [];
  }

  @Mutation()
  @Post('/create')
  async createContent(
    ctx: any,
    { input: { name, fields } }: ContentTypeUpdateInput
  ) {
    const schema = this.getModelSchema(name);
    if (schema) {
      const repo = this.app.database.datasource?.getRepository(schema);
      const result = await repo?.insert(this.constructWhereQuery(fields));
      return await repo?.find({
        where: {
          id: result?.raw[0],
        },
      });
    }
  }

  @Mutation()
  @Post('/update')
  async updateContent(
    ctx: any,
    { input: { id, name, fields } }: ContentTypeUpdateInput
  ) {
    const schema = this.getModelSchema(name);
    if (schema) {
      const repo = this.app.database.datasource?.getRepository(schema);
      await repo?.update(
        {
          id,
        },
        this.constructWhereQuery(fields)
      );
      return await repo?.find({
        where: {
          id,
        },
      });
    }
  }

  @Mutation()
  @Post('/remove')
  async removeContent(
    ctx: any,
    { input: { id, name } }: ContentTypeRemoveInput
  ) {
    const schema = this.getModelSchema(name);
    if (schema) {
      const repo = this.app.database.datasource?.getRepository(schema);
      const row = await repo?.findOne({
        where: {
          id,
        },
      });
      await repo?.remove(row);
      return this.mapToResponse(name, row);
    }
    return null;
  }
}

export default ContentController;
