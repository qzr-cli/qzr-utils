/**
 * @Date         : 2020-11-03 10:16:58
 * @Description  : cookie 方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-07 10:26:19
 */
 declare let cookieStore:any

 /**
  * cookie操作方法
  * @static parse 格式化cookie字符串 返回对象
  * @static parseAll 格式化解析当前cookie 返回对象
  * @static get 获取单个cookie属性
  * @static getAll 获取当前domain下的所有cookie
  * @static set 设置cookie
  * @static del 删除cookie
  * @staticAsync getAsync 获取单个cookie属性（异步）
  * @staticAsync getAllAsync 获取当前domain下的所有cookie（异步）
  * @staticAsync setAsync 设置cookie（异步）
  * @staticAsync delAsync 删除cookie（异步）
  * @static addEventListener 添加cookie事件监听器
  * @staticAsync setAsync 设置cookie（异步）
  */
class Cookie {
  /**
   * 格式化cookie字符串 返回对象
   * @param {*} str
   * @returns {object} 返回cookie对象
   */
  static parse(str: string) {
    return str.split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        (<any>acc)[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      }, {})
  }

  /**
   * 格式化解析当前cookie 返回对象
   * @returns {object} 返回包含当前所有cookie的对象
   */
  static parseAll() {
    const cookie = Cookie.getAll()
    return Cookie.parse(cookie)
  }

  /**
   * 获取单个cookie属性
   * @param {string} name
   * @return {string | undefined}
   */
  static get(name:string): string | undefined {
    let result = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')
    return result ? result.pop() : ''
  }

  /**
   * 获取当前domain下的所有cookie
   * @param {string} domain 当前域名
   * @return {Array}
   */
  static getAll() {
    return document.cookie
  }

  /**
   * 设置cookie
   * @param {string} key
   * @param {*} val
   * @param {string} day
   * @return {undefined}
   */
  static set({ key, val, path = false, day = 1 }: {key:string, val:any, path:boolean, day:number}) {
    let d = new Date()
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    let result = key + '=' + val + '; ' + expires
    if (path) result += `;path=${path}`
    document.cookie = result
  }

  /**
   * 删除cookie
   * @param {*} name cookie的key
   * @return {null}
   */
  static del(key:string, path = false) {
    let result = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    if (path) result += `;path=${path}`
    document.cookie = result
  }


  /**
   * 获取单个cookie属性（异步）
   * @param {string} name
   * @return {object}
   */
  static async getAsync(name:string) {
    const result = await cookieStore.get(name)
    return result
  }

  /**
   * 获取当前domain下的所有cookie（异步）
   * @param {string} domain 当前域名
   * @return {Promise<any>}
   */
  static async getAllAsync(domain:string): Promise<any> {
    const result = await cookieStore.getAll({ domain })
    return result
  }

  /**
   * 设置cookie（异步）
   * @param {string} key
   * @param {*} val
   * @param {string} domain
   * @return {Promise<any>}
   */
  static async setAsync({ key = '', val = '', domain = null }):Promise<any> {
    const result = await cookieStore.set({
      name: key,
      value: val,
      domain
    })
    return result
  }

  /**
   * 删除cookie（异步）
   * @param {*} name cookie的key
   * @return {Promise<any>}
   */
  static async delAsync(name:string):Promise<any> {
    const result = await cookieStore.delete(name)
    return result
  }

  /**
   * 添加cookie事件监听器
   * @callback fn 回调函数
   */
  static addEventListener(fn:any) {
    cookieStore.addEventListener('change', (e:any) => fn(e))
  }

  /**
   * 清除所有cookie
   * @param {*} host 指定域名下清空
   */
  static clearAll(host:string) {
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