/**
 * 桥梁
 * @author 
 */
module game {
    export class WidgetStage extends eui.Panel {
        public constructor() {
            super();
            this.skinName = new WidgetStageSkin();
        }
        public fgImage: eui.Image;
        public stageGroup: eui.Group;
        public stageImage: eui.Image;

        protected createChildren() {
            super.createChildren();
            this.randomWidth();
        }

        private randomWidth() {
            var number = _.random(60, 99);
            this.stageImage.scaleX = parseFloat((number / 100).toFixed(2)); 
        }

        public fadeFgImage(count: number) {
            egret.Tween.get(this.fgImage).to({
                alpha: count
            }, 2000);
        }

    }
}
