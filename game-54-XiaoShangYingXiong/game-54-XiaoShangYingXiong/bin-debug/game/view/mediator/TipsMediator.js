/**
 * 弹出提示框- 带消失
 * @author
 */
var game;
(function (game) {
    var TipsMediator = (function (_super) {
        __extends(TipsMediator, _super);
        function TipsMediator() {
            _super.call(this, TipsMediator.NAME);
            this.tipsInterval = null; //定时器
            this.tipsWaiting = null; //等待列表是个数组
            this.runningTips = null; //正在提示的框
        }
        var d = __define,c=TipsMediator,p=c.prototype;
        p.init = function () {
            this.viewComponent = new game.UITips(this.runningTips);
            this.viewComponent.init();
        };
        p.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.startInterVal();
            this.tipsWaiting = [];
        };
        p.listNotificationInterests = function () {
            return [
                Notifier.SHOW_TIPS,
                Notifier.CLOSE_TIPS
            ];
        };
        p.handleNotification = function (notification) {
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
        };
        p.startInterVal = function () {
            var self = this;
            this.tipsInterval = setInterval(function () {
                self.checkHasTips();
            }, 100);
        };
        p.addTips = function (content) {
            this.sendNotification(Notifier.SHOW_TIPS, { tips: content });
        };
        p.checkHasTips = function () {
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
        };
        TipsMediator.NAME = Mediator.TIPS_MEDIATOR;
        return TipsMediator;
    }(puremvc.Mediator));
    game.TipsMediator = TipsMediator;
    egret.registerClass(TipsMediator,'game.TipsMediator',["puremvc.IMediator","puremvc.INotifier"]);
})(game || (game = {}));
