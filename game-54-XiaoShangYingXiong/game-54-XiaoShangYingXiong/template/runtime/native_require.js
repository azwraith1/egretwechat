
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/puremvc/puremvc.js",
	"libs/modules/underscore/underscore.js",
	"libs/modules/weixinapi/weixinapi.js",
	"bin-debug/AppFacade.js",
	"bin-debug/egret/AssetAdapter.js",
	"bin-debug/egret/LoadingUI.js",
	"bin-debug/egret/ThemeAdapter.js",
	"bin-debug/game/app/AppContainer.js",
	"bin-debug/game/command/ControllerPrepCommand.js",
	"bin-debug/game/command/ModelPrepCommand.js",
	"bin-debug/game/command/StartUpCommand.js",
	"bin-debug/game/command/ViewPrepCommand.js",
	"bin-debug/game/constant/Command.js",
	"bin-debug/game/constant/Constant.js",
	"bin-debug/game/constant/Mediator.js",
	"bin-debug/game/constant/Notifier.js",
	"bin-debug/game/constant/Proxy.js",
	"bin-debug/game/model/AudioProxy.js",
	"bin-debug/game/model/NetProxy.js",
	"bin-debug/game/model/PlayerProxy.js",
	"bin-debug/game/model/WeixinProxy.js",
	"bin-debug/game/utils/HashMap.js",
	"bin-debug/game/utils/UIUtils.js",
	"bin-debug/game/utils/Utils.js",
	"bin-debug/game/view/component/UIBaseLayer.js",
	"bin-debug/game/view/component/UIDescLayer.js",
	"bin-debug/game/view/component/UIFriendHelpLayer.js",
	"bin-debug/game/view/component/UIGameLayer.js",
	"bin-debug/game/view/component/UIGameOverLayer.js",
	"bin-debug/game/view/component/UIHelpSuccessLayer.js",
	"bin-debug/game/view/component/UIMainLayer.js",
	"bin-debug/game/view/component/UIMainLoadingLayer.js",
	"bin-debug/game/view/component/UIPlayerInfoLayer.js",
	"bin-debug/game/view/component/UIRankLayer.js",
	"bin-debug/game/view/component/UIRewardLayer.js",
	"bin-debug/game/view/component/UIShareLayer.js",
	"bin-debug/game/view/mediator/ApplicationMediator.js",
	"bin-debug/game/view/mediator/FriendHelpMediator.js",
	"bin-debug/game/view/mediator/FriendHelpSuccessMediator.js",
	"bin-debug/game/view/mediator/GameDescMediator.js",
	"bin-debug/game/view/mediator/GameMediator.js",
	"bin-debug/game/view/mediator/GameOverMediator.js",
	"bin-debug/game/view/mediator/LoginMediator.js",
	"bin-debug/game/view/mediator/MainSceneMediator.js",
	"bin-debug/game/view/mediator/PlayerInfoMediator.js",
	"bin-debug/game/view/mediator/RankMediator.js",
	"bin-debug/game/view/mediator/RewardGiftMediator.js",
	"bin-debug/game/view/mediator/ShareMediator.js",
	"bin-debug/game/view/mediator/TipsMediator.js",
	"bin-debug/game/view/UITips.js",
	"bin-debug/game/view/widget/HeroWidget.js",
	"bin-debug/game/view/widget/WidgetRankItem.js",
	"bin-debug/game/view/widget/WidgetScreenAni.js",
	"bin-debug/game/view/widget/WidgetStage.js",
	"bin-debug/game/view/widget/WidgetStick.js",
	"bin-debug/Main.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1024,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:20,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};