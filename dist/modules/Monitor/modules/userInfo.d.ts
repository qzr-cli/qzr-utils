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
declare class Userinfo {
    navigator: Navigator;
    userAgent: string;
    language: string;
    client: string;
    explorerInfo: {
        type: string;
        version: number;
    };
    isQQorWx: string;
    osType: string;
    isMobile: boolean;
    isApple: boolean;
    isAnroid: boolean;
    constructor();
    private _console;
    private _init;
    private _set;
    private _checkClient;
    static getExplorerInfo(): {
        type: string;
        version: number;
    };
    static getQQorWx(): "weixin" | "QQ" | "other";
    static getOsType(): "other" | "windows" | "mac";
    static getIsMobile(): boolean;
    static getIsAppleMobileDevice(): boolean;
    static getIsAndroidMobileDevice(): boolean;
}
export default Userinfo;
//# sourceMappingURL=userInfo.d.ts.map