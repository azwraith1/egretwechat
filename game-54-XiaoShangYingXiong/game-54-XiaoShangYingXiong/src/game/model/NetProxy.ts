/**
 * 网络代理模块
 * @author 
 */
module game{
    export class NetProxy extends puremvc.Proxy implements puremvc.IProxy{
        public static NAME: string = Proxy.NET_PROXY;
        private callbackList: HashMap<number, Function> = new HashMap<number, Function>();
        
        public constructor() {
            super(NetProxy.NAME);
        }
        
        /**
         * 发送请求
         */
        public sendRequest(url: string, data: Object, callback: Function) {
            var loader: egret.URLLoader = new egret.URLLoader();
            this.callbackList.set(loader.hashCode, callback);
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);

            var request: egret.URLRequest = new egret.URLRequest(url);
            var header = new egret.URLRequestHeader('Access-Control-Allow-Origin', '*');
            request.requestHeaders.push(header);
            
            request.method = data ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
            var argsArr = [];
            for (var key in data) {
                argsArr.push(key + "=" + data[key]);
            }
            request.data = new egret.URLVariables(argsArr.join("&"));
            loader.load(request);
        }
        
        public sendHttpRequest(url: string, data: Object, callback: Function) { 
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
        }

        private onPostComplete(event: egret.Event): void {
            var loader = <egret.URLLoader>event.currentTarget;
            loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
            var str = loader.data.replace(/\s/g, "");
            var data = JSON.parse(str);
            var callback: Function = this.callbackList.get(loader.hashCode);
            if (callback) {
                callback(data);
                this.callbackList.remove(loader.hashCode);
            }
        }

        private onPostIOError(event: egret.IOErrorEvent): void {
            egret.error("post error : " + event);
        }
        
        
    }
}
