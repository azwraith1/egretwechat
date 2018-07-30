/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIHelpSuccessLayer = (function (_super) {
        __extends(UIHelpSuccessLayer, _super);
        function UIHelpSuccessLayer() {
            _super.call(this);
            this.skinName = new FrientdHelpSuccessSkin();
        }
        var d = __define,c=UIHelpSuccessLayer,p=c.prototype;
        p.init = function () {
            var friendHlepMediator = game.AppFacade.getInstance().retrieveMediator(Mediator.FRIENDHELP_MEDIATOR);
            var helpData = friendHlepMediator.helpData;
            this.nameLabel.text = helpData.nickname || '';
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bindTouchEvent();
        };
        p.bindTouchEvent = function () {
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.startBtnTouchEnd, this);
            this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnTouchEnd, this);
        };
        p.startBtnTouchEnd = function () {
            this.hide(function () {
                var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                playerProxy.clearHelp(function () {
                    game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_HELP_SUCCESS);
                    game.AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
                });
            });
        };
        p.shareBtnTouchEnd = function () {
            game.AppFacade.getInstance().sendNotification(Notifier.OPEN_SHARE);
        };
        return UIHelpSuccessLayer;
    }(game.UIBaseLayer));
    game.UIHelpSuccessLayer = UIHelpSuccessLayer;
    egret.registerClass(UIHelpSuccessLayer,'game.UIHelpSuccessLayer');
})(game || (game = {}));
