import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551165056865_4485';

  // add your egg config in here
  config.middleware = [ 'graphql' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // config.mysql = {
  //   client: {
  //     host: '127.0.0.1',
  //     port: '3306',
  //     user: 'root',
  //     password: 'password',
  //     database: 'mysql'
  //   }
  // };

  const sequelize = new Sequelize({
    // Sequelize,
    dialect: 'sqlite',
    storage: resolve(appInfo.baseDir, './database/boj.db')
  });

  sequelize.addModels([ resolve(appInfo.baseDir, './app/model') ]);

  config.graphql = {
    router: '/graphql'
  };

  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb'
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
