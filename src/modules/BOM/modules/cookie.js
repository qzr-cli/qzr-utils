/**
 * @Date         : 2020-11-03 10:16:58
 * @Description  : cookie 方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-07 10:26:19
 */


class Cookie {
  /**
   * 格式化cookie
   * @param {*} str
   * @returns
   */
  static parse(str) {
    return str.split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      }, {})
  }

  /**
   * 格式化所有cookie
   */
  static parseAll() {
    const cookie = Cookie.getAll()
    return Cookie.parse(cookie)
  }

  /**
   * @description: 获取单个cookie属性
   * @param {string} name
   * @return {object}
   */
  static get(name) {
    let result = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')
    return result ? result.pop() : ''
  }

  /**
   * @description: 获取当前domain下的所有cookie
   * @param {string} domain 当前域名
   * @return {Array}
   */
  static getAll() {
    return document.cookie
  }

  /**
   * @description: 设置cookie
   * @param {string} key
   * @param {*} val
   * @param {string} day
   * @return {undefined}
   */
  static set({ key, val, path = false, day = 1 }) {
    let d = new Date()
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toGMTString()
    let result = key + '=' + val + '; ' + expires
    if (path) result += `;path=${path}`
    document.cookie = result
  }

  /**
   * @description: 删除cookie
   * @param {*} name cookie的key
   * @return {null}
   */
  static del(key, path = false) {
    let result = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    if (path) result += `;path=${path}`
    document.cookie = result
  }


  /**
   * @description: 获取单个cookie属性（异步）
   * @param {string} name
   * @return {object}
   */
  static async getAsync(name) {
    const result = await cookieStore.get(name)
    return result
  }

  /**
   * @description: 获取当前domain下的所有cookie（异步）
   * @param {string} domain 当前域名
   * @return {Array}
   */
  static async getAllAsync(domain) {
    const result = await cookieStore.getAll({ domain })
    return result
  }

  /**
   * @description: 设置cookie（异步）
   * @param {string} key
   * @param {*} val
   * @param {string} domain
   * @return {undefined}
   */
  static async setAsync({ key = '', val = '', domain = null }) {
    const result = await cookieStore.set({
      name: key,
      value: val,
      domain
    })
    return result
  }

  /**
   * @description: 删除cookie（异步）
   * @param {*} name cookie的key
   * @return {null}
   */
  static async delAsync(name) {
    const result = await cookieStore.delete(name)
    return result
  }

  /**
   * @description: 添加cookie事件监听器
   * @param {*} fn
   */
  static addEventListener(fn) {
    cookieStore.addEventListener('change', e => fn(e))
  }

  /**
   * @description: 添加cookie事件监听器
   * @param {*} host
   */
  static clearAll(host) {
    let keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
        document.cookie = keys[i] + '=0;path=/;domain=' + host + ';expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
      }
    }
  }
}


export default Cookie