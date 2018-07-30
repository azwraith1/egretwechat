/**
 *
 * @author 
 *
 */
module game {
    export class RankMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME: string = Mediator.RANK_MEDIATOR;
        public listData: any;
        public constructor() {
            super(RankMediator.NAME);
        }
        
        public init() {
            this.viewComponent = new UIRankLayer();
            this.viewComponent.init(this.listData);
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.OPEN_RANK,
                Notifier.CLOSE_RANK
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.OPEN_RANK:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }else{
                        if(!Constant.DEBUG_MODAL){
                            this.getRankList();
                        }else{
                            this.facade.sendNotification(Notifier.SHOW_VIEW,{
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
        }
        
        public getRankList(){
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId
            }
            var url = Constant.SERVER_PATH + 'ranking';
            var self = this;
            netProxy.sendRequest(url,postData,function(data) {
                self.listData = data;
                self.facade.sendNotification(Notifier.SHOW_VIEW,{
                    name: RankMediator.NAME,
                    zOrder: 20
                });
            });          
            
        }
        
    }

}