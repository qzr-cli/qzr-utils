/**
 * @Date         : 2020-11-13 16:19:04
 * @Description  : 错误监控相关代码
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-07 11:40:28
 */
/**
 * 错误监控相关代码
 * @var resError 接口错误数组
 * @var jsError js错误数组
 * @var promiseError promise错误数组
 */
class ErrorPerformance {
    resError;
    jsError;
    promiseError;
    constructor() {
        this.resError = [];
        this.jsError = [];
        this.promiseError = [];
        this._init();
    }
    _init() {
        this._listenRes();
        this._listenJs();
        this._listenPromise();
    }
    /**
     * 监听接口错误
     */
    _listenRes() {
        const THAT = this;
        addEventListener('error', e => {
            const target = e.target;
            if (target !== window) {
                const errorInfo = {
                    type: target.localName,
                    url: target.src || target.href,
                    msg: (target.src || target.href) + ' is load error',
                    // 错误发生的时间
                    time: new Date().getTime(),
                };
                THAT.resError.push(errorInfo);
                console.error(errorInfo);
            }
        }, true);
    }
    /**
     * 监听js错误
     */
    _listenJs() {
        const THAT = this;
        window.onerror = function (msg, url, row, col, error) {
            const errorInfo = {
                type: 'javascript',
                row: row,
                col: col,
                msg: error && error.stack ? error.stack : msg,
                url: url,
                // 错误发生的时间
                time: new Date().getTime(),
            };
            THAT.jsError.push(errorInfo);
            console.error(errorInfo);
        };
    }
    /**
     * 监听promise错误
     */
    _listenPromise() {
        const THAT = this;
        addEventListener('unhandledrejection', e => {
            const errorInfo = {
                type: 'promise',
                msg: (e.reason && e.reason.msg) || e.reason || '',
                // 错误发生的时间
                time: new Date().getTime(),
            };
            THAT.promiseError.push(errorInfo);
            console.error(errorInfo);
        });
    }
}
export default ErrorPerformance;
