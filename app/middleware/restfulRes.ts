export default function restfulRes(){
  return async (ctx, next) => {
    try {
      await next();
      // 将返回值封装为符合restful格式的响应
      const body = ctx.body;
      if (body === null || body === undefined) {
        ctx.body = {
          code: 40400,
          error: 'not find url',
        };
      } else if (!body.code) {
        ctx.body = {
          code: 20000,
          result: body,
        };
      }
    } catch (error) {
      ctx.body = {
        code: error.errorCode || 50000,
        error: error.message,
      };
    }
  };
}