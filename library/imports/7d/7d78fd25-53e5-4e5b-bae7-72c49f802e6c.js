"use strict";
cc._RF.push(module, '7d78f0lU+VOW7rncsSfgC5s', 'WinDialog');
// Game/Scripts/ui/WinDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var Platform_1 = require("../../../framework/Platform");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var Consts_1 = require("../hex-lines-game/Consts");
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WinDialog = /** @class */ (function (_super) {
    __extends(WinDialog, _super);
    function WinDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ps = null;
        _this.levelLabel = null;
        _this.stepLabel = null;
        _this.timeLabel = null;
        _this.percentLabel = null;
        _this.diamondLabel = null;
        _this.diamondNode = null;
        return _this;
    }
    WinDialog.prototype.onLoad = function () { };
    WinDialog.prototype.start = function () { };
    WinDialog.prototype.onShown = function () {
        this.ps.resetSystem();
        Platform_1.default.showSmallRank();
        // this.levelLabel.string = cc.js.formatStr("- 第 %s 关 - " , UserInfo.currentLevel)
        if (LanguageManager_1.default.instance.region == "zh-CN") {
            this.levelLabel.string = cc.js.formatStr("- 第 %s 关 -", Info_1.UserInfo.currentLevel);
        }
        else {
            var text = LanguageManager_1.default.instance.getText("level");
            this.levelLabel.string = "- " + text + " " + Info_1.UserInfo.currentLevel + " -";
        }
        this.stepLabel.string = Info_1.UserInfo.stepUsed.toString();
        this.timeLabel.string = Info_1.UserInfo.timePassed.toString() + "s";
        var p = g.decreaseFomula(0.99, 0.3, Info_1.UserInfo.timePassed + Info_1.UserInfo.stepUsed, Info_1.UserInfo.currentLevel + 50);
        this.percentLabel.string = (p * 100).toFixed(0) + "%";
        this.diamondNode.active = false;
        if (Info_1.UserInfo.level == Info_1.UserInfo.currentLevel) {
            var lv_1 = Info_1.UserInfo.level;
            var choise_1 = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
            if (choise_1 > 0 && Math.random() > 0.5 && lv_1 >= 3) {
                this.scheduleOnce(function (_) {
                    ViewManager_1.default.instance.show("Game/LevelupDialog", lv_1, p);
                }, 1);
                this.diamondNode.active = false;
            }
            else {
                this.diamondNode.active = true;
                p = Math.min(p, 1);
                var diamond = Math.floor(Math.max(30 * p, 10));
                this.diamondLabel.string = diamond.toString();
                Info_1.UserInfo.addDiamond(diamond);
            }
            Info_1.UserInfo.level = lv_1 + 1;
            Platform_1.default.uploadScore(Info_1.UserInfo.level);
            Info_1.UserInfo.save();
        }
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.HB);
        if (choise == 1) {
            if (Info_1.UserInfo.level >= 3) {
                if (!Info_1.UserInfo.isUnlock(Consts_1.default.FreeSkinId)) {
                    ViewManager_1.default.instance.show("Game/HbDialog");
                }
            }
        }
    };
    WinDialog.prototype.click_rank = function () {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
    };
    WinDialog.prototype.click_shop = function () {
        ViewManager_1.default.instance.show("Game/ShopDialog");
    };
    WinDialog.prototype.click_next = function () {
        Info_1.UserInfo.currentLevel = Info_1.UserInfo.currentLevel + 1;
        cc.director.loadScene("Game");
    };
    WinDialog.prototype.click_home = function () {
        cc.director.loadScene("Main");
    };
    WinDialog.prototype.click_share = function () {
        Platform_1.default.share();
    };
    __decorate([
        property(cc.ParticleSystem)
    ], WinDialog.prototype, "ps", void 0);
    __decorate([
        property(cc.Label)
    ], WinDialog.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Label)
    ], WinDialog.prototype, "stepLabel", void 0);
    __decorate([
        property(cc.Label)
    ], WinDialog.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], WinDialog.prototype, "percentLabel", void 0);
    __decorate([
        property(cc.Label)
    ], WinDialog.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Node)
    ], WinDialog.prototype, "diamondNode", void 0);
    WinDialog = __decorate([
        ccclass
    ], WinDialog);
    return WinDialog;
}(cc.Component));
exports.default = WinDialog;

cc._RF.pop();