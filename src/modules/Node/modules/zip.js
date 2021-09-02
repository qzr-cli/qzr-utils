/**
 * @Date         : 2020-11-23 15:46:18
 * @Description  : node 压缩解压相关
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:10:57
 */

import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createGzip, createUnzip } from 'zlib'
import promisify from 'util'

const pipe = promisify(pipeline)

class Zip {
  static async gzip(input, output) {
    const gzip = createGzip()
    const source = createReadStream(input)
    const destination = createWriteStream(output)

    try {
      await pipe(source, gzip, destination)
    } catch (error) {
      throw error
    }
  }

  static async unzip(input, output) {
    const unzip = createUnzip()
    const inFile = createReadStream(input)
    const outFile = createWriteStream(output)

    try {
      await pipe(inFile, unzip, outFile)
    } catch (error) {
      throw error
    }
  }
}

export default Zip