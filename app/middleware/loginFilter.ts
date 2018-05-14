export default function loginFilter(){
  return async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.body = {
        code: 30200,
        redirectUrl: ctx.app.config.loginInUrl,
      };
    }
  };
}