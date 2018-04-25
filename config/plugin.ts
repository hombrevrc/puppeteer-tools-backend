import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  }
};

export default plugin;
