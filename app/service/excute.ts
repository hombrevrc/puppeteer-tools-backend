import { Service } from 'egg'
import { PuppeteerTool } from 'puppeteer-tools-core';
import ExpectModel from '../model/expect'
import ExpectTypes from '../model/expectTypes'
import ErrorInfo from '../public/errorInfo';
import * as AV from 'leancloud-storage';

export default class ExcuteService extends Service {

  async excuteTask(id: string){
    const curTaskInfo: any = await this.service.work.getTaskInfo(id);
    const taskResult = await this.operatorEle(curTaskInfo);
    const TaskExcuteInstance = AV.Object.extend('taskExcuteInstance');
    const taskExcuteInstance = new TaskExcuteInstance();
    const taskIdObj = AV.Object.createWithoutData('taskInfo', id);
    taskExcuteInstance.set('taskId', taskIdObj);
    taskExcuteInstance.set('status', taskResult.result);
    taskExcuteInstance.set('value', taskResult.message);
    await taskExcuteInstance.save();
    const taskInfo = AV.Object.createWithoutData('taskInfo', id);
    taskInfo.set('lastStatus', taskResult.result);
    taskInfo.save();
    return {
      taskId: id,
      status: taskResult.result,
      value: taskResult.message
    }
  }

  async operatorEle(taskInfo: any){
    const puppeteerTool = new PuppeteerTool(taskInfo.get('workId').get('url'));
    const operatorItems = taskInfo.get('operatorItems');
    const expectModel: ExpectModel = <ExpectModel>taskInfo.get('expectModel');
    const operLength = operatorItems ? operatorItems.length :0 ;
    if(operLength){
      for(let i = 0; i <  operLength-1; ++i){
        await puppeteerTool.operator( operatorItems[i]);
      }
      switch (expectModel.opType) {
        case ExpectTypes.PageShot:
          await puppeteerTool.operator( operatorItems[operLength - 1]);
          return this.shotEle(puppeteerTool, expectModel);
        case ExpectTypes.Content:
          const acturalModel = 
            await puppeteerTool.operator( operatorItems[operLength - 1], expectModel.expectSelectKey);
          return this.compareContent(acturalModel[0], expectModel);
        case ExpectTypes.Attribute:
          const acturalModelAttr = 
            await puppeteerTool.operator( operatorItems[operLength - 1], expectModel.expectSelectKey);
          return this.compareAttr(acturalModelAttr[0], expectModel);
        default:
          throw new ErrorInfo('找不到对应的期望类型');
      }
    }
    throw new ErrorInfo('没有操作');
  }

  public async excuteWork(workId: string) {
    const tasks:any = await this.ctx.service.work.getAllTask(workId);
    tasks.forEach(task=>{
      this.excuteTask(task.get('objectId'))
    })
  }

  async shotEle(puppeteerTool: PuppeteerTool, expectModel: ExpectModel){
    const option = (expectModel.expectSelectKey && expectModel.expectSelectKey.select) ? {} : {
      fullPage: true
    }
    const newShot = await puppeteerTool.shotEle(option, expectModel.expectSelectKey);
    const newFile = new AV.File(`${new Date().toJSON()}.png`, newShot);
    const saveInfo = await newFile.save();
    return {
      result: true,
      message: saveInfo.url()
    }
  }

  getActuralValue(acturalModel: any, expectModel: ExpectModel) {
    switch (expectModel.name) {
      case "id":
        return acturalModel.id;
      case "className":
        return acturalModel.className;
      default:
        return acturalModel.attributes.get(expectModel.name);
    }
  }

  compareContent( acturalModel: any, expectModel: ExpectModel){
    if(!expectModel){
      return {
        result: true,
        message: acturalModel.content
      }
    }
    if(expectModel.onlyGet) {
      return acturalModel.content
    }
    const euqal = acturalModel.content === expectModel.value;
    return {
      result: euqal,
      message: `actural: ${acturalModel.content}, expect: ${expectModel.value}`
    }
  }

  compareAttr( acturalModel: any, expectModel: ExpectModel ){
    if(!expectModel || !expectModel.name){
      return {
        result: false,
        message: '需指定要比较的属性'
      }
    }
    const acturalValue = this.getActuralValue(acturalModel, expectModel);
    if(expectModel.onlyGet) {
      return acturalValue
    }
    const euqal = expectModel.value === acturalValue
    return {
      result: euqal,
      message: `actural: ${acturalValue}, expect: ${expectModel.value}`
    }
  }
}