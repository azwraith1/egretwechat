/**
 * 应用程序Mediator，带有Scene管理
 * @author 
 */
module game {
    export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = Mediator.APPLICATION_MEDIATOR;
        private viewStack: Array<any> = [];
        public constructor(viewComponent: any) {
            super(ApplicationMediator.NAME, viewComponent);
            this.registerMediators();
            this.registerProxys();
        }
        /**
         * 共有的 其他的注册卸载MainSceneMediator中
         * 注册Mediator
         */ 
        private registerMediators() {
            this.facade.registerMediator(new LoginMediator());
            this.facade.registerMediator(new MainSceneMediator());
            this.facade.registerMediator(new TipsMediator());
            this.facade.registerMediator(new ShareMediator());
            this.facade.registerMediator(new GameMediator()); 
            this.facade.registerMediator(new GameOverMediator());
            this.facade.registerMediator(new RewardGiftMediator());
            this.facade.registerMediator(new PlayerInfoMediator());
            this.facade.registerMediator(new FriendHelpMediator());
            this.facade.registerMediator(new RankMediator());
            this.facade.registerMediator(new GameDescMediator());
            this.facade.registerMediator(new FriendHelpSuccessMediator());
        }
        
        /*
         * 注册代理
         */         
        private registerProxys() {
            var proxys:any= [
                NetProxy,
                PlayerProxy,
                WeixinProxy,
                AudioProxy
                
            ]
            var self = this;
            _.forEach(proxys, function(proxy, index) { 
                var proxyObj = new proxys[index]();
                self.facade.registerProxy(proxyObj);
                if (proxyObj && proxyObj.init) { 
                    proxyObj.init();
                }    
            })
        }

        public get main(): AppContainer {
            return <AppContainer><any>(this.viewComponent);
        }
    
        public listNotificationInterests(): Array<any> {
            return [
                Notifier.SHOW_VIEW,
                Notifier.PUSH_VIEW,
                Notifier.POP_VIEW
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.SHOW_VIEW:
                    this.showView(notification.getBody());
                    break;
                case Notifier.PUSH_VIEW:
                    this.pushView(notification.getBody());
                    break
                case Notifier.POP_VIEW:
                    this.popView(notification.getBody());
                    break
            }
        }
        /**
         * 压入栈顶
         */
        private pushView(body) {
            var top = this.viewStack[0];
            if (top) {
                var mediator: any = this.facade.retrieveMediator(top.name);
                if (mediator && mediator.onPushView) {
                    mediator.onPushView();
                } else if (mediator && mediator.viewComponent) {
                    if (mediator.viewComponent.parent) {
                        var parent = mediator.viewComponent.parent;
                        parent.removeChild(mediator.viewComponent);
                    }
                    mediator.viewComponent = null;
                }
            }
            this.showView(body);
            this.viewStack.unshift(body);
        }
        /**
         * 弹出栈顶
         * options.popAll 是否全部关闭
         */ 
        private popView(options) {

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
                var mediator: any = this.facade.retrieveMediator(top.name);
                this.showView(top);
                if (mediator && mediator.onRestoreView) {
                    mediator.onRestoreView();
                }
            }
            //通知mediator被显示,恢复压栈时的状态
        }
        /**
         *  跑出第一个 
         */ 
        private popOne(): any {
            var top = this.viewStack.shift();
            if (!top) {
                return false;
            }
            var mediator: any = this.facade.retrieveMediator(top.name);
            if (mediator) {
                if (mediator.onPopView) {
                    mediator.onPopView();
                } else if (mediator.viewComponent) {
                    if (mediator.viewComponent.parent) {
                        var parent = mediator.viewComponent.parent;
                        parent.removeChild(mediator.viewComponent);
                    }
                    mediator.viewComponent = null;
                }
            }
            return this.viewStack.length;
        }
        
        private showView(body) {
            var parentMediator: any = this;
            var res: Array<string>;
            var viewMediator: any = this.facade.retrieveMediator(body.name);

            if (body.parent instanceof String) {
                parentMediator = this.facade.retrieveMediator(body.parent);
            }

            if (viewMediator.getRes) {
                res = viewMediator.getRes();
            }

            var handleCreateLayer = function() {
                if (viewMediator.init) {
                    viewMediator.init(body);
                }

                var childLayer = viewMediator.getViewComponent();
                parentMediator.getViewComponent().addChild(childLayer, body.zOrder || 0);
            };
            handleCreateLayer();
        }
    }
}
