import { EleOperatorModel } from 'puppeteer-tools-core'
import HelpInstance from '../extend/help'
import ExpectModel from './expect'

export class WorkModel {

  constructor( params: any ){
    this.name = params.name;
    this.workId = params.workId;
    this.expectModel = params.expectModel;
    this.operatorItems = new Array<EleOperatorModel>();
    params.operatorItems.forEach(value=>{
      let newOperatorItem = HelpInstance.initValue<EleOperatorModel>(value, EleOperatorModel);
      this.operatorItems.push(newOperatorItem)
    })
  }

  name: string;
  
  operatorItems: Array<EleOperatorModel>;

  workId: string;

  expectModel: ExpectModel;

}