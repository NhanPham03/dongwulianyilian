"use strict";
cc._RF.push(module, '667279sTgZC748xutONJ9Y5', 'TimeUpDialog');
// Game/Scripts/ui/TimeUpDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
var Info_1 = require("../Info");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TimeUpDialog = /** @class */ (function (_super) {
    __extends(TimeUpDialog, _super);
    function TimeUpDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.stepLabel = null;
        _this.timeLabel = null;
        return _this;
    }
    TimeUpDialog.prototype.onLoad = function () { };
    TimeUpDialog.prototype.start = function () { };
    TimeUpDialog.prototype.onShown = function () {
        if (LanguageManager_1.default.instance.region == "zh-CN") {
            this.levelLabel.string = cc.js.formatStr("- 第 %s 关 -", Info_1.UserInfo.currentLevel);
        }
        else {
            var text = LanguageManager_1.default.instance.getText("level");
            this.levelLabel.string = "- " + text + " " + Info_1.UserInfo.currentLevel + " -";
        }
        this.stepLabel.string = Info_1.UserInfo.stepUsed.toString();
        this.timeLabel.string = Info_1.UserInfo.timePassed.toString() + "s";
    };
    TimeUpDialog.prototype.click_home = function () {
        cc.director.loadScene("Main");
    };
    TimeUpDialog.prototype.click_restart = function () {
        cc.director.loadScene("Game");
    };
    __decorate([
        property(cc.Label)
    ], TimeUpDialog.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Label)
    ], TimeUpDialog.prototype, "stepLabel", void 0);
    __decorate([
        property(cc.Label)
    ], TimeUpDialog.prototype, "timeLabel", void 0);
    TimeUpDialog = __decorate([
        ccclass
    ], TimeUpDialog);
    return TimeUpDialog;
}(cc.Component));
exports.default = TimeUpDialog;

cc._RF.pop();