import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.loginInUrl = 'http://127.0.0.1:7001/';
  config.homepage = 'http://localhost:8080/#/';
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
