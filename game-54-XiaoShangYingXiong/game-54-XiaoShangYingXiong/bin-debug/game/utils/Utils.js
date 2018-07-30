var game;
(function (game) {
    var Utils = (function () {
        function Utils() {
        }
        var d = __define,c=Utils,p=c.prototype;
        /**
         * 获取从min-max之间的值
         * @param min
         * @param max
         */
        Utils.rang = function (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        };
        /**
         * 判断是否在范围
         * @param val
         * @param min
         * @param max
         * @returns {boolean}
         */
        Utils.isRang = function (val, min, max) {
            return val >= min && val <= max;
        };
        /**
         * 将val的值限制起来
         * @param val
         * @param min
         * @param max
         * @returns {number}
         */
        Utils.limit = function (val, min, max) {
            return Math.max(min, Math.min(max, val));
        };
        /**
         * 角度转化弧度
         * @param val
         */
        Utils.ang2rad = function (val) {
            return val / 180 * Math.PI;
        };
        /**
         * 弧度转化角度
         * @param val
         */
        Utils.rad2ang = function (val) {
            return val / Math.PI * 180;
        };
        /**
         * 返回大数据的显示方式
         * @param num
         * @returns {string}
         */
        Utils.getBigNumberShow = function (num) {
            if (num < 10000) {
                return num + "";
            }
            else {
                num /= 1000;
                return num.toFixed(1) + "K";
            }
        };
        /**
         * 元素是否包含在Array里
         * @param el
         * @param arr
         * @returns {boolean}
         */
        Utils.isElinArr = function (el, arr) {
            return arr.indexOf(el) > -1;
        };
        /**
         * 2个Array是否有相交元素
         * @param arr1
         * @param arr2
         */
        Utils.isArrCrossing = function (arr1, arr2) {
            for (var i = 0; i < arr1.length; i++) {
                if (Utils.isElinArr(arr1[i], arr2)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 从地址上获取key
         * @param name {string} 要获取的key名称
         * @returns {string} key值
         * @platform Web
         * @code utf-8
         */
        Utils.getURLQueryString = function (name) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var url = decodeURIComponent(window.location.href);
                var r;
                if (url.indexOf("#?") > 0) {
                    url = url.replace("#?", "&");
                    r = url.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
                }
                else {
                    r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
                }
                return r ? r[2] : null;
            }
        };
        Utils.getMaxStr = function (str) {
            if (str.length <= 5) {
                return str;
            }
            return str.substr(0, 5) + "...";
        };
        return Utils;
    }());
    game.Utils = Utils;
    egret.registerClass(Utils,'game.Utils');
})(game || (game = {}));
