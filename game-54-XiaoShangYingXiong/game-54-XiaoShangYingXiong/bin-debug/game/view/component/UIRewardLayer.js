/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIRewardLayer = (function (_super) {
        __extends(UIRewardLayer, _super);
        function UIRewardLayer() {
            _super.call(this);
            this.skinName = new GiftLayerSkin();
        }
        var d = __define,c=UIRewardLayer,p=c.prototype;
        p.init = function () {
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var playerData = playerProxy.playerData || {};
            if (playerData.nickname) {
                this.nameLabel.text = game.Utils.getMaxStr(playerData.nickname);
            }
            else {
                this.nameLabel.text = '';
            }
            this.touxiangImg.source = playerData.avatar;
            this.rankLabel.text = playerData.rank || 0;
            this.zhuliLabel.text = playerData.ass_num || 0;
            this.scoreLabel.text = playerData.total_score || 0;
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bindTouchEvent();
        };
        p.bindTouchEvent = function () {
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.enterBtnTouchEnded, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.closeBtnTouchEnded, this);
        };
        p.closeBtnTouchEnded = function () {
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_GIFT);
            });
        };
        p.enterBtnTouchEnded = function () {
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_GIFT);
                game.AppFacade.getInstance().sendNotification(Notifier.OPEN_REGISTER);
            });
        };
        return UIRewardLayer;
    }(game.UIBaseLayer));
    game.UIRewardLayer = UIRewardLayer;
    egret.registerClass(UIRewardLayer,'game.UIRewardLayer');
})(game || (game = {}));
