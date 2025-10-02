
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/Info.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '894ddeHxZNOMqD6BW+YheZr', 'Info');
// Game/Scripts/Info.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = exports.ChoiceType = void 0;
var DataCenter_1 = require("../../framework/plugin_boosts/misc/DataCenter");
var Res_1 = require("./hex-lines-game/Res");
var ToastManager_1 = require("../../framework/plugin_boosts/ui/ToastManager");
var Device_1 = require("../../framework/plugin_boosts/gamesys/Device");
var Platform_1 = require("../../framework/Platform");
var MoreGameManager_1 = require("../../framework/wxsdk/MoreGameManager");
var LanguageManager_1 = require("../../framework/plugin_boosts/ui/LanguageManager");
var ChoiceType;
(function (ChoiceType) {
    ChoiceType[ChoiceType["DailyGet"] = 0] = "DailyGet";
    ChoiceType[ChoiceType["Levelup"] = 1] = "Levelup";
    ChoiceType[ChoiceType["Get"] = 2] = "Get";
    ChoiceType[ChoiceType["Shop"] = 3] = "Shop";
    ChoiceType[ChoiceType["BannerAdRefresh"] = 4] = "BannerAdRefresh";
    ChoiceType[ChoiceType["HB"] = 5] = "HB";
})(ChoiceType = exports.ChoiceType || (exports.ChoiceType = {}));
var UserInfoClass = /** @class */ (function (_super) {
    __extends(UserInfoClass, _super);
    function UserInfoClass() {
        var _this = _super.call(this) || this;
        _this.choices = [];
        _this.version = "6";
        _this.region = "vn";
        _this.level = 1;
        _this.selectedSkin = "2";
        _this.dailyGetTime = new Date(2018, 1, 1).getTime();
        _this.freedrawTime = _this.dailyGetTime;
        _this.luckyVideoWatchTime = _this.dailyGetTime;
        _this.shopFreeDiamondTime = _this.dailyGetTime;
        _this.diamond = 0;
        _this.sfx_enabled = true;
        _this.firstTimeReach = false;
        _this.luckyVideoWatchCount = 0;
        _this.timePassed = 0;
        _this.stepUsed = 0;
        _this.currentLevel = 1;
        _this.unlock(_this.selectedSkin);
        setTimeout(function () {
            _this.save();
        }, 60 * 1000);
        return _this;
        // onexit game =>save
    }
    // ret: 0:directly-get 1:share 2:video
    UserInfoClass.prototype.getChoice = function (slotId) {
        return this.choices[slotId] || 0;
    };
    UserInfoClass.prototype.init = function () {
        Platform_1.default.configGetSignal.on(this.onGetConfig, this);
        Platform_1.default.requestServerConfigs("t_games", this.onGetGames, this);
    };
    UserInfoClass.prototype.onGetGames = function (data) {
        MoreGameManager_1.default.instance.addList(data);
    };
    UserInfoClass.prototype.onGetConfig = function (data) {
        if (data) {
            var record = data[0];
            if (record) {
                this.choices = JSON.parse(record[this.version]);
            }
        }
        Platform_1.default.initBannerAd(this.getChoice(ChoiceType.BannerAdRefresh));
    };
    UserInfoClass.prototype.addDiamond = function (d, b) {
        if (b === void 0) { b = true; }
        if (typeof (d) == "number")
            this.diamond += d;
        else
            this.diamond += parseInt(d);
        if (b) {
            var text = LanguageManager_1.default.instance.getText("get_diamonds");
            // Toast.make("获得钻石 x" + d)
            ToastManager_1.Toast.make(text + " x + " + d);
            Device_1.default.playEffect(Res_1.R.audio_get_diamond);
        }
        if (!this.firstTimeReach) {
            if (this.diamond >= 500) {
                // Toast.make("哇可以买皮肤了，快去皮肤商店看看吧!",2)
                var text = LanguageManager_1.default.instance.getText("check_store");
                ToastManager_1.Toast.make(text, 2);
                this.firstTimeReach = true;
                exports.UserInfo.save();
            }
        }
    };
    UserInfoClass.prototype.isUnlock = function (skin_id) {
        var carUnlocked = localStorage.getItem("unlocked_" + skin_id);
        if (!carUnlocked) {
            return false;
        }
        else {
            return carUnlocked == "1";
        }
    };
    UserInfoClass.prototype.isAllUnlocked = function () {
        var c = 0;
        for (var i = 0; i < Res_1.R.skinConfig.json.length; i++) {
            var v = Res_1.R.skinConfig.json[i];
            if (exports.UserInfo.isUnlock(v.id)) {
                c++;
            }
        }
        return c == Res_1.R.skinConfig.json.length;
    };
    UserInfoClass.prototype.getSkinById = function (id) {
        var res = Res_1.R.skinConfig.json.filter(function (v) { return v.id == id; });
        return res[0];
    };
    UserInfoClass.prototype.unlock = function (skin_id) {
        localStorage.setItem("unlocked_" + skin_id, "1");
    };
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "region", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "level", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "selectedSkin", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "dailyGetTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "freedrawTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "luckyVideoWatchTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "shopFreeDiamondTime", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "diamond", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "sfx_enabled", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "firstTimeReach", void 0);
    __decorate([
        DataCenter_1.field()
    ], UserInfoClass.prototype, "luckyVideoWatchCount", void 0);
    UserInfoClass = __decorate([
        DataCenter_1.dc("Info")
    ], UserInfoClass);
    return UserInfoClass;
}(DataCenter_1.default));
exports.default = UserInfoClass;
exports.UserInfo = DataCenter_1.default.register(UserInfoClass);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFzRjtBQUN0Riw0Q0FBeUM7QUFDekMsOEVBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxxREFBZ0Q7QUFDaEQseUVBQW9FO0FBQ3BFLG9GQUErRTtBQUcvRSxJQUFZLFVBT1g7QUFQRCxXQUFZLFVBQVU7SUFDbEIsbURBQVEsQ0FBQTtJQUNSLGlEQUFPLENBQUE7SUFDUCx5Q0FBRyxDQUFBO0lBQ0gsMkNBQUksQ0FBQTtJQUNKLGlFQUFlLENBQUE7SUFDZix1Q0FBRSxDQUFBO0FBQ04sQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCO0FBR0Q7SUFBMkMsaUNBQVU7SUErRmpEO1FBQUEsWUFFSSxpQkFBTyxTQU1WO1FBckdELGFBQU8sR0FBTSxFQUFFLENBQUE7UUFDZixhQUFPLEdBQVUsR0FBRyxDQUFDO1FBZ0NyQixZQUFNLEdBQVUsSUFBSSxDQUFDO1FBR3JCLFdBQUssR0FBVSxDQUFDLENBQUM7UUFHakIsa0JBQVksR0FBVSxHQUFHLENBQUM7UUFHMUIsa0JBQVksR0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBR3BELGtCQUFZLEdBQVUsS0FBSSxDQUFDLFlBQVksQ0FBQztRQUd4Qyx5QkFBbUIsR0FBVSxLQUFJLENBQUMsWUFBWSxDQUFBO1FBRzlDLHlCQUFtQixHQUFVLEtBQUksQ0FBQyxZQUFZLENBQUM7UUFHL0MsYUFBTyxHQUFVLENBQUMsQ0FBQztRQUduQixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixvQkFBYyxHQUFXLEtBQUssQ0FBQztRQUcvQiwwQkFBb0IsR0FBVSxDQUFDLENBQUM7UUFDaEMsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsY0FBUSxHQUFVLENBQUMsQ0FBQztRQTBC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SUFHL0I7UUFEQyxrQkFBSyxFQUFFOytEQUN3QjtJQWpFZixhQUFhO1FBRGpDLGVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDVSxhQUFhLENBK0lqQztJQUFELG9CQUFDO0NBL0lELEFBK0lDLENBL0kwQyxvQkFBVSxHQStJcEQ7a0JBL0lvQixhQUFhO0FBZ0p2QixRQUFBLFFBQVEsR0FBaUIsb0JBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YUNlbnRlciwgeyBkYywgZmllbGQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvbWlzYy9EYXRhQ2VudGVyXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4vaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9QbGF0Zm9ybVwiO1xuaW1wb3J0IE1vcmVHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3d4c2RrL01vcmVHYW1lTWFuYWdlclwiO1xuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvTGFuZ3VhZ2VNYW5hZ2VyXCI7XG5cblxuZXhwb3J0IGVudW0gQ2hvaWNlVHlwZSAge1xuICAgIERhaWx5R2V0LFxuICAgIExldmVsdXAsXG4gICAgR2V0LFxuICAgIFNob3AsXG4gICAgQmFubmVyQWRSZWZyZXNoLFxuICAgIEhCLFxufVxuXG5AZGMoXCJJbmZvXCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mb0NsYXNzIGV4dGVuZHMgRGF0YUNlbnRlclxue1xuICAgIGNob2ljZXM6W10gPSBbXVxuICAgIHZlcnNpb246c3RyaW5nID0gXCI2XCI7XG4gICAgLy8gcmV0OiAwOmRpcmVjdGx5LWdldCAxOnNoYXJlIDI6dmlkZW9cbiAgICBnZXRDaG9pY2Uoc2xvdElkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hvaWNlc1tzbG90SWRdIHx8IDA7XG4gICAgfVxuXG4gICAgaW5pdCgpXG4gICAge1xuICAgICAgICBQbGF0Zm9ybS5jb25maWdHZXRTaWduYWwub24odGhpcy5vbkdldENvbmZpZyx0aGlzKTtcbiAgICAgICAgUGxhdGZvcm0ucmVxdWVzdFNlcnZlckNvbmZpZ3MoXCJ0X2dhbWVzXCIsdGhpcy5vbkdldEdhbWVzLHRoaXMpXG4gICAgfVxuXG4gICAgb25HZXRHYW1lcyhkYXRhKVxuICAgIHtcbiAgICAgICAgTW9yZUdhbWVNYW5hZ2VyLmluc3RhbmNlLmFkZExpc3QoZGF0YSk7XG4gICAgfVxuXG4gICAgb25HZXRDb25maWcoZGF0YSlcbiAgICB7XG4gICAgICAgIGlmKGRhdGEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBkYXRhWzBdXG4gICAgICAgICAgICBpZihyZWNvcmQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaG9pY2VzID0gSlNPTi5wYXJzZShyZWNvcmRbdGhpcy52ZXJzaW9uXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgUGxhdGZvcm0uaW5pdEJhbm5lckFkKHRoaXMuZ2V0Q2hvaWNlKENob2ljZVR5cGUuQmFubmVyQWRSZWZyZXNoKSlcbiAgICB9XG5cbiAgICBAZmllbGQoKVxuICAgIHJlZ2lvbjpzdHJpbmcgPSBcInZuXCI7XG5cbiAgICBAZmllbGQoKVxuICAgIGxldmVsOm51bWJlciA9IDE7XG5cbiAgICBAZmllbGQoKVxuICAgIHNlbGVjdGVkU2tpbjpzdHJpbmcgPSBcIjJcIjtcblxuICAgIEBmaWVsZCgpXG4gICAgZGFpbHlHZXRUaW1lOm51bWJlciA9ICBuZXcgRGF0ZSgyMDE4LDEsMSkuZ2V0VGltZSgpO1xuXG4gICAgQGZpZWxkKClcbiAgICBmcmVlZHJhd1RpbWU6bnVtYmVyID0gdGhpcy5kYWlseUdldFRpbWU7XG5cbiAgICBAZmllbGQoKVxuICAgIGx1Y2t5VmlkZW9XYXRjaFRpbWU6bnVtYmVyID0gdGhpcy5kYWlseUdldFRpbWVcblxuICAgIEBmaWVsZCgpXG4gICAgc2hvcEZyZWVEaWFtb25kVGltZTpudW1iZXIgPSB0aGlzLmRhaWx5R2V0VGltZTtcblxuICAgIEBmaWVsZCgpXG4gICAgZGlhbW9uZDpudW1iZXIgPSAwO1xuXG4gICAgQGZpZWxkKClcbiAgICBzZnhfZW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcblxuICAgIEBmaWVsZCgpXG4gICAgZmlyc3RUaW1lUmVhY2g6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQGZpZWxkKClcbiAgICBsdWNreVZpZGVvV2F0Y2hDb3VudDpudW1iZXIgPSAwO1xuICAgIHRpbWVQYXNzZWQ6IG51bWJlciA9IDA7XG4gICAgc3RlcFVzZWQ6bnVtYmVyID0gMDtcblxuICAgIGFkZERpYW1vbmQoZCxiID0gdHJ1ZSlcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZihkKSA9PSBcIm51bWJlclwiKSB0aGlzLmRpYW1vbmQgKz0gZDtcbiAgICAgICAgZWxzZSB0aGlzLmRpYW1vbmQgKz0gcGFyc2VJbnQoZCk7XG4gICAgICAgIGlmKGIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImdldF9kaWFtb25kc1wiKTtcbiAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoXCLojrflvpfpkrvnn7MgeFwiICsgZClcbiAgICAgICAgICAgIFRvYXN0Lm1ha2UoYCR7dGV4dH0geCArICR7ZH1gKVxuICAgICAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb19nZXRfZGlhbW9uZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZmlyc3RUaW1lUmVhY2gpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZGlhbW9uZCA+PSA1MDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIuWTh+WPr+S7peS5sOearuiCpOS6hu+8jOW/q+WOu+earuiCpOWVhuW6l+eci+eci+WQpyFcIiwyKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImNoZWNrX3N0b3JlXCIpO1xuICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2UodGV4dCwyKVxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lUmVhY2ggPSB0cnVlXG4gICAgICAgICAgICAgICAgVXNlckluZm8uc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudExldmVsOm51bWJlciA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVubG9jayh0aGlzLnNlbGVjdGVkU2tpbik7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB9LCA2MCAqIDEwMDApXG4gICAgICAgIC8vIG9uZXhpdCBnYW1lID0+c2F2ZVxuICAgIH1cblxuICAgIGlzVW5sb2NrKHNraW5faWQpXG4gICAge1xuICAgICAgICBsZXQgY2FyVW5sb2NrZWQgPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1bmxvY2tlZF9cIitza2luX2lkKTtcbiAgICAgICAgaWYoIWNhclVubG9ja2VkKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfWVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGNhclVubG9ja2VkID09IFwiMVwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0FsbFVubG9ja2VkKClcbiAgICB7XG4gICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMCA7aSA8Ui5za2luQ29uZmlnLmpzb24ubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHYgPSBSLnNraW5Db25maWcuanNvbltpXVxuICAgICAgICAgICAgaWYoVXNlckluZm8uaXNVbmxvY2sodi5pZCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYyArK1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgXG4gICAgICAgIHJldHVybiBjID09IFIuc2tpbkNvbmZpZy5qc29uLmxlbmd0aFxuICAgIH1cblxuXG4gICAgZ2V0U2tpbkJ5SWQoaWQ6IGFueSk6IGFueSB7XG4gICAgICAgIGxldCByZXMgPSBSLnNraW5Db25maWcuanNvbi5maWx0ZXIodj0+e3JldHVybiB2LmlkID09IGlkfSk7XG4gICAgICAgIHJldHVybiByZXNbMF1cbiAgICB9XG5cblxuICAgIHVubG9jayhza2luX2lkKVxuICAgIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1bmxvY2tlZF9cIitza2luX2lkICwgXCIxXCIpXG4gICAgfVxuXG59XG5leHBvcnQgdmFyIFVzZXJJbmZvOlVzZXJJbmZvQ2xhc3MgPSBEYXRhQ2VudGVyLnJlZ2lzdGVyKFVzZXJJbmZvQ2xhc3MpIl19