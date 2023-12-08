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
export default class Document {
    /**
     * @description: 屏蔽右键
     */
    static rightClick(): void;
    /**
     * 加载页面事件 从其他页面返回时可用
     * @param fn 回调函数
     */
    static pageshow(fn: any): void;
    /**
     * @description: 打开浏览器全屏
     */
    static toFullScreen(): void;
    /**
     * 退出浏览器全屏
     */
    static exitFullscreen(): void;
    /**
     * 滚动到页面顶部
     */
    static scrollToTop(): void;
    /**
     * 滚动到页面底部
     */
    static scrollToBottom(): void;
    /**
     * 滚动到指定元素区域
     * @param element 选择器字符串
     */
    static smoothScroll(element: string): void;
    /**
     * 获取可视窗口高度
     * @returns 返回高度
     */
    static getClientHeight(): number;
    /**
     * 获取可视窗口宽度
     * @returns 返回宽度
     */
    static getPageViewWidth(): number;
}
//# sourceMappingURL=document.d.ts.map