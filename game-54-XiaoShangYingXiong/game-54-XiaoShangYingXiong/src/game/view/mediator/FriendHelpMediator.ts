/**
 *
 * @author 
 *
 */
module game {
    export class FriendHelpMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = Mediator.FRIENDHELP_MEDIATOR;
        private isShowHelp: boolean = false;
        public helpData: any;
        public constructor() {
            super(FriendHelpMediator.NAME);
        }

        public init() {
            this.viewComponent = new UIFriendHelpLayer(this.helpData);
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.OPEN_FRIENDHELP,
                Notifier.CLOSE_FRIENDHELP
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
                case Notifier.OPEN_FRIENDHELP:
                    if(this.isShowHelp) {
                        return;
                    }
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                    var self = this;
                    if(playerProxy.hid) {
                        var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
                        var url = Constant.SERVER_PATH + 'get_userinfo';
                        netProxy.sendRequest(url,{ openid: playerProxy.hid },function(data) {
                            self.helpData = data;
                            self.facade.sendNotification(Notifier.PUSH_VIEW,{
                                name: FriendHelpMediator.NAME
                            });
                            self.isShowHelp = true;
                        });
                    }
                    break;

                case Notifier.CLOSE_FRIENDHELP:
                    if(this.viewComponent) {
                        UIUtils.removeFromParent(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        }
    }
}
