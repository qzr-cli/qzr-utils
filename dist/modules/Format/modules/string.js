/**
 * @Date         : 2021-10-19 17:50:01
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:14
 */
/**
 * @description 字符串强化方法
 * @static fistLetterUpper 首字母大写
 * @static telFormat 格式化手机号 中间为*
 */
export default class String {
    /**
     * 首字母大写
     * @param str
     * @returns
     */
    static fistLetterUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * 格式化手机号 中间为*
     * @param tel
     * @returns
     */
    static telFormat(tel) {
        let telStr = tel.toString();
        return telStr.slice(0, 3) + '****' + telStr.slice(7);
    }
}
