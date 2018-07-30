/**
 *
 * @author 
 *
 */
module game {
    export class UIHelpSuccessLayer extends UIBaseLayer{
        public constructor() {
            super();
            this.skinName = new FrientdHelpSuccessSkin();
        }
        
        public init(){
             var friendHlepMediator: any = AppFacade.getInstance().retrieveMediator(Mediator.FRIENDHELP_MEDIATOR);
             var helpData = friendHlepMediator.helpData;
             this.nameLabel.text = helpData.nickname || '';
        }
        
        private nameLabel: eui.Label;
        private startBtn: eui.Button;
        private shareBtn: eui.Button;
        public createChildren(){
            super.createChildren();
            this.bindTouchEvent();
            
        }
        
        private bindTouchEvent(){
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.startBtnTouchEnd, this);  
            this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnTouchEnd, this);
            
        }
        
        private startBtnTouchEnd(){
            this.hide(function(){
                var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                playerProxy.clearHelp(function(){
                    AppFacade.getInstance().sendNotification(Notifier.CLOSE_HELP_SUCCESS);
                    AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);    
                });
            });
        }
        
        private shareBtnTouchEnd(){
            AppFacade.getInstance().sendNotification(Notifier.OPEN_SHARE);        
        }
        
    }
}
