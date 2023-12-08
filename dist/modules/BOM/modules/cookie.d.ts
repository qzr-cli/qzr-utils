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
declare class Cookie {
    /**
     * 格式化cookie字符串 返回对象
     * @param {*} str
     * @returns {object} 返回cookie对象
     */
    static parse(str: string): {};
    /**
     * 格式化解析当前cookie 返回对象
     * @returns {object} 返回包含当前所有cookie的对象
     */
    static parseAll(): {};
    /**
     * 获取单个cookie属性
     * @param {string} name
     * @return {string | undefined}
     */
    static get(name: string): string | undefined;
    /**
     * 获取当前domain下的所有cookie
     * @param {string} domain 当前域名
     * @return {Array}
     */
    static getAll(): string;
    /**
     * 设置cookie
     * @param {string} key
     * @param {*} val
     * @param {string} day
     * @return {undefined}
     */
    static set({ key, val, path, day }: {
        key: string;
        val: any;
        path: boolean;
        day: number;
    }): void;
    /**
     * 删除cookie
     * @param {*} name cookie的key
     * @return {null}
     */
    static del(key: string, path?: boolean): void;
    /**
     * 获取单个cookie属性（异步）
     * @param {string} name
     * @return {object}
     */
    static getAsync(name: string): Promise<any>;
    /**
     * 获取当前domain下的所有cookie（异步）
     * @param {string} domain 当前域名
     * @return {Promise<any>}
     */
    static getAllAsync(domain: string): Promise<any>;
    /**
     * 设置cookie（异步）
     * @param {string} key
     * @param {*} val
     * @param {string} domain
     * @return {Promise<any>}
     */
    static setAsync({ key, val, domain }: {
        key?: string | undefined;
        val?: string | undefined;
        domain?: null | undefined;
    }): Promise<any>;
    /**
     * 删除cookie（异步）
     * @param {*} name cookie的key
     * @return {Promise<any>}
     */
    static delAsync(name: string): Promise<any>;
    /**
     * 添加cookie事件监听器
     * @callback fn 回调函数
     */
    static addEventListener(fn: any): void;
    /**
     * 清除所有cookie
     * @param {*} host 指定域名下清空
     */
    static clearAll(host: string): void;
}
export default Cookie;
//# sourceMappingURL=cookie.d.ts.map