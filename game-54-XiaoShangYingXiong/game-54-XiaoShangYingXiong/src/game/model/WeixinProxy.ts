/**
 * 微信代理对象
 * @author 
 *
 */
module game {
    export class WeixinProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = Proxy.WEIXIN_PROXY;

        private shareURL: string;
        private shareServerIndex: number = 0;
        private shareServerURLArr: string[] = [
            Constant.SERVER_PATH + 'share'
        ];

        private localId: any;
        private isStart: boolean;
        public constructor() {
            super(WeixinProxy.NAME);
        }

        public init() {
            this.config();
        }

        public config() {
            var playerProxy: any = this.facade.retrieveProxy(Proxy.PLAYER_PROXY);
            var netProxy: any = this.facade.retrieveProxy(Proxy.NET_PROXY);
            var wx = window["wx"];
            //sign
            var ourl = encodeURIComponent(window.location.href.split("#")[0]);
            var url = this.shareServerURLArr[this.shareServerIndex];
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId,
                url: ourl
            }    
            var self = this;
            netProxy.sendRequest(url,postData,function(data) {
                wx.config({
                    "debug": Constant.WEIXIN_DEBUG, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    "appId": data["appId"], // 必填，公众号的唯一标识
                    "timestamp": data["timestamp"], // 必填，生成签名的时间戳
                    "nonceStr": data["nonceStr"], // 必填，生成签名的随机串
                    "signature": data["signature"],// 必填，签名，见附录1
                    "jsApiList": ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function() {
                    wx.checkJsApi({
                        "jsApiList": ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        "success": function(res) {
                            //初始化微信分享
                            self.share(data["url"]);
                        }
                    });
                });

                wx.error(function(err) {
                    self.shareServerIndex++;
                    if(self.shareServerIndex >= self.shareServerURLArr.length) {
                        alert("wx.error: " + JSON.stringify(err));
                    } else {
                        self.config();
                    }
                });
            });
        }

        public share(url: string,desc: string = null) {
            this.shareURL = url;
            desc = "心中有尺，手上有度，玩转“瀚海海尚—眼神不好坚持不了3步”，就有终极大奖等着你哦！";
            var wx = window["wx"];
            var shareObj = {
                "title": '坚持3步？比比你的眼力价！', // 分享标题
                "desc": desc, // 分享内容
                "link": url, // 分享链接
                "imgUrl": 'https://mmbiz.qlogo.cn/mmbiz/0ay5PNUR5AUiaIFIa33h9HLnoaUia5Xyuiaz94q0UVjgNK6Ozbca3icg5oxQSRGY976RNtHfFDUQxpiav7u0IuQ7EFg/0?wx_fmt=png', // 分享图标

            };

            var shareObjTimeline = {};
            for(var key in shareObj) {
                shareObjTimeline[key] = shareObj[key];
            }
            shareObjTimeline["success"] = function() {
                //GameNet.instance.share(()=>{
                //    //SharePanel.instance.hide();
                //});\
            }
            wx.onMenuShareTimeline(shareObjTimeline);
            wx.onMenuShareAppMessage(shareObj);
            wx.onMenuShareQQ(shareObj);
            wx.onMenuShareWeibo(shareObj);
        }

        public changeShareText(desc) {
            this.share(this.shareURL,desc);
        }
    }
}
