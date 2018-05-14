import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  app.passport.mount('github');

  //HOME
  router.get('/login/loginIn', controller.home.loginIn);
  router.get('/login/hasLogin', controller.home.hasLogin);
  router.get('/getUserInfo', controller.home.getUserInfo);
  router.get('/logOut', controller.home.logOut);
  //work
  router.post('/saveWork', controller.work.saveWork);
  router.post('/saveTask', controller.work.saveTask);
  router.get('/getHtmlModel', controller.work.getHtmlModel);
  router.get('/getWorkInfo', controller.work.getWorkInfo);
  router.get('/getTaskInfo', controller.work.getTaskInfo);
  router.get('/getAllWorkInfo', controller.work.getAllWorkInfo);
  router.get('/getAllTask', controller.work.getAllTask);
  router.get('/getTaskInstance', controller.work.getTaskInstance);
  //excute
  router.get('/excuteTask', controller.excute.excuteTask);
  // commOperator
  router.post('/saveOperatorItems', controller.comOperator.saveOperatorItems);
  router.get('/getOperatorItems', controller.comOperator.getOperatorItems);
};
