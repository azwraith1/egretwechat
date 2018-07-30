/**
 * 分享界面
 * @author 
 */
module game {
   export class ShareMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME: string = Mediator.SHARE_MEDIATOR;
        public constructor() {
            super(ShareMediator.NAME);
        }
        
        public init() {
            this.viewComponent = new UIShareLayer();
            this.viewComponent.init();
        }

        public listNotificationInterests(): Array<any> {
            return [
                Notifier.OPEN_SHARE,
                Notifier.CLOSE_SHARE
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.OPEN_SHARE:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: ShareMediator.NAME
                    });
                    break;
                case Notifier.CLOSE_SHARE:
                    if (this.viewComponent) {
                        UIUtils.removeFromParent(this.viewComponent);
                    }
                    this.viewComponent = null;
                    break;
            }
        }
    }
}
