/**
 * 弹出提示框- 带消失
 * @author 
 */
module game {
    export class TipsMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = Mediator.TIPS_MEDIATOR
        public constructor() {
            super(TipsMediator.NAME);
        }
        private tipsInterval: any = null; //定时器
        private tipsWaiting: any = null; //等待列表是个数组
        private runningTips: any = null; //正在提示的框
        public init() {
            this.viewComponent = new UITips(this.runningTips);
            this.viewComponent.init();
        }

        public onRegister() {
            super.onRegister();
            this.startInterVal();
            this.tipsWaiting = [];
        }
        
        public listNotificationInterests(): Array<any> {
            return [
                Notifier.SHOW_TIPS,
                Notifier.CLOSE_TIPS
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case Notifier.SHOW_TIPS:
                    var tips = notification.getBody().tips;
                    if (!this.tipsWaiting) {
                        this.tipsWaiting = [];
                    }
                    this.tipsWaiting.push(tips);
                    if (!this.tipsInterval) {
                        this.startInterVal();
                    }
                    break;
                case Notifier.CLOSE_TIPS:
                    this.runningTips = null;
                    if (this.viewComponent) {
                        UIUtils.removeFromParent(this.viewComponent);
                        this.viewComponent = null;
                    }
                    break;    
                    
            }
        }
        
        private startInterVal() {
            var self = this;
            this.tipsInterval = setInterval(function() {
                self.checkHasTips();
            }, 100);
        }
        
        public addTips(content) {
            this.sendNotification(Notifier.SHOW_TIPS, { tips: content });
        }
        
        private checkHasTips() { 
            if (this.runningTips) {
                return;
            }
            if (!this.tipsWaiting || this.tipsWaiting.length < 1) {
                clearInterval(this.tipsInterval);
                this.tipsInterval = null;
                return;
            }
            this.runningTips = this.tipsWaiting.shift();
            this.sendNotification(Notifier.SHOW_VIEW, {
                name: TipsMediator.NAME,
                zOrder: 10000
            });
        }
    }
}
