/**
 * @Date         : 2020-11-13 16:03:03
 * @Description  : 性能监控class
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-18 11:01:46
 */

interface performanceType {
  redirect: number, //'重定向耗时'
  whiteScreen: number,  //'白屏时间'
  blankTime: number,  //'白屏时间2'
  dom: number,  //'DOM渲染耗时'
  load: number, //'页面加载耗时'
  unload: number, //'页面卸载耗时'
  request: number,  //'请求耗时'
  time: number, //'当前时间'
  dnsTime: number,  //'dns查询耗时'
  appcacheTime: number, //'查询缓存数据时间'
  tcpTime: number,  //'tcp连接耗时'
  analysisTime: number, //'解析dom树耗时'
  firstPaint: number, //'首屏时间'
  domReadyTime: number, //'domReadyTime'
}

/**
 * 性能监控class 需要放在head前执行
 * @var resource 资源加载详情
 * @var performance.redirect 重定向耗时
 * @var performance.whiteScreen 白屏时间
 * @var performance.blankTime 白屏时间2
 * @var performance.dom DOM渲染耗时
 * @var performance.load 页面加载耗时
 * @var performance.unload 页面卸载耗时
 * @var performance.request 请求耗时
 * @var performance.time 当前时间
 * @var performance.dnsTime dns查询耗时
 * @var performance.appcacheTime 查询缓存数据时间
 * @var performance.tcpTime tcp连接耗时
 * @var performance.analysisTime 解析dom树耗时
 * @var performance.firstPaint 首屏时间
 * @var performance.domReadyTime domReadyTime
 */
class Performance {
  performance: performanceType
  resource: any
  constructor() {
    this.performance = {
      redirect: 0, //'重定向耗时'
      whiteScreen: 0,  //'白屏时间'
      blankTime: 0,  //'白屏时间2'
      dom: 0,  //'DOM渲染耗时'
      load: 0, //'页面加载耗时'
      unload: 0, //'页面卸载耗时'
      request: 0,  //'请求耗时'
      time: 0, //'当前时间'
      dnsTime: 0,  //'dns查询耗时'
      appcacheTime: 0, //'查询缓存数据时间'
      tcpTime: 0,  //'tcp连接耗时'
      analysisTime: 0, //'解析dom树耗时'
      firstPaint: 0, //'首屏时间'
      domReadyTime: 0, //'domReadyTime'
    } // 性能信息
    this.resource = '' // 资源加载详情

    this._init()
  }

  private _init() {
    this._getPerformance()
    this._getResources()
    this._console()
  }

  // 提示性能信息
  private _console() {
    console.info('性能信息', {
      '重定向耗时': this.performance.redirect,
      '白屏时间': this.performance.whiteScreen,
      '白屏时间2': this.performance.blankTime,
      'DOM渲染耗时': this.performance.dom,
      '页面加载耗时': this.performance.load,
      '页面卸载耗时': this.performance.unload,
      '请求耗时': this.performance.request,
      '当前时间': this.performance.time,
      'dns查询耗时': this.performance.dnsTime,
      '查询缓存数据时间': this.performance.appcacheTime,
      'tcp连接耗时': this.performance.tcpTime,
      '解析dom树耗时': this.performance.analysisTime,
      '首屏时间': this.performance.firstPaint,
      'domReadyTime': this.performance.domReadyTime,
    })

    console.info('资源加载详情', this.resource)
  }

  // 获取性能信息
  private _getPerformance() {
    if (!window.performance) throw Error('不支持性能监控')

    const timing:any = window.performance?.getEntriesByType('navigation')[0] || window.performance.timing

    const performance = {
      // 重定向耗时
      redirect: timing.redirectEnd - timing.redirectStart,
      // 白屏时间
      whiteScreen: new Date().getTime() - timing.fetchStart,
      // DOM 渲染耗时
      dom: timing.domComplete - (timing.domInteractive || timing.domLoading),
      // 页面加载耗时
      load: timing.loadEventEnd - timing.fetchStart,
      // 页面卸载耗时
      unload: timing.unloadEventEnd - timing.unloadEventStart,
      // 请求耗时
      request: timing.responseEnd - timing.requestStart,
      // 获取性能信息时当前时间
      time: new Date().getTime(),
      // dns查询耗时
      dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
      // 查询缓存数据时间
      appcacheTime: timing.domainLookupStart - timing.fetchStart,
      // tcp连接耗时
      tcpTime: timing.connectEnd - timing.connectStart,
      // 解析dom树耗时
      analysisTime: timing.domComplete - timing.domInteractive,
      // 白屏时间
      blankTime: (timing.domInteractive || timing.domLoading) - timing.fetchStart,
      // 首屏时间
      firstPaint: timing.domComplete - timing.fetchStart,
      // domReadyTime
      domReadyTime: timing.domContentLoadedEventEnd - timing.fetchStart,
    }

    this.performance = performance
  }

  // 获取资源信息
  private _getResources() {
    if (!window.performance) throw Error('不支持性能监控')

    const data = window.performance.getEntriesByType('resource')
    const resource:any = {
      xmlhttprequest: [],
      css: [],
      other: [],
      script: [],
      img: [],
      link: [],
      fetch: [],
      // 获取资源信息时当前时间
      time: new Date().getTime(),
    }

    data.forEach((item:any) => {
      const arry = resource[item.initiatorType]
      arry && arry.push({
        // 资源的名称
        name: item.name,
        // 资源加载耗时
        duration: item.duration.toFixed(2),
        // 资源大小
        size: item.transferSize,
        // 资源所用协议
        protocol: item.nextHopProtocol,
      })
    })

    this.resource = resource
  }

  private _timingType() {
    const timing = {
      // 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
      navigationStart: 1543806782096,

      // 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
      unloadEventStart: 1543806782523,

      // 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
      unloadEventEnd: 1543806782523,

      // 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
      redirectStart: 0,

      // 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。
      // 如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
      redirectEnd: 0,

      // 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
      fetchStart: 1543806782096,

      // DNS 域名查询开始的UNIX时间戳。
      // 如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
      domainLookupStart: 1543806782096,

      // DNS 域名查询完成的时间.
      // 如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
      domainLookupEnd: 1543806782096,

      // HTTP（TCP） 域名查询结束的时间戳。
      // 如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
      connectStart: 1543806782099,

      // HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。
      // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
      connectEnd: 1543806782227,

      // HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
      secureConnectionStart: 1543806782162,

      // 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
      requestStart: 1543806782241,

      // 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。
      // 如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
      responseStart: 1543806782516,

      // 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
      // （如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
      responseEnd: 1543806782537,

      // 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
      domLoading: 1543806782573,

      // 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
      domInteractive: 1543806783203,

      // 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
      domContentLoadedEventStart: 1543806783203,

      // 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
      domContentLoadedEventEnd: 1543806783216,

      // 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
      domComplete: 1543806783796,

      // load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
      loadEventStart: 1543806783796,

      // 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
      loadEventEnd: 1543806783802
    }
  }
}

export default Performance