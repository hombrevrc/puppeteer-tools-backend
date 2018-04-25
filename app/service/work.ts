import { Service } from 'egg';
import { WorkModel } from '../model/work';
import * as AV from 'leancloud-storage';

/**
 * WorkService
 */
export default class WorkService extends Service {

  public async saveWork(workModel: WorkModel) {
    const WorkInfo = AV.Object.extend('workInfo');
    const workInfo = new WorkInfo();
    workInfo.set('name', workModel.name);
    workInfo.set('url', workModel.url);
    workInfo.set('operatorItems', workModel.operatorItems);
    await workInfo.save();
    return true;
  }

  public async getWorkInfo(id: string){
    const query = new AV.Query('workInfo');
    return query.get(id);
  }
}

