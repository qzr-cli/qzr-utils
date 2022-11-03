/**
 * @Date         : 2020-11-23 15:46:18
 * @Description  : node 压缩解压相关
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:10:57
 */
/**
 * node 压缩解压相关模块
 * @staticAnsync gzip gzip压缩
 * @staticAnsync unzip gzip解压
 */
declare class Zip {
    static gzip(input: string, output: string): Promise<void>;
    static unzip(input: string, output: string): Promise<void>;
}
export default Zip;
//# sourceMappingURL=zip.d.ts.map