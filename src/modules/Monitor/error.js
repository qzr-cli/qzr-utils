/**
 * @Date         : 2020-11-13 16:19:04
 * @Description  : 错误监控相关代码
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-11-13 16:25:38
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
      if (target != window) {
        THAT.resError.push({
              type: target.localName,
              url: target.src || target.href,
              msg: (target.src || target.href) + ' is load error',
              // 错误发生的时间
              time: new Date().getTime(),
          })
      }
    }, true)
  }

  _listenJs() {
    const THAT = this

    window.onerror = function(msg, url, row, col, error) {
      THAT.jsError.push({
          type: 'javascript',
          row: row,
          col: col,
          msg: error && error.stack? error.stack : msg,
          url: url,
          // 错误发生的时间
          time: new Date().getTime(),
      })
    }
  }

  _listenPromise() {
    const THAT = this

    addEventListener('unhandledrejection', e => {
      THAT.promiseError.push({
          type: 'promise',
          msg: (e.reason && e.reason.msg) || e.reason || '',
          // 错误发生的时间
          time: new Date().getTime(),
      })
    })
  }
}

export default ErrorPerformance