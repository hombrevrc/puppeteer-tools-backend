import ExpectTypes from './expectTypes';
import { ElementSelectKey } from 'puppeteer-tools-core'

export default class ExpectModel {
  opType: ExpectTypes;

  name: String;

  value: String;

  expectSelectKey: ElementSelectKey;

  onlyGet: Boolean;

  useFirst: Boolean;

  useSql: Boolean;

  sqlGetIndex: String;
}