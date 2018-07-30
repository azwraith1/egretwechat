/**
 *
 * @author 
 *
 */
module game {
    export class UIDescLayer extends UIBaseLayer {
        public constructor(inGame) {
            super();
            this.inGame = inGame;
            this.skinName = new DescSceneSkin();
        }
        private inGame: boolean;
        private enterBtn: eui.Button;
        private mainGroup: eui.Group;
        private scroller: eui.Scroller;
        private closeBtn: eui.Button;
        public init() {

        }

        protected createChildren() {
            super.createChildren();
            this.scroller.scrollPolicyH = 'off';
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBtnTouchEnded,this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeBtnTouchEnded,this);
            this.createStart();
        }

        public closeBtnTouchEnded() {
            var self = this;
            this.hide(function() {
                if(self.inGame) {
                    AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
                    AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                } else {
                    AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                }
            })
        }

        private createStart() {
            this.mainGroup.alpha = 0;
            egret.Tween.get(this.mainGroup).to({ alpha: 1 },1000);
        }

        private enterBtnTouchEnded() {
            this.hide(function() {
                //if(new Date() >= new Date("2016-5-21")) {
                //    alert("活动已经结束");
                //    return;
                //}
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_MAIN);
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);
                //                AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
            })
        }

        public hide(callFunc: Function) {
            egret.Tween.get(this.mainGroup)  
                .to({ alpha: 0 },1000)
                .call(callFunc,this);
        }

    }
}
