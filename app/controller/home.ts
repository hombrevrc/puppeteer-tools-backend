import { Controller } from 'egg';

export default class HomeController extends Controller {
  
  public async loginIn() {
    if(!this.ctx.isAuthenticated()) {
      this.service.home.loginIn();
    } else {
      this.ctx.body = {
        code: 30200,
        redirectUrl: this.ctx.app.config.homepage
      }
    }
  }

  public async hasLogin() {
    this.ctx.body = this.ctx.isAuthenticated();
  }

  public async getUserInfo() {
    this.ctx.body = this.ctx.user;
  }

  public async logOut() {
    this.ctx.logout();
    this.ctx.body = true;
  }
}
