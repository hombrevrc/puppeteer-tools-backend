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
    const selector = this.ctx.query.selector;
    const puppeteerTool = new PuppeteerTool(url);
    this.ctx.body = await puppeteerTool.getEleModal(selector);
  }

  public async getWorkInfo(){
    const { ctx } = this;
    const workId  =  ctx.request.query.workId;
    ctx.body = await this.service.work.getWorkInfo(workId);
  }
}
