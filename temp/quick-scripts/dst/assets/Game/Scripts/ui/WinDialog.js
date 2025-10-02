
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/WinDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFdpbkRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0NBQStDO0FBQy9DLHdEQUFtRDtBQUNuRCwrRUFBMEU7QUFDMUUsbURBQThDO0FBQzlDLHVGQUFrRjtBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTJHQztRQXZHRyxRQUFFLEdBQXFCLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBVyxJQUFJLENBQUM7O0lBcUYvQixDQUFDO0lBbEZHLDBCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1oseUJBQUssR0FBTCxjQUFVLENBQUM7SUFFWCwyQkFBTyxHQUFQO1FBRUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QixrQkFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXpCLGtGQUFrRjtRQUNsRixJQUFJLHlCQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLGVBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqRjthQUNJO1lBQ0QsSUFBTSxJQUFJLEdBQUcseUJBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQUss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QUFDO0lBQ2pELENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBRUksZUFBUSxDQUFDLFlBQVksR0FBRyxlQUFRLENBQUMsWUFBWSxHQUFFLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUVJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBRUksa0JBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBdEdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUM7eUNBQ0E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1M7SUF0QlYsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTJHN0I7SUFBRCxnQkFBQztDQTNHRCxBQTJHQyxDQTNHc0MsRUFBRSxDQUFDLFNBQVMsR0EyR2xEO2tCQTNHb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgQ29uc3RzIGZyb20gXCIuLi9oZXgtbGluZXMtZ2FtZS9Db25zdHNcIjtcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0xhbmd1YWdlTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbkRpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5QYXJ0aWNsZVN5c3RlbSlcbiAgICBwczpjYy5QYXJ0aWNsZVN5c3RlbSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RlcExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aW1lTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBlcmNlbnRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZGlhbW9uZExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRpYW1vbmROb2RlOmNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBvbkxvYWQgKCkge31cbiAgICBzdGFydCAoKSB7fVxuXG4gICAgb25TaG93bigpXG4gICAge1xuICAgICAgICB0aGlzLnBzLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgIFBsYXRmb3JtLnNob3dTbWFsbFJhbmsoKTtcblxuICAgICAgICAvLyB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiLSDnrKwgJXMg5YWzIC0gXCIgLCBVc2VySW5mby5jdXJyZW50TGV2ZWwpXG4gICAgICAgIGlmIChMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UucmVnaW9uID09IFwiemgtQ05cIikge1xuICAgICAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIi0g56ysICVzIOWFsyAtXCIsIFVzZXJJbmZvLmN1cnJlbnRMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQoXCJsZXZlbFwiKTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBgLSAke3RleHR9ICR7VXNlckluZm8uY3VycmVudExldmVsfSAtYDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0ZXBMYWJlbC5zdHJpbmcgPSBVc2VySW5mby5zdGVwVXNlZC50b1N0cmluZygpXG4gICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IFVzZXJJbmZvLnRpbWVQYXNzZWQudG9TdHJpbmcoKSArXCJzXCI7XG4gICAgICAgIGxldCBwID0gZy5kZWNyZWFzZUZvbXVsYSgwLjk5LDAuMyxVc2VySW5mby50aW1lUGFzc2VkICsgVXNlckluZm8uc3RlcFVzZWQsVXNlckluZm8uY3VycmVudExldmVsICsgNTAgKVxuICAgICAgICB0aGlzLnBlcmNlbnRMYWJlbC5zdHJpbmcgPSAocCogMTAwICkudG9GaXhlZCgwKSArXCIlXCJcblxuICAgICAgICB0aGlzLmRpYW1vbmROb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIFxuICAgICAgICBpZihVc2VySW5mby5sZXZlbCA9PSBVc2VySW5mby5jdXJyZW50TGV2ZWwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBsdiA9IFVzZXJJbmZvLmxldmVsXG4gICAgICAgICAgICBsZXQgY2hvaXNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuTGV2ZWx1cCk7XG4gICAgICAgICAgICBpZihjaG9pc2UgPiAwICYmIE1hdGgucmFuZG9tKCkgPiAwLjUgJiYgbHYgPj0gMylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShfPT57XG4gICAgICAgICAgICAgICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0xldmVsdXBEaWFsb2dcIixsdixwKVxuICAgICAgICAgICAgICAgIH0sMSlcbiAgICAgICAgICAgICAgICB0aGlzLmRpYW1vbmROb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYW1vbmROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcCA9IE1hdGgubWluKHAsMSk7XG4gICAgICAgICAgICAgICAgbGV0IGRpYW1vbmQgPSBNYXRoLmZsb29yKE1hdGgubWF4KDMwICogcCwxMCkpXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFtb25kTGFiZWwuc3RyaW5nID0gZGlhbW9uZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQoZGlhbW9uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBVc2VySW5mby5sZXZlbCA9IGx2ICsgMVxuICAgICAgICAgICAgUGxhdGZvcm0udXBsb2FkU2NvcmUoVXNlckluZm8ubGV2ZWwpO1xuICAgICAgICAgICAgVXNlckluZm8uc2F2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaG9pc2UgPSBVc2VySW5mby5nZXRDaG9pY2UoQ2hvaWNlVHlwZS5IQik7XG4gICAgICAgIGlmKGNob2lzZSA9PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihVc2VySW5mby5sZXZlbCA+PSAzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKCFVc2VySW5mby5pc1VubG9jayhDb25zdHMuRnJlZVNraW5JZCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9IYkRpYWxvZ1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrX3JhbmsoKVxuICAgIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIndlY2hhdC9XeFJhbmtEaWFsb2dcIilcbiAgICB9XG5cbiAgICBjbGlja19zaG9wKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIik7XG4gICAgfVxuXG4gICAgY2xpY2tfbmV4dCgpXG4gICAge1xuICAgICAgICBVc2VySW5mby5jdXJyZW50TGV2ZWwgPSBVc2VySW5mby5jdXJyZW50TGV2ZWwgKzE7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVcIilcbiAgICB9XG5cbiAgICBjbGlja19ob21lKClcbiAgICB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5cIilcbiAgICB9XG5cbiAgICBjbGlja19zaGFyZSgpXG4gICAge1xuICAgICAgICBQbGF0Zm9ybS5zaGFyZSgpO1xuICAgIH1cbn0iXX0=