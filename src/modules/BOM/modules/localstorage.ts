/**
 * @Date         : 2021-02-02 14:15:56
 * @Description  : localstorage
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-02-02 16:09:23
 */

/**
 * Localstorage控制方法
 * @static get 获取
 * @static set 设置
 * @static del 删除
 * @static clear 清空所有localStrage
 * @static changeObj 针对对象 添加属性
 */
export default class Localstorage {
  /**
   * 获取
   * @param key 获取key
   */
  static get(key:string) {
    const data:string = localStorage.getItem(key) ?? ''
    return data ? JSON.parse(data) : data
  }

  /**
   * 设置
   * @param key 获取key
   * @param val 设置值
   */
  static set(key:string, val:any) {
    const data = JSON.stringify(val)
    return localStorage.setItem(key, data)
  }

  /**
   * 删除
   * @param key 需要删除的键
   */
  static del(key:string) {
    return localStorage.removeItem(key)
  }

  /**
   * 清空所有localStrage
   */
  static clear() {
    return localStorage.clear()
  }

  /**
   * 针对对象 添加属性
   * @param key 获取的key
   * @param val 需要增加的对象
   */
  static changeObj(key:string, val:any) {
    let data = Localstorage.get(key)
    return Localstorage.set(key, {
      ...data,
      ...val
    })
  }
}

