import { Controller } from 'egg';
import * as AV from 'leancloud-storage';

export default class ExcuteController extends Controller {
  
  public async excuteTask() {
    const { ctx } = this;
    const taskId =  ctx.request.query.taskId;
    const value = await this.service.excute.excuteTask(taskId);
    const TaskExcuteInstance = AV.Object.extend('taskExcuteInstance');
    const taskExcuteInstance = new TaskExcuteInstance();
    const taskIdObj = AV.Object.createWithoutData('taskInfo', taskId);
    taskExcuteInstance.set('taskId', taskIdObj);
    taskExcuteInstance.set('status', value.result);
    taskExcuteInstance.set('value', value.message);
    await taskExcuteInstance.save();
    const taskInfo = AV.Object.createWithoutData('taskInfo', taskId);
    taskInfo.set('lastStatus', value.result);
    taskInfo.save();
    ctx.body = {
      taskId,
      status: value.result,
      value: value.message
    }
  }

}
