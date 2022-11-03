/**
 * @Date         : 2021-06-16 11:27:42
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-06-16 11:30:20
 */
/**
 * 挂起js进程
 * new Sleep.then()
 * @param {number} timeout 设置挂起时间
 * @function then 开始挂起
 */
declare class Sleep {
    timeout: number;
    constructor(timeout: number);
    then(resolve: (time: number) => void): void;
}
export default Sleep;
//# sourceMappingURL=sleep.d.ts.map