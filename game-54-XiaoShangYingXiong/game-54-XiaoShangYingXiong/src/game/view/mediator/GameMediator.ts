/**
 * 游戏逻辑
 * @author 
 */
module game {
    export class GameMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = Mediator.GAME_MEDIATOR;
        private level: number;
        private lessTime: number;
        public constructor() {
            super(GameMediator.NAME);
        }

        public init() {
            this.viewComponent = new UIGameLayer();
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.PLAY_GAME,
                Notifier.CLOSE_GAME
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.PLAY_GAME:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: GameMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_GAME:
                    if(this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
            }
        }
    }
}
