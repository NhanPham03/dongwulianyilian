
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
        this.levelLabel.string = cc.js.formatStr("- 第 %s 关 - ", Info_1.UserInfo.currentLevel);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFdpbkRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0NBQStDO0FBQy9DLHdEQUFtRDtBQUNuRCwrRUFBMEU7QUFDMUUsbURBQThDO0FBRXhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBb0dDO1FBaEdHLFFBQUUsR0FBcUIsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFXLElBQUksQ0FBQzs7SUE4RS9CLENBQUM7SUEzRUcsMEJBQU0sR0FBTixjQUFXLENBQUM7SUFDWix5QkFBSyxHQUFMLGNBQVUsQ0FBQztJQUVYLDJCQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLGtCQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFHLGVBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUMvRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxlQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGVBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUUsR0FBRyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFB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R0FBWDtRQUVJLGtCQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQS9GRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDO3lDQUNBO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNTO0lBdEJWLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FvRzdCO0lBQUQsZ0JBQUM7Q0FwR0QsQUFvR0MsQ0FwR3NDLEVBQUUsQ0FBQyxTQUFTLEdBb0dsRDtrQkFwR29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VySW5mbywgQ2hvaWNlVHlwZSB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9QbGF0Zm9ybVwiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IENvbnN0cyBmcm9tIFwiLi4vaGV4LWxpbmVzLWdhbWUvQ29uc3RzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luRGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgQHByb3BlcnR5KGNjLlBhcnRpY2xlU3lzdGVtKVxuICAgIHBzOmNjLlBhcnRpY2xlU3lzdGVtID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGVwTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpbWVMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGVyY2VudExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkaWFtb25kTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGlhbW9uZE5vZGU6Y2MuTm9kZSA9IG51bGw7XG5cblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG5cbiAgICBvblNob3duKClcbiAgICB7XG4gICAgICAgIHRoaXMucHMucmVzZXRTeXN0ZW0oKTtcbiAgICAgICAgUGxhdGZvcm0uc2hvd1NtYWxsUmFuaygpO1xuXG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCItIOesrCAlcyDlhbMgLSBcIiAsIFVzZXJJbmZvLmN1cnJlbnRMZXZlbClcbiAgICAgICAgdGhpcy5zdGVwTGFiZWwuc3RyaW5nID0gVXNlckluZm8uc3RlcFVzZWQudG9TdHJpbmcoKVxuICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSBVc2VySW5mby50aW1lUGFzc2VkLnRvU3RyaW5nKCkgK1wic1wiO1xuICAgICAgICBsZXQgcCA9IGcuZGVjcmVhc2VGb211bGEoMC45OSwwLjMsVXNlckluZm8udGltZVBhc3NlZCArIFVzZXJJbmZvLnN0ZXBVc2VkLFVzZXJJbmZvLmN1cnJlbnRMZXZlbCArIDUwIClcbiAgICAgICAgdGhpcy5wZXJjZW50TGFiZWwuc3RyaW5nID0gKHAqIDEwMCApLnRvRml4ZWQoMCkgK1wiJVwiXG5cbiAgICAgICAgdGhpcy5kaWFtb25kTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICBcbiAgICAgICAgaWYoVXNlckluZm8ubGV2ZWwgPT0gVXNlckluZm8uY3VycmVudExldmVsKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbHYgPSBVc2VySW5mby5sZXZlbFxuICAgICAgICAgICAgbGV0IGNob2lzZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkxldmVsdXApO1xuICAgICAgICAgICAgaWYoY2hvaXNlID4gMCAmJiBNYXRoLnJhbmRvbSgpID4gMC41ICYmIGx2ID49IDMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoXz0+e1xuICAgICAgICAgICAgICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MZXZlbHVwRGlhbG9nXCIsbHYscClcbiAgICAgICAgICAgICAgICB9LDEpXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFtb25kTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWFtb25kTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHAgPSBNYXRoLm1pbihwLDEpO1xuICAgICAgICAgICAgICAgIGxldCBkaWFtb25kID0gTWF0aC5mbG9vcihNYXRoLm1heCgzMCAqIHAsMTApKVxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbW9uZExhYmVsLnN0cmluZyA9IGRpYW1vbmQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBVc2VySW5mby5hZGREaWFtb25kKGRpYW1vbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVXNlckluZm8ubGV2ZWwgPSBsdiArIDFcbiAgICAgICAgICAgIFBsYXRmb3JtLnVwbG9hZFNjb3JlKFVzZXJJbmZvLmxldmVsKTtcbiAgICAgICAgICAgIFVzZXJJbmZvLnNhdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hvaXNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuSEIpO1xuICAgICAgICBpZihjaG9pc2UgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoVXNlckluZm8ubGV2ZWwgPj0gMylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZighVXNlckluZm8uaXNVbmxvY2soQ29uc3RzLkZyZWVTa2luSWQpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvSGJEaWFsb2dcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja19yYW5rKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJ3ZWNoYXQvV3hSYW5rRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfc2hvcCgpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9TaG9wRGlhbG9nXCIpO1xuICAgIH1cblxuICAgIGNsaWNrX25leHQoKVxuICAgIHtcbiAgICAgICAgVXNlckluZm8uY3VycmVudExldmVsID0gVXNlckluZm8uY3VycmVudExldmVsICsxO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfaG9tZSgpXG4gICAge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfc2hhcmUoKVxuICAgIHtcbiAgICAgICAgUGxhdGZvcm0uc2hhcmUoKTtcbiAgICB9XG59Il19