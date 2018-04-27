import { Service } from 'egg'
import { PuppeteerTool } from 'puppeteer-tools-core';

export default class ExcuteService extends Service {

  async excuteWork(id: string){
    const workInfo = await this.service.work.getWorkInfo(id);
    return workInfo;
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