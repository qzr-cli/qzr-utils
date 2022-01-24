/**
 * @Date         : 2020-11-03 11:34:47
 * @Description  : js核心utils方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:52:08
 */
/**
 * js 核心utils方法
 * @static checkType 判断参数类型
 * @static randomString 生成随机字符串
 */
declare class Core {
    /**
     * @description: 判断参数类型
     * @param {*} item 传入需要判断的变量
     * @return {string} string/object/array/number/boolean/undefined/null/symbol
     */
    static checkType(item: any): string;
    /**
     * 生成随机字符串
     * @param {number} len 位数
     * @returns {string} 随机字符串
     */
    static randomString(len: number): string;
}
export default Core;
//# sourceMappingURL=core.d.ts.map