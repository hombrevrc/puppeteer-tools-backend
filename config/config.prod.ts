import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.loginInUrl = 'http://123.206.95.15:7001/';
  config.homepage = 'http://123.206.95.15:8080/#/';
  config.appId = 'HAGzPVNMVnt0WA4KJs9qmHme-gzGzoHsz';
  config.appKey = 'NTXdKfBeztXeXb4rpVEs38yQ';
  config.dump = {
    ignore: new Set(['appId', 'appKey'])
  };

  config.security = {
    csrf: {
      ignore: '*'
    }
  };
  return config;
};
