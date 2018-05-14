import { Service } from 'egg';

/**
 * Test Service
 */
export default class HomeService extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async loginIn() {
    const { ctx } = this;
    ctx.session.returnTo = ctx.app.config.homepage;
    ctx.redirect('/passport/github');
  }
}

