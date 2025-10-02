"use strict";
cc._RF.push(module, '979d2m9WlRN0519FkcUBa5E', 'Main');
// Game/Scripts/Main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager_1 = require("../../framework/plugin_boosts/ui/ViewManager");
var Info_1 = require("./Info");
var Platform_1 = require("../../framework/Platform");
var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
var Res_1 = require("./hex-lines-game/Res");
var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
var LanguageManager_1 = require("../../framework/plugin_boosts/ui/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.drawRedPoint = null;
        _this.skinRedPoint = null;
        return _this;
        // update (dt) {}
    }
    Main_1 = Main;
    Main.prototype.onLoad = function () {
        Main_1.instance = this;
        Platform_1.default.login();
        Info_1.UserInfo.init();
        Device_1.default.playMusic(Res_1.R.audio_bgm);
    };
    Main.prototype.refreshRedpoints = function () {
        if (g.isNextDay(Info_1.UserInfo.freedrawTime)) {
            this.drawRedPoint.active = true;
        }
        else {
            this.drawRedPoint.active = false;
        }
        this.skinRedPoint.active = Info_1.UserInfo.diamond >= 500 && !Info_1.UserInfo.isAllUnlocked();
    };
    Main.prototype.start = function () {
        if (g.isNextDay(Info_1.UserInfo.dailyGetTime)) {
            ViewManager_1.default.instance.show("Game/DailyDialog");
        }
        this.refreshRedpoints();
        if (g.isNextDay(Info_1.UserInfo.luckyVideoWatchTime)) {
            Info_1.UserInfo.luckyVideoWatchTime = new Date().getTime();
            Info_1.UserInfo.luckyVideoWatchCount = 0;
        }
        Platform_1.default.showBannerAd();
    };
    Main.prototype.click_play = function () {
        ViewManager_1.default.instance.show("Game/LevelDialog");
    };
    Main.prototype.toggle_sfx = function (t) {
        Device_1.default.setSoundsEnable(!t.isChecked);
    };
    Main.prototype.click_skin = function () {
        ViewManager_1.default.instance.show("Game/ShopDialog");
    };
    Main.prototype.click_rank = function () {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
    };
    Main.prototype.click_lang = function () {
        ViewManager_1.default.instance.show("Game/LanguageDialog");
    };
    Main.prototype.onShare = function () {
    };
    Main.prototype.click_share = function () {
        Platform_1.default.share(this.onShare);
    };
    Main.prototype.click_luck = function () {
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    Main.prototype.click_more = function () {
        // Toast.make("敬请期待")
        ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("more"));
    };
    var Main_1;
    Main.instance = null;
    __decorate([
        property(cc.Node)
    ], Main.prototype, "drawRedPoint", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "skinRedPoint", void 0);
    Main = Main_1 = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

cc._RF.pop();