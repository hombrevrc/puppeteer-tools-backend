import { Controller } from 'egg';
import * as AV from 'leancloud-storage';

export default class ExcuteController extends Controller {
  
  public async excuteWork() {
    const { ctx } = this;
    const workId =  ctx.request.query.workId;
    const selector =  ctx.request.query.selector;
    ctx.body = await this.service.excute.excuteWork(workId, selector );
  }

  public async shotEle(){
    const { ctx } = this;
    const workId  =  ctx.request.query.workId;
    const newShot = await this.service.excute.shotEle(workId);
    const newFile = new AV.File(`${new Date().toJSON()}.png`, newShot);
    const saveInfo = await newFile.save();
    ctx.body = saveInfo.url();
  }
}
