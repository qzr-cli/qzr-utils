/**
 * @Date         : 2020-11-03 10:16:58
 * @Description  : cookie 方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-11-03 10:44:34
 */


const COOKIE = {}

/**
 * @description: 获取单个cookie属性
 * @param {string} name 
 * @return {object}
 */
COOKIE.get = async(name) => {
  return await cookieStore.get(name)
}

/**
 * @description: 获取当前domain下的所有cookie
 * @param {string} domain 当前域名
 * @return {Array}
 */
COOKIE.getAll = async(domain) => {
  return await cookieStore.getAll({ domain })
}

/**
 * @description: 设置cookie
 * @param {string} key
 * @param {*} val
 * @param {string} domain
 * @return {undefined} 
 */
COOKIE.set = async({ key = '', val = '', domain = null}) => {
  return await cookieStore.set({
    name: key,
    value: val,
    domain
  })
}

/**
 * @description: 删除cookie
 * @param {*} name cookie的key
 * @return {null}
 */
COOKIE.del = async(name) => {
  return await cookieStore.delete(name)
}

/**
 * @description: 添加cookie事件监听器
 * @param {*} fn
 */
COOKIE.addEventListener = (fn) => {
  cookieStore.addEventListener('change', e => fn(e))
}

export default COOKIE