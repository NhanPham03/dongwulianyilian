
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXVFO0FBQ3ZFLCtCQUFrQztBQUNsQyxxREFBZ0Q7QUFDaEQsdUVBQWtFO0FBQ2xFLDRDQUF5QztBQUN6Qyw4RUFBc0U7QUFFaEUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFnRkM7UUE1RUcsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7O1FBd0U3QixpQkFBaUI7SUFDckIsQ0FBQzthQWhGb0IsSUFBSTtJQVNyQixxQkFBTSxHQUFOO1FBQ0ksTUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsa0JBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixlQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsT0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQkFBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtTQUNsQzthQUNJO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsZUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFRLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDbkYsQ0FBQztJQUVELG9CQUFLLEdBQUw7UUFFSSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzNDLGVBQVEsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ25ELGVBQVEsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7U0FDckM7UUFFRCxrQkFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx5QkFBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELHlCQUFVLEdBQVYsVUFBVyxDQUFDO1FBQ1IsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFRCx5QkFBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHNCQUFPLEdBQVA7SUFFQSxDQUFDO0lBRUQsMEJBQVcsR0FBWDtRQUNJLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFHRCx5QkFBVSxHQUFWO1FBQ0ksb0JBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEIsQ0FBQzs7SUEzRU0sYUFBUSxHQUFTLElBQUksQ0FBQztJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1c7SUFQWixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBZ0Z4QjtJQUFELFdBQUM7Q0FoRkQsQUFnRkMsQ0FoRmlDLEVBQUUsQ0FBQyxTQUFTLEdBZ0Y3QztrQkFoRm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuL0luZm9cIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy9nYW1lc3lzL0RldmljZVwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuL2hleC1saW5lcy1nYW1lL1Jlc1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBpbnN0YW5jZTogTWFpbiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZHJhd1JlZFBvaW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNraW5SZWRQb2ludDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIE1haW4uaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICBQbGF0Zm9ybS5sb2dpbigpO1xuICAgICAgICBVc2VySW5mby5pbml0KCk7XG4gICAgICAgIERldmljZS5wbGF5TXVzaWMoUi5hdWRpb19iZ20pO1xuICAgIH1cblxuICAgIHJlZnJlc2hSZWRwb2ludHMoKSB7XG4gICAgICAgIGlmIChnLmlzTmV4dERheShVc2VySW5mby5mcmVlZHJhd1RpbWUpKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdSZWRQb2ludC5hY3RpdmUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdSZWRQb2ludC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNraW5SZWRQb2ludC5hY3RpdmUgPSBVc2VySW5mby5kaWFtb25kID49IDUwMCAmJiAhVXNlckluZm8uaXNBbGxVbmxvY2tlZCgpXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgaWYgKGcuaXNOZXh0RGF5KFVzZXJJbmZvLmRhaWx5R2V0VGltZSkpIHtcbiAgICAgICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0RhaWx5RGlhbG9nXCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hSZWRwb2ludHMoKTtcblxuICAgICAgICBpZiAoZy5pc05leHREYXkoVXNlckluZm8ubHVja3lWaWRlb1dhdGNoVGltZSkpIHtcbiAgICAgICAgICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoQ291bnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgUGxhdGZvcm0uc2hvd0Jhbm5lckFkKCk7XG4gICAgfVxuXG4gICAgY2xpY2tfcGxheSgpIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvTGV2ZWxEaWFsb2dcIilcbiAgICB9XG5cbiAgICB0b2dnbGVfc2Z4KHQpIHtcbiAgICAgICAgRGV2aWNlLnNldFNvdW5kc0VuYWJsZSghdC5pc0NoZWNrZWQpXG4gICAgfVxuXG4gICAgY2xpY2tfc2tpbigpIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvU2hvcERpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX3JhbmsoKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJ3ZWNoYXQvV3hSYW5rRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfbGFuZygpIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvTGFuZ3VhZ2VEaWFsb2dcIik7XG4gICAgfVxuXG4gICAgb25TaGFyZSgpIHtcblxuICAgIH1cblxuICAgIGNsaWNrX3NoYXJlKCkge1xuICAgICAgICBQbGF0Zm9ybS5zaGFyZSh0aGlzLm9uU2hhcmUpO1xuICAgIH1cblxuICAgIGNsaWNrX2x1Y2soKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0x1Y2t5RGlhbG9nXCIpXG4gICAgfVxuXG5cbiAgICBjbGlja19tb3JlKCkge1xuICAgICAgICBUb2FzdC5tYWtlKFwi5pWs6K+35pyf5b6FXCIpXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==