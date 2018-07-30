/**
 *
 * @author 
 *
 */
module game { 
    export class MainSceneMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME: string = Mediator.MAINSCENE_MEDIATOR;
        public constructor() {
            super(MainSceneMediator.NAME);
        }
        
        public init() {
            this.viewComponent = new UIMainLayer();
            this.viewComponent.init();
        }
        
        public listNotificationInterests(): Array<any> {
            return [
                Notifier.PRELOAD_OVER,
                Notifier.CLOSE_MAIN
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.PRELOAD_OVER:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
                    audioProxy.startBgMusic();
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: MainSceneMediator.NAME
                    });
                    var playProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                    if (playProxy && playProxy.isHelp()) {
                        AppFacade.getInstance().sendNotification(Notifier.OPEN_FRIENDHELP);
                    }
                    break;
                case Notifier.CLOSE_MAIN:
                    if (this.viewComponent) {
                        UIUtils.removeSelf(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;
                    
            }
        }
        
    }
}

