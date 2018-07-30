/**
 *
 * @author 
 *
 */
module game {
    export class UIPlayerInfoLayer extends UIBaseLayer {
        private playerProxy: any;
        public constructor() {
            super();
        }

        public init() {
            this.skinName = new PlayerInfoSceneSkin();
        }
        private enterBtn: eui.Button;
        private nameInputText: eui.EditableText;
        private phoneInputText: eui.EditableText;
        private closeBtn: eui.Button;
        protected createChildren() {
            super.createChildren();
            this.bindTouchEvent();
            this.reloadInputText();
            this.phoneInputText.restrict = "0-9";
        }

        public reloadInputText() {
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var playerData = playerProxy.playerData || {};
            this.nameInputText.text = playerData["realname"] || '';
            this.phoneInputText.text = playerData["mobile"] || '';
        }

        public initData() {
            this.playerProxy = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
        }

        public bindTouchEvent() {
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBtnTouchEnded,this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.closeBtnTouchEnded,this);
        }

        private closeBtnTouchEnded() {
            this.hide(function() {
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_REGISTER);
            });
        }
        
        
        public enterBtnTouchEnded() {
            var name: string = this.nameInputText.text;
            var phone: string = this.phoneInputText.text;
            //            var address: string = this.addressInputText.text;
            if(!name || !phone) {
                var tipsMediator: any = AppFacade.getInstance().retrieveMediator(Mediator.TIPS_MEDIATOR);
                tipsMediator.addTips('信息填写不完整');
            } else {
                //                //发包获取东西去
                var self = this;
                var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                var infoData = {
                    realname: name.trim(),
                    mobile: phone.trim()
                }
                playerProxy.updatePlayerMessage(infoData,function() {
                    self.hide(function() {
                        AppFacade.getInstance().sendNotification(Notifier.CLOSE_REGISTER);
                        AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
                    });
                })
            }
        }
    }
}
