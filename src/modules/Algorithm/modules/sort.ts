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
class Sort {
  /**
   * 快速排序
   * @param {[T]} arr
   * @returns
   */
  static quickSort<T>(arr: T[]): T[] {
    if (arr.length <= 1) return arr

    let median = Math.floor(arr.length / 2)
    let pivot = arr.splice(median, 1)[0]
    let left: T[] = []
    let right: T[] = []

    arr.forEach(x => {
      if (x > pivot) right.push(x)
      else left.push(x)
    })

    return [...Sort.quickSort(left), ...[pivot], ...Sort.quickSort(right)]
  }

  /**
   * 冒泡排序
   * @param {[T]} arr
   * @returns
   */
  static bubble<T>(arr: T[]): T[] {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {  // 排除最后已经确定的元素进行循环
        if (arr[j + 1] < arr[j]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
    }
    return arr
  }

  /**
   * 选择排序
   * @param {[T]} arr
   * @returns
   */
  static selection<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length; i++) {
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
      }
      [arr[min], arr[i]] = [arr[i], arr[min]]
    }

    return arr
  }
}

export default Sort