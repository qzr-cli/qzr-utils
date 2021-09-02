/* eslint-disable no-new */
/**
 * @Date         : 2021-09-02 11:17:13
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:40:07
 */
import Time from './time'

class Core {
  static dateRangeGenerator(start, end, step = 1) {
    let result = []
    let s = new Date(start)
    let e = new Date(end)
    while (s < e) {
      const data = s.getDate()
      s = new Date(s.setDate(data + step))
      let t = new Time(s)
      result.push(t.formatDefault())
    }
    return result
  }
}