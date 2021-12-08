/**
 * @Date         : 2020-11-03 11:34:47
 * @Description  : js核心utils方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:52:08
 */


class Core {
  /**
   * @description: 判断参数类型
   * @param {*} item 传入需要判断的变量
   * @return {string} string/object/array/number/boolean/undefined/null/symbol
   */
  static checkType(item) {
    const handle = Function.prototype.call.bind(Object.prototype.toString)  // 防止Object.prototype.toString方法被覆盖污染
    const type = handle(item)
    return type.slice(8, -1).toLowerCase()
  }

  /**
   * 生成随机字符串
   * @param {number} len 位数
   * @returns {string} 随机字符串
   */
  static randomString(len) {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
    let strLen = chars.length
    let randomStr = ''
    for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * strLen))
    }
    return randomStr
  }
}


export default Core