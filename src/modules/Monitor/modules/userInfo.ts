/**
 * @Date         : 2020-11-13 16:28:23
 * @Description  : 用户信息收集
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-07 11:40:13
 */

/**
 * 用户信息收集
 * @var navigator navigator
 * @var userAgent userAgent
 * @var language  当前浏览器语言
 * @var client 当前浏览器环境
 * @var explorerInfo  浏览器版本型号
 * @var isQQorWx 是否是qq或微信
 * @var osType 是windos还是mac
 * @var isMobile 是否是移动设备
 * @var isApple  是否是苹果设备
 * @var isAnroid 是否是安卓设备
 * @static getExplorerInfo 获取浏览器型号和版本
 * @static getQQorWx 判断是否是微信/qq内置浏览器
 * @static getOsType 判断是windows还是mac系统
 * @static getIsMobile 判断是否是移动设备
 * @static getIsAppleMobileDevice 判断是否是苹果设备
 * @static getIsAndroidMobileDevice 判断是否是安卓设备
 */
class Userinfo {
  navigator: Navigator
  userAgent: string
  language: string
  client: string
  explorerInfo: { 
    type: string; version: number
  }
  isQQorWx: string
  osType: string
  isMobile: boolean
  isApple: boolean
  isAnroid: boolean
  constructor() {
    this.navigator = window.navigator
    this.userAgent = ''
    this.language = ''  // 当前浏览器语言
    this.client = '' // 当前浏览器环境
    this.explorerInfo = Userinfo.getExplorerInfo()  // 浏览器版本型号
    this.isQQorWx = Userinfo.getQQorWx()  // 是否是qq或微信
    this.osType = Userinfo.getOsType()  // 是windos还是mac
    this.isMobile = Userinfo.getIsMobile()  // 是否是移动设备
    this.isApple = Userinfo.getIsAppleMobileDevice() // 是否是苹果设备
    this.isAnroid = Userinfo.getIsAndroidMobileDevice()  // 是否是安卓设备

    this._init()
    this._console()
  }

  private _console() {
    console.info('终端信息', {
      '当前浏览器语言': this.language,

      '当前浏览器环境': this.client,
    })
  }

  private _init() {
    if (!this.navigator) throw Error('不支持navigator')

    this._set()
    this._checkClient()
  }

  private _set() {
    const { userAgent, language } = this.navigator
    this.userAgent = userAgent
    this.language = language
  }

  private _checkClient() {
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

    if(0 <= t.indexOf('msie')) {
      return { // ie < 11
        type: 'IE',
        version: Number(t.match(/msie ([\d]+)/)??[1])
      }
    }else if(t.match(/trident\/.+?rv:(([\d.]+))/)) {
      return { // ie 11
        type: 'IE',
        version: 11
      }
    }else if(0 <= t.indexOf('edge')) {
      return {
        type: 'Edge',
        version: Number(testEmpty(t.match(/edge\/([\d]+)/)))
      }
    }else if(0 <= t.indexOf('firefox')) {
      return {
        type: 'Firefox',
        version: Number(testEmpty(t.match(/firefox\/([\d]+)/)))
      }
    }else if(0 <= t.indexOf('chrome')) {
      return  {
        type: 'Chrome',
        version: Number(testEmpty(t.match(/chrome\/([\d]+)/)))
      }
    }else if(0 <= t.indexOf('opera')) {
      return {
        type: 'Opera',
        version: Number(testEmpty(t.match(/opera.([\d]+)/)))
      }
    }else if(0 <= t.indexOf('Safari')) {
      return {
        type: 'Safari',
        version: Number(testEmpty(t.match(/version\/([\d]+)/)))
      }
    }else {
      return {
        type: t,
        version: -1
      }
    }

    function testEmpty(arr:any) {
      if(arr) return arr[1]
      else return -1
    }
  }

  // 判断是否是微信/qq内置浏览器
  static getQQorWx() {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i)) {
      return 'weixin'
    } else if (ua.match(/QQ/i)) {
      return 'QQ'
    }
    return 'other'
  }

  // 判断是windows还是mac系统
  static getOsType() {
    const agent = navigator.userAgent.toLowerCase()
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
    const isWindows = agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0 || agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0
    if (isWindows) {
      return 'windows'
    }
    if (isMac) {
      return 'mac'
    }
    return 'other'
  }

  // 判断是否是移动设备
  static getIsMobile() {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
      return true
    }
    return false
  }

  // 判断是否是苹果设备
  static getIsAppleMobileDevice() {
    let reg = /iphone|ipod|ipad|Macintosh/i
    return reg.test(navigator.userAgent.toLowerCase())
  }

  // 判断是否是安卓设备
  static getIsAndroidMobileDevice() {
    return /android/i.test(navigator.userAgent.toLowerCase())
  }



}

export default Userinfo
