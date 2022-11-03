/**
 * @Date         : 2020-11-13 16:03:03
 * @Description  : 性能监控class
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-18 11:01:46
 */
interface performanceType {
    redirect: number;
    whiteScreen: number;
    blankTime: number;
    dom: number;
    load: number;
    unload: number;
    request: number;
    time: number;
    dnsTime: number;
    appcacheTime: number;
    tcpTime: number;
    analysisTime: number;
    firstPaint: number;
    domReadyTime: number;
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
declare class Performance {
    performance: performanceType;
    resource: any;
    constructor();
    private _init;
    private _console;
    private _getPerformance;
    private _getResources;
    private _timingType;
}
export default Performance;
//# sourceMappingURL=performance.d.ts.map