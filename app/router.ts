import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  app.passport.mount('github');

  //HOME
  router.get('/', controller.home.index);
  router.get('/getUserInfo', controller.home.getUserInfo);
  router.get('/logOut', controller.home.logOut);
  //work
  router.post('/saveWork', controller.work.saveWork);
  router.post('/saveTask', controller.work.saveTask);
  router.get('/getHtmlModel', controller.work.getHtmlModel);
  router.get('/getWorkInfo', controller.work.getWorkInfo);
  router.get('/getTaskInfo', controller.work.getTaskInfo);
  router.get('/getAllWorkInfo', controller.work.getAllWorkInfo);
  //excute
  router.get('/excuteWork', controller.excute.excuteTask);
};
