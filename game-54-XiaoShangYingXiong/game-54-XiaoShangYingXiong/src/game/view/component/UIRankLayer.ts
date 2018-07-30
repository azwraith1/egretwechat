/**
 *
 * @author 
 *
 */
module game {
    export class UIRankLayer extends UIBaseLayer {
        public constructor() {
            super();
            this.skinName = new RankListSkin();
        }
        private mainGroup: eui.Group;
        private dateGroup: eui.Group;
        private mrBtn: eui.ToggleButton;
        private zpmBtn: eui.ToggleButton;
        private zhuliBtn: eui.ToggleButton;
        private scroller: eui.Scroller;
        private listView: eui.List;
        private enterBtn: eui.Button;
        private myDateItem: WidgetRankItem;
        
        private listData: any;
        //总排名相关
        private zhuliGroup: eui.Group;
        
        public init(listData: any) {
            this.listData = listData;
            var self = this;
        
            setTimeout(function(){
                self.mrBtnTouchEnded();
            }, 200);
//          
        }

        protected createChildren() {
            super.createChildren();
            this.bindTouchEvent();
            this.myDateItem.setSelf();
            this.scroller.scrollPolicyH = 'off';
            this.listView.dataProvider = null;
            this.listView.itemRenderer = WidgetRankItem;
        }
        
        private updateView(list: Array<any>) {
            this.listView.dataProvider = new eui.ArrayCollection(list);
            
//            var data = {
//                rank: 1,
//                name: 123,xia
//                score: 3 * 1,
//                zhuli: 10 + 1
//            };
//            this.myDateItem.updateShow(data);
        }

        private bindTouchEvent() {
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.enterBtnTouchEnd, this);
            this.mrBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mrBtnTouchEnded, this)
            this.zpmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zphBtnTouchEnded, this)
            this.zhuliBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zhuliBtnTouchEnded, this)
        }
        private enterBtnTouchEnd() {
            this.hide(function() {
                AppFacade.getInstance().sendNotification(Notifier.CLOSE_RANK);
            });
        }

        private zphBtnTouchEnded(){
            this.mrBtn.selected = false;
            this.zpmBtn.selected = true;
            this.zhuliBtn.selected = false;
            this.dateGroup.visible = true;
            this.zhuliGroup.visible = false;
            this.updateView(this.listData.all);
            this.myDateItem.visible = true;
            this.myDateItem.changeMyItem(this.listData.myall);
        }
        
        private zhuliBtnTouchEnded(){
            this.mrBtn.selected = false;
            this.zpmBtn.selected = false;
            this.zhuliBtn.selected = true;
            this.dateGroup.visible = false;
            this.zhuliGroup.visible = true;
            this.updateView(this.listData.help);
            this.myDateItem.visible = false;
            this.myDateItem.changeMyItem(this.listData.myrank);
        }
        
        private mrBtnTouchEnded() {
            this.mrBtn.selected = true;
            this.zpmBtn.selected = false;
            this.zhuliBtn.selected = false;
            this.dateGroup.visible = true;
            this.zhuliGroup.visible = false;
            this.myDateItem.visible = true;
            this.updateView(this.listData.day);
            this.myDateItem.changeMyItem(this.listData.myday);
        }
    }
}
