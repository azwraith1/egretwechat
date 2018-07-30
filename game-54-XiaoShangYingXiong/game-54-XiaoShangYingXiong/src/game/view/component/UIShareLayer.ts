/**
 * 分享界面
 * @author 
 */
module game{
    export class UIShareLayer extends UIBaseLayer{
        public constructor() {
            super();
        }
        
        private init() {
            this.renderUIFile();
        }

        private renderUIFile() {
            this.skinName = new ShareSceneSkin();
        }

        protected createChildren() {
            super.createChildren();
        }
        
        public onTouchTap() {
            this.hide(function() {
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_SHARE);
            });
        }
    }
}
