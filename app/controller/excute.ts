import { Controller } from 'egg';
import * as AV from 'leancloud-storage';

export default class ExcuteController extends Controller {
  
  public async excuteWork() {
    const { ctx } = this;
    const workId =  ctx.request.query.id;
    ctx.body = await this.service.excute.excuteWork(workId);
  }

  public async shotEle(){
    const { ctx } = this;
    const workId  =  ctx.request.query.id;
    const newShot = await this.service.excute.shotEle(workId);
    const newFile = new AV.File(`${new Date().toJSON()}.png`, newShot);
    const saveInfo = await newFile.save();
    ctx.body = saveInfo.url();
  }
}
