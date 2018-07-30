/**
 * 游戏逻辑
 * @author
 */
var game;
(function (game) {
    var GameMediator = (function (_super) {
        __extends(GameMediator, _super);
        function GameMediator() {
            _super.call(this, GameMediator.NAME);
        }
        var d = __define,c=GameMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIGameLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.PLAY_GAME,
                Notifier.CLOSE_GAME
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.PLAY_GAME:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: GameMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_GAME:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        GameMediator.NAME = Mediator.GAME_MEDIATOR;
        return GameMediator;
    }(puremvc.Mediator));
    game.GameMediator = GameMediator;
    egret.registerClass(GameMediator,'game.GameMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
