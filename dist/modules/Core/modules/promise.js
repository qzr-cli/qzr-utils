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
class Pause {
    resolve;
    reject;
    constructor() {
        this.resolve = null;
        this.reject = null;
    }
    resumed() {
        // 恢复
        this.resolve();
    }
    stop() {
        // 停止
        this.reject();
    }
    pause() {
        // 挂起
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            setTimeout(() => { }, 9999999999);
        });
    }
}
export default Pause;
