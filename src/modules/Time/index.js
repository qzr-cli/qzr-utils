/**
 * @Date         : 2020-11-09 10:40:46
 * @Description  : 时间相关工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-17 11:29:00
 */


const TIME = {}

/**
 * @description: 秒转化为00:00:00格式
 * @param {string | number} value
 * @return {string} HH:mm:ss格式
 */
TIME.formatSeconds = (value) => {
  let theTime = parseInt(value) // 秒
  let theTime1 = 0 // 分
  let theTime2 = 0 // 小时

  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)

    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }

  theTime1 = theTime1 < 10 ? `0${theTime1}` : theTime1
  theTime2 = theTime2 < 10 ? `0${theTime2}` : theTime2
  theTime = theTime < 10 ? `0${theTime}` : theTime

  let result = `00:00:${theTime}`

  if (theTime1 > 0) {
    result = `00:${theTime1}:${theTime}`
  }

  if (theTime2 > 0) {
    result = `${theTime2}:${theTime1}:${theTime}`
  }

  return result
}

/**
 * @description: 时分秒转化为秒
 * @param {string} val HH:mm:ss格式
 * @return {string} 秒数
 */
TIME.formatToS = (val) => {
  let value = String(val)
  let h = Number(value.slice(0, 2))
  let m = Number(value.slice(3, 5))
  let s = Number(value.slice(6, 8))

  return h * 60 * 60 + m * 60 + s
}