/**
 * 主入口，开启主程序
 * @author
 *
 */
var game;
(function (game) {
    var AppFacade = (function (_super) {
        __extends(AppFacade, _super);
        function AppFacade() {
            _super.call(this);
        }
        var d = __define,c=AppFacade,p=c.prototype;
        AppFacade.getInstance = function () {
            if (this.instance == null)
                this.instance = new AppFacade();
            return (this.instance);
        };
        p.initializeController = function () {
            _super.prototype.initializeController.call(this);
            this.registerCommand(Command.START_UP, game.StartUpCommand);
        };
        /**
         * 抛出start_up命令
         * @param	rootView
         */
        p.startUp = function (rootView) {
            this.sendNotification(Command.START_UP, rootView);
            this.removeCommand(Command.START_UP); //开始应用程序
        };
        return AppFacade;
    }(puremvc.Facade));
    game.AppFacade = AppFacade;
    egret.registerClass(AppFacade,'game.AppFacade',["puremvc.IFacade","puremvc.INotifier"]);
})(game || (game = {}));
