/**
 *
 * 开始命令:使用过后会自动注册
 * @author
 *
 */
var game;
(function (game) {
    var StartUpCommand = (function (_super) {
        __extends(StartUpCommand, _super);
        function StartUpCommand() {
            _super.call(this);
        }
        var d = __define,c=StartUpCommand,p=c.prototype;
        p.initializeMacroCommand = function () {
            this.addSubCommand(game.ControllerPrepCommand);
            this.addSubCommand(game.ModelPrepCommand);
            this.addSubCommand(game.ViewPrepCommand);
        };
        return StartUpCommand;
    }(puremvc.MacroCommand));
    game.StartUpCommand = StartUpCommand;
    egret.registerClass(StartUpCommand,'game.StartUpCommand');
})(game || (game = {}));
