var game;
(function (game) {
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        function AppContainer() {
            _super.call(this);
        }
        var d = __define,c=AppContainer,p=c.prototype;
        p.addBackGround = function () {
        };
        return AppContainer;
    }(egret.Stage));
    game.AppContainer = AppContainer;
    egret.registerClass(AppContainer,'game.AppContainer');
})(game || (game = {}));
