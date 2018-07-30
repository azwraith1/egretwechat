/**
 * 音频代理模块
 * @author
 */
var game;
(function (game) {
    var AudioProxy = (function (_super) {
        __extends(AudioProxy, _super);
        function AudioProxy() {
            _super.call(this, AudioProxy.NAME);
        }
        var d = __define,c=AudioProxy,p=c.prototype;
        p.init = function () {
            var number = egret.localStorage.getItem('xsyx.sound');
            this.isOpen = number && number === '0' ? false : true;
            console.log("this.isOpen:" + this.isOpen);
        };
        p.closeBgMusic = function () {
            if (!this.isOpen) {
                return;
            }
            if (this.channel) {
                this.channel.stop();
                this.backgroundSound = null;
            }
        };
        p.setVolice = function (vol) {
            if (this.moveChannel) {
                this.moveChannel.volume = vol;
            }
        };
        p.startBgMusic = function () {
            if (!this.isOpen) {
                return;
            }
            if (!this.backgroundSound) {
                this.backgroundSound = RES.getRes("background_mp3");
                if (this.channel) {
                    this.channel.stop();
                    this.channel = null;
                }
                this.channel = this.backgroundSound.play(0, -1);
            }
        };
        p.openSound = function (isOpen) {
            this.isOpen = isOpen;
            egret.localStorage.setItem('xsyx.sound', isOpen ? '1' : '0');
            if (isOpen) {
                if (this.channel) {
                    return;
                }
                else {
                    this.backgroundSound = RES.getRes("background_mp3");
                    this.channel = this.backgroundSound.play(0, -1);
                }
            }
            else {
                if (this.channel) {
                    this.channel.stop();
                }
                this.channel = null;
            }
        };
        /**
         * 播放音效
         * resourceName： 文件名称
         */
        p.playSound = function (resourceName) {
            if (this.isOpen) {
                var sound = RES.getRes(resourceName);
                sound.play(0, 1);
            }
        };
        /**
         * 播放音效
         * resourceName： 文件名称
         */
        p.playSoundCount = function (resourceName, count, voilce) {
            if (voilce === void 0) { voilce = 1; }
            if (this.isOpen) {
                var sound = RES.getRes(resourceName);
                //                this.moveChannel = sound.play(0, 0);
                this.moveChannel = sound.play(0, count);
                this.moveChannel.volume = voilce;
            }
        };
        AudioProxy.NAME = Proxy.AUDIO_PROXY;
        return AudioProxy;
    }(puremvc.Proxy));
    game.AudioProxy = AudioProxy;
    egret.registerClass(AudioProxy,'game.AudioProxy',["puremvc.IProxy","puremvc.INotifier"]);
})(game || (game = {}));
