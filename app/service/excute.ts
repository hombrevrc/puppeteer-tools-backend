import { Service } from 'egg'
import { PuppeteerTool } from 'puppeteer-tools-core';
import ExpectModel from '../model/expect'
import ExpectTypes from '../model/expectTypes'
import ErrorInfo from '../public/errorInfo';
import * as AV from 'leancloud-storage';

export default class ExcuteService extends Service {

  async excuteWork(id: string){
    const workInfo: any = await this.service.work.getWorkInfo(id);
    const puppeteerTool = new PuppeteerTool(workInfo.get('url'));
    const operatorItems = workInfo.get('operatorItems');
    const expectModel: ExpectModel = <ExpectModel>workInfo.get('expectModel');
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
    return false;
  }

  async shotEle(puppeteerTool: PuppeteerTool, expectModel: ExpectModel){
    const newShot = puppeteerTool.shotEle({fullPage: true}, expectModel.expectSelectKey);
    const newFile = new AV.File(`${new Date().toJSON()}.png`, newShot);
    const saveInfo = await newFile.save();
    return saveInfo.url();
  }

  compareContent( acturalModel: any, expectModel: ExpectModel){
    if(!expectModel){
      return {
        result: true,
        message: acturalModel.content
      }
    }
    const euqal = acturalModel.content === expectModel.value;
    return {
      result: euqal,
      message: euqal? `actural: ${acturalModel.content}, expect: ${expectModel.value}`: null
    }
  }

  compareAttr( acturalModel: any, expectModel: ExpectModel ){
    if(!expectModel || !expectModel.name){
      return {
        result: false,
        message: '需指定要比较的属性'
      }
    }
    if(expectModel.name === 'id'){
      const euqal = expectModel.value === acturalModel.id
      return {
        result: euqal,
        message: euqal? `actural: ${acturalModel.id}, expect: ${expectModel.value}`: null
      }
    }else if(expectModel.name === 'className'){
      const euqal = expectModel.value === acturalModel.className
      return {
        result: euqal,
        message: euqal? `actural: ${acturalModel.className}, expect: ${expectModel.value}`: null
      }
    }else {
      const euqal = expectModel.value === acturalModel.attributes.get(expectModel.name)
      return {
        result: euqal,
        message: euqal? `actural: ${acturalModel.attributes.get(expectModel.name)}, 
          expect: ${expectModel.value}`: null
      }
    }
  }
}