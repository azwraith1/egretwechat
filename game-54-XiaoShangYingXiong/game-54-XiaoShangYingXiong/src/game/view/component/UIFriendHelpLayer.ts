/**
 *
 * @author 
 *
 */
module game {
    export class UIFriendHelpLayer extends UIBaseLayer{
        public helpData: any;
        public constructor(helpData: any) {
            super();
            this.helpData = helpData;
            this.skinName = new FriendHelpSkin();
        }
        
        private startBtn: eui.Button;
        private mainGroup: eui.Group;
        private zhuliBtn: eui.Button;
        private txImg: eui.Image;
        private nameLabel: eui.Label;
        protected createChildren(){
            super.createChildren();
            this.bindTouchEvent(); 
        }
        
        public init(){
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            this.nameLabel.text = this.helpData.nickname || '';
            this.txImg.source = this.helpData.avatar;
        }
        
        public bindTouchEvent(){
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.startBtnTouchEnd, this);
            this.zhuliBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.zhuliBtnTouchEnd, this);
        
        }
        
        private startBtnTouchEnd(){
            var playerPorxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            playerPorxy.clearHelp(function() {
                AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
            });
        }
        
        private zhuliBtnTouchEnd() {
            this.hide(function(){
                //if(new Date() >= new Date("2016-5-21")) {
                //    alert("活动已经结束");
                //    return;
                //}
                AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);
            });
        }
    }
}
