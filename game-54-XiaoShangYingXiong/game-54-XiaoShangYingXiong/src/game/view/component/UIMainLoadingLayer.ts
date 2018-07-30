module game{
    export class UIMainLoadingLayer extends eui.Panel{
        private resGroup: string;
        public constructor() {
            super();
            this.skinName = new MainLoadingSkin();
        }
        
        private enterSceneCls: any;
        
        public init() { 
            this.resGroup = 'main';
        }
        
        private background: eui.Image;
        private sCir1: eui.Group;
        private sCir2: eui.Group;
        private pBg: eui.Rect;
        private pFront: eui.Rect;
        private pTF: eui.Label;
        private gameNameLabel: eui.Label;
        private logo: eui.Group;
        
        protected createChildren() {
            super.createChildren();
            this.sCir2.visible = this.pBg.visible = this.pFront.visible = this.logo.visible = false;
            this.pTF.text = "";
            this.gameNameLabel.text = '';
            this.start();
        }
        
        private start() {
            this.ballDown();
        }
        
        /**
        * 小球下落
        */
        private ballDown() {
            egret.Tween.get(this.sCir1)
                .to({ y: this.sCir2.y + 26 }, 250)
                .to({ y: this.sCir2.y }, 50)
                .call(this.ballExchange, this);
        }
        
        /**
           * 2个白球相互摩擦
        */
        private ballExchange() {
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
        }

        /**
         * logo生长环节
         */
        private logoGrow() {
            this.logo.visible = true;
            this.logo.scaleX = this.logo.scaleY = 0;
            this.logo.skewX = 90;
            egret.Tween.get(this.logo)
                .to({ scaleX: 1, skewX: 0 }, 200, egret.Ease.backOut);
            egret.Tween.get(this.logo)
                .to({ scaleY: 1 }, 200)
        }
        
        /**
        * 开始加载资源
        */
        private beganLoadResGroup() {
            this.pFront.visible = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.resGroup);
        }

        private onResourceLoadComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.onResourceLoadOver();
            }
        }
        
        
        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        private onResourceProgress(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                var p = e.itemsLoaded / e.itemsTotal;
                var w = p * 400;
                this.gameNameLabel.text = Constant.GAME_NAME;
                this.pTF.text = "开启中..." + Math.floor(p * 100) + "%";
                egret.Tween.removeTweens(this.pFront);
                egret.Tween.get(this.pFront)
                    .to({ width: w }, 250, egret.Ease.sineOut);
            }
        }
        
        private onResourceLoadOver() {
            egret.Tween.removeTweens(this.pFront);
            egret.Tween.get(this.pFront)
                .to({ width: 400 }, 250, egret.Ease.sineOut)
                .call(() => {
                    UIUtils.removeSelf(this.pBg);
                    this.pLabelMoveRight();
                    this.lineMoveRight();
                    this.logoJump();
                }, this);
        }
        
        private lineMoveRight() {
            this.pFront.horizontalCenter = NaN;
            egret.Tween.get(this.pFront)
                .to({ x: 1200 }, 50);
        }

        private pLabelMoveRight() {
            this.pTF.horizontalCenter = NaN;
            egret.Tween.get(this.pTF)
                .to({ x: 700, alpha: 0 }, 50);
            egret.Tween.get(this.gameNameLabel)
                .to({ x: 700, alpha: 0 }, 50);
        }

        private logoJump() {
            egret.Tween.get(this.logo)
                .wait(100)
                .to({ y: this.logo.y - 25 }, 100, egret.Ease.sineOut)
                .to({ y: this.logo.y + 25 }, 50, egret.Ease.sineIn)
                .to({ y: this.logo.y - 25 }, 100, egret.Ease.sineOut)
                .to({ y: this.logo.y + 25 }, 50, egret.Ease.sineIn)
                .call(this.removeAllElements, this);
        }

        private removeAllElements() {
            egret.Tween.get(this.logo)
                .to({ scaleX: 0, scaleY: 0 }, 350)
                .call(UIUtils.removeSelf, this, [this.logo])
                .call(() => {
                    UIUtils.removeSelf(this);
                    RES.destroyRes("preload");
                    AppFacade.getInstance().sendNotification(Notifier.PRELOAD_OVER);
                });                    
                
        }
    }
}
