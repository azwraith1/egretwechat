var game;
(function (game) {
    var UIBaseLayer = (function (_super) {
        __extends(UIBaseLayer, _super);
        function UIBaseLayer() {
            _super.call(this);
            this.needStartAni = true;
            this.width = game.Constant.WINSIZE_WIDTH;
            this.width = game.Constant.WINSIZE_HEIGHT;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }
        var d = __define,c=UIBaseLayer,p=c.prototype;
        p.onAdded = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        };
        p.onRemoved = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.destroy();
        };
        p.onShow = function () {
            var child = this['mainGroup'];
            if (child) {
                child.y += game.Constant.WINSIZE_HEIGHT;
                egret.Tween.get(child).to({
                    y: 0
                }, 200);
            }
            else {
                egret.Tween.get(this)
                    .to({
                    scaleX: 1,
                    scaleY: 1
                }, 100, egret.Ease.backOut)
                    .call(this.onShowAnimateOver, this);
            }
        };
        p.onHide = function (callFunc) {
            var _this = this;
            var child = this['mainGroup'];
            if (child) {
                egret.Tween.get(child).to({
                    y: game.Constant.WINSIZE_HEIGHT
                }, 200).call(callFunc);
            }
            else {
                egret.Tween.get(this)
                    .to({
                    scaleX: 0,
                    scaleY: 0
                }, 100, egret.Ease.backIn)
                    .call(function () {
                    _this.onHideAnimateOver();
                    if (callFunc) {
                        callFunc();
                    }
                }, this);
            }
        };
        p.hide = function (callFunc) {
            this.onHide(callFunc);
        };
        p.onHideAnimateOver = function () {
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            UIUtils.addButtonScaleEffects(this);
            if (this.needStartAni) {
                this.onShow();
            }
        };
        /**
        * 显示动画完成后
        */
        p.onShowAnimateOver = function () {
        };
        p.onTouchTap = function (e) {
        };
        /**
         * 销毁
         */
        p.destroy = function () {
            if (this.resGroup) {
                RES.destroyRes(this.resGroup);
            }
        };
        return UIBaseLayer;
    }(eui.Panel));
    game.UIBaseLayer = UIBaseLayer;
    egret.registerClass(UIBaseLayer,'game.UIBaseLayer');
})(game || (game = {}));
