/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var WidgetScreenAni = (function (_super) {
        __extends(WidgetScreenAni, _super);
        function WidgetScreenAni() {
            _super.call(this);
            this.init();
        }
        var d = __define,c=WidgetScreenAni,p=c.prototype;
        p.init = function () {
            var data = RES.getRes("screenani_json");
            var texture = RES.getRes("screenani_png");
            var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
            var moveClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("rote"));
            this.addChild(moveClip);
            moveClip.play(-1);
            this.anchorOffsetX = moveClip.width / 2;
            this.anchorOffsetY = moveClip.height / 2;
            this.mcDataFactory = mcDataFactory;
            this.moveClip = moveClip;
        };
        return WidgetScreenAni;
    }(egret.Sprite));
    game.WidgetScreenAni = WidgetScreenAni;
    egret.registerClass(WidgetScreenAni,'game.WidgetScreenAni');
})(game || (game = {}));
