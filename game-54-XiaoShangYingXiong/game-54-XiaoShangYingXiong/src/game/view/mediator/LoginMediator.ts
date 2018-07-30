/**
 * Created by Administrator on 2016/3/8 0008.
 */
module game {
    export class LoginMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME:string = Mediator.LOGIN_MEDIATOR;
        public constructor(){
            super(LoginMediator.NAME);
        }
        
        public init() { 
            this.viewComponent = new UIMainLoadingLayer();
            this.viewComponent.init();
            
        }
        
        public listNotificationInterests():Array<any>{
            return [
                Notifier.START_GAME
            ];
        }

        public handleNotification(notification:puremvc.INotification):void{
            switch(notification.getName()){
                case Notifier.START_GAME:
                    var self = this;
                    this.facade.sendNotification(Notifier.SHOW_VIEW, {
                        name: LoginMediator.NAME
                    });
                    break;
            }
        }

        public get loginViewComponent():AppContainer{
            return <AppContainer><any>(this.viewComponent);
        }
    }
}