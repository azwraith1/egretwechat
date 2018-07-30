/**
 *
 * @author 
 *
 */
module game {
    export class UIGameLayer extends UIBaseLayer {
        private weixinProxy: any;

        private stageW: number = 0;
        private stageH: number = 0;
        private stageOriginX: number = 0;

        private hero: HeroWidget;

        private stage1: WidgetStage;
        private stage2: WidgetStage;
        private curStage: number = 1; // 当前所在台子
        private needFalldown: boolean = false;

        private touchBeganed: boolean = false;
        //棍子
        private stick1: WidgetStick;
        private stick2: WidgetStick;
        private canTouch: boolean = true;;
        private score: number = 0;
        private isRunning: boolean = false;
        private giftImg: eui.Image;
        private tipsImage: eui.Image;
        //吃道具的
        private checkBoundsTimer: egret.Timer;
        private screenAni: WidgetScreenAni;
        private tipsTween: egret.Tween;
        public constructor() {
            super();
            this.needStartAni = false;
            this.weixinProxy = AppFacade.getInstance().retrieveProxy(Proxy.WEIXIN_PROXY);
        }

        private scoreLabel: eui.BitmapLabel;
        private background: eui.Image;
        private mainGroup: eui.Group;
        private playCount: number = 0;
        private init() {
            this.renderUIFile();
            AppFacade.getInstance().sendNotification(Notifier.OPEN_DESC_SCENE, {
                inGame: true
            });
            var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
            audioProxy.closeBgMusic();
        }

        private renderUIFile() {
            this.skinName = new GameSceneSkin();
        }

        protected createChildren() {
            super.createChildren();
            this.initUI();
            this.playTipsAni();
            this.startCheckTimer()
        }

        public playTipsAni() {
            this.tipsImage.alpha = 0;
            this.tipsTween = egret.Tween.get(this.tipsImage, {loop: true})
            .to({
                alpha: 1
            }, 1000)
            UIUtils.removeSelf(this.tipsImage);
            this.addChildAt(this.tipsImage, 3001);
            this.screenAni = new WidgetScreenAni();
            this.screenAni.x = this.tipsImage.localToGlobal().x + this.tipsImage.width * 0.5
            this.screenAni.y = this.tipsImage.localToGlobal().y - this.screenAni.height + this.tipsImage.height * 0.5
            this.addChildAt(this.screenAni, 3000);
        }

        public startCheckTimer() {
            //            this.checkBoundsTimer = new egret.Timer(300);
            //            this.checkBoundsTimer.addEventListener(egret.TimerEvent.TIMER, this.pointContainsGift, this);
            //            this.checkBoundsTimer.start();
        }

        public initUI() {
            this.stageW = egret.MainContext.instance.stage.stageWidth;
            this.stageH = egret.MainContext.instance.stage.stageHeight;
            this.stageOriginX = this.stageW / 6;

            this.scoreLabel.text = 'x' + this.score.toString();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
            //  添加台阶
            this.addStage();
            this.createHero();
            this.initStick();
        }
        
        public onTouchMove(){
        
        
        }

        private initStick() {
            this.stick1 = new WidgetStick();
            this.stick1.y = this.hero.y;
            this.stick2 = new WidgetStick();
            this.stick2.y = this.hero.y;
            this.addChild(this.stick2);
            this.addChild(this.stick1);
        }

        private createHero() {
            this.hero = new HeroWidget();
            this.hero.y = this.stage1.y;
            this.addChild(this.hero);
            this.hero.x = this.stage1.stageImage.width * this.stage1.scaleX * 0.6;
            var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
//            audioProxy.playSoundCount('move_mp3', 1, 0);
//            audioProxy.playSoundCount('over_mp3', 1, 0);
        }
        /**
         * 开始触摸
         */
        public onTouchBegan(event: egret.TouchEvent) {
            if (!this.canTouch || this.isRunning) {
                return;
            }
            if (this.screenAni){
                UIUtils.removeSelf(this.screenAni);
                this.screenAni = null;
            }
            if (this.tipsTween){
                egret.Tween.removeTweens(this.tipsImage);
                this.tipsImage.visible = false;
                this.tipsTween = null;
            }
            
            this.touchBeganed = true;
            this.isRunning = false;
            this.canTouch = false;
            if (this.curStage == 1) {
                if (this.stick1.visible == false) {
                    this.stick1.visible = true;
                }
                this.stick1.scaleY = 0;
                this.stick1.rotation = 0;

                this.stick1.x = this.stage1.x + this.stage1.stageImage.width * 0.5
                    + this.stage1.stageImage.width * this.stage1.stageImage.scaleX * 0.5;

                this.stick1.y = this.hero.y;
                this.stick1.timer.start();
            } else if (this.curStage == 2) {
                if (this.stick2.visible == false) {
                    this.stick2.visible = true;
                }
                this.stick2.scaleY = 0;
                this.stick2.rotation = 0;
                this.stick2.x = this.stage2.x + this.stage2.stageImage.width * 0.5
                    + this.stage2.stageImage.width * this.stage2.stageImage.scaleX * 0.5;
                this.stick2.timer.start();
            }
        }

        public onTouchEnded() {
            if (this.isRunning || !this.touchBeganed) {
                return;
            }
            this.isRunning = true;
            this.touchBeganed = false;
            if (this.stick1.timer.running) {
                this.stick1.timer.stop();
                this.stick1.speed = 1;
            }
            if (this.stick2.timer.running) {
                this.stick2.timer.stop();
                this.stick2.speed = 1;
            }
            this.heroKickDone();
        }

        public heroKickDone() {
            this.hero.heroMC.removeEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
            //  播放踢棍子声音
            //RES.getRes("kick_ogg").play();
            var tw = egret.Tween.get(this['stick' + this.curStage]);
            tw.to({ rotation: 90 }, 300);
            tw.call(this.heroMove, this);
        }

        private heroMove() {
            this.hero.y -= 14;
            var posX: number = 0;//  英雄移动终点X坐标
            var posY: number = 0;//  英雄移动终点Y坐标
            var moveLength;
            if (this.curStage == 1) {
                var stickLength = this.stick1.x + this.stick1.stickSprite.height * this.stick1.scaleY;
                moveLength = stickLength;
                //台阶左边的点
                //                this.stick1.localToGlobal().x                
                // 到达第二个台阶的左边
                var distance1 = this.stage2.stageImage.localToGlobal().x;
                //                var distance1 = this.stage2.x - this.stage1.x - this.stage1.stageImage.width * this.stage1.scaleX / 2 - this.stage2.stageImage.width * this.stage2.scaleX / 2;
                // 到达第二个台阶的右边
                var distance2 = distance1 + this.stage2.stageImage.width * this.stage2.stageImage.scaleX;
                //                var distance2 = distance1 + this.stage2.stageImage.width * this.stage2.scaleX;
                // 到达台阶
                if (stickLength >= distance1 && stickLength <= distance2) {
                    posX = this.stage2.x + this.stage2.stageImage.width * 0.5
                        + this.stage2.stageImage.width * this.stage2.stageImage.scaleX * 0.5 - this.hero.width;
                    posY = this.stage2.y;
                }
                // 不在台阶上
                else {
                    posX = this.stick1.x + this.stick1.stickSprite.height * this.stick1.scaleY;
                    posY = this.stick1.y;
                    this.needFalldown = true;
                }
            } else {
                //走第二根
                stickLength = this.stick2.x + this.stick2.stickSprite.height * this.stick2.scaleY;
                distance1 = this.stage1.stageImage.localToGlobal().x;
                moveLength = stickLength;
                //                distance1 = this.stage1.x - this.stage2.x - this.stage2.stageImage.width 
                //                    * this.stage2.scaleX / 2 - this.stage1.stageImage.width * this.stage1.scaleX/2;
                distance2 = distance1 + this.stage1.stageImage.width * this.stage1.stageImage.scaleX;

                if (stickLength >= distance1 && stickLength <= distance2) {
                    posX = this.stage1.x + this.stage1.stageImage.width * 0.5
                        + this.stage1.stageImage.width * this.stage1.stageImage.scaleX * 0.5 - this.hero.width;
                    console.log(posX);
                    posY = this.stage1.y;
                }
                // 不在台阶上
                else {
                    posX = this.stick2.x + this.stick2.stickSprite.height * this.stick2.scaleY;
                    posY = this.stick2.y;
                    this.needFalldown = true;
                }
            }
            
            // 棍子长度
            // 英雄和背景同时移动
            // 播放英雄行走动画
            this.hero.heroMC.movieClipData = this.hero.mcDataFactory.generateMovieClipData("walk");
            this.hero.heroMC.play(-1);
            var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
            //            audioProxy.setVolice(1);
            audioProxy.playSoundCount('move_mp3', Math.floor(moveLength / 100));
            var tw = egret.Tween.get(this.hero);
            tw.to({ x: posX }, Math.floor(moveLength / 100) * 600);
            if (this.curStage == 1) {
                this.stage1.fadeFgImage(0);
                this.stage2.fadeFgImage(1);
            } else {
                this.stage1.fadeFgImage(1);
                this.stage2.fadeFgImage(0);
            }
            tw.call(this.heroMoveDone, this);
        }


        private heroMoveDone(): void {
            if (this.giftImg.visible) {
                this.giftImg.visible = false;
                this.score++;
                this.scoreLabel.text = "x" + this.score;
                var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
                //                audioProxy.playSound('sound1_mp3');
            }

            var hero = this.hero;
            this.hero.y = this.stage1.y;
            // 播放英雄站立动画
            hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("stay");
            hero.heroMC.play(-1);
            // 判断英雄是否掉落
            if (this.needFalldown) {
                if (this.curStage == 1) {
                    var tw = egret.Tween.get(this.stick1);
                    tw.to({ rotation: 180 }, 300);
                }
                else if (this.curStage == 2) {
                    var tw = egret.Tween.get(this.stick2);
                    tw.to({ rotation: 180 }, 300);
                }
                var audioProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.AUDIO_PROXY);
                audioProxy.playSoundCount('over_mp3', 1);
                //  播放掉落声音
                //RES.getRes("fall_ogg").play();
                var tw = egret.Tween.get(hero);
                this.needFalldown = false;
                tw.to({ y: this.stageH + hero.heroSprite.height }, 300);
                tw.call(this.heroFalldown, this);
                return;
            }
            this.score++;
            this.scoreLabel.text = 'x' + this.score;
            //RES.getRes("score_ogg").play();
            //  移动台阶
            this.moveStage();
        }
        
        //  英雄掉落回调
        private heroFalldown(): void {
            //  隐藏英雄
            this.hero.visible = false;
            //  不再需要掉落
            this.needFalldown = false;
            //  播放死亡声音
            //RES.getRes("death_ogg").play();
            //  屏幕震动
            
            var tw = egret.Tween.get(this);
            tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
            tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
            tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
            tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
            tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
            tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
            var self = this;
            tw.call(function() {
                self.x = 0;
                self.y = 0;
                self.showContinueTip();
            });
        }
        
        // 显示继续提示
        private showContinueTip(): void {
            this.canTouch = false;
            this.isRunning = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this)
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this)
            var playerProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.PLAYER_PROXY);
            if (playerProxy.isHelp()) {
                AppFacade.getInstance().sendNotification(Notifier.OPEN_FRIENDHELP_SUCCESS, { score: this.score });
                return;
            }
            AppFacade.getInstance().sendNotification(Notifier.GAME_OVER, { score: this.score });
        }
        
        //  移动台阶
        private moveStage() {

            var stage1 = this.stage1;
            var stage2 = this.stage2;
            var stick1 = this.stick1;
            var stick2 = this.stick2;
            var hero = this.hero;
            //  先将两个台阶同时移动
            var moveDis: number = 0;
            if (this.curStage == 1) {
                moveDis = stage2.x + stage2.stageImage.width * stage2.scaleX / 2 - this.stageOriginX;
            }
            else if (this.curStage == 2) {
                moveDis = stage1.x + stage1.stageImage.width * stage1.scaleX / 2 - this.stageOriginX;

            }
            var tw1 = egret.Tween.get(stick1);
            tw1.to({ x: stick1.x - moveDis }, 300);

            var tw2 = egret.Tween.get(stick2);
            tw2.to({ x: stick2.x - moveDis }, 300);

            var tw3 = egret.Tween.get(stage1);
            tw3.to({ x: stage1.x - moveDis }, 300);

            var tw4 = egret.Tween.get(stage2);
            tw4.to({ x: stage2.x - moveDis }, 300);

            var tw5 = egret.Tween.get(hero);
            tw5.to({ x: hero.x - moveDis }, 300);
            tw5.call(this.moveStageDone, this);
        }
            
        // 台阶移动结束
        private moveStageDone(): void {
            //            this.sco
            if (this.curStage == 1) {
                this.curStage = 2;
                this.randomSetStage(this.stage1);
            }
            else if (this.curStage == 2) {
                this.curStage = 1;
                this.randomSetStage(this.stage2);
            }
        }
        
        //  随机设置台阶
        private randomSetStage(mystage: WidgetStage): void {

            var stageW = this.stageW;
            var stageOriginX = this.stageOriginX;
            var hero = this.hero;
            // 台阶随机10-40倍宽
            var number = _.random(50, 99);
            var scaleX = parseFloat((number / 100).toFixed(2));
            mystage.stageImage.scaleX = scaleX;
            // 将台阶放在屏幕右外边
            mystage.x = stageW + mystage.stageImage.width;
            // 随机一个位置，在前一个台阶的右边，在屏幕之内
            
            //          
            var maxPos = stageW - mystage.width;
            var minPos = this['stage' + this.curStage].x + mystage.width
            var posx = Math.floor(_.random(minPos, maxPos));
            
            //            var posx = Math.floor(Math.random() * (
            //                stageW - mystage.width - stageOriginX - hero.heroSprite.width) +
            //                stageOriginX + mystage.width + hero.heroSprite.width
            //            );
            var tw1 = egret.Tween.get(mystage);
            tw1.to({ x: posx }, 300)
            tw1.call(this.stepOver, this);

        }


        private checkHasGift(stageIndex: number) {
            if (!stageIndex) {
                stageIndex = 1;
                if (this.curStage == 1) {
                    stageIndex = 2;
                } else if (this.curStage == 2) {
                    stageIndex = 1;
                }
            }
            var stageObj: WidgetStage = this['stage' + stageIndex];
            var ranDomNum = _.random(0, 100);
            if (ranDomNum < 20) {
                this.giftImg.visible = true;
                this.giftImg.x = stageObj.x;
                this.giftImg.y = stageObj.y - this.giftImg.height;
            }
        }

        private pointContainsGift() {
            if (!this.giftImg.visible || !this.isRunning) {
                return;
            }
            if (this.hero.getBounds().containsRect(this.giftImg.getBounds())) {
                this.giftImg.visible = false;
                this.score++;
                this.scoreLabel.text = this.score.toString();
            }
        }
        
        
        // 一个可得分的行走过程结束
        private stepOver(): void {
            //  清除所有缓动动画
            egret.Tween.removeAllTweens();
            var self = this;
            setTimeout(function() {
                self.canTouch = true;
                self.isRunning = false;
            }, 500)
            this.stick1.addSpeed();
            this.stick2.addSpeed();
            if (this.curStage == 1) {
                this.checkHasGift(2)
            } else {
                this.checkHasGift(1)
            }
        }
        
        /**
         * 创建桥梁
         */
        private addStage(): void {
            var stageH = this.stageH;
            var stageW = this.stageW;
            var stage1 = new WidgetStage();
            var stage2 = new WidgetStage();
            stage2.fgImage.alpha = 0;
            this.addChild(stage1);;
            this.addChild(stage2);
            stage1.x = 0;
            stage1.y = stageH - stage1.height;
            stage2.x = 300;
            stage2.y = stageH - stage1.height;
            this.stage1 = stage1;
            this.stage2 = stage2;
            this.checkHasGift(2);
        }

    }
}
