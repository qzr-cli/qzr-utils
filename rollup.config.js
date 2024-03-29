/**
 * @Date         : 2022-03-31 09:00:11
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2023-12-08 16:18:46
 */

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'
import terser from '@rollup/plugin-terser'


export default {
  input: 'src/index.ts', // 打包入口
  output: { // 打包出口
    dir: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: 'es', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
  },
  plugins: [ // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    babel(),
    terser()
  ]
}