<!--
 * @Date         : 2020-11-13 15:59:16
 * @Description  : 监控相关utils
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-11-13 16:28:00
-->

# 监控相关工具

## performance

在head之前执行

```js
const performance = new Performance()

performance.performance // 性能信息
performance.resource  // 资源性能信息
```

## error

在head之前执行

```js
const error = new ErrorPerformance()

error.resError  // 资源错误
error.jsError   // js错误
error.promiseError  // promise错误
```
