// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Test from '../../../app/service/Test';
import ComOperator from '../../../app/service/comOperator';
import Excute from '../../../app/service/excute';
import Work from '../../../app/service/work';

declare module 'egg' {
  interface IService {
    test: Test;
    comOperator: ComOperator;
    excute: Excute;
    work: Work;
  }
}
