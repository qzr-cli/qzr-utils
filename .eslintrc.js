/**
 * @Date         : 2021-03-17 11:24:58
 * @Description  : eslint配置
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-05-05 15:04:23
 */


// "off"或 0 - 关闭规则
// "warn"或 1 - 开启规则， 使用警告级别的错误： warn(不会导致程序退出)
// "error"或 2 - 开启规则， 使用错误级别的错误： error(当被触发的时候， 程序会退出)
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 12, // 设置为3、5（默认值），6、7、8、9、10、11或12，以指定要使用的ECMAScript语法的版本。您还可以设置为2015（等于6），2016（等于7），2017（等于8），2018（等于9），2019（等于10），2020（等于11）或2021（与12相同）使用基于年份的命名。
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    // 共用变量名
    upNativeComm: true,
    cookieStore: true
  },
  plugins: [
    'eslint-plugin-import',
    '@typescript-eslint',
  ],
  extends: [
    '@constq/eslint-config-qzr/typescript',
    '@constq/eslint-config-qzr/index',
  ],
  // 自定义rules
  rules: {
  }
}