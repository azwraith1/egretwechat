/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var GameOverMediator = (function (_super) {
        __extends(GameOverMediator, _super);
        function GameOverMediator() {
            _super.call(this, GameOverMediator.NAME);
            this.score = 0;
            this.rank = 999;
        }
        var d = __define,c=GameOverMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIGameOverLayer();
            this.viewComponent.init(this.score, this.rank);
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.GAME_OVER
            ];
        };
        p.countUserResult = function () {
            var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId,
                score: this.score
            };
            var self = this;
            var playerData = playerProxy.playerData;
            var url = game.Constant.SERVER_PATH + 'score';
            netProxy.sendRequest(url, postData, function (data) {
                self.rank = data.rank;
                self.facade.sendNotification(Notifier.PUSH_VIEW, {
                    name: GameOverMediator.NAME
                });
            });
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.GAME_OVER:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var self = this;
                    this.score = notification.getBody().score;
                    if (game.Constant.DEBUG_MODAL) {
                        self.facade.sendNotification(Notifier.PUSH_VIEW, {
                            name: GameOverMediator.NAME
                        });
                        return;
                    }
                    this.countUserResult();
                    break;
            }
        };
        GameOverMediator.NAME = Mediator.GAME_OVER_MEDIATOR;
        return GameOverMediator;
    }(puremvc.Mediator));
    game.GameOverMediator = GameOverMediator;
    egret.registerClass(GameOverMediator,'game.GameOverMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
