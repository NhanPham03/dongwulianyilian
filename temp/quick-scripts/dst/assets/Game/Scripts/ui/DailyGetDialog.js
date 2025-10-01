
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/DailyGetDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3b8fModWBPmovqTucbpm5C', 'DailyGetDialog');
// Game/Scripts/ui/DailyGetDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var Platform_1 = require("../../../framework/Platform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DailyGetDialog = /** @class */ (function (_super) {
    __extends(DailyGetDialog, _super);
    function DailyGetDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamond = 0;
        _this.rewardLabel = null;
        return _this;
    }
    DailyGetDialog.prototype.onLoad = function () { };
    DailyGetDialog.prototype.start = function () { };
    DailyGetDialog.prototype.onShown = function () {
        this.diamond = g.randomInt(20, 50);
        this.rewardLabel.string = cc.js.formatStr("钻石 x " + this.diamond);
    };
    DailyGetDialog.prototype.click_get = function () {
        // share or video 
        Info_1.UserInfo.addDiamond(this.diamond);
        Info_1.UserInfo.dailyGetTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    DailyGetDialog.prototype.share_succ = function () {
        Info_1.UserInfo.addDiamond(this.diamond * 2);
        Info_1.UserInfo.dailyGetTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    DailyGetDialog.prototype.click_get_double = function () {
        //share orvideo
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.DailyGet);
        if (choice == 0) {
            this.share_succ();
        }
        else if (choice == 1) {
            Platform_1.default.share(this.share_succ, this);
        }
        else {
            //watch video
            Platform_1.default.watch_video(this.share_succ, this);
        }
    };
    __decorate([
        property(cc.Label)
    ], DailyGetDialog.prototype, "rewardLabel", void 0);
    DailyGetDialog = __decorate([
        ccclass
    ], DailyGetDialog);
    return DailyGetDialog;
}(cc.Component));
exports.default = DailyGetDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXERhaWx5R2V0RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBK0M7QUFDL0MsaUVBQTREO0FBRTVELHdEQUFtRDtBQUU3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQThDQztRQTFDRyxhQUFPLEdBQVUsQ0FBQyxDQUFDO1FBR25CLGlCQUFXLEdBQVksSUFBSSxDQUFDOztJQXVDaEMsQ0FBQztJQTVDRywrQkFBTSxHQUFOLGNBQVcsQ0FBQztJQUNaLDhCQUFLLEdBQUwsY0FBVSxDQUFDO0lBTVgsZ0NBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUVJLGtCQUFrQjtRQUNsQixlQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNqQyxlQUFRLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUMsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUVJLGVBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QyxlQUFRLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUMsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBRUksZUFBZTtRQUNmLElBQUksTUFBTSxHQUFHLGVBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQ2Y7WUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7YUFBSyxJQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDakIsa0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUN2QzthQUFJO1lBQ0QsYUFBYTtZQUNiLGtCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDN0M7SUFDTCxDQUFDO0lBdENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1M7SUFQWCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBOENsQztJQUFELHFCQUFDO0NBOUNELEFBOENDLENBOUMyQyxFQUFFLENBQUMsU0FBUyxHQThDdkQ7a0JBOUNvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlckluZm8sIENob2ljZVR5cGUgfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdcIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWlseUdldERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQgKCkge31cbiAgICBzdGFydCAoKSB7fVxuICAgIGRpYW1vbmQ6bnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByZXdhcmRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvblNob3duKClcbiAgICB7XG4gICAgICAgIHRoaXMuZGlhbW9uZCA9IGcucmFuZG9tSW50KDIwLDUwKTtcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLpkrvnn7MgeCBcIiArIHRoaXMuZGlhbW9uZClcbiAgICB9XG5cbiAgICBjbGlja19nZXQoKVxuICAgIHtcbiAgICAgICAgLy8gc2hhcmUgb3IgdmlkZW8gXG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5kaWFtb25kKVxuICAgICAgICBVc2VySW5mby5kYWlseUdldFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG4gICAgc2hhcmVfc3VjYygpXG4gICAge1xuICAgICAgICBVc2VySW5mby5hZGREaWFtb25kKHRoaXMuZGlhbW9uZCAqIDIpO1xuICAgICAgICBVc2VySW5mby5kYWlseUdldFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG4gICAgY2xpY2tfZ2V0X2RvdWJsZSgpXG4gICAge1xuICAgICAgICAvL3NoYXJlIG9ydmlkZW9cbiAgICAgICAgbGV0IGNob2ljZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkRhaWx5R2V0KTtcbiAgICAgICAgaWYgKGNob2ljZSA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3N1Y2MoKTtcbiAgICAgICAgfWVsc2UgaWYoY2hvaWNlID09IDEpe1xuICAgICAgICAgICAgUGxhdGZvcm0uc2hhcmUodGhpcy5zaGFyZV9zdWNjLHRoaXMpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy93YXRjaCB2aWRlb1xuICAgICAgICAgICAgUGxhdGZvcm0ud2F0Y2hfdmlkZW8odGhpcy5zaGFyZV9zdWNjLHRoaXMpXG4gICAgICAgIH1cbiAgICB9XG59Il19