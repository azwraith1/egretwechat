/**
 *
 * @author 
 *
 */
module game {
    export class WidgetStick extends egret.Sprite {
        public growRate: number;
        public stageW: number;
        public stageH: number;
        public stickSprite: egret.Bitmap;
        public timer: egret.Timer;
        public speed: number = 0;
        public constructor() {
            super();
            this.init();
        }

        private init() {
            this.stageH = egret.MainContext.instance.stage.stageHeight;
            this.stageW = egret.MainContext.instance.stage.stageWidth;
            this.growRate = 0.05;
            var stickSprite = new egret.Bitmap();
            stickSprite.texture = RES.getRes("stick_png");
            this.addChild(stickSprite);
            this.stickSprite = stickSprite;
            //            this.stickSprite.width = 10;
            this.anchorOffsetX = stickSprite.width;
            this.anchorOffsetY = stickSprite.height;
            this.scaleY = 0;

            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
            this.timer = timer;
        }

        //  朝上变长
        public growHeight(): void {
            // 如果长度超过屏幕高的一半，则不再变长
            if (this.scaleY >= 2) {
                return;
            }
            this.speed += this.growRate;
            this.scaleY += 0.02 * this.speed;
        }

        public addSpeed() {
            if (this.growRate >= 0.2) {
                return;
            }
            this.growRate += 0.005;
        }
    }
}
