import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.loginInUrl = 'http://www.puppeteer-autotest.club/puppeteer-tools/#/login';
  config.homepage = 'http://www.puppeteer-autotest.club/puppeteer-tools/#/';
  config.appId = 'HAGzPVNMVnt0WA4KJs9qmHme-gzGzoHsz';
  config.appKey = 'NTXdKfBeztXeXb4rpVEs38yQ';
  config.dump = {
    ignore: new Set(['appId', 'appKey'])
  };
  config.passportGithub = {
    key: '28a839110d85959f990e',
    secret: '8936c89432e4e1e054993926db3f785968567675'
  };

  config.security = {
    csrf: {
      ignore: '*'
    }
  };
  return config;
};
