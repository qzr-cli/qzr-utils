/**
 * cookie操作方法
 * @static parse 格式化cookie字符串 返回对象
 * @static parseAll 格式化解析当前cookie 返回对象
 * @static get 获取单个cookie属性
 * @static getAll 获取当前domain下的所有cookie
 * @static set 设置cookie
 * @static del 删除cookie
 * @staticAsync getAsync 获取单个cookie属性（异步）
 * @staticAsync getAllAsync 获取当前domain下的所有cookie（异步）
 * @staticAsync setAsync 设置cookie（异步）
 * @staticAsync delAsync 删除cookie（异步）
 * @static addEventListener 添加cookie事件监听器
 * @staticAsync setAsync 设置cookie（异步）
 */
class Cookie {
    /**
     * 格式化cookie字符串 返回对象
     * @param {*} str
     * @returns {object} 返回cookie对象
     */
    static parse(str) {
        return str.split(';')
            .map(v => v.split('='))
            .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
    }
    /**
     * 格式化解析当前cookie 返回对象
     * @returns {object} 返回包含当前所有cookie的对象
     */
    static parseAll() {
        const cookie = Cookie.getAll();
        return Cookie.parse(cookie);
    }
    /**
     * 获取单个cookie属性
     * @param {string} name
     * @return {string | undefined}
     */
    static get(name) {
        let result = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
        return result ? result.pop() : '';
    }
    /**
     * 获取当前domain下的所有cookie
     * @param {string} domain 当前域名
     * @return {Array}
     */
    static getAll() {
        return document.cookie;
    }
    /**
     * 设置cookie
     * @param {string} key
     * @param {*} val
     * @param {string} day
     * @return {undefined}
     */
    static set({ key, val, path = false, day = 1 }) {
        let d = new Date();
        d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        let result = key + '=' + val + '; ' + expires;
        if (path)
            result += `;path=${path}`;
        document.cookie = result;
    }
    /**
     * 删除cookie
     * @param {*} name cookie的key
     * @return {null}
     */
    static del(key, path = false) {
        let result = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        if (path)
            result += `;path=${path}`;
        document.cookie = result;
    }
    /**
     * 获取单个cookie属性（异步）
     * @param {string} name
     * @return {object}
     */
    static async getAsync(name) {
        const result = await cookieStore.get(name);
        return result;
    }
    /**
     * 获取当前domain下的所有cookie（异步）
     * @param {string} domain 当前域名
     * @return {Promise<any>}
     */
    static async getAllAsync(domain) {
        const result = await cookieStore.getAll({ domain });
        return result;
    }
    /**
     * 设置cookie（异步）
     * @param {string} key
     * @param {*} val
     * @param {string} domain
     * @return {Promise<any>}
     */
    static async setAsync({ key = '', val = '', domain = null }) {
        const result = await cookieStore.set({
            name: key,
            value: val,
            domain
        });
        return result;
    }
    /**
     * 删除cookie（异步）
     * @param {*} name cookie的key
     * @return {Promise<any>}
     */
    static async delAsync(name) {
        const result = await cookieStore.delete(name);
        return result;
    }
    /**
     * 添加cookie事件监听器
     * @callback fn 回调函数
     */
    static addEventListener(fn) {
        cookieStore.addEventListener('change', (e) => fn(e));
    }
    /**
     * 清除所有cookie
     * @param {*} host 指定域名下清空
     */
    static clearAll(host) {
        let keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (let i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); // 清除当前域名下的,例如：m.ratingdog.cn
                document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); // 清除当前域名下的，例如 .m.ratingdog.cn
                document.cookie = keys[i] + '=0;path=/;domain=' + host + ';expires=' + new Date(0).toUTCString(); // 清除一级域名下的或指定的，例如 .ratingdog.cn
            }
        }
    }
}

/**
 * @Date         : 2020-11-02 14:22:18
 * @Description  : url search params相关utils
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:08:05
 */
/**
 * url search params控制方法
 * @static getParam 获取url param的值 (?后)
 * @static setParam 设置param 并更新url
 * @static delParam 删除params属性 并更新url
 */
class Param {
    /**
     * 获取url param的值 (?后)
     * @param {string} variable 需要获取的字段名
     */
    static getParam(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return (false);
    }
    /**
     * @description: 设置param 并更新url
     * @param {*} key
     * @param {*} val
     */
    static setParam(key, val) {
        let href = location.href;
        let search = location.search;
        if (search) {
            const index = href.indexOf(search);
            const length = search.length;
            search += `&${key}=${val}`;
            const before = href.slice(0, index);
            const after = href.slice(index + length);
            href = before + search + after;
        }
        else {
            href += `?${key}=${val}`;
        }
        history.replaceState({}, '', href);
    }
    /**
     * @description: 删除params属性 并更新url
     * @param {*} key params名
     */
    static delParam(key) {
        let href = location.href;
        let search = location.search;
        if (search) {
            const index = href.indexOf(search);
            const length = search.length;
            let parObj = {};
            let searchStr = '?';
            search = search.slice(1);
            const parArr = search.split('&');
            for (const item of parArr) {
                let itemArr = item.split('=');
                parObj[itemArr[0]] = itemArr[1];
            }
            delete parObj[key];
            for (const key in parObj) {
                if (parObj.hasOwnProperty(key)) {
                    const item = parObj[key];
                    searchStr += `${key}=${item}&`;
                }
            }
            searchStr = searchStr.slice(0, -1);
            const before = href.slice(0, index);
            const after = href.slice(index + length);
            href = before + searchStr + after;
        }
        else {
            return false;
        }
        history.replaceState({}, '', href);
    }
}

/**
 * @Date         : 2021-02-02 14:15:56
 * @Description  : localstorage
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-02-02 16:09:23
 */
/**
 * Localstorage控制方法
 * @static get 获取
 * @static set 设置
 * @static del 删除
 * @static clear 清空所有localStrage
 * @static changeObj 针对对象 添加属性
 */
class Localstorage {
    /**
     * 获取
     * @param key 获取key
     */
    static get(key) {
        const data = localStorage.getItem(key) ?? '';
        return JSON.parse(data);
    }
    /**
     * 设置
     * @param key 获取key
     * @param val 设置值
     */
    static set(key, val) {
        const data = JSON.stringify(val);
        return localStorage.setItem(key, data);
    }
    /**
     * 删除
     * @param key 需要删除的键
     */
    static del(key) {
        return localStorage.removeItem(key);
    }
    /**
     * 清空所有localStrage
     */
    static clear() {
        return localStorage.clear();
    }
    /**
     * 针对对象 添加属性
     * @param key 获取的key
     * @param val 需要增加的对象
     */
    static changeObj(key, val) {
        let data = Localstorage.get(key);
        return Localstorage.set(key, {
            ...data,
            ...val
        });
    }
}

/**
 * @Date         : 2020-11-03 10:14:40
 * @Description  : BOM index
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:07:03
 */
/** @typedef {import('./modules/cookie')} cookie */
/**
 * Bom相关
 * @namespace Absolventa
 */
var bom = {
    cookie: Cookie,
    param: Param,
    localstorage: Localstorage
};

/**
 * @Date         : 2020-11-03 11:34:47
 * @Description  : js核心utils方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:52:08
 */
/**
 * js 核心utils方法
 * @static checkType 判断参数类型
 * @static randomString 生成随机字符串
 */
class Core$1 {
    /**
     * @description: 判断参数类型
     * @param {*} item 传入需要判断的变量
     * @return {string} string/object/array/number/boolean/undefined/null/symbol
     */
    static checkType(item) {
        const handle = Function.prototype.call.bind(Object.prototype.toString); // 防止Object.prototype.toString方法被覆盖污染
        const type = handle(item);
        return type.slice(8, -1).toLowerCase();
    }
    /**
     * 生成随机字符串
     * @param {number} len 位数
     * @returns {string} 随机字符串
     */
    static randomString(len) {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
        let strLen = chars.length;
        let randomStr = '';
        for (let i = 0; i < len; i++) {
            randomStr += chars.charAt(Math.floor(Math.random() * strLen));
        }
        return randomStr;
    }
}

/**
 * @Date         : 2021-06-16 11:27:42
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-06-16 11:30:20
 */
/**
 * 挂起js进程
 * new Sleep.then()
 * @param {number} timeout 设置挂起时间
 * @function then 开始挂起
 */
class Sleep {
    timeout;
    constructor(timeout) {
        this.timeout = timeout;
    }
    then(resolve) {
        const startTime = Date.now();
        setTimeout(() => resolve(Date.now() - startTime), this.timeout);
    }
}

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
    resolve;
    reject;
    constructor() {
        this.resolve = null;
        this.reject = null;
    }
    resumed() {
        // 恢复
        this.resolve();
    }
    stop() {
        // 停止
        this.reject();
    }
    pause() {
        // 挂起
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            setTimeout(() => { }, 9999999999);
        });
    }
}
/**
 * 控制并发promise
 */
class Limit {
    max;
    cb;
    pool;
    pathList;
    constructor(max, cb) {
        this.pool = [];
        this.max = max;
        this.cb = cb;
        this.pathList = [];
    }
    start(path) {
        this.pathList = [...path];
        while ((this.pool.length < this.max) && (this.pathList.length > 0)) {
            this._setTask(this.pathList.shift());
        }
        const race = Promise.race(this.pool);
        this._run(race);
    }
    _run(race) {
        race.then(() => {
            const path = this.pathList.shift();
            this._setTask(path);
            this._run(Promise.race(this.pool));
        });
    }
    _setTask(path) {
        if (!path)
            return;
        const promise = this.cb(path);
        this.pool.push(promise);
        promise.then(() => {
            this.pool.splice(this.pool.indexOf(promise), 1);
        });
    }
}

/**
 * @Date         : 2020-11-03 11:41:20
 * @Description  : js常用utils方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-12-30 16:24:59
 */
/** js常用方法 */
var core = {
    Core: Core$1,
    Sleep,
    Pause,
    Limit
};

/**
 * @Date         : 2020-11-09 10:40:46
 * @Description  : 时间相关工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:24:10
 */
/**
 * 时间日期相关方法
 * @var date  Date对象
 * @var FullYear  获取完整的年份(4位,1970-????)
 * @var Month  获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;
 * @var Date  获取当前日(1-31)
 * @var Day  获取当前星期X(0-6,0代表星期天)
 * @var Time  获取当前时间(从1970.1.1开始的毫秒数)
 * @var Hours  获取当前小时数(0-23)
 * @var Minutes  获取当前分钟数(0-59)
 * @var Seconds  获取当前秒数(0-59)
 * @var Milliseconds  获取当前毫秒数(0-999)
 * @var ocaleDateString  获取当前日期
 * @var localeTimeString  获取当前时间
 * @var toLocaleString  获取日期与时间
 * @var timestamp  获取时间戳
 * @function formatDefault  基本格式化时间
 * @function formate  格式化的格式
 * @static formatSeconds  秒转化为00:00:00格式
 * @static formatToS  时分秒转化为秒
 */
class Time {
    static test;
    date;
    // Year: number
    FullYear;
    Month;
    Date;
    Day;
    Time;
    Hours;
    Minutes;
    Seconds;
    Milliseconds;
    ocaleDateString;
    localeTimeString;
    toLocaleString;
    timestamp;
    constructor(val) {
        this.date = new Date(val);
        // this.Year = this.date.getYear() // 获取当前年份(2位)
        this.FullYear = this.date.getFullYear(); // 获取完整的年份(4位,1970-????)
        this.Month = this.date.getMonth() + 1; // 获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;
        this.Date = this.date.getDate(); // 获取当前日(1-31)
        this.Day = this.date.getDay() + 1; // 获取当前星期X(0-6,0代表星期天)
        this.Time = this.date.getTime(); // 获取当前时间(从1970.1.1开始的毫秒数)
        this.Hours = this.date.getHours(); // 获取当前小时数(0-23)
        this.Minutes = this.date.getMinutes(); // 获取当前分钟数(0-59)
        this.Seconds = this.date.getSeconds(); // 获取当前秒数(0-59)
        this.Milliseconds = this.date.getMilliseconds(); // 获取当前毫秒数(0-999)
        this.ocaleDateString = this.date.toLocaleDateString(); // 获取当前日期
        this.localeTimeString = this.date.toLocaleTimeString(); // 获取当前时间
        this.toLocaleString = this.date.toLocaleString(); // 获取日期与时间
        this.timestamp = this.date.getTime(); // 获取时间戳
    }
    /**
     * 基本格式化时间
     * @returns 返回'2022-01-19'类似字符串
     */
    formatDefault() {
        return `${this.FullYear}-${Time.add0(this.Month)}-${Time.add0(this.Date)}`;
    }
    /**
     *
     * @param {string} formater 格式化的格式 例如YYYY-MM-DD HH:mm:ss
     * @returns {formater}
     */
    formate(formater) {
        let Y = String(this.FullYear);
        let M = this.Month;
        let D = this.Date;
        let H = this.Hours;
        let m = this.Minutes;
        let s = this.Seconds;
        return formater.replace(/YYYY|yyyy/g, Y)
            .replace(/YY|yy/g, Y.slice(2, 4))
            .replace(/MM/g, (M < 10 ? '0' : '') + M)
            .replace(/DD/g, (D < 10 ? '0' : '') + D)
            .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
            .replace(/mm/g, (m < 10 ? '0' : '') + m)
            .replace(/ss/g, (s < 10 ? '0' : '') + s);
    }
    /**
     * @description: 秒转化为00:00:00格式
     * @param {string | number} value
     * @return {string} HH:mm:ss格式
     */
    static formatSeconds(value) {
        let theTime = parseInt(String(value)); // 秒
        let theTime1 = 0; // 分
        let theTime2 = 0; // 小时
        if (theTime > 60) {
            theTime1 = parseInt(String(theTime / 60));
            theTime = parseInt(String(theTime % 60));
            if (theTime1 > 60) {
                theTime2 = parseInt(String(theTime1 / 60));
                theTime1 = parseInt(String(theTime1 % 60));
            }
        }
        theTime1 = theTime1 < 10 ? `0${theTime1}` : theTime1;
        theTime2 = theTime2 < 10 ? `0${theTime2}` : theTime2;
        theTime = theTime < 10 ? `0${theTime}` : theTime;
        let result = `00:00:${theTime}`;
        if (theTime1 > 0) {
            result = `00:${theTime1}:${theTime}`;
        }
        if (theTime2 > 0) {
            result = `${theTime2}:${theTime1}:${theTime}`;
        }
        return result;
    }
    /**
     * @description: 时分秒转化为秒
     * @param {string} val HH:mm:ss格式
     * @return {string} 秒数
     */
    static formatToS(val) {
        let value = String(val);
        let h = Number(value.slice(0, 2));
        let m = Number(value.slice(3, 5));
        let s = Number(value.slice(6, 8));
        return h * 60 * 60 + m * 60 + s;
    }
    static add0(val) {
        if (Number(val) < 10)
            return `0${val}`;
        else
            return val;
    }
}

/* eslint-disable no-new */
/**
 * 时间相关方法
 * @static dateRangeGenerator 日期范围生成器
 */
class Core {
    /**
     * 日期范围生成器
     * @param start 开始
     * @param end 结束
     * @param step 步进
     * @returns
     */
    static dateRangeGenerator(start, end, step = 1) {
        let result = [];
        let s = new Date(start);
        let e = new Date(end);
        while (s < e) {
            const data = s.getDate();
            s = new Date(s.setDate(data + step));
            let t = new Time(s);
            result.push(t.formatDefault());
        }
        return result;
    }
}

/**
 * @Date         : 2020-11-09 10:40:46
 * @Description  : 时间相关工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-10 16:14:19
 */
/** 时间相关工具函数 */
var date = {
    Time,
    Core
};

/**
 * @Date         : 2020-11-13 16:03:03
 * @Description  : 性能监控class
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-18 11:01:46
 */
/**
 * 性能监控class 需要放在head前执行
 * @var resource 资源加载详情
 * @var performance.redirect 重定向耗时
 * @var performance.whiteScreen 白屏时间
 * @var performance.blankTime 白屏时间2
 * @var performance.dom DOM渲染耗时
 * @var performance.load 页面加载耗时
 * @var performance.unload 页面卸载耗时
 * @var performance.request 请求耗时
 * @var performance.time 当前时间
 * @var performance.dnsTime dns查询耗时
 * @var performance.appcacheTime 查询缓存数据时间
 * @var performance.tcpTime tcp连接耗时
 * @var performance.analysisTime 解析dom树耗时
 * @var performance.firstPaint 首屏时间
 * @var performance.domReadyTime domReadyTime
 */
class Performance {
    performance;
    resource;
    constructor() {
        this.performance = {
            redirect: 0,
            whiteScreen: 0,
            blankTime: 0,
            dom: 0,
            load: 0,
            unload: 0,
            request: 0,
            time: 0,
            dnsTime: 0,
            appcacheTime: 0,
            tcpTime: 0,
            analysisTime: 0,
            firstPaint: 0,
            domReadyTime: 0, //'domReadyTime'
        }; // 性能信息
        this.resource = ''; // 资源加载详情
        this._init();
    }
    _init() {
        this._getPerformance();
        this._getResources();
        this._console();
    }
    // 提示性能信息
    _console() {
        console.info('性能信息', {
            '重定向耗时': this.performance.redirect,
            '白屏时间': this.performance.whiteScreen,
            '白屏时间2': this.performance.blankTime,
            'DOM渲染耗时': this.performance.dom,
            '页面加载耗时': this.performance.load,
            '页面卸载耗时': this.performance.unload,
            '请求耗时': this.performance.request,
            '当前时间': this.performance.time,
            'dns查询耗时': this.performance.dnsTime,
            '查询缓存数据时间': this.performance.appcacheTime,
            'tcp连接耗时': this.performance.tcpTime,
            '解析dom树耗时': this.performance.analysisTime,
            '首屏时间': this.performance.firstPaint,
            'domReadyTime': this.performance.domReadyTime,
        });
        console.info('资源加载详情', this.resource);
    }
    // 获取性能信息
    _getPerformance() {
        if (!window.performance)
            throw Error('不支持性能监控');
        const timing = window.performance?.getEntriesByType('navigation')[0] || window.performance.timing;
        const performance = {
            // 重定向耗时
            redirect: timing.redirectEnd - timing.redirectStart,
            // 白屏时间
            whiteScreen: new Date().getTime() - timing.fetchStart,
            // DOM 渲染耗时
            dom: timing.domComplete - (timing.domInteractive || timing.domLoading),
            // 页面加载耗时
            load: timing.loadEventEnd - timing.fetchStart,
            // 页面卸载耗时
            unload: timing.unloadEventEnd - timing.unloadEventStart,
            // 请求耗时
            request: timing.responseEnd - timing.requestStart,
            // 获取性能信息时当前时间
            time: new Date().getTime(),
            // dns查询耗时
            dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
            // 查询缓存数据时间
            appcacheTime: timing.domainLookupStart - timing.fetchStart,
            // tcp连接耗时
            tcpTime: timing.connectEnd - timing.connectStart,
            // 解析dom树耗时
            analysisTime: timing.domComplete - timing.domInteractive,
            // 白屏时间
            blankTime: (timing.domInteractive || timing.domLoading) - timing.fetchStart,
            // 首屏时间
            firstPaint: timing.domComplete - timing.fetchStart,
            // domReadyTime
            domReadyTime: timing.domContentLoadedEventEnd - timing.fetchStart,
        };
        this.performance = performance;
    }
    // 获取资源信息
    _getResources() {
        if (!window.performance)
            throw Error('不支持性能监控');
        const data = window.performance.getEntriesByType('resource');
        const resource = {
            xmlhttprequest: [],
            css: [],
            other: [],
            script: [],
            img: [],
            link: [],
            fetch: [],
            // 获取资源信息时当前时间
            time: new Date().getTime(),
        };
        data.forEach((item) => {
            const arry = resource[item.initiatorType];
            arry && arry.push({
                // 资源的名称
                name: item.name,
                // 资源加载耗时
                duration: item.duration.toFixed(2),
                // 资源大小
                size: item.transferSize,
                // 资源所用协议
                protocol: item.nextHopProtocol,
            });
        });
        this.resource = resource;
    }
    _timingType() {
    }
}

/**
 * @Date         : 2020-11-13 16:19:04
 * @Description  : 错误监控相关代码
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-07 11:40:28
 */
/**
 * 错误监控相关代码
 * @var resError 接口错误数组
 * @var jsError js错误数组
 * @var promiseError promise错误数组
 */
class ErrorPerformance {
    resError;
    jsError;
    promiseError;
    constructor() {
        this.resError = [];
        this.jsError = [];
        this.promiseError = [];
        this._init();
    }
    _init() {
        this._listenRes();
        this._listenJs();
        this._listenPromise();
    }
    /**
     * 监听接口错误
     */
    _listenRes() {
        const THAT = this;
        addEventListener('error', e => {
            const target = e.target;
            if (target !== window) {
                const errorInfo = {
                    type: target.localName,
                    url: target.src || target.href,
                    msg: (target.src || target.href) + ' is load error',
                    // 错误发生的时间
                    time: new Date().getTime(),
                };
                THAT.resError.push(errorInfo);
                console.error(errorInfo);
            }
        }, true);
    }
    /**
     * 监听js错误
     */
    _listenJs() {
        const THAT = this;
        window.onerror = function (msg, url, row, col, error) {
            const errorInfo = {
                type: 'javascript',
                row: row,
                col: col,
                msg: error && error.stack ? error.stack : msg,
                url: url,
                // 错误发生的时间
                time: new Date().getTime(),
            };
            THAT.jsError.push(errorInfo);
            console.error(errorInfo);
        };
    }
    /**
     * 监听promise错误
     */
    _listenPromise() {
        const THAT = this;
        addEventListener('unhandledrejection', e => {
            const errorInfo = {
                type: 'promise',
                msg: (e.reason && e.reason.msg) || e.reason || '',
                // 错误发生的时间
                time: new Date().getTime(),
            };
            THAT.promiseError.push(errorInfo);
            console.error(errorInfo);
        });
    }
}

/**
 * @Date         : 2020-11-13 16:28:23
 * @Description  : 用户信息收集
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-07 11:40:13
 */
/**
 * 用户信息收集
 * @var navigator navigator
 * @var userAgent userAgent
 * @var language  当前浏览器语言
 * @var client 当前浏览器环境
 * @var explorerInfo  浏览器版本型号
 * @var isQQorWx 是否是qq或微信
 * @var osType 是windos还是mac
 * @var isMobile 是否是移动设备
 * @var isApple  是否是苹果设备
 * @var isAnroid 是否是安卓设备
 * @static getExplorerInfo 获取浏览器型号和版本
 * @static getQQorWx 判断是否是微信/qq内置浏览器
 * @static getOsType 判断是windows还是mac系统
 * @static getIsMobile 判断是否是移动设备
 * @static getIsAppleMobileDevice 判断是否是苹果设备
 * @static getIsAndroidMobileDevice 判断是否是安卓设备
 */
class Userinfo {
    navigator;
    userAgent;
    language;
    client;
    explorerInfo;
    isQQorWx;
    osType;
    isMobile;
    isApple;
    isAnroid;
    constructor() {
        this.navigator = window.navigator;
        this.userAgent = '';
        this.language = ''; // 当前浏览器语言
        this.client = ''; // 当前浏览器环境
        this.explorerInfo = Userinfo.getExplorerInfo(); // 浏览器版本型号
        this.isQQorWx = Userinfo.getQQorWx(); // 是否是qq或微信
        this.osType = Userinfo.getOsType(); // 是windos还是mac
        this.isMobile = Userinfo.getIsMobile(); // 是否是移动设备
        this.isApple = Userinfo.getIsAppleMobileDevice(); // 是否是苹果设备
        this.isAnroid = Userinfo.getIsAndroidMobileDevice(); // 是否是安卓设备
        this._init();
        this._console();
    }
    _console() {
        console.info('终端信息', {
            '当前浏览器语言': this.language,
            '当前浏览器环境': this.client,
        });
    }
    _init() {
        if (!this.navigator)
            throw Error('不支持navigator');
        this._set();
        this._checkClient();
    }
    _set() {
        const { userAgent, language } = this.navigator;
        this.userAgent = userAgent;
        this.language = language;
    }
    _checkClient() {
        const { userAgent } = this;
        const microMsg = userAgent.match(/MicroMessenger/i) || [];
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.client = 'mobile';
        }
        else {
            this.client = 'PC';
        }
        if (microMsg[0] === 'micromessenger')
            this.client = 'vx'; // 微信环境
    }
    // 获取浏览器型号和版本
    static getExplorerInfo() {
        let t = navigator.userAgent.toLowerCase();
        if (0 <= t.indexOf('msie')) {
            return {
                type: 'IE',
                version: Number(t.match(/msie ([\d]+)/) ?? [1])
            };
        }
        else if (t.match(/trident\/.+?rv:(([\d.]+))/)) {
            return {
                type: 'IE',
                version: 11
            };
        }
        else if (0 <= t.indexOf('edge')) {
            return {
                type: 'Edge',
                version: Number(testEmpty(t.match(/edge\/([\d]+)/)))
            };
        }
        else if (0 <= t.indexOf('firefox')) {
            return {
                type: 'Firefox',
                version: Number(testEmpty(t.match(/firefox\/([\d]+)/)))
            };
        }
        else if (0 <= t.indexOf('chrome')) {
            return {
                type: 'Chrome',
                version: Number(testEmpty(t.match(/chrome\/([\d]+)/)))
            };
        }
        else if (0 <= t.indexOf('opera')) {
            return {
                type: 'Opera',
                version: Number(testEmpty(t.match(/opera.([\d]+)/)))
            };
        }
        else if (0 <= t.indexOf('Safari')) {
            return {
                type: 'Safari',
                version: Number(testEmpty(t.match(/version\/([\d]+)/)))
            };
        }
        else {
            return {
                type: t,
                version: -1
            };
        }
        function testEmpty(arr) {
            if (arr)
                return arr[1];
            else
                return -1;
        }
    }
    // 判断是否是微信/qq内置浏览器
    static getQQorWx() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i)) {
            return 'weixin';
        }
        else if (ua.match(/QQ/i)) {
            return 'QQ';
        }
        return 'other';
    }
    // 判断是windows还是mac系统
    static getOsType() {
        const agent = navigator.userAgent.toLowerCase();
        const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        const isWindows = agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0 || agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0;
        if (isWindows) {
            return 'windows';
        }
        if (isMac) {
            return 'mac';
        }
        return 'other';
    }
    // 判断是否是移动设备
    static getIsMobile() {
        if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
            return true;
        }
        return false;
    }
    // 判断是否是苹果设备
    static getIsAppleMobileDevice() {
        let reg = /iphone|ipod|ipad|Macintosh/i;
        return reg.test(navigator.userAgent.toLowerCase());
    }
    // 判断是否是安卓设备
    static getIsAndroidMobileDevice() {
        return /android/i.test(navigator.userAgent.toLowerCase());
    }
}

/**
 * @Date         : 2020-11-13 15:59:13
 * @Description  : 监控相关代码
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 11:01:31
 */
/** 监控相关方法 */
var monitor = {
    Performance,
    ErrorPerformance,
    UserInfo: Userinfo
};

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
    static quickSort(arr) {
        if (arr.length <= 1)
            return arr;
        let median = Math.floor(arr.length / 2);
        let pivot = arr.splice(median, 1)[0];
        let left = [];
        let right = [];
        arr.forEach(x => {
            if (x > pivot)
                right.push(x);
            else
                left.push(x);
        });
        return [...Sort.quickSort(left), ...[pivot], ...Sort.quickSort(right)];
    }
    /**
     * 冒泡排序
     * @param {[T]} arr
     * @returns
     */
    static bubble(arr) {
        const len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) { // 排除最后已经确定的元素进行循环
                if (arr[j + 1] < arr[j]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
    /**
     * 选择排序
     * @param {[T]} arr
     * @returns
     */
    static selection(arr) {
        for (let i = 0; i < arr.length; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            [arr[min], arr[i]] = [arr[i], arr[min]];
        }
        return arr;
    }
}

/**
 * @Date         : 2021-09-02 10:21:46
 * @Description  : 算法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 10:37:22
 */
/** 算法相关 */
var algorithm = { sort: Sort };

/**
 * @Date         : 2021-10-14 10:43:17
 * @Description  : document
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:33:37
 */
/**
 * Dom相关方法
 * @static rightClick 屏蔽右键
 */
class Document {
    /**
     * @description: 屏蔽右键
     */
    static rightClick() {
        document.oncontextmenu = function () {
            return false;
        };
    }
    /**
     * 加载页面事件 从其他页面返回时可用
     * @param fn 回调函数
     */
    static pageshow(fn) {
        window.onpageshow = function (event) {
            console.log('缓存', event.persisted);
            if (event.persisted) {
                fn();
            }
        };
    }
    /**
     * @description: 打开浏览器全屏
     */
    static toFullScreen() {
        let element = document.body;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }
    }
    /**
     * 退出浏览器全屏
     */
    static exitFullscreen() {
        const documentCopy = document;
        if (documentCopy.exitFullscreen) {
            documentCopy.exitFullscreen();
        }
        else if (documentCopy.msExitFullscreen) {
            documentCopy.msExitFullscreen();
        }
        else if (documentCopy.mozCancelFullScreen) {
            documentCopy.mozCancelFullScreen();
        }
        else if (documentCopy.webkitExitFullscreen) {
            documentCopy.webkitExitFullscreen();
        }
    }
    /**
     * 滚动到页面顶部
     */
    static scrollToTop() {
        const height = document.documentElement.scrollTop || document.body.scrollTop;
        if (height > 0) {
            window.requestAnimationFrame(Document.scrollToTop);
            window.scrollTo(0, height - height / 8);
        }
    }
    /**
     * 滚动到页面底部
     */
    static scrollToBottom() {
        window.scrollTo(0, document.documentElement.clientHeight);
    }
    /**
     * 滚动到指定元素区域
     * @param element 选择器字符串
     */
    static smoothScroll(element) {
        document.querySelector(element)?.scrollIntoView({
            behavior: 'smooth'
        });
    }
    /**
     * 获取可视窗口高度
     * @returns 返回高度
     */
    static getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }
    /**
     * 获取可视窗口宽度
     * @returns 返回宽度
     */
    static getPageViewWidth() {
        return (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth;
    }
}

/**
 * @Date         : 2021-10-14 10:42:46
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-14 10:47:14
 */
/** Dom常用方法 */
var dom = {
    document: Document
};

/**
 * @Date         : 2021-10-19 17:54:23
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:22
 */
/**
 * 数组方法增强
 * @static arrScrambling 数组乱序
 */
class Array {
    /**
     * 数组乱序
     * @param arr
     * @returns
     */
    static arrScrambling(arr) {
        for (let i = 0; i < arr.length; i++) {
            const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
            [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
        }
        return arr;
    }
}

/**
 * @Date         : 2021-10-19 17:47:01
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-12-08 17:07:59
 */
/**
 * 数字相关方法
 * @static digitUppercase 数字转大写金额
 * @static intToChinese 数字转中文数字
 * @static format 数字千分位分割
 */
class Number$1 {
    /**
     * 数字转大写金额
     * @param n 输入数字
     * @returns 大写金额
     */
    static digitUppercase(n) {
        const fraction = ['角', '分'];
        const digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        const unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        n = Math.abs(n);
        let s = '';
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    }
    /**
     * 数字转中文数字
     * @param value 输入数字
     * @returns 中文数字
     */
    static intToChinese(value) {
        const str = String(value);
        const len = str.length - 1;
        const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
        const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
            let pos = 0;
            if ($1[0] !== '0') {
                pos = len - idx;
                if (idx === 0 && $1[0] === 1 && idxs[len - idx] === '十') {
                    return idxs[len - idx];
                }
                return num[$1[0]] + idxs[len - idx];
            }
            else {
                let left = len - idx;
                let right = len - idx + $1.length;
                if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                    pos = left - left % 4;
                }
                if (pos) {
                    return idxs[pos] + num[$1[0]];
                }
                else if (idx + $1.length >= len) {
                    return '';
                }
                else {
                    return num[$1[0]];
                }
            }
        });
    }
    /**
     * 数字千分位分割
     * @param n 数字
     * @param fix
     * @returns
     */
    static format(n, fix = 0) {
        let float = '';
        let result = 0;
        if (String(n).indexOf('.') !== -1) { // 小数
            const split = String(n).split('.');
            float = split[1];
            n = parseFloat(split[0]);
        }
        if (fix !== 0) {
            const length = float.length || 0;
            if (length < fix) {
                float = float + '0'.repeat(fix - length);
            }
            else {
                float = float.slice(0, -(length - fix));
            }
        }
        let num = n.toString();
        let len = num.length;
        if (len <= 3) {
            result = num;
        }
        else {
            let temp = '';
            let remainder = len % 3;
            if (remainder > 0) { // 不是3的整数倍
                result = num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g)?.join(',') + temp;
            }
            else { // 3的整数倍
                result = num.slice(0, len).match(/\d{3}/g)?.join(',') + temp;
            }
        }
        if (float)
            return result + `.${float}`;
        return result;
    }
}

/**
 * @Date         : 2021-10-19 17:50:01
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:14
 */
/**
 * @description 字符串强化方法
 * @static fistLetterUpper 首字母大写
 * @static telFormat 格式化手机号 中间为*
 */
class String$1 {
    /**
     * 首字母大写
     * @param str
     * @returns
     */
    static fistLetterUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * 格式化手机号 中间为*
     * @param tel
     * @returns
     */
    static telFormat(tel) {
        let telStr = tel.toString();
        return telStr.slice(0, 3) + '****' + telStr.slice(7);
    }
}

/**
 * @Date         : 2021-10-19 17:46:50
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:56:28
 */
/** 格式化相关方法 */
var format = {
    Array,
    Number: Number$1,
    String: String$1
};

/**
 * @Date         : 2021-10-14 17:28:09
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-14 18:17:54
 */
/**
 * 常用正则
 */
var regular = {
    // 手机号验证
    phone: /^[1][3456789][0-9]{9}$/,
    // 身份证
    idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    // 邮箱
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    // URL
    url: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    // IPv4
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    // 16进制颜色
    color16: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    // 日期YYYY-MM-DD
    date1: /^\d{4}(\-)\d{1,2}\1\d{1,2}$/,
    // 日期YYYY-MM-DD hh:mm:ss
    date2: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,
    // 整数
    int: /^[-+]?\d*$/,
    // 小数
    float: /^[-+]?\d*$/,
    // 邮政编码
    postalNo: /^\d{6}$/,
    // QQ号
    QQ: /^[1-9][0-9]{4,10}$/,
    // 微信号
    wx: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
    // 车牌号
    carNo: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    // 只含字母的字符串
    letterStr: /^[a-zA-Z]+$/,
    // 包含中文的字符串
    cnStr: /[\u4E00-\u9FA5]/,
    // 密码强度 密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符
    password: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
};

/**
 * @Date         : 2020-11-02 14:21:06
 * @Description  : 导出工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:49
 */
let exportObj = {
    // browser
    bom,
    core,
    date,
    monitor,
    algorithm,
    dom,
    format,
    regular
};

export { exportObj as default };
