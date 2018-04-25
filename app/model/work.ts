import { EleOperatorModel } from 'puppeteer-tools-core'
import HelpInstance from '../extend/help'

export class WorkModel {

  constructor( params: any ){
    this.name = params.name;
    this.url = params.url;
    this.operatorItems = new Array<EleOperatorModel>();
    params.operatorItems.forEach(value=>{
      let newOperatorItem = HelpInstance.initValue<EleOperatorModel>(value, EleOperatorModel);
      this.operatorItems.push(newOperatorItem)
    })
  }

  name: string;
  
  operatorItems: Array<EleOperatorModel>;

  url: string;

}