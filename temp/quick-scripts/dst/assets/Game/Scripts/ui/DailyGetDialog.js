
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
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
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
        // this.rewardLabel.string = cc.js.formatStr("钻石 x " + this.diamond)
        var text = LanguageManager_1.default.instance.getText("diamonds");
        this.rewardLabel.string = text + " x " + this.diamond;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXERhaWx5R2V0RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBK0M7QUFDL0MsaUVBQTREO0FBRTVELHdEQUFtRDtBQUNuRCx1RkFBa0Y7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFnREM7UUE1Q0csYUFBTyxHQUFVLENBQUMsQ0FBQztRQUduQixpQkFBVyxHQUFZLElBQUksQ0FBQzs7SUF5Q2hDLENBQUM7SUE5Q0csK0JBQU0sR0FBTixjQUFXLENBQUM7SUFDWiw4QkFBSyxHQUFMLGNBQVUsQ0FBQztJQU1YLGdDQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLG9FQUFvRTtRQUNwRSxJQUFNLElBQUksR0FBRyx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQU0sSUFBSSxXQUFNLElBQUksQ0FBQyxPQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFFSSxrQkFBa0I7UUFDbEIsZUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakMsZUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzVDLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEMsQ0FBQztJQUVELG1DQUFVLEdBQVY7UUFFSSxlQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsZUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzVDLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEMsQ0FBQztJQUVELHlDQUFnQixHQUFoQjtRQUVJLGVBQWU7UUFDZixJQUFJLE1BQU0sR0FBRyxlQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLElBQUksQ0FBQyxFQUNmO1lBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO2FBQUssSUFBRyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2pCLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkM7YUFBSTtZQUNELGFBQWE7WUFDYixrQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFBO1NBQzdDO0lBQ0wsQ0FBQztJQXhDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNTO0lBUFgsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWdEbEM7SUFBRCxxQkFBQztDQWhERCxBQWdEQyxDQWhEMkMsRUFBRSxDQUFDLFNBQVMsR0FnRHZEO2tCQWhEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3XCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9MYW5ndWFnZU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWlseUdldERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQgKCkge31cbiAgICBzdGFydCAoKSB7fVxuICAgIGRpYW1vbmQ6bnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByZXdhcmRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvblNob3duKClcbiAgICB7XG4gICAgICAgIHRoaXMuZGlhbW9uZCA9IGcucmFuZG9tSW50KDIwLDUwKTtcbiAgICAgICAgLy8gdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLpkrvnn7MgeCBcIiArIHRoaXMuZGlhbW9uZClcbiAgICAgICAgY29uc3QgdGV4dCA9IExhbmd1YWdlTWFuYWdlci5pbnN0YW5jZS5nZXRUZXh0KFwiZGlhbW9uZHNcIik7XG4gICAgICAgIHRoaXMucmV3YXJkTGFiZWwuc3RyaW5nID0gYCR7dGV4dH0geCAke3RoaXMuZGlhbW9uZH1gO1xuICAgIH1cblxuICAgIGNsaWNrX2dldCgpXG4gICAge1xuICAgICAgICAvLyBzaGFyZSBvciB2aWRlbyBcbiAgICAgICAgVXNlckluZm8uYWRkRGlhbW9uZCh0aGlzLmRpYW1vbmQpXG4gICAgICAgIFVzZXJJbmZvLmRhaWx5R2V0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKClcbiAgICB9XG5cbiAgICBzaGFyZV9zdWNjKClcbiAgICB7XG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5kaWFtb25kICogMik7XG4gICAgICAgIFVzZXJJbmZvLmRhaWx5R2V0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKClcbiAgICB9XG5cbiAgICBjbGlja19nZXRfZG91YmxlKClcbiAgICB7XG4gICAgICAgIC8vc2hhcmUgb3J2aWRlb1xuICAgICAgICBsZXQgY2hvaWNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuRGFpbHlHZXQpO1xuICAgICAgICBpZiAoY2hvaWNlID09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfc3VjYygpO1xuICAgICAgICB9ZWxzZSBpZihjaG9pY2UgPT0gMSl7XG4gICAgICAgICAgICBQbGF0Zm9ybS5zaGFyZSh0aGlzLnNoYXJlX3N1Y2MsdGhpcylcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL3dhdGNoIHZpZGVvXG4gICAgICAgICAgICBQbGF0Zm9ybS53YXRjaF92aWRlbyh0aGlzLnNoYXJlX3N1Y2MsdGhpcylcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=