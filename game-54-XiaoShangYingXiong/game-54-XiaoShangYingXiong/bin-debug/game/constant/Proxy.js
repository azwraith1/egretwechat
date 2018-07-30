/**
 * 代理常量
 * @author
 */
var Proxy = (function () {
    function Proxy() {
    }
    var d = __define,c=Proxy,p=c.prototype;
    Proxy.NET_PROXY = 'netProxy';
    Proxy.WEIXIN_PROXY = 'weixinProxy';
    Proxy.PLAYER_PROXY = 'playerProxy';
    Proxy.AUDIO_PROXY = 'audioProxy';
    return Proxy;
}());
egret.registerClass(Proxy,'Proxy');
