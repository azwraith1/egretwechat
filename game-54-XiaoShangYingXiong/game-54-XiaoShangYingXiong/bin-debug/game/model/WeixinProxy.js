/**
 * 微信代理对象
 * @author
 *
 */
var game;
(function (game) {
    var WeixinProxy = (function (_super) {
        __extends(WeixinProxy, _super);
        function WeixinProxy() {
            _super.call(this, WeixinProxy.NAME);
            this.shareServerIndex = 0;
            this.shareServerURLArr = [
                game.Constant.SERVER_PATH + 'share'
            ];
        }
        var d = __define,c=WeixinProxy,p=c.prototype;
        p.init = function () {
            this.config();
        };
        p.config = function () {
            var playerProxy = this.facade.retrieveProxy(Proxy.PLAYER_PROXY);
            var netProxy = this.facade.retrieveProxy(Proxy.NET_PROXY);
            var wx = window["wx"];
            //sign
            var ourl = encodeURIComponent(window.location.href.split("#")[0]);
            var url = this.shareServerURLArr[this.shareServerIndex];
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId,
                url: ourl
            };
            var self = this;
            netProxy.sendRequest(url, postData, function (data) {
                wx.config({
                    "debug": game.Constant.WEIXIN_DEBUG,
                    "appId": data["appId"],
                    "timestamp": data["timestamp"],
                    "nonceStr": data["nonceStr"],
                    "signature": data["signature"],
                    "jsApiList": ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    wx.checkJsApi({
                        "jsApiList": ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'],
                        "success": function (res) {
                            //初始化微信分享
                            self.share(data["url"]);
                        }
                    });
                });
                wx.error(function (err) {
                    self.shareServerIndex++;
                    if (self.shareServerIndex >= self.shareServerURLArr.length) {
                        alert("wx.error: " + JSON.stringify(err));
                    }
                    else {
                        self.config();
                    }
                });
            });
        };
        p.share = function (url, desc) {
            if (desc === void 0) { desc = null; }
            this.shareURL = url;
            desc = "心中有尺，手上有度，玩转“瀚海海尚—眼神不好坚持不了3步”，就有终极大奖等着你哦！";
            var wx = window["wx"];
            var shareObj = {
                "title": '坚持3步？比比你的眼力价！',
                "desc": desc,
                "link": url,
                "imgUrl": 'https://mmbiz.qlogo.cn/mmbiz/0ay5PNUR5AUiaIFIa33h9HLnoaUia5Xyuiaz94q0UVjgNK6Ozbca3icg5oxQSRGY976RNtHfFDUQxpiav7u0IuQ7EFg/0?wx_fmt=png',
            };
            var shareObjTimeline = {};
            for (var key in shareObj) {
                shareObjTimeline[key] = shareObj[key];
            }
            shareObjTimeline["success"] = function () {
                //GameNet.instance.share(()=>{
                //    //SharePanel.instance.hide();
                //});\
            };
            wx.onMenuShareTimeline(shareObjTimeline);
            wx.onMenuShareAppMessage(shareObj);
            wx.onMenuShareQQ(shareObj);
            wx.onMenuShareWeibo(shareObj);
        };
        p.changeShareText = function (desc) {
            this.share(this.shareURL, desc);
        };
        WeixinProxy.NAME = Proxy.WEIXIN_PROXY;
        return WeixinProxy;
    }(puremvc.Proxy));
    game.WeixinProxy = WeixinProxy;
    egret.registerClass(WeixinProxy,'game.WeixinProxy',["puremvc.IProxy","puremvc.INotifier"]);
})(game || (game = {}));
