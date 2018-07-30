/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var RankMediator = (function (_super) {
        __extends(RankMediator, _super);
        function RankMediator() {
            _super.call(this, RankMediator.NAME);
        }
        var d = __define,c=RankMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIRankLayer();
            this.viewComponent.init(this.listData);
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.OPEN_RANK,
                Notifier.CLOSE_RANK
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.OPEN_RANK:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    else {
                        if (!game.Constant.DEBUG_MODAL) {
                            this.getRankList();
                        }
                        else {
                            this.facade.sendNotification(Notifier.SHOW_VIEW, {
                                name: RankMediator.NAME,
                                zOrder: 20
                            });
                        }
                    }
                    break;
                case Notifier.CLOSE_RANK:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        p.getRankList = function () {
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId
            };
            var url = game.Constant.SERVER_PATH + 'ranking';
            var self = this;
            netProxy.sendRequest(url, postData, function (data) {
                self.listData = data;
                self.facade.sendNotification(Notifier.SHOW_VIEW, {
                    name: RankMediator.NAME,
                    zOrder: 20
                });
            });
        };
        RankMediator.NAME = Mediator.RANK_MEDIATOR;
        return RankMediator;
    }(puremvc.Mediator));
    game.RankMediator = RankMediator;
    egret.registerClass(RankMediator,'game.RankMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
