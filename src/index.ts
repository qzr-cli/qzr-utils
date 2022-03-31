/**
 * @Date         : 2020-11-02 14:21:06
 * @Description  : 导出工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:49
 */

import bom from './modules/BOM'
import core from './modules/Core'
import date from './modules/Date'
import monitor from './modules/Monitor'
import algorithm from './modules/Algorithm'
import dom from './modules/DOM'
import format from './modules/Format'
import regular from './modules/Regular'

let exportObj = {
  // browser
  bom,
  core,
  date,
  monitor,
  algorithm,
  dom,
  format,
  regular
}

// if (typeof window === 'undefined') {
//   exportObj = {
//     ...exportObj,
//     ...import('./modules/Node')
//   }
// }

export default exportObj