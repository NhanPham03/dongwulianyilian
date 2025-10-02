
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/TimeUpDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFRpbWVVcERpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUZBQWtGO0FBQ2xGLGdDQUFtQztBQUU3QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQW1DQztRQWhDRyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUM7O0lBMEIvQixDQUFDO0lBeEJHLDZCQUFNLEdBQU4sY0FBVSxDQUFDO0lBRVgsNEJBQUssR0FBTCxjQUFTLENBQUM7SUFFViw4QkFBTyxHQUFQO1FBQ0ksSUFBSSx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxlQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDakY7YUFDSTtZQUNELElBQU0sSUFBSSxHQUFHLHlCQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFLLElBQUksU0FBSSxlQUFRLENBQUMsWUFBWSxPQUFJLENBQUM7U0FDbkU7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxlQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGVBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELG9DQUFhLEdBQWI7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBL0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNRO0lBVFYsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQW1DaEM7SUFBRCxtQkFBQztDQW5DRCxBQW1DQyxDQW5DeUMsRUFBRSxDQUFDLFNBQVMsR0FtQ3JEO2tCQW5Db0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0xhbmd1YWdlTWFuYWdlclwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vSW5mb1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVVwRGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RlcExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7fVxuXG4gICAgc3RhcnQoKSB7fVxuXG4gICAgb25TaG93bigpIHtcbiAgICAgICAgaWYgKExhbmd1YWdlTWFuYWdlci5pbnN0YW5jZS5yZWdpb24gPT0gXCJ6aC1DTlwiKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiLSDnrKwgJXMg5YWzIC1cIiwgVXNlckluZm8uY3VycmVudExldmVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImxldmVsXCIpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IGAtICR7dGV4dH0gJHtVc2VySW5mby5jdXJyZW50TGV2ZWx9IC1gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGVwTGFiZWwuc3RyaW5nID0gVXNlckluZm8uc3RlcFVzZWQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gVXNlckluZm8udGltZVBhc3NlZC50b1N0cmluZygpICsgXCJzXCI7XG4gICAgfVxuXG4gICAgY2xpY2tfaG9tZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblwiKTtcbiAgICB9XG5cbiAgICBjbGlja19yZXN0YXJ0KCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lXCIpO1xuICAgIH1cbn1cbiJdfQ==