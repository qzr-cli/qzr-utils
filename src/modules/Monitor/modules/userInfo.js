/**
 * @Date         : 2020-11-13 16:28:23
 * @Description  : 用户信息收集
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:42:25
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
    if (!this.navigator) throw Error('不支持navigator')

    this._set()
    this._checkClient()
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

  // 获取浏览器型号和版本
  static getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase()
    return 0 <= t.indexOf('msie') ? { // ie < 11
      type: 'IE',
      version: Number(t.match(/msie ([\d]+)/)[1])
    } : t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
      type: 'IE',
      version: 11
    } : 0 <= t.indexOf('edge') ? {
      type: 'Edge',
      version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf('firefox') ? {
      type: 'Firefox',
      version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf('chrome') ? {
      type: 'Chrome',
      version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf('opera') ? {
      type: 'Opera',
      version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf('Safari') ? {
      type: 'Safari',
      version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
      type: t,
      version: -1
    }
  }

  // 判断是否是微信/qq内置浏览器
  static broswer() {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return 'weixin'
    } else if (ua.match(/QQ/i) === 'qq') {
      return 'QQ'
    }
    return false
  }

  // 判断是windows还是mac系统
  static osType() {
    const agent = navigator.userAgent.toLowerCase()
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
    const isWindows = agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0 || agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0
    if (isWindows) {
      return 'windows'
    }
    if (isMac) {
      return 'mac'
    }
  }

  // 判断是否是移动设备
  static isMobile() {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
      return 'mobile'
    }
    return 'desktop'
  }

  // 判断是否是苹果设备
  static isAppleMobileDevice() {
    let reg = /iphone|ipod|ipad|Macintosh/i
    return reg.test(navigator.userAgent.toLowerCase())
  }

  // 判断是否是安卓设备
  static isAndroidMobileDevice() {
    return /android/i.test(navigator.userAgent.toLowerCase())
  }



}

export default Userinfo
