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
declare class ErrorPerformance {
    resError: any[];
    jsError: any[];
    promiseError: any[];
    constructor();
    private _init;
    /**
     * 监听接口错误
     */
    private _listenRes;
    /**
     * 监听js错误
     */
    private _listenJs;
    /**
     * 监听promise错误
     */
    private _listenPromise;
}
export default ErrorPerformance;
//# sourceMappingURL=error.d.ts.map