import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  app.passport.mount('github');

  //HOME
  router.get('/', controller.home.index);
  router.get('/getUserInfo', controller.home.getUserInfo);
  //work
  router.post('/saveWork', controller.work.saveWork);
  router.get('/getHtmlModel', controller.work.getHtmlModel);
  router.get('/getWorkInfo', controller.work.getWorkInfo);
  //excute
  router.get('/shotEle', controller.excute.shotEle);
  router.get('/excuteWork', controller.excute.excuteWork);
};
