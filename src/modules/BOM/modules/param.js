/**
 * @Date         : 2020-11-02 14:22:18
 * @Description  : url search params相关utils
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:08:05
 */

class Param {
  /**
   * 获取url param的值 ?后
   * @param {string} variable 需要获取的字段名
   */
  static getParam(variable) {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] === variable) { return pair[1] }
    }
    return (false)
  }

  /**
   * @description: 设置param 并更新url
   * @param {*} key
   * @param {*} val
   */
  static setParam(key, val) {
    let href = location.href
    let search = location.search

    if (search) {
      const index = href.indexOf(search)
      const length = search.length
      search += `&${key}=${val}`
      const before = href.slice(0, index)
      const after = href.slice(index + length)
      href = before + search + after
    } else {
      href += `?${key}=${val}`
    }

    history.replaceState({}, '', href)
  }

  /**
   * @description: 删除params属性 并更新url
   * @param {*} key params名
   * @return {*}
   */
  static delParam(key) {
    let href = location.href
    let search = location.search

    if (search) {
      const index = href.indexOf(search)
      const length = search.length

      let parObj = {}
      let searchStr = '?'
      search = search.slice(1)
      const parArr = search.split('&')
      for (const item of parArr) {
        let itemArr = item.split('=')
        parObj[itemArr[0]] = itemArr[1]
      }
      delete parObj[key]

      for (const key in parObj) {
        if (parObj.hasOwnProperty(key)) {
          const item = parObj[key]
          searchStr += `${key}=${item}&`
        }
      }

      searchStr = searchStr.slice(0, -1)

      const before = href.slice(0, index)
      const after = href.slice(index + length)
      href = before + searchStr + after
    } else {
      return false
    }

    history.replaceState({}, '', href)
  }
}


export default Param