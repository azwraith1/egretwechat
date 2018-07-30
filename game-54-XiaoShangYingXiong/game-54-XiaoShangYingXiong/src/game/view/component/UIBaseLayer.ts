module game {
    export class UIBaseLayer extends eui.Panel {
        protected resGroup: string;
        protected needStartAni: boolean = true;
        public constructor() {
            super();
            this.width = game.Constant.WINSIZE_WIDTH;
            this.width = game.Constant.WINSIZE_HEIGHT;

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }

        protected onAdded() {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        }

        protected onRemoved() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.destroy();
        }

        protected onShow() {
            var child = this['mainGroup'];
            if (child) {
                child.y += Constant.WINSIZE_HEIGHT;
                egret.Tween.get(child).to({
                    y: 0
                }, 200);
            } else {
                egret.Tween.get(this)
                    .to({
                        scaleX: 1,
                        scaleY: 1
                    }, 100, egret.Ease.backOut)
                    .call(this.onShowAnimateOver, this);
            }
        }
        
        protected onHide(callFunc: Function) {
            var child = this['mainGroup'];
            if (child) {
                egret.Tween.get(child).to({
                    y: Constant.WINSIZE_HEIGHT
                }, 200).call(callFunc);
            } else {
                egret.Tween.get(this)
                    .to({
                        scaleX: 0,
                        scaleY: 0
                    }, 100, egret.Ease.backIn)
                    .call(() => {
                        this.onHideAnimateOver();
                        if (callFunc) {
                            callFunc();
                        }
                    }, this);
            }
        }

        public hide(callFunc: Function) {
            this.onHide(callFunc);
        }
        
        protected onHideAnimateOver() { 
        
        }
        
        protected createChildren() {
            super.createChildren();

            UIUtils.addButtonScaleEffects(this);
            if (this.needStartAni) { 
                this.onShow();
            }
            
        }
        
        /**
        * 显示动画完成后
        */
        protected onShowAnimateOver() {

        }

        protected onTouchTap(e: egret.TouchEvent) {

        }
        
        /**
         * 销毁
         */
        protected destroy() {
            if (this.resGroup) {
                RES.destroyRes(this.resGroup);
            }
        }
    }
}