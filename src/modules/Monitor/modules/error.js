/**
 * @Date         : 2020-11-13 16:19:04
 * @Description  : 错误监控相关代码
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-07 11:18:33
 */

class ErrorPerformance {
  constructor() {
    this.resError = []
    this.jsError = []
    this.promiseError = []

    this._init()
  }

  _init() {
    this._listenRes()
    this._listenJs()
    this._listenPromise()

  }

  _listenRes() {
    const THAT = this

    addEventListener('error', e => {
      const target = e.target
      if (target !== window) {
        const errorInfo = {
          type: target.localName,
          url: target.src || target.href,
          msg: (target.src || target.href) + ' is load error',
          // 错误发生的时间
          time: new Date().getTime(),
        }
        THAT.resError.push(errorInfo)
        console.error(errorInfo)
      }
    }, true)
  }

  _listenJs() {
    const THAT = this

    window.onerror = function(msg, url, row, col, error) {
      const errorInfo = {
        type: 'javascript',
        row: row,
        col: col,
        msg: error && error.stack ? error.stack : msg,
        url: url,
        // 错误发生的时间
        time: new Date().getTime(),
      }
      THAT.jsError.push(errorInfo)
      console.error(errorInfo)
    }
  }

  _listenPromise() {
    const THAT = this

    addEventListener('unhandledrejection', e => {
      const errorInfo = {
        type: 'promise',
        msg: (e.reason && e.reason.msg) || e.reason || '',
        // 错误发生的时间
        time: new Date().getTime(),
      }
      THAT.promiseError.push(errorInfo)
      console.log(errorInfo)
    })
  }
}

export default ErrorPerformance