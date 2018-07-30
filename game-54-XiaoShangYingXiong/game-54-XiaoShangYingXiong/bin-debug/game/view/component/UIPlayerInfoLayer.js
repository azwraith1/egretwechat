/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIPlayerInfoLayer = (function (_super) {
        __extends(UIPlayerInfoLayer, _super);
        function UIPlayerInfoLayer() {
            _super.call(this);
        }
        var d = __define,c=UIPlayerInfoLayer,p=c.prototype;
        p.init = function () {
            this.skinName = new PlayerInfoSceneSkin();
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bindTouchEvent();
            this.reloadInputText();
            this.phoneInputText.restrict = "0-9";
        };
        p.reloadInputText = function () {
            var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            var playerData = playerProxy.playerData || {};
            this.nameInputText.text = playerData["realname"] || '';
            this.phoneInputText.text = playerData["mobile"] || '';
        };
        p.initData = function () {
            this.playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
        };
        p.bindTouchEvent = function () {
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtnTouchEnded, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.closeBtnTouchEnded, this);
        };
        p.closeBtnTouchEnded = function () {
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_REGISTER);
            });
        };
        p.enterBtnTouchEnded = function () {
            var name = this.nameInputText.text;
            var phone = this.phoneInputText.text;
            //            var address: string = this.addressInputText.text;
            if (!name || !phone) {
                var tipsMediator = game.AppFacade.getInstance().retrieveMediator(Mediator.TIPS_MEDIATOR);
                tipsMediator.addTips('信息填写不完整');
            }
            else {
                //                //发包获取东西去
                var self = this;
                var playerProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
                var infoData = {
                    realname: name.trim(),
                    mobile: phone.trim()
                };
                playerProxy.updatePlayerMessage(infoData, function () {
                    self.hide(function () {
                        game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_REGISTER);
                        game.AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
                    });
                });
            }
        };
        return UIPlayerInfoLayer;
    }(game.UIBaseLayer));
    game.UIPlayerInfoLayer = UIPlayerInfoLayer;
    egret.registerClass(UIPlayerInfoLayer,'game.UIPlayerInfoLayer');
})(game || (game = {}));
