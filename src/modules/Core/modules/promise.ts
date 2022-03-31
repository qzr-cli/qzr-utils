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
  resolve: any
  reject: any
  constructor() {
    this.resolve = null
    this.reject = null
  }

  resumed() {
    // 恢复
    this.resolve()
  }

  stop() {
    // 停止
    this.reject()
  }

  pause() {
    // 挂起
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
      setTimeout(() => {}, 9999999999)
    })
  }
}

/**
 * 控制并发promise
 */
class Limit {
  max: number
  cb: any
  pool: any[]
  pathList: string[]
  constructor(max:number, cb:any) {
    this.pool = []
    this.max = max
    this.cb = cb
    this.pathList = []
  }

  start(path:string) {
    this.pathList = [...path]
    while (this.pool.length < this.max) {
      this.setTask(this.pathList.shift())
    }
    const race = Promise.race(this.pool)
    this.run(race)
  }

  run(race:any) {
    race.then(() => {
      const path = this.pathList.shift()
      this.setTask(path)
      this.run(Promise.race(this.pool))
    })
  }

  setTask(path:string | undefined) {
    if(!path) return
    const promise = this.cb(path)
    this.pool.push(promise)

    promise.then(() => {
      this.pool.splice(this.pool.indexOf(promise), 1)
    })

  }
}

export default {Limit, Pause}