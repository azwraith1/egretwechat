/**
 *
 * @author 
 *
 */
module game {
   export class UITips extends UIBaseLayer{
        private time: number = 1000;
        private tipsText: string;
        public constructor(tipContent: string) {
            super();
            this.tipsText = tipContent;
        }
        
        private tipsContent: eui.Label;
        private init() {
            this.renderUIFile();
        }

        private renderUIFile() {
            this.skinName = new TipsSkin();
        }
        
        protected createChildren() {
            super.createChildren();
            this.tipsContent.text = this.tipsText;
            setTimeout(function() {
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_TIPS);
            }, this.time);
        }
    }
}
