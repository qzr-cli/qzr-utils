/**
 * @Date         : 2021-10-19 17:50:01
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:14
 */

export default class String {
  // 首字母大写
  static fistLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // 格式化手机号 中间为*
  static telFormat(tel) {
    tel = String(tel)
    return tel.substr(0, 3) + '****' + tel.substr(7)
  }
}