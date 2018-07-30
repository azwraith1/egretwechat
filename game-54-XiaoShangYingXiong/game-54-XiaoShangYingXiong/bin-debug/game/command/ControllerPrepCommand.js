/**
 * 简单命令
 * SimpleCommand
 */
var game;
(function (game) {
    var ControllerPrepCommand = (function (_super) {
        __extends(ControllerPrepCommand, _super);
        function ControllerPrepCommand() {
            _super.call(this);
        }
        var d = __define,c=ControllerPrepCommand,p=c.prototype;
        p.execute = function (notification) {
        };
        return ControllerPrepCommand;
    }(puremvc.SimpleCommand));
    game.ControllerPrepCommand = ControllerPrepCommand;
    egret.registerClass(ControllerPrepCommand,'game.ControllerPrepCommand',["puremvc.ICommand","puremvc.INotifier"]);
})(game || (game = {}));
