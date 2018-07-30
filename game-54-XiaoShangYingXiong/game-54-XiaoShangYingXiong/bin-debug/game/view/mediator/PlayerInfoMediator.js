/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var PlayerInfoMediator = (function (_super) {
        __extends(PlayerInfoMediator, _super);
        function PlayerInfoMediator() {
            _super.call(this, PlayerInfoMediator.NAME);
        }
        var d = __define,c=PlayerInfoMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIPlayerInfoLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.OPEN_REGISTER,
                Notifier.CLOSE_REGISTER
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.OPEN_REGISTER:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: PlayerInfoMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_REGISTER:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        PlayerInfoMediator.NAME = Mediator.PLAYER_INFO_MEDIATOR;
        return PlayerInfoMediator;
    }(puremvc.Mediator));
    game.PlayerInfoMediator = PlayerInfoMediator;
    egret.registerClass(PlayerInfoMediator,'game.PlayerInfoMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
