import { Controller } from 'egg';
import { WorkModel } from '../model/work';
import { PuppeteerTool } from 'puppeteer-tools-core';

export default class WorkController extends Controller {

  public async saveWork(){
    const { ctx } = this;
    const newWork = ctx.request.body;
    ctx.body = await this.service.work.saveWork(newWork);
  }

  public async saveTask() {
    const { ctx } = this;
    const newTask = new WorkModel(ctx.request.body);
    ctx.body = await this.service.work.saveTask(newTask);
  }

  public async getHtmlModel(){
    const url = this.ctx.query.url;
    const select = this.ctx.query.select;
    const sameSelectIndex = this.ctx.query.sameSelectIndex;
    const puppeteerTool = new PuppeteerTool(url);
    this.ctx.body = await puppeteerTool.getEleModal({select, sameSelectIndex});
  }

  public async getWorkInfo(){
    const { ctx } = this;
    const workId  =  ctx.request.query.workId;
    ctx.body = await this.service.work.getWorkInfo(workId);
  }

  public async getAllWorkInfo(){
    this.ctx.body = await this.service.work.getAllWorkInfo();
  }

  public async getTaskInfo(){
    const { ctx } = this;
    const taskId  =  ctx.request.query.taskId;
    ctx.body = await this.service.work.getTaskInfo(taskId);
  }
}
