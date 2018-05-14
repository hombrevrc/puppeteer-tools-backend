import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.loginInUrl = 'http://localhost:8081/#/login';
  config.homepage = 'http://localhost:8081/#/';
  config.appId = 'HAGzPVNMVnt0WA4KJs9qmHme-gzGzoHsz';
  config.appKey = 'NTXdKfBeztXeXb4rpVEs38yQ';
  config.dump = {
    ignore: new Set(['appId', 'appKey'])
  };

  //local不需要登录
  // config.middleware = ['restfulRes'];

  config.security = {
    csrf: {
      ignore: '*'
    }
  };

  return config;
};
