/**
 * 网络代理模块
 * @author
 */
var game;
(function (game) {
    var NetProxy = (function (_super) {
        __extends(NetProxy, _super);
        function NetProxy() {
            _super.call(this, NetProxy.NAME);
            this.callbackList = new HashMap();
        }
        var d = __define,c=NetProxy,p=c.prototype;
        /**
         * 发送请求
         */
        p.sendRequest = function (url, data, callback) {
            var loader = new egret.URLLoader();
            this.callbackList.set(loader.hashCode, callback);
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            var request = new egret.URLRequest(url);
            var header = new egret.URLRequestHeader('Access-Control-Allow-Origin', '*');
            request.requestHeaders.push(header);
            request.method = data ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
            var argsArr = [];
            for (var key in data) {
                argsArr.push(key + "=" + data[key]);
            }
            request.data = new egret.URLVariables(argsArr.join("&"));
            loader.load(request);
        };
        p.sendHttpRequest = function (url, data, callback) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
        };
        p.onPostComplete = function (event) {
            var loader = event.currentTarget;
            loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
            var str = loader.data.replace(/\s/g, "");
            var data = JSON.parse(str);
            var callback = this.callbackList.get(loader.hashCode);
            if (callback) {
                callback(data);
                this.callbackList.remove(loader.hashCode);
            }
        };
        p.onPostIOError = function (event) {
            egret.error("post error : " + event);
        };
        NetProxy.NAME = Proxy.NET_PROXY;
        return NetProxy;
    }(puremvc.Proxy));
    game.NetProxy = NetProxy;
    egret.registerClass(NetProxy,'game.NetProxy',["puremvc.IProxy","puremvc.INotifier"]);
})(game || (game = {}));
