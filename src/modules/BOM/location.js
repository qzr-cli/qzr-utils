/**
 * @Date         : 2020-11-02 14:22:18
 * @Description  : bom 浏览器相关工具
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-11-03 10:17:21
 */

const LOCATION = {}

/**
 * 获取url param的值 ?后
 * @param {string} variable 需要获取的字段名
 */
LOCATION.getParam = (variable) => {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] === variable) { return pair[1] }
  }
  return (false)
}

export default LOCATION