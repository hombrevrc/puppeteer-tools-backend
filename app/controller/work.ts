import { Controller } from 'egg';
import { WorkModel } from '../model/work';
import { PuppeteerTool } from 'puppeteer-tools-core';

export default class WorkController extends Controller {
  
  public async saveWork() {
    const { ctx } = this;
    const newWork = new WorkModel(ctx.request.body);
    ctx.body = await this.service.work.saveWork(newWork);
  }

  public async getHtmlModel(){
    const url = this.ctx.query.url;
    const puppeteerTool = new PuppeteerTool(url);
    this.ctx.body = await puppeteerTool.getEleModal();
  }

  public async getWorkInfo(){
    const { ctx } = this;
    const workId  =  ctx.request.query.id;
    ctx.body = await this.service.work.getWorkInfo(workId);
  }
}
