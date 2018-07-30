/**
 *
 * @author 
 *
 */
module game {
    export class UIGameOverLayer extends UIBaseLayer {
        public constructor() {
            super();
            this.skinName = new GameOverSceneSkin();
        }

        public init(score: number, rank: number) {
            if (!rank) {
                rank = 0;
            }
            this.scoreLabel.text = score.toString();
            this.scoreLabel.x -= score.toString().length * 8;
            this.rankLabel.text = rank.toString();
            this.rankLabel.x -= rank.toString().length * 6;
        }

        private rankLabel: eui.BitmapLabel;
        private scoreLabel: eui.BitmapLabel;
        private mainGroup: eui.Group;
        private restartBtn: eui.Button;
        private friendBtn: eui.Button;
        private guanzhuBtn: eui.Button;
        private homeBtn: eui.Button;
        protected createChildren() {
            super.createChildren();
            this.bindTouchEvent();
        }


        private bindTouchEvent() {
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.restartBtnTouchEnded, this);
            this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.friendBtnTouchEnded, this);
            this.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.guanzhuBtnTouchEnded, this);
            this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.homeBtnTouchEnded, this);
        }

        public restartBtnTouchEnded() {
            this.restartBtn.touchEnabled = false;
            this.hide(function() {
                AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);
            })

        }

        public friendBtnTouchEnded() {
            AppFacade.getInstance().sendNotification(Notifier.OPEN_SHARE);
        }

        public guanzhuBtnTouchEnded() {
            window.open(Constant.CARE_URL);
        }

        public homeBtnTouchEnded() {
            this.hide(function() {
                AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_GAME);
                AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
            });
        }
    }
}
