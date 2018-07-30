/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UITips = (function (_super) {
        __extends(UITips, _super);
        function UITips(tipContent) {
            _super.call(this);
            this.time = 1000;
            this.tipsText = tipContent;
        }
        var d = __define,c=UITips,p=c.prototype;
        p.init = function () {
            this.renderUIFile();
        };
        p.renderUIFile = function () {
            this.skinName = new TipsSkin();
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.tipsContent.text = this.tipsText;
            setTimeout(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_TIPS);
            }, this.time);
        };
        return UITips;
    }(game.UIBaseLayer));
    game.UITips = UITips;
    egret.registerClass(UITips,'game.UITips');
})(game || (game = {}));
