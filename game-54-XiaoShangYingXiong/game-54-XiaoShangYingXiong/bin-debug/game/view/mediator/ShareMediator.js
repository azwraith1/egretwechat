/**
 * 分享界面
 * @author
 */
var game;
(function (game) {
    var ShareMediator = (function (_super) {
        __extends(ShareMediator, _super);
        function ShareMediator() {
            _super.call(this, ShareMediator.NAME);
        }
        var d = __define,c=ShareMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIShareLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.OPEN_SHARE,
                Notifier.CLOSE_SHARE
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.OPEN_SHARE:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: ShareMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_SHARE:
                    if (this.viewComponent) {
                        UIUtils.removeFromParent(this.viewComponent);
                    }
                    this.viewComponent = null;
                    break;
            }
        };
        ShareMediator.NAME = Mediator.SHARE_MEDIATOR;
        return ShareMediator;
    }(puremvc.Mediator));
    game.ShareMediator = ShareMediator;
    egret.registerClass(ShareMediator,'game.ShareMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
