/**
 * @Date         : 2021-10-19 17:54:23
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:22
 */

/**
 * 数组方法增强
 * @static arrScrambling 数组乱序
 */
export default class Array {
  /**
   * 数组乱序
   * @param arr 
   * @returns 
   */
  static arrScrambling(arr:any[]) {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    }
    return arr
  }

}