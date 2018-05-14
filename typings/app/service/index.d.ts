// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ComOperator from '../../../app/service/comOperator';
import Excute from '../../../app/service/excute';
import Home from '../../../app/service/home';
import Work from '../../../app/service/work';

declare module 'egg' {
  interface IService {
    comOperator: ComOperator;
    excute: Excute;
    home: Home;
    work: Work;
  }
}
