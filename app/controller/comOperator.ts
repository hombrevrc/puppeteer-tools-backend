import { Controller } from 'egg'

export default class ComOperatorController extends Controller {

  public async saveOperatorItems() {
    const { ctx } = this;
    const newOperator = ctx.request.body;
    ctx.body = await this.service.comOperator.saveOperatorItems(newOperator);
  }

  public async getOperatorItems(){
    const workId = this.ctx.query.workId;
    this.ctx.body = await this.service.comOperator.getOperatorItems(workId);
  }
}