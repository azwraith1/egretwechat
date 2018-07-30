/**
 * 分享界面
 * @author
 */
var game;
(function (game) {
    var UIShareLayer = (function (_super) {
        __extends(UIShareLayer, _super);
        function UIShareLayer() {
            _super.call(this);
        }
        var d = __define,c=UIShareLayer,p=c.prototype;
        p.init = function () {
            this.renderUIFile();
        };
        p.renderUIFile = function () {
            this.skinName = new ShareSceneSkin();
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        p.onTouchTap = function () {
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_SHARE);
            });
        };
        return UIShareLayer;
    }(game.UIBaseLayer));
    game.UIShareLayer = UIShareLayer;
    egret.registerClass(UIShareLayer,'game.UIShareLayer');
})(game || (game = {}));
