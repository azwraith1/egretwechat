/**
 *
 * @author 
 *
 */
module game {
  export class PlayerInfoMediator extends puremvc.Mediator implements puremvc.IMediator{
      public static NAME: string = Mediator.PLAYER_INFO_MEDIATOR;
        public constructor() {
            super(PlayerInfoMediator.NAME);
        }
        
        public init() {
            this.viewComponent = new UIPlayerInfoLayer();
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.OPEN_REGISTER,
                Notifier.CLOSE_REGISTER
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.OPEN_REGISTER:
                  if(this.viewComponent) { 
                    UIUtils.removeSelf(this.viewComponent)
                    this.viewComponent = null;
                  }
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: PlayerInfoMediator.NAME
                    });
                    break;
                 case Notifier.CLOSE_REGISTER:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
                    
                    
            }
        }
    }
}
