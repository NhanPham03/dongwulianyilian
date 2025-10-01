
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '979d2m9WlRN0519FkcUBa5E', 'Main');
// Game/Scripts/Main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager_1 = require("../../framework/plugin_boosts/ui/ViewManager");
var Info_1 = require("./Info");
var Platform_1 = require("../../framework/Platform");
var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
var Res_1 = require("./hex-lines-game/Res");
var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
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
    Main.prototype.onShare = function () {
    };
    Main.prototype.click_share = function () {
        Platform_1.default.share(this.onShare);
    };
    Main.prototype.click_luck = function () {
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    Main.prototype.click_more = function () {
        ToastManager_1.Toast.make("敬请期待");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXVFO0FBQ3ZFLCtCQUFrQztBQUNsQyxxREFBZ0Q7QUFDaEQsdUVBQWtFO0FBQ2xFLDRDQUF5QztBQUN6Qyw4RUFBc0U7QUFFaEUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUE0RUM7UUF4RUcsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7O1FBb0U3QixpQkFBaUI7SUFDckIsQ0FBQzthQTVFb0IsSUFBSTtJQVNyQixxQkFBTSxHQUFOO1FBQ0ksTUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsa0JBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixlQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsT0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQkFBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtTQUNsQzthQUNJO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsZUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFRLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDbkYsQ0FBQztJQUVELG9CQUFLLEdBQUw7UUFFSSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzNDLGVBQVEsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ25ELGVBQVEsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7U0FDckM7UUFFRCxrQkFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx5QkFBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELHlCQUFVLEdBQVYsVUFBVyxDQUFDO1FBQ1IsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFRCxzQkFBTyxHQUFQO0lBRUEsQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDSSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBR0QseUJBQVUsR0FBVjtRQUNJLG9CQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RCLENBQUM7O0lBdkVNLGFBQVEsR0FBUyxJQUFJLENBQUM7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNXO0lBUFosSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQTRFeEI7SUFBRCxXQUFDO0NBNUVELEFBNEVDLENBNUVpQyxFQUFFLENBQUMsU0FBUyxHQTRFN0M7a0JBNUVvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi9JbmZvXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9QbGF0Zm9ybVwiO1xuaW1wb3J0IERldmljZSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvZ2FtZXN5cy9EZXZpY2VcIjtcbmltcG9ydCB7IFIgfSBmcm9tIFwiLi9oZXgtbGluZXMtZ2FtZS9SZXNcIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgaW5zdGFuY2U6IE1haW4gPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRyYXdSZWRQb2ludDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luUmVkUG9pbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNYWluLmluc3RhbmNlID0gdGhpcztcbiAgICAgICAgUGxhdGZvcm0ubG9naW4oKTtcbiAgICAgICAgVXNlckluZm8uaW5pdCgpO1xuICAgICAgICBEZXZpY2UucGxheU11c2ljKFIuYXVkaW9fYmdtKTtcbiAgICB9XG5cbiAgICByZWZyZXNoUmVkcG9pbnRzKCkge1xuICAgICAgICBpZiAoZy5pc05leHREYXkoVXNlckluZm8uZnJlZWRyYXdUaW1lKSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVkUG9pbnQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVkUG9pbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5za2luUmVkUG9pbnQuYWN0aXZlID0gVXNlckluZm8uZGlhbW9uZCA+PSA1MDAgJiYgIVVzZXJJbmZvLmlzQWxsVW5sb2NrZWQoKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIGlmIChnLmlzTmV4dERheShVc2VySW5mby5kYWlseUdldFRpbWUpKSB7XG4gICAgICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9EYWlseURpYWxvZ1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoUmVkcG9pbnRzKCk7XG5cbiAgICAgICAgaWYgKGcuaXNOZXh0RGF5KFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaFRpbWUpKSB7XG4gICAgICAgICAgICBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsYXRmb3JtLnNob3dCYW5uZXJBZCgpO1xuICAgIH1cblxuICAgIGNsaWNrX3BsYXkoKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0xldmVsRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgdG9nZ2xlX3NmeCh0KSB7XG4gICAgICAgIERldmljZS5zZXRTb3VuZHNFbmFibGUoIXQuaXNDaGVja2VkKVxuICAgIH1cblxuICAgIGNsaWNrX3NraW4oKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIilcbiAgICB9XG5cbiAgICBjbGlja19yYW5rKCkge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwid2VjaGF0L1d4UmFua0RpYWxvZ1wiKVxuICAgIH1cblxuICAgIG9uU2hhcmUoKSB7XG5cbiAgICB9XG5cbiAgICBjbGlja19zaGFyZSgpIHtcbiAgICAgICAgUGxhdGZvcm0uc2hhcmUodGhpcy5vblNoYXJlKTtcbiAgICB9XG5cbiAgICBjbGlja19sdWNrKCkge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MdWNreURpYWxvZ1wiKVxuICAgIH1cblxuXG4gICAgY2xpY2tfbW9yZSgpIHtcbiAgICAgICAgVG9hc3QubWFrZShcIuaVrOivt+acn+W+hVwiKVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=