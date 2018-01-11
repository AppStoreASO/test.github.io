/*--------------------------------------------
 * Created by chenjing on 2017/11/23.
 *
 * @Description 对XMLHttpRequest简单封装，方便进行Get和Post请求
 *--------------------------------------------
 */

/*global XMLHttpRequest*/

/**
 *  XMLHttpRequest
 *
 *  暂不支持：1.超时时间 2.异步访问？？
 */
var xhr = (function () {
    "use strict";

    var module = {},
        READY_STATE = {UNSENT : 0, OPENED : 1, HEADERS_RECEIVED : 2, LOADING : 3, DONE : 4},
        STATUS = {OK : 200, NOT_FOUND : 404};

    // 当前支持的返回数据解析类型
    module.RESPONSE_TYPE = {STRING : "text", ARRAY_BUFFER : "arraybuffer", JSON : "json"};

    /**
     * 使用XMLHttpRequest发送Get请求
     *
     * @param url               地址
     * @param onSuccess         成功回调
     * @param responseType      返回数据解析类型
     * @param onerror  状态改变回调（不包含成功状态）
     */
    module.httpGet = function (url, onSuccess, responseType, onerror) {
        var xhrObj = new XMLHttpRequest();

        xhrObj.open("GET", url);

        xhrObj.responseType = (responseType === undefined ? module.RESPONSE_TYPE.STRING : responseType);

        xhrObj.onreadystatechange = function () {
            if (xhrObj.readyState === READY_STATE.DONE) {
                if (xhrObj.status === STATUS.OK && onSuccess) {
                    onSuccess(xhrObj);
                    return;
                }
                if (xhrObj.status === STATUS.NOT_FOUND && onerror) {
                    onerror(xhrObj);
                }
            }
        };

        xhrObj.onerror = function () {
            if (onerror) {
                onerror(xhrObj);
            }
        };
        xhrObj.send();
    };

    /**
     * 使用XMLHttpRequest发送Post请求
     *
     * @param url               地址
     * @param data              发送数据
     * @param onSuccess         成功回调
     * @param responseType      返回数据解析类型
     * @param readyStateChange  状态改变回调（不包含成功状态）
     */
    module.httpPost = function (url, data, onSuccess, responseType, readyStateChange) {
        var xhrObj = new XMLHttpRequest();

        xhrObj.open("POST", url);

        xhrObj.responseType = (responseType === undefined ? module.RESPONSE_TYPE.STRING : responseType);

        xhrObj.onreadystatechange = function () {

            if (xhrObj.readyState === READY_STATE.DONE && xhrObj.status === STATUS.OK) {
                if (onSuccess) {
                    onSuccess(xhrObj);
                }
            } else {
                if (readyStateChange) {
                    readyStateChange(xhrObj);
                }
            }
        };

        xhrObj.send(data);
    };

    return module;
}());