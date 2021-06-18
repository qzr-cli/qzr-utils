/**
 * @Date         : 2021-06-16 11:27:42
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-06-16 11:30:20
 */


class Sleep {
  constructor(timeout) {
    this.timeout = timeout
  }
  then(resolve, reject) {
    const startTime = Date.now()
    setTimeout(() => resolve(Date.now() - startTime), this.timeout)
  }
}

export default Sleep