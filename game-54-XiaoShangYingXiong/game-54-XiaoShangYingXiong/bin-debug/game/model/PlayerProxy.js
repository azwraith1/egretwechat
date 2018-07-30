/**
 * 玩家数据代理
 * @author
 */
var game;
(function (game) {
    var PlayerProxy = (function (_super) {
        __extends(PlayerProxy, _super);
        function PlayerProxy() {
            _super.call(this, PlayerProxy.NAME);
            /**
             * 游戏id
            * @type {string}
            */
            this.gameId = "";
            /**
             * 用户id
             * @type {string}
             */
            this.openId = "";
            /**
             * 是否已经显示了帮助界面
             * @type {boolean}
             */
            this.isShowHelpPanel = false;
            /**
             * helid
             * @type {string}
             */
            this.hid = "";
            /**
             * 用户名称
             * @type {string}
             */
            this.name = "";
            /**
             * 用户名称
             * @type {string}
             */
            this.hname = "";
            /**
             * 真实姓名
             */
            this.realName = "";
            /**
            * 昵称
             */ this.nickName = "";
            this.mobile = '';
            this.avator = '';
            this.rank = 0;
            /**
             * 助力分数
             */
            this.assNum = 0;
            /**
            * 分数
            * @type {number}
            */
            this.totalScore = 0;
        }
        var d = __define,c=PlayerProxy,p=c.prototype;
        p.init = function () {
            var self = this;
            this.getPlayerData();
            if (!game.Constant.DEBUG_MODAL) {
                var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
                var url = game.Constant.SERVER_PATH + 'get_userinfo';
                netProxy.sendRequest(url, { openid: this.openId }, function (data) {
                    self.playerData = data;
                });
            }
        };
        p.updatePlayerData = function (callFunc) {
            if (game.Constant.DEBUG_MODAL) {
                return;
            }
            var self = this;
            var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var url = game.Constant.SERVER_PATH + 'get_userinfo';
            netProxy.sendRequest(url, { openid: this.openId }, function (data) {
                self.playerData = data;
                if (callFunc) {
                    callFunc();
                }
            });
        };
        p.getPlayerData = function () {
            this.gameId = game.Utils.getURLQueryString('gameid');
            this.openId = game.Utils.getURLQueryString('openid');
            this.hname = game.Utils.getURLQueryString('hname');
            this.hid = game.Utils.getURLQueryString('hid');
            if (this.openId === null) {
            }
        };
        p.clearHelp = function (callFunc) {
            this.hid = '';
            this.hname = '';
            if (callFunc) {
                callFunc();
            }
        };
        p.updatePlayerMessage = function (playerInfoData, callFunc) {
            if (game.Constant.DEBUG_MODAL) {
                return;
            }
            playerInfoData.openid = this.openId;
            var netProxy = game.AppFacade.getInstance().retrieveProxy(Proxy.NET_PROXY);
            var url = game.Constant.SERVER_PATH + 'update_user';
            var self = this;
            netProxy.sendRequest(url, playerInfoData, function (data) {
                if (data.status === 1) {
                    self.playerData.mobile = playerInfoData.mobile;
                    self.playerData.realname = playerInfoData.realname;
                }
                if (callFunc) {
                    callFunc();
                }
                alert(data.msg);
            });
        };
        p.isHelp = function () {
            if (this.hid) {
                return true;
            }
            return false;
        };
        PlayerProxy.NAME = Proxy.PLAYER_PROXY;
        return PlayerProxy;
    }(puremvc.Proxy));
    game.PlayerProxy = PlayerProxy;
    egret.registerClass(PlayerProxy,'game.PlayerProxy',["puremvc.IProxy","puremvc.INotifier"]);
})(game || (game = {}));
