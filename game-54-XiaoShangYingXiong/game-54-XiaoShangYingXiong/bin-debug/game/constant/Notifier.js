/**
 * 通知常量
 * Created by LMC on 2016/3/8 0008.
 */
var Notifier = (function () {
    function Notifier() {
    }
    var d = __define,c=Notifier,p=c.prototype;
    Notifier.START_GAME = 'START_GAME_NOTIFIER';
    Notifier.SHOW_VIEW = 'SHOW_VIEW';
    Notifier.POP_VIEW = 'POP_VIEW';
    Notifier.PUSH_VIEW = 'PUSH_VIEW';
    Notifier.PRELOAD_OVER = 'PRELOAD_OVER';
    Notifier.PLAY_GAME = 'PLAY_GAME';
    Notifier.CLOSE_GAME = 'CLOSE_GAME';
    Notifier.CLOSE_MAIN = 'CLOSE_MAIN';
    Notifier.OPEN_DESC_SCENE = 'OPEN_DESC_SCENE'; //开启说明界面
    Notifier.CLOSE_DESC = 'CLOSE_DESC';
    Notifier.GAME_OVER = 'GAME_OVER'; //游戏结束
    Notifier.SHOW_GIFT = 'SHOW_GIFT'; //打开奖励
    Notifier.CLOSE_GIFT = 'CLOSE_GIFT'; //打开奖励
    Notifier.SHOW_TIPS = 'SHOW_TIPS';
    Notifier.CLOSE_TIPS = 'CLOSE_TIPS';
    Notifier.NO_COUNT = 'NO_COUNT'; //没有次数弹出
    Notifier.CLOSE_SHARE = 'CLOSE_SHARE'; //关闭分享界面
    Notifier.OPEN_SHARE = 'OPEN_SHARE'; //开启分享界面
    Notifier.OPEN_REGISTER = 'OPEN_REGISTER'; //中奖信息填写
    Notifier.CLOSE_REGISTER = 'CLOSE_REGISTER'; //中奖信息填写CLOSE_REGISTER
    Notifier.SHARE_TOQQ = 'SHARE_TOQQ';
    Notifier.OPEN_RANK = 'OPEN_RANK';
    Notifier.CLOSE_RANK = 'CLOSE_RANK';
    Notifier.OPEN_FRIENDHELP = 'OPEN_FRIENDHELP';
    Notifier.CLOSE_FRIENDHELP = 'CLOSE_FRIENDHELP';
    Notifier.OPEN_FRIENDHELP_SUCCESS = 'OPEN_FRIENDHELP_SUCCESS';
    Notifier.CLOSE_HELP_SUCCESS = 'CLOSE_HELP_SUCCESS';
    return Notifier;
}());
egret.registerClass(Notifier,'Notifier');
