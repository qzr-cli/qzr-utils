/**
 * @Date         : 2020-11-09 10:40:46
 * @Description  : 时间相关工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:24:10
 */
/**
 * 时间日期相关方法
 * @var date  Date对象
 * @var FullYear  获取完整的年份(4位,1970-????)
 * @var Month  获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;
 * @var Date  获取当前日(1-31)
 * @var Day  获取当前星期X(0-6,0代表星期天)
 * @var Time  获取当前时间(从1970.1.1开始的毫秒数)
 * @var Hours  获取当前小时数(0-23)
 * @var Minutes  获取当前分钟数(0-59)
 * @var Seconds  获取当前秒数(0-59)
 * @var Milliseconds  获取当前毫秒数(0-999)
 * @var ocaleDateString  获取当前日期
 * @var localeTimeString  获取当前时间
 * @var toLocaleString  获取日期与时间
 * @var timestamp  获取时间戳
 * @function formatDefault  基本格式化时间
 * @function formate  格式化的格式
 * @static formatSeconds  秒转化为00:00:00格式
 * @static formatToS  时分秒转化为秒
 */
declare class Time {
    static test: number;
    date: Date;
    FullYear: number;
    Month: number;
    Date: number;
    Day: number;
    Time: number;
    Hours: number;
    Minutes: number;
    Seconds: number;
    Milliseconds: number;
    ocaleDateString: string;
    localeTimeString: string;
    toLocaleString: string;
    timestamp: number;
    constructor(val: string | number | Date);
    /**
     * 基本格式化时间
     * @returns 返回'2022-01-19'类似字符串
     */
    formatDefault(): string;
    /**
     *
     * @param {string} formater 格式化的格式 例如YYYY-MM-DD HH:mm:ss
     * @returns {formater}
     */
    formate(formater: string): string;
    /**
     * @description: 秒转化为00:00:00格式
     * @param {string | number} value
     * @return {string} HH:mm:ss格式
     */
    static formatSeconds(value: string | number): string;
    /**
     * @description: 时分秒转化为秒
     * @param {string} val HH:mm:ss格式
     * @return {string} 秒数
     */
    static formatToS(val: string | number): number;
    static add0(val: string | number): string | number;
}
export default Time;
//# sourceMappingURL=time.d.ts.map