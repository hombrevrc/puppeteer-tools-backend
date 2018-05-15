import { Service } from 'egg'
import { PuppeteerTool } from 'puppeteer-tools-core';
import ExpectModel from '../model/expect'
import ExpectTypes from '../model/expectTypes'
import ErrorInfo from '../public/errorInfo';
import BlinkDiffCom from '../extend/blinkDiffCom';
import * as AV from 'leancloud-storage';
import DbConfig from '../model/dbConfig';
const result = require('lodash');

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
    if(taskResult.first) {
      const expectModel = curTaskInfo.get('expectModel');
      taskInfo.set('expectModel', {...expectModel, value:taskResult.first });
    }
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
      this.getExpectValue(expectModel, taskInfo);
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

  private async getExpectValue(expectModel: ExpectModel, taskInfo: any) {
    if(expectModel.useSql && taskInfo.get('workId').get('dbInfo')) {
      const sql = expectModel.value;
      const dbConfig = new DbConfig(<DbConfig>(taskInfo.get('workId').get('dbInfo')));
      if(!this.app[dbConfig.uniqueName()]) {
        this.app[dbConfig.uniqueName()] = this.app.mysql.createInstance(dbConfig);
      }
      const sqlValue = await this.app[dbConfig.uniqueName()].query(sql);
      if(!sqlValue) {
        expectModel.value = "";
      }
      else if(expectModel.sqlGetIndex) {
        expectModel.value = result(sqlValue, expectModel.sqlGetIndex);
      }else {
        const obj = sqlValue[0];
        expectModel.value = obj[Object.keys(obj)[0]];
      }
    }
  }

  async shotEle(puppeteerTool: PuppeteerTool, expectModel: ExpectModel){
    const option = (expectModel.expectSelectKey && expectModel.expectSelectKey.select) ? {} : {
      fullPage: true
    }
    const newShot = await puppeteerTool.shotEle(option, expectModel.expectSelectKey);
    const newFile = new AV.File(`${new Date().toJSON()}.png`, newShot);
    const saveInfo = await newFile.save();
    const imgUrl = saveInfo.url();
    if(expectModel.onlyGet) {
      return {
        result: true,
        message: imgUrl
      }
    } 
    if(expectModel.useFirst && !expectModel.value) {
      return {
        result: true,
        message: `first excute, actural: ${imgUrl}`,
        first: imgUrl
      }
    }
    //对图片进行对比
    const compareBlinkDiff = await BlinkDiffCom.CompareImage(imgUrl, expectModel.value);
    if(compareBlinkDiff.outStream) {
      const beyondFile = new AV.File(`${new Date().toJSON()}_bey.png`, compareBlinkDiff.outStream);
      const beyondFileInfo = await beyondFile.save();
      return {
        result: compareBlinkDiff.result,
        message: beyondFileInfo.url()
      }
    }else {
      return {
        result: compareBlinkDiff.result,
        message: imgUrl
      }
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
    if(expectModel.onlyGet) {
      return {
        result: true,
        message: acturalModel.content
      }
    } 
    if(expectModel.useFirst && !expectModel.value) {
      return {
        result: true,
        message: `first excute, actural: ${acturalModel.content}`,
        first: acturalModel.content
      }
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
      return {
        result: true,
        message: acturalValue
      }
    }
    if(expectModel.useFirst && !expectModel.value) {
      return {
        result: true,
        message: `first excute, actural: ${acturalValue}`,
        first: acturalValue
      }
    }
    const euqal = expectModel.value === acturalValue
    return {
      result: euqal,
      message: `actural: ${acturalValue}, expect: ${expectModel.value}`
    }
  }
}