import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  graphql: {
    enable: true,
    package: 'egg-graphql'
  },
  sequelize: {
    enable: false,
    package: 'egg-sequelize'
  },
  io: {
    enable: true,
    package: 'egg-socket.io'
  }
};

export default plugin;
