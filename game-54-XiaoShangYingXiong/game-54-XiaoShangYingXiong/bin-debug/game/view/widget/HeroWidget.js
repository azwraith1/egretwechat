/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var HeroWidget = (function (_super) {
        __extends(HeroWidget, _super);
        function HeroWidget() {
            _super.call(this);
            this.init();
        }
        var d = __define,c=HeroWidget,p=c.prototype;
        p.init = function () {
            var heroType = 2;
            var heroSprite = new egret.Bitmap();
            heroSprite.texture = RES.getRes("hero0" + heroType + "_png");
            this.heroSprite = heroSprite;
            var data = RES.getRes("hero" + heroType + "_json");
            var texture = RES.getRes("hero" + heroType + "_png");
            var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
            var heroMC = new egret.MovieClip(mcDataFactory.generateMovieClipData("stay"));
            this.addChild(heroMC);
            heroMC.play(-1);
            this.anchorOffsetX = 0;
            this.anchorOffsetY = heroSprite.height / 2;
            this.mcDataFactory = mcDataFactory;
            this.heroMC = heroMC;
        };
        return HeroWidget;
    }(egret.Sprite));
    game.HeroWidget = HeroWidget;
    egret.registerClass(HeroWidget,'game.HeroWidget');
})(game || (game = {}));
