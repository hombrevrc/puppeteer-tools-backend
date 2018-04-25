import { Controller } from 'egg';

export default class HomeController extends Controller {
  
  public async index() {
    this.ctx.body = await this.service.test.sayHi('egg');
  }

  public async getUserInfo() {
    this.ctx.body = this.ctx.user;
  }
}
