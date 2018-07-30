/**
 *
 * @author 
 *
 */
module game {
    export class UIRewardLayer extends UIBaseLayer{
        public constructor() {
            super();
            this.skinName = new GiftLayerSkin();
        }
        
        public init() {
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var playerData = playerProxy.playerData || {};
            if(playerData.nickname){
                this.nameLabel.text = Utils.getMaxStr(playerData.nickname);
            }else{
                this.nameLabel.text = '';
            }
            this.touxiangImg.source = playerData.avatar;
            this.rankLabel.text = playerData.rank || 0;
            this.zhuliLabel.text = playerData.ass_num || 0;
            this.scoreLabel.text = playerData.total_score || 0;
        }
        
        private enterBtn: eui.Button;
        private touxiangImg: eui.Image;
        private scoreLabel: eui.BitmapLabel;
        private zhuliLabel: eui.BitmapLabel;
        private rankLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;
        private closeBtn: eui.Button;
        protected createChildren() {
            super.createChildren();
            this.bindTouchEvent();
        }
        
        
        public bindTouchEvent() { 
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.enterBtnTouchEnded, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.closeBtnTouchEnded,this);
        }
        
        
        private closeBtnTouchEnded(){
            this.hide(function(){
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_GIFT);    
            });
        }
        
        public enterBtnTouchEnded() { 
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            this.hide(function(){
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_GIFT);    
                AppFacade.getInstance().sendNotification(Notifier.OPEN_REGISTER);    
            });
        }
    }
}
