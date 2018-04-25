// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Excute from '../../../app/controller/excute';
import Home from '../../../app/controller/home';
import Work from '../../../app/controller/work';

declare module 'egg' {
  interface IController {
    excute: Excute;
    home: Home;
    work: Work;
  }
}
