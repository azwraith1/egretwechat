/**
 * 应用程序Mediator，带有Scene管理
 * @author
 */
var game;
(function (game) {
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator(viewComponent) {
            _super.call(this, ApplicationMediator.NAME, viewComponent);
            this.viewStack = [];
            this.registerMediators();
            this.registerProxys();
        }
        var d = __define,c=ApplicationMediator,p=c.prototype;
        /**
         * 共有的 其他的注册卸载MainSceneMediator中
         * 注册Mediator
         */
        p.registerMediators = function () {
            this.facade.registerMediator(new game.LoginMediator());
            this.facade.registerMediator(new game.MainSceneMediator());
            this.facade.registerMediator(new game.TipsMediator());
            this.facade.registerMediator(new game.ShareMediator());
            this.facade.registerMediator(new game.GameMediator());
            this.facade.registerMediator(new game.GameOverMediator());
            this.facade.registerMediator(new game.RewardGiftMediator());
            this.facade.registerMediator(new game.PlayerInfoMediator());
            this.facade.registerMediator(new game.FriendHelpMediator());
            this.facade.registerMediator(new game.RankMediator());
            this.facade.registerMediator(new game.GameDescMediator());
            this.facade.registerMediator(new game.FriendHelpSuccessMediator());
        };
        /*
         * 注册代理
         */
        p.registerProxys = function () {
            var proxys = [
                game.NetProxy,
                game.PlayerProxy,
                game.WeixinProxy,
                game.AudioProxy
            ];
            var self = this;
            _.forEach(proxys, function (proxy, index) {
                var proxyObj = new proxys[index]();
                self.facade.registerProxy(proxyObj);
                if (proxyObj && proxyObj.init) {
                    proxyObj.init();
                }
            });
        };
        d(p, "main"
            ,function () {
                return (this.viewComponent);
            }
        );
        p.listNotificationInterests = function () {
            return [
                Notifier.SHOW_VIEW,
                Notifier.PUSH_VIEW,
                Notifier.POP_VIEW
            ];
        };
        p.handleNotification = function (notification) {
            switch (notification.getName()) {
                case Notifier.SHOW_VIEW:
                    this.showView(notification.getBody());
                    break;
                case Notifier.PUSH_VIEW:
                    this.pushView(notification.getBody());
                    break;
                case Notifier.POP_VIEW:
                    this.popView(notification.getBody());
                    break;
            }
        };
        /**
         * 压入栈顶
         */
        p.pushView = function (body) {
            var top = this.viewStack[0];
            if (top) {
                var mediator = this.facade.retrieveMediator(top.name);
                if (mediator && mediator.onPushView) {
                    mediator.onPushView();
                }
                else if (mediator && mediator.viewComponent) {
                    if (mediator.viewComponent.parent) {
                        var parent = mediator.viewComponent.parent;
                        parent.removeChild(mediator.viewComponent);
                    }
                    mediator.viewComponent = null;
                }
            }
            this.showView(body);
            this.viewStack.unshift(body);
        };
        /**
         * 弹出栈顶
         * options.popAll 是否全部关闭
         */
        p.popView = function (options) {
            //移除栈顶视图
            var popAll = options.popAll;
            popAll = popAll ? true : false;
            do {
                if (!this.popOne()) {
                    break;
                }
            } while (popAll);
            //显示当前栈顶视图
            var top = this.viewStack[0];
            if (top) {
                var mediator = this.facade.retrieveMediator(top.name);
                this.showView(top);
                if (mediator && mediator.onRestoreView) {
                    mediator.onRestoreView();
                }
            }
            //通知mediator被显示,恢复压栈时的状态
        };
        /**
         *  跑出第一个
         */
        p.popOne = function () {
            var top = this.viewStack.shift();
            if (!top) {
                return false;
            }
            var mediator = this.facade.retrieveMediator(top.name);
            if (mediator) {
                if (mediator.onPopView) {
                    mediator.onPopView();
                }
                else if (mediator.viewComponent) {
                    if (mediator.viewComponent.parent) {
                        var parent = mediator.viewComponent.parent;
                        parent.removeChild(mediator.viewComponent);
                    }
                    mediator.viewComponent = null;
                }
            }
            return this.viewStack.length;
        };
        p.showView = function (body) {
            var parentMediator = this;
            var res;
            var viewMediator = this.facade.retrieveMediator(body.name);
            if (body.parent instanceof String) {
                parentMediator = this.facade.retrieveMediator(body.parent);
            }
            if (viewMediator.getRes) {
                res = viewMediator.getRes();
            }
            var handleCreateLayer = function () {
                if (viewMediator.init) {
                    viewMediator.init(body);
                }
                var childLayer = viewMediator.getViewComponent();
                parentMediator.getViewComponent().addChild(childLayer, body.zOrder || 0);
            };
            handleCreateLayer();
        };
        ApplicationMediator.NAME = Mediator.APPLICATION_MEDIATOR;
        return ApplicationMediator;
    }(puremvc.Mediator));
    game.ApplicationMediator = ApplicationMediator;
    egret.registerClass(ApplicationMediator,'game.ApplicationMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
