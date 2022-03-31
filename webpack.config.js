/**
 * @Date         : 2021-03-15 17:42:02
 * @Description  : webapck
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-03-31 08:54:42
 */

const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const PORT = 1717

const config = {
  // devtool: 'hidden-source-map',
  entry: {
    main: path.resolve(__dirname, './src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    environment: {
      arrowFunction: false
    }
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   host: 'localhost',
  //   compress: true,
  //   port: PORT
  // },
  resolve: { // 配置路径别名
    extensions: ['.ts'] // import引入文件的时候不用加后缀
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-runtime']
        }
      }, 'eslint-loader'],
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true, // 打印被删除的文件
      protectWebpackAssets: false, // 允许删除cleanOnceBeforeBuildPatterns中的文件
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(__dirname, 'dist')]
    }),
  ],
}

module.exports = config