/**
 * @Date         : 2020-11-03 10:16:58
 * @Description  : cookie 方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-17 11:35:27
 */


const COOKIE = {}

/**
 * @description: 获取单个cookie属性
 * @param {string} name
 * @return {object}
 */
COOKIE.get = async (name) => {
  const result = await cookieStore.get(name)
  return result
}

/**
 * @description: 获取当前domain下的所有cookie
 * @param {string} domain 当前域名
 * @return {Array}
 */
COOKIE.getAll = async (domain) => {
  const result = await cookieStore.getAll({ domain })
  return result
}

/**
 * @description: 设置cookie
 * @param {string} key
 * @param {*} val
 * @param {string} domain
 * @return {undefined}
 */
COOKIE.set = async ({ key = '', val = '', domain = null }) => {
  const result = await cookieStore.set({
    name: key,
    value: val,
    domain
  })
  return result
}

/**
 * @description: 删除cookie
 * @param {*} name cookie的key
 * @return {null}
 */
COOKIE.del = async (name) => {
  const result = await cookieStore.delete(name)
  return result
}

/**
 * @description: 添加cookie事件监听器
 * @param {*} fn
 */
COOKIE.addEventListener = (fn) => {
  cookieStore.addEventListener('change', e => fn(e))
}

/**
 * @description: 添加cookie事件监听器
 * @param {*} host
 */
COOKIE.clearAll = function(host) {
  let keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=' + host + ';expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
    }
  }
}

export default COOKIE