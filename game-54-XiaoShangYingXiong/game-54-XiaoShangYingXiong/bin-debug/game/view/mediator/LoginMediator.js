/**
 * Created by Administrator on 2016/3/8 0008.
 */
var game;
(function (game) {
    var LoginMediator = (function (_super) {
        __extends(LoginMediator, _super);
        function LoginMediator() {
            _super.call(this, LoginMediator.NAME);
        }
        var d = __define,c=LoginMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIMainLoadingLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.START_GAME
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.START_GAME:
                    var self = this;
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: LoginMediator.NAME
                    });
                    break;
            }
        };
        d(p, "loginViewComponent"
            ,function () {
                return (this.viewComponent);
            }
        );
        LoginMediator.NAME = Mediator.LOGIN_MEDIATOR;
        return LoginMediator;
    }(puremvc.Mediator));
    game.LoginMediator = LoginMediator;
    egret.registerClass(LoginMediator,'game.LoginMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
