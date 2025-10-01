
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
            ToastManager_1.Toast.make("获得钻石 x" + d);
            Device_1.default.playEffect(Res_1.R.audio_get_diamond);
        }
        if (!this.firstTimeReach) {
            if (this.diamond >= 500) {
                ToastManager_1.Toast.make("哇可以买皮肤了，快去皮肤商店看看吧!", 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFzRjtBQUN0Riw0Q0FBeUM7QUFDekMsOEVBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxxREFBZ0Q7QUFDaEQseUVBQW9FO0FBR3BFLElBQVksVUFPWDtBQVBELFdBQVksVUFBVTtJQUNsQixtREFBUSxDQUFBO0lBQ1IsaURBQU8sQ0FBQTtJQUNQLHlDQUFHLENBQUE7SUFDSCwyQ0FBSSxDQUFBO0lBQ0osaUVBQWUsQ0FBQTtJQUNmLHVDQUFFLENBQUE7QUFDTixDQUFDLEVBUFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFPckI7QUFHRDtJQUEyQyxpQ0FBVTtJQTJGakQ7UUFBQSxZQUVJLGlCQUFPLFNBTVY7UUFqR0QsYUFBTyxHQUFNLEVBQUUsQ0FBQTtRQUNmLGFBQU8sR0FBVSxHQUFHLENBQUM7UUFnQ3JCLFlBQU0sR0FBVSxJQUFJLENBQUM7UUFHckIsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUdqQixrQkFBWSxHQUFVLEdBQUcsQ0FBQztRQUcxQixrQkFBWSxHQUFXLElBQUksSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFHcEQsa0JBQVksR0FBVSxLQUFJLENBQUMsWUFBWSxDQUFDO1FBR3hDLHlCQUFtQixHQUFVLEtBQUksQ0FBQyxZQUFZLENBQUE7UUFHOUMseUJBQW1CLEdBQVUsS0FBSSxDQUFDLFlBQVksQ0FBQztRQUcvQyxhQUFPLEdBQVUsQ0FBQyxDQUFDO1FBR25CLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBRzNCLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1FBRy9CLDBCQUFvQixHQUFVLENBQUMsQ0FBQztRQUNoQyxnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixjQUFRLEdBQVUsQ0FBQyxDQUFDO1FBc0JwQixrQkFBWSxHQUFV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UUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFDZW50ZXIsIHsgZGMsIGZpZWxkIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL21pc2MvRGF0YUNlbnRlclwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuL2hleC1saW5lcy1nYW1lL1Jlc1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy9nYW1lc3lzL0RldmljZVwiO1xuaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcbmltcG9ydCBNb3JlR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay93eHNkay9Nb3JlR2FtZU1hbmFnZXJcIjtcblxuXG5leHBvcnQgZW51bSBDaG9pY2VUeXBlICB7XG4gICAgRGFpbHlHZXQsXG4gICAgTGV2ZWx1cCxcbiAgICBHZXQsXG4gICAgU2hvcCxcbiAgICBCYW5uZXJBZFJlZnJlc2gsXG4gICAgSEIsXG59XG5cbkBkYyhcIkluZm9cIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvQ2xhc3MgZXh0ZW5kcyBEYXRhQ2VudGVyXG57XG4gICAgY2hvaWNlczpbXSA9IFtdXG4gICAgdmVyc2lvbjpzdHJpbmcgPSBcIjZcIjtcbiAgICAvLyByZXQ6IDA6ZGlyZWN0bHktZ2V0IDE6c2hhcmUgMjp2aWRlb1xuICAgIGdldENob2ljZShzbG90SWQpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaG9pY2VzW3Nsb3RJZF0gfHwgMDtcbiAgICB9XG5cbiAgICBpbml0KClcbiAgICB7XG4gICAgICAgIFBsYXRmb3JtLmNvbmZpZ0dldFNpZ25hbC5vbih0aGlzLm9uR2V0Q29uZmlnLHRoaXMpO1xuICAgICAgICBQbGF0Zm9ybS5yZXF1ZXN0U2VydmVyQ29uZmlncyhcInRfZ2FtZXNcIix0aGlzLm9uR2V0R2FtZXMsdGhpcylcbiAgICB9XG5cbiAgICBvbkdldEdhbWVzKGRhdGEpXG4gICAge1xuICAgICAgICBNb3JlR2FtZU1hbmFnZXIuaW5zdGFuY2UuYWRkTGlzdChkYXRhKTtcbiAgICB9XG5cbiAgICBvbkdldENvbmZpZyhkYXRhKVxuICAgIHtcbiAgICAgICAgaWYoZGF0YSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGRhdGFbMF1cbiAgICAgICAgICAgIGlmKHJlY29yZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNob2ljZXMgPSBKU09OLnBhcnNlKHJlY29yZFt0aGlzLnZlcnNpb25dKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBQbGF0Zm9ybS5pbml0QmFubmVyQWQodGhpcy5nZXRDaG9pY2UoQ2hvaWNlVHlwZS5CYW5uZXJBZFJlZnJlc2gpKVxuICAgIH1cblxuICAgIEBmaWVsZCgpXG4gICAgcmVnaW9uOnN0cmluZyA9IFwidm5cIjtcblxuICAgIEBmaWVsZCgpXG4gICAgbGV2ZWw6bnVtYmVyID0gMTtcblxuICAgIEBmaWVsZCgpXG4gICAgc2VsZWN0ZWRTa2luOnN0cmluZyA9IFwiMlwiO1xuXG4gICAgQGZpZWxkKClcbiAgICBkYWlseUdldFRpbWU6bnVtYmVyID0gIG5ldyBEYXRlKDIwMTgsMSwxKS5nZXRUaW1lKCk7XG5cbiAgICBAZmllbGQoKVxuICAgIGZyZWVkcmF3VGltZTpudW1iZXIgPSB0aGlzLmRhaWx5R2V0VGltZTtcblxuICAgIEBmaWVsZCgpXG4gICAgbHVja3lWaWRlb1dhdGNoVGltZTpudW1iZXIgPSB0aGlzLmRhaWx5R2V0VGltZVxuXG4gICAgQGZpZWxkKClcbiAgICBzaG9wRnJlZURpYW1vbmRUaW1lOm51bWJlciA9IHRoaXMuZGFpbHlHZXRUaW1lO1xuXG4gICAgQGZpZWxkKClcbiAgICBkaWFtb25kOm51bWJlciA9IDA7XG5cbiAgICBAZmllbGQoKVxuICAgIHNmeF9lbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQGZpZWxkKClcbiAgICBmaXJzdFRpbWVSZWFjaDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBAZmllbGQoKVxuICAgIGx1Y2t5VmlkZW9XYXRjaENvdW50Om51bWJlciA9IDA7XG4gICAgdGltZVBhc3NlZDogbnVtYmVyID0gMDtcbiAgICBzdGVwVXNlZDpudW1iZXIgPSAwO1xuXG4gICAgYWRkRGlhbW9uZChkLGIgPSB0cnVlKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mKGQpID09IFwibnVtYmVyXCIpIHRoaXMuZGlhbW9uZCArPSBkO1xuICAgICAgICBlbHNlIHRoaXMuZGlhbW9uZCArPSBwYXJzZUludChkKTtcbiAgICAgICAgaWYoYilcbiAgICAgICAge1xuICAgICAgICAgICAgVG9hc3QubWFrZShcIuiOt+W+l+mSu+efsyB4XCIgKyBkKVxuICAgICAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb19nZXRfZGlhbW9uZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZmlyc3RUaW1lUmVhY2gpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZGlhbW9uZCA+PSA1MDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVG9hc3QubWFrZShcIuWTh+WPr+S7peS5sOearuiCpOS6hu+8jOW/q+WOu+earuiCpOWVhuW6l+eci+eci+WQpyFcIiwyKVxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lUmVhY2ggPSB0cnVlXG4gICAgICAgICAgICAgICAgVXNlckluZm8uc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudExldmVsOm51bWJlciA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVubG9jayh0aGlzLnNlbGVjdGVkU2tpbik7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB9LCA2MCAqIDEwMDApXG4gICAgICAgIC8vIG9uZXhpdCBnYW1lID0+c2F2ZVxuICAgIH1cblxuICAgIGlzVW5sb2NrKHNraW5faWQpXG4gICAge1xuICAgICAgICBsZXQgY2FyVW5sb2NrZWQgPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1bmxvY2tlZF9cIitza2luX2lkKTtcbiAgICAgICAgaWYoIWNhclVubG9ja2VkKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfWVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGNhclVubG9ja2VkID09IFwiMVwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0FsbFVubG9ja2VkKClcbiAgICB7XG4gICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMCA7aSA8Ui5za2luQ29uZmlnLmpzb24ubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHYgPSBSLnNraW5Db25maWcuanNvbltpXVxuICAgICAgICAgICAgaWYoVXNlckluZm8uaXNVbmxvY2sodi5pZCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYyArK1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgXG4gICAgICAgIHJldHVybiBjID09IFIuc2tpbkNvbmZpZy5qc29uLmxlbmd0aFxuICAgIH1cblxuXG4gICAgZ2V0U2tpbkJ5SWQoaWQ6IGFueSk6IGFueSB7XG4gICAgICAgIGxldCByZXMgPSBSLnNraW5Db25maWcuanNvbi5maWx0ZXIodj0+e3JldHVybiB2LmlkID09IGlkfSk7XG4gICAgICAgIHJldHVybiByZXNbMF1cbiAgICB9XG5cblxuICAgIHVubG9jayhza2luX2lkKVxuICAgIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1bmxvY2tlZF9cIitza2luX2lkICwgXCIxXCIpXG4gICAgfVxuXG59XG5leHBvcnQgdmFyIFVzZXJJbmZvOlVzZXJJbmZvQ2xhc3MgPSBEYXRhQ2VudGVyLnJlZ2lzdGVyKFVzZXJJbmZvQ2xhc3MpIl19