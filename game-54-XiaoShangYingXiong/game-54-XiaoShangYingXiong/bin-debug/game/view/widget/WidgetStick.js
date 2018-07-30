/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var WidgetStick = (function (_super) {
        __extends(WidgetStick, _super);
        function WidgetStick() {
            _super.call(this);
            this.speed = 0;
            this.init();
        }
        var d = __define,c=WidgetStick,p=c.prototype;
        p.init = function () {
            this.stageH = egret.MainContext.instance.stage.stageHeight;
            this.stageW = egret.MainContext.instance.stage.stageWidth;
            this.growRate = 0.05;
            var stickSprite = new egret.Bitmap();
            stickSprite.texture = RES.getRes("stick_png");
            this.addChild(stickSprite);
            this.stickSprite = stickSprite;
            //            this.stickSprite.width = 10;
            this.anchorOffsetX = stickSprite.width;
            this.anchorOffsetY = stickSprite.height;
            this.scaleY = 0;
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
            this.timer = timer;
        };
        //  朝上变长
        p.growHeight = function () {
            // 如果长度超过屏幕高的一半，则不再变长
            if (this.scaleY >= 2) {
                return;
            }
            this.speed += this.growRate;
            this.scaleY += 0.02 * this.speed;
        };
        p.addSpeed = function () {
            if (this.growRate >= 0.2) {
                return;
            }
            this.growRate += 0.005;
        };
        return WidgetStick;
    }(egret.Sprite));
    game.WidgetStick = WidgetStick;
    egret.registerClass(WidgetStick,'game.WidgetStick');
})(game || (game = {}));
