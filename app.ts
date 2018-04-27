import * as AV from 'leancloud-storage';

export default app => {
  app.beforeStart(async () => {
    AV.init({
      appId: app.config.appId,
      appKey: app.config.appKey
    });
    await app.runSchedule('excuteWork')
  });
};
