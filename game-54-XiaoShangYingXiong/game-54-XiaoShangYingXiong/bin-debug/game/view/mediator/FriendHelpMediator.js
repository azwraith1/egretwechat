/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var FriendHelpMediator = (function (_super) {
        __extends(FriendHelpMediator, _super);
        function FriendHelpMediator() {
            _super.call(this, FriendHelpMediator.NAME);
            this.isShowHelp = false;
        }
        var d = __define,c=FriendHelpMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIFriendHelpLayer(this.helpData);
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.OPEN_FRIENDHELP,
                Notifier.CLOSE_FRIENDHELP
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.OPEN_FRIENDHELP:
                    if (this.isShowHelp) {
                        return;
                    }
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                    var self = this;
                    if (playerProxy.hid) {
                        var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
                        var url = game.Constant.SERVER_PATH + 'get_userinfo';
                        netProxy.sendRequest(url, { openid: playerProxy.hid }, function (data) {
                            self.helpData = data;
                            self.facade.sendNotification(Notifier.PUSH_VIEW, {
                                name: FriendHelpMediator.NAME
                            });
                            self.isShowHelp = true;
                        });
                    }
                    break;
                case Notifier.CLOSE_FRIENDHELP:
                    if (this.viewComponent) {
                        UIUtils.removeFromParent(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        FriendHelpMediator.NAME = Mediator.FRIENDHELP_MEDIATOR;
        return FriendHelpMediator;
    }(puremvc.Mediator));
    game.FriendHelpMediator = FriendHelpMediator;
    egret.registerClass(FriendHelpMediator,'game.FriendHelpMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
