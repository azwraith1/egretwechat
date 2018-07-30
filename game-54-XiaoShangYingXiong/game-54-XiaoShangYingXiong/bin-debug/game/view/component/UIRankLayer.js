/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIRankLayer = (function (_super) {
        __extends(UIRankLayer, _super);
        function UIRankLayer() {
            _super.call(this);
            this.skinName = new RankListSkin();
        }
        var d = __define,c=UIRankLayer,p=c.prototype;
        p.init = function (listData) {
            this.listData = listData;
            var self = this;
            setTimeout(function () {
                self.mrBtnTouchEnded();
            }, 200);
            //          
        };
        p.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bindTouchEvent();
            this.myDateItem.setSelf();
            this.scroller.scrollPolicyH = 'off';
            this.listView.dataProvider = null;
            this.listView.itemRenderer = game.WidgetRankItem;
        };
        p.updateView = function (list) {
            this.listView.dataProvider = new eui.ArrayCollection(list);
            //            var data = {
            //                rank: 1,
            //                name: 123,xia
            //                score: 3 * 1,
            //                zhuli: 10 + 1
            //            };
            //            this.myDateItem.updateShow(data);
        };
        p.bindTouchEvent = function () {
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.enterBtnTouchEnd, this);
            this.mrBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mrBtnTouchEnded, this);
            this.zpmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zphBtnTouchEnded, this);
            this.zhuliBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zhuliBtnTouchEnded, this);
        };
        p.enterBtnTouchEnd = function () {
            this.hide(function () {
                game.AppFacade.getInstance().sendNotification(Notifier.CLOSE_RANK);
            });
        };
        p.zphBtnTouchEnded = function () {
            this.mrBtn.selected = false;
            this.zpmBtn.selected = true;
            this.zhuliBtn.selected = false;
            this.dateGroup.visible = true;
            this.zhuliGroup.visible = false;
            this.updateView(this.listData.all);
            this.myDateItem.visible = true;
            this.myDateItem.changeMyItem(this.listData.myall);
        };
        p.zhuliBtnTouchEnded = function () {
            this.mrBtn.selected = false;
            this.zpmBtn.selected = false;
            this.zhuliBtn.selected = true;
            this.dateGroup.visible = false;
            this.zhuliGroup.visible = true;
            this.updateView(this.listData.help);
            this.myDateItem.visible = false;
            this.myDateItem.changeMyItem(this.listData.myrank);
        };
        p.mrBtnTouchEnded = function () {
            this.mrBtn.selected = true;
            this.zpmBtn.selected = false;
            this.zhuliBtn.selected = false;
            this.dateGroup.visible = true;
            this.zhuliGroup.visible = false;
            this.myDateItem.visible = true;
            this.updateView(this.listData.day);
            this.myDateItem.changeMyItem(this.listData.myday);
        };
        return UIRankLayer;
    }(game.UIBaseLayer));
    game.UIRankLayer = UIRankLayer;
    egret.registerClass(UIRankLayer,'game.UIRankLayer');
})(game || (game = {}));
