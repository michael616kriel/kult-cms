import { Application, Plugin, PluginBase, loadConfig } from '@kult/core';
import { getModuleRoot } from './utils/helpers';
import ContentController from './controllers/content.controller';
import ModelController from './controllers/model.controller';
import { getSchemas } from './utils/schema';
import { readFileSync } from 'fs';
import { join } from 'path';
import serve from 'koa-static';
import mount from 'koa-mount';

type CmsOptions = {
  basePath: string;
};

@Plugin({
  name: 'Kult CMS',
  controllers: [ContentController, ModelController],
})
export default class KultCMS extends PluginBase {
  constructor(app: Application) {
    super(app);
  }

  async initialize() {
    const models = await getSchemas();
    const config = await loadConfig<CmsOptions>('cms');
    this.app.database.registerEntities(models);
    this.app.server.server.use(
      mount(config.basePath, serve(join(getModuleRoot(), '../client/build')))
    );
  }
}

export const getCmsGraphqlSchema = () => {
  const rootPath = getModuleRoot();
  return readFileSync(join(rootPath, './schema.graphql'));
};
