/**
 * @Date         : 2020-11-03 11:34:47
 * @Description  : js核心utils方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:52:08
 */

/**
 * js 核心utils方法
 * @static checkType 判断参数类型
 * @static randomString 生成随机字符串
 */
class Core {
  /**
   * @description: 判断参数类型
   * @param {*} item 传入需要判断的变量
   * @return {string} string/object/array/number/boolean/undefined/null/symbol
   */

  static checkType(item:any):'string'|'object'|'array'|'number'|'boolean'|'undefined'|'null'|'symbol' {
    const handle = Function.prototype.call.bind(Object.prototype.toString)  // 防止Object.prototype.toString方法被覆盖污染
    const type = handle(item)
    return type.slice(8, -1).toLowerCase()
  }

  /**
   * 生成随机字符串
   * @param {number} len 位数
   * @returns {string} 随机字符串
   */
  static randomString(len:number):string {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
    let strLen = chars.length
    let randomStr = ''
    for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * strLen))
    }
    return randomStr
  }

  /**
   * 删除对象为空的属性
   * @param obj 对象
   */
  static delEmptyAttr(obj: {
    [index:string]: any
  }) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const item = obj[key]
        if (!item) delete obj[key]
      }
    }

    return obj
  }
}


export default Core