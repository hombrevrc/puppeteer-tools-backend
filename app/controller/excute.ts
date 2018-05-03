import { Controller } from 'egg';

export default class ExcuteController extends Controller {
  
  public async excuteTask() {
    const { ctx } = this;
    const taskId =  ctx.request.query.taskId;
    ctx.body = await this.service.excute.excuteWork(taskId);
  }

}
