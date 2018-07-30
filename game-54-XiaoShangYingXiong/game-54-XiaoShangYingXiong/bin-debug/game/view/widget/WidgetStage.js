/**
 * 桥梁
 * @author
 */
var game;
(function (game) {
    var WidgetStage = (function (_super) {
        __extends(WidgetStage, _super);
        function WidgetStage() {
            _super.call(this);
            this.skinName = new WidgetStageSkin();
        }
        var d = __define,c=WidgetStage,p=c.prototype;
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.randomWidth();
        };
        p.randomWidth = function () {
            var number = _.random(60, 99);
            this.stageImage.scaleX = parseFloat((number / 100).toFixed(2));
        };
        p.fadeFgImage = function (count) {
            egret.Tween.get(this.fgImage).to({
                alpha: count
            }, 2000);
        };
        return WidgetStage;
    }(eui.Panel));
    game.WidgetStage = WidgetStage;
    egret.registerClass(WidgetStage,'game.WidgetStage');
})(game || (game = {}));
