import { Service } from 'egg'
import { PuppeteerTool } from 'puppeteer-tools-core';

export default class ExcuteService extends Service {

  async excuteWork(id: string, selector?: string){
    const workInfo: any = await this.service.work.getWorkInfo(id);
    const puppeteerTool = new PuppeteerTool(workInfo.get('url'));
    const operatorItems = workInfo.get('operatorItems');
    const operLength = operatorItems ? operatorItems.length :0 ;
    if(operLength) {
      for(let i = 0; i <  operLength - 1; ++i){
        await puppeteerTool.operator( operatorItems[i]);
      }
      return await puppeteerTool.operator( operatorItems[operLength-1], selector, true);
    }
    return false;
  }

  async shotEle(id: string){
    const workInfo: any = await this.service.work.getWorkInfo(id);
    const puppeteerTool = new PuppeteerTool(workInfo.get('url'));
    const operatorItems = workInfo.get('operatorItems');
    const operLength = operatorItems ? operatorItems.length :0 ;
    for(let i = 0; i <  operLength; ++i){
      await puppeteerTool.operator( operatorItems[i]);
    }
    return puppeteerTool.shotEle({fullPage: true});
  }
}