const BlinkDiff = require('blink-diff');
import * as fs from 'fs';

export default class BlinkDiffCom {

  static async CompareImage(imageAPath, imageBPath, option?: any) {
    const outputPath = `./${new Date().toJSON()}.png`;
    var diff = new BlinkDiff({
      imageAPath,
      imageBPath,
      thresholdType: BlinkDiff.THRESHOLD_PIXEL,
      threshold: 0.01, 
      imageOutputPath: outputPath,
      imageOutputLimit: BlinkDiff.OUTPUT_SIMILAR,
      delta: 20,
      ...option
    });
    const res = await diff.runWithPromise();
    if(!diff.hasPassed(res.code)) {
      const outStream = fs.readFileSync(outputPath);
      fs.unlinkSync(outputPath);
      return {
        result: diff.hasPassed(res.code),
        outStream,
      }
    }else {
      return {
        result: diff.hasPassed(res.code),
        outStream: null
      }
    }
  }
}