/**
 * @Date         : 2021-12-30 16:23:45
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-12-30 16:26:29
 */
/**
 * 暂停primise
 * await pause.pause() 挂起
 * @function resumed 恢复
 * @function stop 停止结束
 * @function pause 挂起
 */
declare class Pause {
    resolve: any;
    reject: any;
    constructor();
    resumed(): void;
    stop(): void;
    pause(): Promise<unknown>;
}
export default Pause;
//# sourceMappingURL=promise.d.ts.map