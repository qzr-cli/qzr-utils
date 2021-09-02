/**
 * @Date         : 2021-02-02 14:15:56
 * @Description  : localstorage
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-02-02 16:09:23
 */

export default class Localstorage {
  static get(key) {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
  }

  static set(key, val) {
    const data = JSON.stringify(val)
    return localStorage.setItem(key, data)
  }

  static del(key) {
    return localStorage.removeItem(key)
  }

  static clear() {
    return localStorage.clear()
  }

  static change(key, val) {
    let data = Localstorage.get(key)
    return Localstorage.set(key, {
      ...data,
      ...val
    })
  }
}

