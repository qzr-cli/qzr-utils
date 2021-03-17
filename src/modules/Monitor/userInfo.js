/**
 * @Date         : 2020-11-13 16:28:23
 * @Description  : 用户信息收集
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-17 11:32:48
 */

class Userinfo {
  constructor() {
    this.navigator = ''
    this.appCodeName = '' // 浏览器代码名
    this.appName = ''  // 浏览器名称
    this.appVersion = '' // 浏览器平台和版本信息
    this.platform = '' // 浏览器造作系统平台
    this.userAgent = ''
    this.browserLanguage = ''  // 当前浏览器语言
    this.systemLanguage = '' // 系统默认语言
    this.userLanguage = '' // 系统自然语言设置

    this.client = '' // 当前浏览器环境

    this._init()
  }

  _init() {
    this.navigator = window.navigator
    if (this.navigator) throw Error('不支持navigator')

    this._set()
  }

  _set() {
    const { appCodeName, appName, appVersion, platform, userAgent, browserLanguage, systemLanguage, userLanguage } = this.navigator

    this.appCodeName = appCodeName
    this.appName = appName
    this.appVersion = appVersion
    this.platform = platform
    this.userAgent = userAgent
    this.browserLanguage = browserLanguage
    this.systemLanguage = systemLanguage
    this.userLanguage = userLanguage
  }

  _checkClient() {
    const { userAgent } = this
    const microMsg = userAgent.match(/MicroMessenger/i) || []

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.client = 'mobile'
    } else {
      this.client = 'PC'
    }

    if (microMsg[0] === 'micromessenger') this.client = 'vx'  // 微信环境


  }
}

export default Userinfo
