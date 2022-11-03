/**
 * @Date         : 2020-11-02 14:22:18
 * @Description  : url search params相关utils
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:08:05
 */
/**
 * url search params控制方法
 * @static getParam 获取url param的值 (?后)
 * @static setParam 设置param 并更新url
 * @static delParam 删除params属性 并更新url
 */
declare class Param {
    /**
     * 获取url param的值 (?后)
     * @param {string} variable 需要获取的字段名
     */
    static getParam(variable: string): string | false;
    /**
     * @description: 设置param 并更新url
     * @param {*} key
     * @param {*} val
     */
    static setParam(key: string | number, val: any): void;
    /**
     * @description: 删除params属性 并更新url
     * @param {*} key params名
     */
    static delParam(key: string | number): false | undefined;
}
export default Param;
//# sourceMappingURL=param.d.ts.map