/**
 * @Date         : 2021-10-19 17:47:01
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-12-08 17:07:59
 */

export default class Number {
  // 数字转大写金额
  static digitUppercase(n) {
    const fraction = ['角', '分']
    const digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]
    n = Math.abs(n)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p
        n = Math.floor(n / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  }

  // 数字转中文数字
  static intToChinese(value) {
    const str = String(value)
    const len = str.length - 1
    const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
    const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
      let pos = 0
      if ($1[0] !== '0') {
        pos = len - idx
        if (idx === 0 && $1[0] === 1 && idxs[len - idx] === '十') {
          return idxs[len - idx]
        }
        return num[$1[0]] + idxs[len - idx]
      } else {
        let left = len - idx
        let right = len - idx + $1.length
        if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
          pos = left - left % 4
        }
        if (pos) {
          return idxs[pos] + num[$1[0]]
        } else if (idx + $1.length >= len) {
          return ''
        } else {
          return num[$1[0]]
        }
      }
    })
  }

  // 数字千分位分割
  static format(n, fix = 0) {
    let float = ''
    let result = 0
    if (String(n).indexOf('.') !== -1) { // 小数
      const split = String(n).split('.')
      float = split[1]
      n = Number(split[0])
    }

    if (fix !== 0) {
      const length = float.length || 0
      if (length < fix) { float = float + '0'.repeat(fix - length) }
      else {
        float = float.slice(0, -(length - fix))
      }
    }

    let num = n.toString()
    let len = num.length
    if (len <= 3) {
      result = num
    } else {
      let temp = ''
      let remainder = len % 3
      if (remainder > 0) { // 不是3的整数倍
        result = num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
      } else { // 3的整数倍
        result = num.slice(0, len).match(/\d{3}/g).join(',') + temp
      }
    }

    if (float) return result + `.${float}`
    return result
  }

}