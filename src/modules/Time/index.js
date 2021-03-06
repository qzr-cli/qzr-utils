/**
 * @Date         : 2020-11-09 10:40:46
 * @Description  : 时间相关工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-06-09 18:15:58
 */


class Time {
  constructor(val) {
    this.date = new Date(val)

    this.Year = this.date.getYear() // 获取当前年份(2位)

    this.FullYear = this.date.getFullYear() // 获取完整的年份(4位,1970-????)

    this.Month = this.date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;

    this.Date = this.date.getDate() // 获取当前日(1-31)

    this.Day = this.date.getDay() + 1 // 获取当前星期X(0-6,0代表星期天)

    this.Time = this.date.getTime() // 获取当前时间(从1970.1.1开始的毫秒数)

    this.Hours = this.date.getHours() // 获取当前小时数(0-23)

    this.Minutes = this.date.getMinutes() // 获取当前分钟数(0-59)

    this.Seconds = this.date.getSeconds() // 获取当前秒数(0-59)

    this.Milliseconds = this.date.getMilliseconds() // 获取当前毫秒数(0-999)

    this.ocaleDateString = this.date.toLocaleDateString() // 获取当前日期

    this.localeTimeString = this.date.toLocaleTimeString() // 获取当前时间

    this.toLocaleString = this.date.toLocaleString() // 获取日期与时间

    this.timestamp = this.date.getTime()  // 获取时间戳
  }
}

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


TIME.formatDefault = val => {
  let date = new Date(val)
}

TIME.time = Time

export default TIME