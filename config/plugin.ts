import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql'
  }
};

export default plugin;
