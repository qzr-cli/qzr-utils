/**
 * @Date         : 2021-10-14 10:43:17
 * @Description  : document
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:33:37
 */

/**
 * Dom相关方法
 * @static rightClick 屏蔽右键
 */
export default class Document {
  /**
   * @description: 屏蔽右键
   */
  static rightClick() {
    document.oncontextmenu = function() {
      return false
    }
  }

  /**
   * 加载页面事件 从其他页面返回时可用
   * @param fn 回调函数
   */
  static pageshow(fn:any) {
    window.onpageshow = function (event) {
      console.log('缓存', event.persisted)
      if (event.persisted) {
        fn()
      }
    }
  }

  /**
   * @description: 打开浏览器全屏
   */  
  static toFullScreen() {
    let element:any = document.body
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
  }

  /**
   * 退出浏览器全屏
   */
  static exitFullscreen() {
    const documentCopy:any = document
    if (documentCopy.exitFullscreen) {
      documentCopy.exitFullscreen()
    } else if (documentCopy.msExitFullscreen) {
      documentCopy.msExitFullscreen()
    } else if (documentCopy.mozCancelFullScreen) {
      documentCopy.mozCancelFullScreen()
    } else if (documentCopy.webkitExitFullscreen) {
      documentCopy.webkitExitFullscreen()
    }
  }

  /**
   * 滚动到页面顶部
   */
  static scrollToTop() {
    const height = document.documentElement.scrollTop || document.body.scrollTop
    if (height > 0) {
      window.requestAnimationFrame(Document.scrollToTop)
      window.scrollTo(0, height - height / 8)
    }
  }

  /**
   * 滚动到页面底部
   */
  static scrollToBottom() {
    window.scrollTo(0, document.documentElement.clientHeight)
  }

  /**
   * 滚动到指定元素区域
   * @param element 选择器字符串
   */
  static smoothScroll(element:string) {
    document.querySelector(element)?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  /**
   * 获取可视窗口高度
   * @returns 返回高度
   */
  static getClientHeight() {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }
    else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }
    return clientHeight
  }

  /**
   * 获取可视窗口宽度
   * @returns 返回宽度
   */
  static getPageViewWidth() {
    return (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth
  }

}