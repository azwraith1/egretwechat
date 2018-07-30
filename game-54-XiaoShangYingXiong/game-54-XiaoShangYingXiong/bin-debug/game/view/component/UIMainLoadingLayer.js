var game;
(function (game) {
    var UIMainLoadingLayer = (function (_super) {
        __extends(UIMainLoadingLayer, _super);
        function UIMainLoadingLayer() {
            _super.call(this);
            this.skinName = new MainLoadingSkin();
        }
        var d = __define,c=UIMainLoadingLayer,p=c.prototype;
        p.init = function () {
            this.resGroup = 'main';
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.sCir2.visible = this.pBg.visible = this.pFront.visible = this.logo.visible = false;
            this.pTF.text = "";
            this.gameNameLabel.text = '';
            this.start();
        };
        p.start = function () {
            this.ballDown();
        };
        /**
        * 小球下落
        */
        p.ballDown = function () {
            egret.Tween.get(this.sCir1)
                .to({ y: this.sCir2.y + 26 }, 250)
                .to({ y: this.sCir2.y }, 50)
                .call(this.ballExchange, this);
        };
        /**
           * 2个白球相互摩擦
        */
        p.ballExchange = function () {
            this.sCir2.visible = true;
            egret.Tween.get(this.sCir2)
                .to({ x: this.sCir2.x + 30, alpha: 0.5 }, 300)
                .to({ x: this.sCir2.x, alpha: 1 }, 300)
                .call(UIUtils.removeSelf, this, [this.sCir2]);
            egret.Tween.get(this.sCir1)
                .to({ x: this.sCir1.x - 30, alpha: 0.5 }, 300)
                .to({ x: this.sCir1.x, alpha: 1 }, 300)
                .call(this.logoGrow, this)
                .to({ scaleX: 0, scaleY: 0, alpha: 0 }, 200)
                .call(UIUtils.removeSelf, this, [this.sCir1]);
            //白线变成
            this.pBg.visible = true;
            this.pBg.width = 0;
            egret.Tween.get(this.pBg)
                .to({ width: 400 }, 800)
                .call(this.beganLoadResGroup, this);
        };
        /**
         * logo生长环节
         */
        p.logoGrow = function () {
            this.logo.visible = true;
            this.logo.scaleX = this.logo.scaleY = 0;
            this.logo.skewX = 90;
            egret.Tween.get(this.logo)
                .to({ scaleX: 1, skewX: 0 }, 200, egret.Ease.backOut);
            egret.Tween.get(this.logo)
                .to({ scaleY: 1 }, 200);
        };
        /**
        * 开始加载资源
        */
        p.beganLoadResGroup = function () {
            this.pFront.visible = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.resGroup);
        };
        p.onResourceLoadComplete = function (e) {
            if (e.groupName == this.resGroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.onResourceLoadOver();
            }
        };
        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        p.onResourceProgress = function (e) {
            if (e.groupName == this.resGroup) {
                var p = e.itemsLoaded / e.itemsTotal;
                var w = p * 400;
                this.gameNameLabel.text = game.Constant.GAME_NAME;
                this.pTF.text = "开启中..." + Math.floor(p * 100) + "%";
                egret.Tween.removeTweens(this.pFront);
                egret.Tween.get(this.pFront)
                    .to({ width: w }, 250, egret.Ease.sineOut);
            }
        };
        p.onResourceLoadOver = function () {
            var _this = this;
            egret.Tween.removeTweens(this.pFront);
            egret.Tween.get(this.pFront)
                .to({ width: 400 }, 250, egret.Ease.sineOut)
                .call(function () {
                UIUtils.removeSelf(_this.pBg);
                _this.pLabelMoveRight();
                _this.lineMoveRight();
                _this.logoJump();
            }, this);
        };
        p.lineMoveRight = function () {
            this.pFront.horizontalCenter = NaN;
            egret.Tween.get(this.pFront)
                .to({ x: 1200 }, 50);
        };
        p.pLabelMoveRight = function () {
            this.pTF.horizontalCenter = NaN;
            egret.Tween.get(this.pTF)
                .to({ x: 700, alpha: 0 }, 50);
            egret.Tween.get(this.gameNameLabel)
                .to({ x: 700, alpha: 0 }, 50);
        };
        p.logoJump = function () {
            egret.Tween.get(this.logo)
                .wait(100)
                .to({ y: this.logo.y - 25 }, 100, egret.Ease.sineOut)
                .to({ y: this.logo.y + 25 }, 50, egret.Ease.sineIn)
                .to({ y: this.logo.y - 25 }, 100, egret.Ease.sineOut)
                .to({ y: this.logo.y + 25 }, 50, egret.Ease.sineIn)
                .call(this.removeAllElements, this);
        };
        p.removeAllElements = function () {
            var _this = this;
            egret.Tween.get(this.logo)
                .to({ scaleX: 0, scaleY: 0 }, 350)
                .call(UIUtils.removeSelf, this, [this.logo])
                .call(function () {
                UIUtils.removeSelf(_this);
                RES.destroyRes("preload");
                game.AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
            });
        };
        return UIMainLoadingLayer;
    }(eui.Panel));
    game.UIMainLoadingLayer = UIMainLoadingLayer;
    egret.registerClass(UIMainLoadingLayer,'game.UIMainLoadingLayer');
})(game || (game = {}));
