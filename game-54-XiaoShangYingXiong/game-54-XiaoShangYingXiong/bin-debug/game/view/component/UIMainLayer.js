/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIMainLayer = (function (_super) {
        __extends(UIMainLayer, _super);
        function UIMainLayer() {
            _super.call(this);
            this.needStartAni = false;
            this.skinName = new MainSceneSkin();
        }
        var d = __define,c=UIMainLayer,p=c.prototype;
        p.init = function () {
            //             this.playTitleGroupAni();
            this.playStartBtnAni();
        };
        p.playStartBtnAni = function () {
            egret.Tween.get(this.startBtn, { loop: true })
                .to({
                alpha: 0.1
            }, 1000)
                .to({
                alpha: 1
            }, 1000);
        };
        p.playTitleGroupAni = function () {
            var titleGroupY = this.titleGroup.y;
            egret.Tween.get(this.titleGroup, { loop: true })
                .to({
                y: titleGroupY - 30
            }, 3000)
                .to({
                y: titleGroupY
            }, 2000);
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var audioProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
            this.musicBtn.selected = !audioProxy.isOpen;
            audioProxy.openSound(audioProxy.isOpen);
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicBtnTouchEnded, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouchEnded, this);
            this.descBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.descBtnTouchEnded, this);
            this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankBtnTouchEnded, this);
        };
        p.startBtnTouchEnded = function () {
            egret.Tween.get(this.startBtn).to({
                rotation: 360 * 5
            }, 800).call(function () {
                //if(new Date() >= new Date("2016-5-21")) {
                //    alert("活动已经结束");
                //    return;
                //}
                game.AppFacade.getInstance().sendNotification(Notifier.OPEN_DESC_SCENE, { inGame: false });
                //                AppFacade.getInstance().sendNotification(Notifier.CLOSE_MAIN);
                //                AppFacade.getInstance().sendNotification(Notifier.PLAY_GAME);      
            });
            //            
        };
        p.descBtnTouchEnded = function () {
            game.AppFacade.getInstance().sendNotification(Notifier.SHOW_GIFT);
            //            AppFacade.getInstance().sendNotification(Notifier.OPEN_DESC_SCENE);        
        };
        p.rankBtnTouchEnded = function () {
            game.AppFacade.getInstance().sendNotification(Notifier.OPEN_RANK);
        };
        p.musicBtnTouchEnded = function () {
            var audioProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
            audioProxy.openSound(!this.musicBtn.selected);
        };
        return UIMainLayer;
    }(game.UIBaseLayer));
    game.UIMainLayer = UIMainLayer;
    egret.registerClass(UIMainLayer,'game.UIMainLayer');
})(game || (game = {}));
