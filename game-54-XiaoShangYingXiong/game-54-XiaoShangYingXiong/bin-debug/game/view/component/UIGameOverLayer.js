/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIGameOverLayer = (function (_super) {
        __extends(UIGameOverLayer, _super);
        function UIGameOverLayer() {
            _super.call(this);
            this.skinName = new GameOverSceneSkin();
        }
        var d = __define,c=UIGameOverLayer,p=c.prototype;
        p.init = function (score, rank) {
            if (!rank) {
                rank = 0;
            }
            this.scoreLabel.text = score.toString();
            this.scoreLabel.x -= score.toString().length * 8;
            this.rankLabel.text = rank.toString();
            this.rankLabel.x -= rank.toString().length * 6;
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bindTouchEvent();
        };
        p.bindTouchEvent = function () {
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.restartBtnTouchEnded, this);
            this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.friendBtnTouchEnded, this);
            this.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.guanzhuBtnTouchEnded, this);
            this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.homeBtnTouchEnded, this);
        };
        p.restartBtnTouchEnded = function () {
            this.restartBtn.touchEnabled = false;
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_DESC);
                game.AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);
            });
        };
        p.friendBtnTouchEnded = function () {
            game.AppFacade.getInstance().sendNotification(Notifier.OPEN_SHARE);
        };
        p.guanzhuBtnTouchEnded = function () {
            window.open(game.Constant.CARE_URL);
        };
        p.homeBtnTouchEnded = function () {
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.POP_VIEW, { popAll: false });
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_GAME);
                game.AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
            });
        };
        return UIGameOverLayer;
    }(game.UIBaseLayer));
    game.UIGameOverLayer = UIGameOverLayer;
    egret.registerClass(UIGameOverLayer,'game.UIGameOverLayer');
})(game || (game = {}));
