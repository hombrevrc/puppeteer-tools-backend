
export default class HelpInstance {
  static initValue<T>(value: any, TModel: { new(): T; }): T {
    let newT = new TModel();
    newT = value;
    return  newT;
  }
}

