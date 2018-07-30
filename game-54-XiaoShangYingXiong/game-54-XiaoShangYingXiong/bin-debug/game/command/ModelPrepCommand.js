var game;
(function (game) {
    var ModelPrepCommand = (function (_super) {
        __extends(ModelPrepCommand, _super);
        function ModelPrepCommand() {
            _super.call(this);
        }
        var d = __define,c=ModelPrepCommand,p=c.prototype;
        p.execute = function (notification) {
        };
        return ModelPrepCommand;
    }(puremvc.SimpleCommand));
    game.ModelPrepCommand = ModelPrepCommand;
    egret.registerClass(ModelPrepCommand,'game.ModelPrepCommand',["puremvc.ICommand","puremvc.INotifier"]);
})(game || (game = {}));
