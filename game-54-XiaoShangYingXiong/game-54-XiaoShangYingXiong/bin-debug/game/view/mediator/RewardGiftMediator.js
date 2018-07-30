/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var RewardGiftMediator = (function (_super) {
        __extends(RewardGiftMediator, _super);
        function RewardGiftMediator() {
            _super.call(this, RewardGiftMediator.NAME);
        }
        var d = __define,c=RewardGiftMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIRewardLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.SHOW_GIFT,
                Notifier.CLOSE_GIFT
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.SHOW_GIFT:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var self = this;
                    var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                    if (game.Constant.DEBUG_MODAL) {
                        self.facade.sendNotification(Notifier.SHOW_VIEW, {
                            name: RewardGiftMediator.NAME,
                            zOrder: 20
                        });
                        return;
                    }
                    playerProxy.updatePlayerData(function () {
                        self.facade.sendNotification(Notifier.SHOW_VIEW, {
                            name: RewardGiftMediator.NAME,
                            zOrder: 20
                        });
                    });
                    break;
                case Notifier.CLOSE_GIFT:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        RewardGiftMediator.NAME = Mediator.REWARD_GIFT_MEDIATOR;
        return RewardGiftMediator;
    }(puremvc.Mediator));
    game.RewardGiftMediator = RewardGiftMediator;
    egret.registerClass(RewardGiftMediator,'game.RewardGiftMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
