/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var GameDescMediator = (function (_super) {
        __extends(GameDescMediator, _super);
        function GameDescMediator() {
            _super.call(this, GameDescMediator.NAME);
        }
        var d = __define,c=GameDescMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIDescLayer(this.inGame);
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.OPEN_DESC_SCENE,
                Notifier.CLOSE_DESC
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.OPEN_DESC_SCENE:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.inGame = notification.getBody().inGame;
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: GameDescMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_DESC:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        GameDescMediator.NAME = Mediator.GAME_DESC_MEDIATOR;
        return GameDescMediator;
    }(puremvc.Mediator));
    game.GameDescMediator = GameDescMediator;
    egret.registerClass(GameDescMediator,'game.GameDescMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
