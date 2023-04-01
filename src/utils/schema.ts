import { EntitySchema, EntitySchemaOptions } from 'typeorm';
import { utils } from '.';

export const getSchemas = async () => {
  const models = await utils.getGetAllModels();
  return (models as EntitySchemaOptions<any>[]).map((model) => {
    return new EntitySchema(model);
  });
};
