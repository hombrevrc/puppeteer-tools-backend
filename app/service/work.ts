import { Service } from 'egg';
import { WorkModel } from '../model/work';
import * as AV from 'leancloud-storage';

/**
 * WorkService
 */
export default class WorkService extends Service {

  public async saveWork(workInfo: any){
    const WorkInfo = AV.Object.extend('workInfo');
    const workInfoIns = new WorkInfo();
    workInfoIns.set('name', workInfo.name);
    workInfoIns.set('url', workInfo.url);
    workInfoIns.set('desc', workInfo.desc);
    workInfoIns.set('cycleTimeType', workInfo.cycleTimeType);
    workInfoIns.set('curCycleTime', workInfo.cycleTime);
    workInfoIns.set('cycleTime', workInfo.cycleTime);
    workInfoIns.set('userId', this.ctx.user.id);
    await workInfoIns.save();
    return true;
  }

  public async saveTask(workModel: WorkModel) {
    const TaskInfo = AV.Object.extend('taskInfo');
    const taskInfo = new TaskInfo();
    taskInfo.set('name', workModel.name);
    const workId = AV.Object.createWithoutData('workInfo', workModel.workId);
    taskInfo.set('workId', workId);
    taskInfo.set('operatorItems', workModel.operatorItems);
    taskInfo.set('expectModel', workModel.expectModel);
    await taskInfo.save();
    return true;
  }

  public async getWorkInfo(id: string){
    const query = new AV.Query('workInfo');
    return query.get(id);
  }

  public async getAllWorkInfo(){
    const userId = this.ctx.user.id;
    const query = new AV.Query('workInfo');
    query.equalTo('userId', userId);
    return query.find();
  }

  public async getTaskInfo(taskId: string){
    const query = new AV.Query('taskInfo');
    query.include('workId');
    return query.get(taskId);
  }

  public async getAllTask(workId: string) {
    const query = new AV.Query('taskInfo');
    const workObject = AV.Object.createWithoutData('workInfo', workId);
    query.equalTo('workId', workObject);
    return query.find();
  }

  public async getTaskInstance(taskId: string){
    const query = new AV.Query('taskExcuteInstance');
    const taskPointer = AV.Object.createWithoutData('taskInfo', taskId);
    query.equalTo('taskId', taskPointer);
    return query.find();
  }
}

