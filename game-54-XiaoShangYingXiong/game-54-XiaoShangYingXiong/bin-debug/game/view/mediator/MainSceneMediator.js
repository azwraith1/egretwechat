/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var MainSceneMediator = (function (_super) {
        __extends(MainSceneMediator, _super);
        function MainSceneMediator() {
            _super.call(this, MainSceneMediator.NAME);
        }
        var d = __define,c=MainSceneMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UIMainLayer();
            this.viewComponent.init();
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.PRELOAD_OVER,
                Notifier.CLOSE_MAIN
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.PRELOAD_OVER:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var audioProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
                    audioProxy.startBgMusic();
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: MainSceneMediator.NAME
                    });
                    var playProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                    if (playProxy && playProxy.isHelp()) {
                        game.AppFacade.getInstance().sendNotification(Notifier.OPEN_FRIENDHELP);
                    }
                    break;
                case Notifier.CLOSE_MAIN:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        };
        MainSceneMediator.NAME = Mediator.MAINSCENE_MEDIATOR;
        return MainSceneMediator;
    }(puremvc.Mediator));
    game.MainSceneMediator = MainSceneMediator;
    egret.registerClass(MainSceneMediator,'game.MainSceneMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
