var game;
(function (game) {
    var ViewPrepCommand = (function (_super) {
        __extends(ViewPrepCommand, _super);
        function ViewPrepCommand() {
            _super.call(this);
        }
        var d = __define,c=ViewPrepCommand,p=c.prototype;
        p.execute = function (notification) {
            var main = notification.getBody();
            this.facade.registerMediator(new game.ApplicationMediator(main));
        };
        return ViewPrepCommand;
    }(puremvc.SimpleCommand));
    game.ViewPrepCommand = ViewPrepCommand;
    egret.registerClass(ViewPrepCommand,'game.ViewPrepCommand',["puremvc.ICommand","puremvc.INotifier"]);
})(game || (game = {}));
