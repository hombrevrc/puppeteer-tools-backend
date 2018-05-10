import { Service } from 'egg'
import * as AV from 'leancloud-storage';

export default class ComOperatorService extends Service {

  public async saveOperatorItems(newOperator: any) {
    const OperatorItems = AV.Object.extend('operatorItems');
    const operatorItems = new OperatorItems();
    operatorItems.set('name', newOperator.name);
    operatorItems.set('items', newOperator.items);
    const workId = AV.Object.createWithoutData('workInfo', newOperator.workId);
    operatorItems.set('workId', workId);
    await operatorItems.save();
    return true;
  }

  public async getOperatorItems(workId){
    const query = new AV.Query('operatorItems');
    const workObject = AV.Object.createWithoutData('workInfo', workId);
    query.equalTo('workId', workObject);
    return query.find();
  }
}