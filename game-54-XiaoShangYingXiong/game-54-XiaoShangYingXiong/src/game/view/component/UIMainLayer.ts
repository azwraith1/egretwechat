/**
 *
 * @author 
 *
 */
module game {
    export class UIMainLayer extends UIBaseLayer {
        public constructor() {
            super();
            this.needStartAni = false;
            this.skinName = new MainSceneSkin();
        }

        public init() {
            //             this.playTitleGroupAni();
            this.playStartBtnAni();
        }

        public playStartBtnAni() {
            egret.Tween.get(this.startBtn,{ loop: true })
                .to({
                    alpha: 0.1
                },1000)
                .to({
                    alpha: 1
                },1000)
        }

        public playTitleGroupAni() {
            var titleGroupY = this.titleGroup.y;
            egret.Tween.get(this.titleGroup,{ loop: true })
                .to({
                    y: titleGroupY - 30
                },3000)
                .to({
                    y: titleGroupY
                },2000)
        }

        private startBtn: eui.Image;
        private titleGroup: eui.Group;
        private myrewardBtn: eui.Button;
        private rankBtn: eui.Button;
        private descBtn: eui.Button;
        private musicBtn: eui.ToggleButton;
        protected createChildren() {
            super.createChildren();
            var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
            this.musicBtn.selected = !audioProxy.isOpen;
            audioProxy.openSound(audioProxy.isOpen);
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.musicBtnTouchEnded,this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startBtnTouchEnded,this);
            this.descBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.descBtnTouchEnded,this);
            this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankBtnTouchEnded,this);
        }

        private startBtnTouchEnded() {

            egret.Tween.get(this.startBtn).to({
                rotation: 360 * 5
            },800).call(function() {
                //if(new Date() >= new Date("2016-5-21")) {
                //    alert("活动已经结束");
                //    return;
                //}
                AppFacade.getInstance().sendNotification(Notifier.OPEN_DESC_SCENE, {inGame: false});
//                AppFacade.getInstance().sendNotification(Notifier.CLOSE_MAIN);
//                AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);      
            });
            
//            
             
        }
        
        private descBtnTouchEnded() {
            AppFacade.getInstance().sendNotification(Notifier.SHOW_GIFT);
//            AppFacade.getInstance().sendNotification(Notifier.OPEN_DESC_SCENE);        
        }
        
        private rankBtnTouchEnded(){
            AppFacade.getInstance().sendNotification(Notifier.OPEN_RANK);
        }
        
        private musicBtnTouchEnded(){
            var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
            audioProxy.openSound(!this.musicBtn.selected);
        }
    }
}