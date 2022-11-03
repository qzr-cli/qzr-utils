/**
 * @Date         : 2021-09-02 10:23:30
 * @Description  : 排序算法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 10:36:18
 */
/**
 * 排序算法
 * @static quickSort 快速排序
 * @static bubble 冒泡排序
 * @static selection 选择排序
 */
declare class Sort {
    /**
     * 快速排序
     * @param {[T]} arr
     * @returns
     */
    static quickSort<T>(arr: T[]): T[];
    /**
     * 冒泡排序
     * @param {[T]} arr
     * @returns
     */
    static bubble<T>(arr: T[]): T[];
    /**
     * 选择排序
     * @param {[T]} arr
     * @returns
     */
    static selection<T>(arr: T[]): T[];
}
export default Sort;
//# sourceMappingURL=sort.d.ts.map