/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIFriendHelpLayer = (function (_super) {
        __extends(UIFriendHelpLayer, _super);
        function UIFriendHelpLayer(helpData) {
            _super.call(this);
            this.helpData = helpData;
            this.skinName = new FriendHelpSkin();
        }
        var d = __define,c=UIFriendHelpLayer,p=c.prototype;
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bindTouchEvent();
        };
        p.init = function () {
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            this.nameLabel.text = this.helpData.nickname || '';
            this.txImg.source = this.helpData.avatar;
        };
        p.bindTouchEvent = function () {
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.startBtnTouchEnd, this);
            this.zhuliBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.zhuliBtnTouchEnd, this);
        };
        p.startBtnTouchEnd = function () {
            var playerPorxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            playerPorxy.clearHelp(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                game.AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
            });
        };
        p.zhuliBtnTouchEnd = function () {
            this.hide(function () {
                //if(new Date() >= new Date("2016-5-21")) {
                //    alert("活动已经结束");
                //    return;
                //}
                game.AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                game.AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);
            });
        };
        return UIFriendHelpLayer;
    }(game.UIBaseLayer));
    game.UIFriendHelpLayer = UIFriendHelpLayer;
    egret.registerClass(UIFriendHelpLayer,'game.UIFriendHelpLayer');
})(game || (game = {}));
