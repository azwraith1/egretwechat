module game { 
    export class Constant {
        public static WINSIZE_WIDTH: number = 640;
        public static WINSIZE_HEIGHT: number = 1024;
        public static PASS_LEVEL: number = 8;
        
        public static GAME_NAME: string = '眼神不好,坚持不了3步哦';
        
        public static SERVER_PATH: string = "http://www.huhugame.com/index.php?id=100004&m=api&c=huhugame&a="
        
        public static DEBUG_MODAL: boolean = true;
        /**
         * 微信调试模式
         */ 
        public static WEIXIN_DEBUG: boolean = false;
        /**
         * 关注链接
         * @type {string}
         */
        public static CARE_URL: string = "http://mp.weixin.qq.com/s?__biz=MzIzMzEzNTY5MA==&mid=504974636&idx=1&sn=95e01113efed89ab29d93566d55a8d85&scene=1&srcid=0416DNjhHqtgJLQCtvmKm9ck#wechat_redirect";
    }
}


