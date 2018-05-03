export default class ErrorInfo extends Error {

  constructor(message: string){
    super(message);
    this.errorCode = 50010;
  }

  errorCode: number;
}