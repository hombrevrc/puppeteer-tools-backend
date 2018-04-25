export default function loginFilter(){
  return async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else if (ctx.path === '/') {
      ctx.session.returnTo = ctx.app.config.homepage;
      ctx.redirect('/passport/github');
    } else {
      ctx.body = {
        code: 30200,
        redirectUrl: ctx.app.config.loginInUrl,
      };
    }
  };
}