/**
 *
 * @author 
 *
 */
module game {
    export class GameOverMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = Mediator.GAME_OVER_MEDIATOR;
        private score: number = 0;
        private rank: number = 999;
        public constructor() {
            super(GameOverMediator.NAME);
        }

        public init() {
            this.viewComponent = new UIGameOverLayer();
            this.viewComponent.init(this.score,this.rank);
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.GAME_OVER
            ];
        }

        public countUserResult() {
            var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var postData = {
                gameid: playerProxy.gameId,
                openid: playerProxy.openId,
                score: this.score
            }
            var self = this;
            var playerData = playerProxy.playerData;
            var url = Constant.SERVER_PATH + 'score';
            netProxy.sendRequest(url,postData,function(data) {
                self.rank = data.rank;
                self.facade.sendNotification(Notifier.PUSH_VIEW,{
                    name: GameOverMediator.NAME
                });
            });
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
                case Notifier.GAME_OVER:
                    if(this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var self = this;
                    this.score = notification.getBody().score;
                    if(Constant.DEBUG_MODAL) {
                        self.facade.sendNotification(Notifier.PUSH_VIEW,{
                            name: GameOverMediator.NAME
                        });
                        return;
                    }
                    this.countUserResult();
                    break;
            }
        }
    }
}
