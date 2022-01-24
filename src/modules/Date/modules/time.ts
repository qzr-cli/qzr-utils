/**
 * @Date         : 2020-11-09 10:40:46
 * @Description  : 时间相关工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:24:10
 */

/**
 * 时间日期相关方法
 * @var date  Date对象
 * @var FullYear  获取完整的年份(4位,1970-????)
 * @var Month  获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;
 * @var Date  获取当前日(1-31)
 * @var Day  获取当前星期X(0-6,0代表星期天)
 * @var Time  获取当前时间(从1970.1.1开始的毫秒数)
 * @var Hours  获取当前小时数(0-23)
 * @var Minutes  获取当前分钟数(0-59)
 * @var Seconds  获取当前秒数(0-59)
 * @var Milliseconds  获取当前毫秒数(0-999)
 * @var ocaleDateString  获取当前日期
 * @var localeTimeString  获取当前时间
 * @var toLocaleString  获取日期与时间
 * @var timestamp  获取时间戳
 * @function formatDefault  基本格式化时间
 * @function formate  格式化的格式
 * @static formatSeconds  秒转化为00:00:00格式
 * @static formatToS  时分秒转化为秒
 */
class Time {
  static test: number
  date: Date
  // Year: number
  FullYear: number
  Month: number
  Date: number
  Day: number
  Time: number
  Hours: number
  Minutes: number
  Seconds: number
  Milliseconds: number
  ocaleDateString: string
  localeTimeString: string
  toLocaleString: string
  timestamp: number
  constructor(val:string | number | Date) {
    this.date = new Date(val)

    // this.Year = this.date.getYear() // 获取当前年份(2位)

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

  /**
   * 基本格式化时间
   * @returns 返回'2022-01-19'类似字符串
   */
  formatDefault() {
    return `${this.FullYear}-${Time.add0(this.Month)}-${Time.add0(this.Date)}`
  }

  /**
   *
   * @param {string} formater 格式化的格式 例如YYYY-MM-DD HH:mm:ss
   * @returns {formater}
   */
  formate(formater:string) {
    let Y = String(this.FullYear)
    let M = this.Month
    let D = this.Date
    let H = this.Hours
    let m = this.Minutes
    let s = this.Seconds

    return formater.replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.slice(2, 4))
      .replace(/MM/g, (M < 10 ? '0' : '') + M)
      .replace(/DD/g, (D < 10 ? '0' : '') + D)
      .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
      .replace(/mm/g, (m < 10 ? '0' : '') + m)
      .replace(/ss/g, (s < 10 ? '0' : '') + s)
  }

  /**
   * @description: 秒转化为00:00:00格式
   * @param {string | number} value
   * @return {string} HH:mm:ss格式
   */
  static formatSeconds(value: string | number) {
    let theTime: number | string = parseInt(String(value)) // 秒
    let theTime1: number | string = 0 // 分
    let theTime2: number | string = 0 // 小时

    if (theTime > 60) {
      theTime1 = parseInt(String(theTime / 60))
      theTime = parseInt(String(theTime % 60))

      if (theTime1 > 60) {
        theTime2 = parseInt(String(theTime1 / 60))
        theTime1 = parseInt(String(theTime1 % 60))
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
  static formatToS(val:string | number) {
    let value = String(val)
    let h = Number(value.slice(0, 2))
    let m = Number(value.slice(3, 5))
    let s = Number(value.slice(6, 8))

    return h * 60 * 60 + m * 60 + s
  }


  static add0(val:string | number) {
    if (Number(val) < 10) return `0${val}`
    else return val
  }
}

export default Time