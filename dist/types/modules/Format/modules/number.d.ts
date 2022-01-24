/**
 * @Date         : 2021-10-19 17:47:01
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-12-08 17:07:59
 */
/**
 * 数字相关方法
 * @static digitUppercase 数字转大写金额
 * @static intToChinese 数字转中文数字
 * @static format 数字千分位分割
 */
export default class Number {
    /**
     * 数字转大写金额
     * @param n 输入数字
     * @returns 大写金额
     */
    static digitUppercase(n: number): string;
    /**
     * 数字转中文数字
     * @param value 输入数字
     * @returns 中文数字
     */
    static intToChinese(value: number): string;
    /**
     * 数字千分位分割
     * @param n 数字
     * @param fix
     * @returns
     */
    static format(n: number, fix?: number): any;
}
//# sourceMappingURL=number.d.ts.map