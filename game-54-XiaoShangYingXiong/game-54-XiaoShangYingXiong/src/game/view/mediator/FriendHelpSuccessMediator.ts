/**
*
* @author 
*
*/
module game {
    export
        class FriendHelpSuccessMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = Mediator.FRIENDHELP_SUCCESS_MEDIATOR
        public constructor() {
            super(FriendHelpSuccessMediator.NAME);
        }
        private score: number;

        public countUserResult() {
            var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId,
                hid: playerProxy.hid,
                score: this.score
            }
            var self = this;
            var playerData = playerProxy.playerData;
            var url = Constant.SERVER_PATH + 'ass_score';
            netProxy.sendRequest(url,postData,function(data) {
                self.facade.sendNotification(Notifier.SHOW_VIEW,{
                    name: FriendHelpSuccessMediator.NAME
                });
            });
        }

        public init() {
            this.viewComponent = new UIHelpSuccessLayer();
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.OPEN_FRIENDHELP_SUCCESS,
                Notifier.CLOSE_HELP_SUCCESS
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
                case Notifier.OPEN_FRIENDHELP_SUCCESS:
                    if(this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.score = notification.getBody().score;
                    if(!Constant.DEBUG_MODAL) {
                        var self = this;
                        this.countUserResult();
                    }
                    break;
                case Notifier.CLOSE_HELP_SUCCESS:
                    if(this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent)
                        this.viewComponent = null;
                    }
                    break;
            }
        }
    }
}
