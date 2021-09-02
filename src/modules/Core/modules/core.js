/**
 * @Date         : 2020-11-03 11:34:47
 * @Description  : js核心utils方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:08:48
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
}


export default Core