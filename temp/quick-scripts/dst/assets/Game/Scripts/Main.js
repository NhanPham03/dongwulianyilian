
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXVFO0FBQ3ZFLCtCQUFrQztBQUNsQyxxREFBZ0Q7QUFDaEQsdUVBQWtFO0FBQ2xFLDRDQUF5QztBQUN6Qyw4RUFBc0U7QUFDdEUsb0ZBQStFO0FBRXpFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBaUZDO1FBN0VHLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDOztRQXlFN0IsaUJBQWlCO0lBQ3JCLENBQUM7YUFqRm9CLElBQUk7SUFTckIscUJBQU0sR0FBTjtRQUNJLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGtCQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLGdCQUFNLENBQUMsU0FBUyxDQUFDLE9BQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0JBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7U0FDbEM7YUFDSTtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLGVBQVEsQ0FBQyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsZUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ25GLENBQUM7SUFFRCxvQkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNwQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtTQUNoRDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMzQyxlQUFRLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNuRCxlQUFRLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsa0JBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCx5QkFBVSxHQUFWLFVBQVcsQ0FBQztRQUNSLGdCQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCx5QkFBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxzQkFBTyxHQUFQO0lBRUEsQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDSSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBR0QseUJBQVUsR0FBVjtRQUNJLHFCQUFxQjtRQUNyQixvQkFBSyxDQUFDLElBQUksQ0FBQyx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDOztJQTVFTSxhQUFRLEdBQVMsSUFBSSxDQUFDO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDVztJQVBaLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FpRnhCO0lBQUQsV0FBQztDQWpGRCxBQWlGQyxDQWpGaUMsRUFBRSxDQUFDLFNBQVMsR0FpRjdDO2tCQWpGb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4vSW5mb1wiO1xuaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4vaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0xhbmd1YWdlTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgaW5zdGFuY2U6IE1haW4gPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRyYXdSZWRQb2ludDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luUmVkUG9pbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNYWluLmluc3RhbmNlID0gdGhpcztcbiAgICAgICAgUGxhdGZvcm0ubG9naW4oKTtcbiAgICAgICAgVXNlckluZm8uaW5pdCgpO1xuICAgICAgICBEZXZpY2UucGxheU11c2ljKFIuYXVkaW9fYmdtKTtcbiAgICB9XG5cbiAgICByZWZyZXNoUmVkcG9pbnRzKCkge1xuICAgICAgICBpZiAoZy5pc05leHREYXkoVXNlckluZm8uZnJlZWRyYXdUaW1lKSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVkUG9pbnQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVkUG9pbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5za2luUmVkUG9pbnQuYWN0aXZlID0gVXNlckluZm8uZGlhbW9uZCA+PSA1MDAgJiYgIVVzZXJJbmZvLmlzQWxsVW5sb2NrZWQoKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIGlmIChnLmlzTmV4dERheShVc2VySW5mby5kYWlseUdldFRpbWUpKSB7XG4gICAgICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9EYWlseURpYWxvZ1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoUmVkcG9pbnRzKCk7XG5cbiAgICAgICAgaWYgKGcuaXNOZXh0RGF5KFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaFRpbWUpKSB7XG4gICAgICAgICAgICBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsYXRmb3JtLnNob3dCYW5uZXJBZCgpO1xuICAgIH1cblxuICAgIGNsaWNrX3BsYXkoKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0xldmVsRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgdG9nZ2xlX3NmeCh0KSB7XG4gICAgICAgIERldmljZS5zZXRTb3VuZHNFbmFibGUoIXQuaXNDaGVja2VkKVxuICAgIH1cblxuICAgIGNsaWNrX3NraW4oKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIilcbiAgICB9XG5cbiAgICBjbGlja19yYW5rKCkge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwid2VjaGF0L1d4UmFua0RpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX2xhbmcoKSB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL0xhbmd1YWdlRGlhbG9nXCIpO1xuICAgIH1cblxuICAgIG9uU2hhcmUoKSB7XG5cbiAgICB9XG5cbiAgICBjbGlja19zaGFyZSgpIHtcbiAgICAgICAgUGxhdGZvcm0uc2hhcmUodGhpcy5vblNoYXJlKTtcbiAgICB9XG5cbiAgICBjbGlja19sdWNrKCkge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MdWNreURpYWxvZ1wiKVxuICAgIH1cblxuXG4gICAgY2xpY2tfbW9yZSgpIHtcbiAgICAgICAgLy8gVG9hc3QubWFrZShcIuaVrOivt+acn+W+hVwiKVxuICAgICAgICBUb2FzdC5tYWtlKExhbmd1YWdlTWFuYWdlci5pbnN0YW5jZS5nZXRUZXh0KFwibW9yZVwiKSlcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19