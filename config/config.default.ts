import { EggAppConfig, PowerPartial } from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524212476128_2917';

  // add your config here
  config.middleware = [ 'loginFilter', 'restfulRes' ];

  config.passportGithub = {
    key: 'beac597fd05e0f218593',
    secret: '75a35be073f3ba14360984507f7c607a63fe66fd',
    // proxy: false,
  };

  // add your config here
  config.loginFilter = {
    ignore(ctx) {
      if (ctx.path.indexOf('/passport/github') !== -1) {
        return true;
      }
      return false;
    },
  };

  return config;
};
