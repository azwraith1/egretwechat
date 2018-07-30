/**
 *
 * @author 
 *
 */
module game {
    export class WidgetScreenAni extends egret.Sprite {
        public mcDataFactory: egret.MovieClipDataFactory;
        public moveClip: egret.MovieClip;
        public constructor() {
            super();
            this.init();
        }

        private init() {
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

        }
    }
}
