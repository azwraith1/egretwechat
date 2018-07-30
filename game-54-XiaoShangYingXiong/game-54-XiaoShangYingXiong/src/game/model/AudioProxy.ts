/**
 * 音频代理模块
 * @author 
 */
module game {
    export class AudioProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = Proxy.AUDIO_PROXY;
        public isOpen: boolean;
        public channel: egret.SoundChannel;
        public backgroundSound: egret.Sound;
        public moveChannel: egret.SoundChannel;
        public constructor() {
            super(AudioProxy.NAME);
        }

        public init() {
            var number: string = egret.localStorage.getItem('xsyx.sound');
            this.isOpen = number && number === '0' ? false : true;
            console.log("this.isOpen:" + this.isOpen);
        }


        public closeBgMusic() {
            if(!this.isOpen){
                return;
            }
            if(this.channel){
                this.channel.stop();
                this.backgroundSound = null;
//                this.channel = null;
            }
        }
        
        public setVolice(vol: number){
            if (this.moveChannel){
                this.moveChannel.volume = vol;
            }
        }
        
        public startBgMusic(){
            if (!this.isOpen) {
                return;
            }
            if(!this.backgroundSound){
                this.backgroundSound = RES.getRes("background_mp3");
                if (this.channel){
                    this.channel.stop();
                    this.channel = null;
                }
                this.channel = this.backgroundSound.play(0, -1);
            }
        }
        

        public openSound(isOpen: boolean): void {
            this.isOpen = isOpen;
            egret.localStorage.setItem('xsyx.sound', isOpen ? '1' : '0');
            if (isOpen) {
                if (this.channel) {
                    return;
                } else {
                    this.backgroundSound = RES.getRes("background_mp3");
                    this.channel = this.backgroundSound.play(0, -1);

                }
            } else {
                if (this.channel) {
                    this.channel.stop();
                }
                this.channel = null;
            }
        }
        /**
         * 播放音效
         * resourceName： 文件名称
         */
        public playSound(resourceName) {
            if (this.isOpen) {
                var sound: egret.Sound = RES.getRes(resourceName);
                sound.play(0, 1);
            }
        }
        
        /**
         * 播放音效
         * resourceName： 文件名称
         */
        public playSoundCount(resourceName, count, voilce:number = 1) {
            if (this.isOpen) {
                var sound: egret.Sound = RES.getRes(resourceName);
//                this.moveChannel = sound.play(0, 0);
                this.moveChannel = sound.play(0, count);
                this.moveChannel.volume = voilce;
            }
        }
    }
}
