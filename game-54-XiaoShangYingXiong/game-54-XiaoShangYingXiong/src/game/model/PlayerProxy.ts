/**
 * 玩家数据代理
 * @author 
 */
module game {
    export class PlayerProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = Proxy.PLAYER_PROXY;
        public constructor() {
            super(PlayerProxy.NAME);
        }
        /**
         * 游戏id
        * @type {string}
        */
        public gameId: string = "";
        /**
         * 用户id
         * @type {string}
         */
        public openId: string = "";

        /**
         * 是否已经显示了帮助界面
         * @type {boolean}
         */
        public isShowHelpPanel: boolean = false;

        /**
         * helid
         * @type {string}
         */
        public hid: string = "";

        /**
         * 用户名称
         * @type {string}
         */
        public name: string = "";

        /**
         * 用户名称
         * @type {string}
         */
        public hname: string = "";
        /**
         * 真实姓名
         */
        public realName: string = "";

        /**
        * 昵称
         */         public nickName: string = "";


        public mobile: string = '';

        public avator: string = '';


        public rank: number = 0;
        /**
         * 助力分数
         */
        public assNum: number = 0;

        /**
        * 分数
        * @type {number}
        */
        public totalScore: number = 0;

        public playerData: any;

        public helpData: any;

        private init() {
            var self = this;
            this.getPlayerData();
            if(!Constant.DEBUG_MODAL) {
                var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
                var url = Constant.SERVER_PATH + 'get_userinfo';
                netProxy.sendRequest(url,{ openid: this.openId },function(data) {
                    self.playerData = data;
                });
            }

        }

        public updatePlayerData(callFunc: Function) {
            if(Constant.DEBUG_MODAL){
                return;
            }
            var self = this;
            var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var url = Constant.SERVER_PATH + 'get_userinfo';
            netProxy.sendRequest(url,{ openid: this.openId },function(data) {
                self.playerData = data;
                if(callFunc) {
                    callFunc();
                }
            });
        }

        private getPlayerData() {
            this.gameId = Utils.getURLQueryString('gameid');
            this.openId = Utils.getURLQueryString('openid');
            this.hname = Utils.getURLQueryString('hname');
            this.hid = Utils.getURLQueryString('hid');
            if(this.openId === null) {
                //                window.location.href = 'http://www.huhugame.com/index.php?m=api&c=huhugame&a=index';                   
            }

        }

        private clearHelp(callFunc: Function) {
            this.hid = '';
            this.hname = '';
            if(callFunc) {
                callFunc()
            }
        }

        public updatePlayerMessage(playerInfoData: any,callFunc: Function) {
            if(Constant.DEBUG_MODAL) {
                return;
            }
            playerInfoData.openid = this.openId;
            var netProxy: any = AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var url = Constant.SERVER_PATH + 'update_user';
            var self = this;
            netProxy.sendRequest(url,playerInfoData,function(data) {
                if(data.status === 1) {
                    self.playerData.mobile = playerInfoData.mobile;
                    self.playerData.realname = playerInfoData.realname;
                }
                if(callFunc) {
                    callFunc();
                }
                alert(data.msg);
            });
        }

        private isHelp() {
            if(this.hid) {
                return true;
            }
            return false;
        }

    }
}
