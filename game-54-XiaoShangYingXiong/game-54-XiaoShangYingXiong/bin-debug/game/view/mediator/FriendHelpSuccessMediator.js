/**
*
* @author
*
*/
var game;
(function (game) {
    var FriendHelpSuccessMediator = (function (_super) {
        __extends(FriendHelpSuccessMediator, _super);
        function FriendHelpSuccessMediator() {
            _super.call(this, FriendHelpSuccessMediator.NAME);
        }
        var d = __define,c=FriendHelpSuccessMediator,p=c.prototype;
        p.countUserResult = function () {
            var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId,
                hid: playerProxy.hid,
                score: this.score
            };
            var self = this;
            var playerData = playerProxy.playerData;
            var url = game.Constant.SERVER_PATH + 'ass_score';
            netProxy.sendRequest(url, postData, function (data) {
                self.facade.sendNotification(Notifier.SHOW_VIEW, {
                    name: FriendHelpSuccessMediator.NAME
                });
            });
        };
        p.init = function () {
            this.viewComponent = new game.UIHelpSuccessLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.OPEN_FRIENDHELP_SUCCESS,
                Notifier.CLOSE_HELP_SUCCESS
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.OPEN_FRIENDHELP_SUCCESS:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.score = notification.getBody().score;
                    if (!game.Constant.DEBUG_MODAL) {
                        var self = this;
                        this.countUserResult();
                    }
                    break;
                case Notifier.CLOSE_HELP_SUCCESS:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        FriendHelpSuccessMediator.NAME = Mediator.FRIENDHELP_SUCCESS_MEDIATOR;
        return FriendHelpSuccessMediator;
    }(puremvc.Mediator));
    game.FriendHelpSuccessMediator = FriendHelpSuccessMediator;
    egret.registerClass(FriendHelpSuccessMediator,'game.FriendHelpSuccessMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
