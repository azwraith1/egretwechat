/**
 *
 * @author 
 *
 */
module game {
    export class GameDescMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME: string  =  Mediator.GAME_DESC_MEDIATOR;
        private inGame: boolean;
        public constructor() {
            super(GameDescMediator.NAME);
        }
        
        public init() {
            this.viewComponent = new UIDescLayer(this.inGame);
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.OPEN_DESC_SCENE,
                Notifier.CLOSE_DESC
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.OPEN_DESC_SCENE:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.inGame = notification.getBody().inGame;
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: GameDescMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_DESC:
                    if(this.viewComponent){
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        }
    }
}
