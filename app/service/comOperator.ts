import { Service } from 'egg'
import * as AV from 'leancloud-storage';

export default class ComOperatorService extends Service {

  public async saveOperatorItems(newOperator: any) {
    const OperatorItems = AV.Object.extend('operatorItems');
    const operatorItems = new OperatorItems();
    operatorItems.set('name', newOperator.name);
    operatorItems.set('items', newOperator.items);
    await operatorItems.save();
    return true;
  }

  public async getOperatorItems(){
    const query = new AV.Query('operatorItems');
    return query.find();
  }
}