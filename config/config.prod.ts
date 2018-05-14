import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.loginInUrl = 'http://193.112.31.164:8080/puppeteer-tools/#/login';
  config.homepage = 'http://193.112.31.164:8080/puppeteer-tools/#/';
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
