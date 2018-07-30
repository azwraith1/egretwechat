/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIDescLayer = (function (_super) {
        __extends(UIDescLayer, _super);
        function UIDescLayer(inGame) {
            _super.call(this);
            this.inGame = inGame;
            this.skinName = new DescSceneSkin();
        }
        var d = __define,c=UIDescLayer,p=c.prototype;
        p.init = function () {
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.scrollPolicyH = 'off';
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtnTouchEnded, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnTouchEnded, this);
            this.createStart();
        };
        p.closeBtnTouchEnded = function () {
            var self = this;
            this.hide(function () {
                if (self.inGame) {
                    game.AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
                    game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                }
                else {
                    game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                }
            });
        };
        p.createStart = function () {
            this.mainGroup.alpha = 0;
            egret.Tween.get(this.mainGroup).to({ alpha: 1 }, 1000);
        };
        p.enterBtnTouchEnded = function () {
            this.hide(function () {
                //if(new Date() >= new Date("2016-5-21")) {
                //    alert("活动已经结束");
                //    return;
                //}
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_MAIN);
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                game.AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);
                //                AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
            });
        };
        p.hide = function (callFunc) {
            egret.Tween.get(this.mainGroup)
                .to({ alpha: 0 }, 1000)
                .call(callFunc, this);
        };
        return UIDescLayer;
    }(game.UIBaseLayer));
    game.UIDescLayer = UIDescLayer;
    egret.registerClass(UIDescLayer,'game.UIDescLayer');
})(game || (game = {}));
