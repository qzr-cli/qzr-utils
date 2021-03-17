/**
 * @Date         : 2021-03-15 17:42:02
 * @Description  : webapck
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-17 11:27:22
 */

const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const PORT = 1717

const config = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: PORT
  },
  resolve: { // 配置路径别名
    extensions: ['.js'] // import引入文件的时候不用加后缀
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true, // 打印被删除的文件
      protectWebpackAssets: false, // 允许删除cleanOnceBeforeBuildPatterns中的文件
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(__dirname, 'dist')]
    })
  ]
}

module.exports = config