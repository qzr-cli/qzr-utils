/**
 * @Date         : 2020-11-02 14:21:06
 * @Description  : 导出工具函数
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-10-19 17:57:49
 */
declare let exportObj: {
    bom: {
        cookie: typeof import("./modules/BOM/modules/cookie").default;
        param: typeof import("./modules/BOM/modules/param").default;
        localstorage: typeof import("./modules/BOM/modules/localstorage").default;
    };
    core: {
        Core: typeof import("./modules/Core/modules/core").default;
        Sleep: typeof import("./modules/Core/modules/sleep").default;
        Pause: typeof import("./modules/Core/modules/promise").Pause;
        Limit: typeof import("./modules/Core/modules/promise").Limit;
    };
    date: {
        Time: typeof import("./modules/Date/modules/time").default;
        Core: typeof import("./modules/Date/modules/core").default;
    };
    monitor: {
        Performance: typeof import("./modules/Monitor/modules/performance").default;
        ErrorPerformance: typeof import("./modules/Monitor/modules/error").default;
        UserInfo: typeof import("./modules/Monitor/modules/userInfo").default;
    };
    algorithm: {
        sort: typeof import("./modules/Algorithm/modules/sort").default;
    };
    dom: {
        document: typeof import("./modules/DOM/modules/document").default;
    };
    format: {
        Array: typeof import("./modules/Format/modules/array").default;
        Number: typeof import("./modules/Format/modules/number").default;
        String: typeof import("./modules/Format/modules/string").default;
    };
    regular: {
        phone: RegExp;
        idCard: RegExp;
        email: RegExp;
        url: RegExp;
        ipv4: RegExp;
        color16: RegExp;
        date1: RegExp;
        date2: RegExp;
        int: RegExp;
        float: RegExp;
        postalNo: RegExp;
        QQ: RegExp;
        wx: RegExp;
        carNo: RegExp;
        letterStr: RegExp;
        cnStr: RegExp;
        password: RegExp;
    };
};
export default exportObj;
//# sourceMappingURL=index.d.ts.map