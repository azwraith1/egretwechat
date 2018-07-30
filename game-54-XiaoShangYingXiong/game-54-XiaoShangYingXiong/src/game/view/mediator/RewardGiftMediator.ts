/**
 *
 * @author 
 *
 */
module game {
  export class RewardGiftMediator extends puremvc.Mediator implements puremvc.IMediator{
      public static NAME: string = Mediator.REWARD_GIFT_MEDIATOR;
        public constructor() {
            super(RewardGiftMediator.NAME);
        }
        
        public init() {
            this.viewComponent = new UIRewardLayer();
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.SHOW_GIFT,
                Notifier.CLOSE_GIFT
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.SHOW_GIFT:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var self = this; 
                    var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                    if(Constant.DEBUG_MODAL){
                        self.facade.sendNotification(Notifier.SHOW_VIEW,{
                            name: RewardGiftMediator.NAME,
                            zOrder: 20
                        });
                        return;
                    }
                    playerProxy.updatePlayerData(function(){
                        self.facade.sendNotification(Notifier.SHOW_VIEW,{
                            name: RewardGiftMediator.NAME,
                            zOrder: 20
                        });
                    })
                   
                    break;
                    
                case Notifier.CLOSE_GIFT:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
                    
            }
        }
    }
}
