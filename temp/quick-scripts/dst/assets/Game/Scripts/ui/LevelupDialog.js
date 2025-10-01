
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LevelupDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '192e1nHc39B4b1vo/mjTFG2', 'LevelupDialog');
// Game/Scripts/ui/LevelupDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var Platform_1 = require("../../../framework/Platform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelupDialog = /** @class */ (function (_super) {
    __extends(LevelupDialog, _super);
    function LevelupDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.btnLabel = null;
        _this.tipLabel = null;
        _this.levelLabel = null;
        _this.mult = 1;
        _this.baseDiamond = 0;
        return _this;
    }
    LevelupDialog.prototype.onLoad = function () { };
    LevelupDialog.prototype.start = function () { };
    LevelupDialog.prototype.onShown = function (level, p) {
        //给钻石
        p = Math.min(p, 1);
        var diamond = Math.floor(Math.max(30 * p, 10));
        this.baseDiamond = diamond;
        this.diamondLabel.string = diamond.toString();
        this.levelLabel.string = cc.js.formatStr("- 第 %s 关 - ", level);
        if (Math.random() > 0.7) {
            this.mult = g.randomInt(3, 6);
            this.btnLabel.string = this.mult + "倍领取";
        }
        else {
            this.btnLabel.string = "双倍领取";
            this.mult = 2;
        }
        this.tipLabel.string = "恭喜获得" + this.btnLabel.string + "奖励机会";
    };
    LevelupDialog.prototype.click_get = function () {
        Info_1.UserInfo.addDiamond(this.baseDiamond);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    LevelupDialog.prototype.share_suc = function () {
        Info_1.UserInfo.addDiamond(this.baseDiamond * this.mult);
        Info_1.UserInfo.save();
        this.getComponent(View_1.default).hide();
    };
    LevelupDialog.prototype.click_getex = function () {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Levelup);
        if (choise == 1) {
            Platform_1.default.share(this.share_suc, this);
        }
        else if (choise == 0) {
            this.share_suc();
        }
        else {
            //video
            Platform_1.default.watch_video(this.share_suc, this);
        }
    };
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "btnLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "tipLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelupDialog.prototype, "levelLabel", void 0);
    LevelupDialog = __decorate([
        ccclass
    ], LevelupDialog);
    return LevelupDialog;
}(cc.Component));
exports.default = LevelupDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXExldmVsdXBEaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdDQUErQztBQUMvQyxpRUFBNEQ7QUFDNUQsd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBc0VDO1FBbkVHLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBSTdCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixVQUFJLEdBQVUsQ0FBQyxDQUFDO1FBRWhCLGlCQUFXLEdBQVUsQ0FBQyxDQUFDOztJQXFEM0IsQ0FBQztJQW5ERyw4QkFBTSxHQUFOLGNBQVcsQ0FBQztJQUNaLDZCQUFLLEdBQUwsY0FBVSxDQUFDO0lBQ1gsK0JBQU8sR0FBUCxVQUFRLEtBQUssRUFBQyxDQUFDO1FBRVgsS0FBSztRQUNMLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFFN0QsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUN0QjtZQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRSxLQUFLLENBQUE7U0FDMUM7YUFBSTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtTQUNoQjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRSxNQUFNLENBQUE7SUFDL0QsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFFSSxlQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUVJLGVBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEMsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFFSSxJQUFJLE1BQU0sR0FBRyxlQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBRyxNQUFNLElBQUksQ0FBQyxFQUNkO1lBQ0ksa0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFLLElBQUcsTUFBTSxJQUFJLENBQUMsRUFDcEI7WUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7YUFBSTtZQUNELE9BQU87WUFDUCxrQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFBO1NBQzVDO0lBRUwsQ0FBQztJQWxFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNVO0lBSTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ007SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDTTtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNRO0lBYlYsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXNFakM7SUFBRCxvQkFBQztDQXRFRCxBQXNFQyxDQXRFMEMsRUFBRSxDQUFDLFNBQVMsR0FzRXREO2tCQXRFb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3XCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9QbGF0Zm9ybVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsdXBEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGRpYW1vbmRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBidG5MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGlwTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxldmVsTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgbXVsdDpudW1iZXIgPSAxO1xuXG4gICAgYmFzZURpYW1vbmQ6bnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG4gICAgb25TaG93bihsZXZlbCxwKVxuICAgIHtcbiAgICAgICAgLy/nu5npkrvnn7NcbiAgICAgICAgcCA9IE1hdGgubWluKHAsMSk7XG4gICAgICAgIGxldCBkaWFtb25kID0gTWF0aC5mbG9vcihNYXRoLm1heCgzMCAqIHAsMTApKVxuICAgICAgICB0aGlzLmJhc2VEaWFtb25kID0gZGlhbW9uZDtcbiAgICAgICAgdGhpcy5kaWFtb25kTGFiZWwuc3RyaW5nID0gZGlhbW9uZC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiLSDnrKwgJXMg5YWzIC0gXCIsbGV2ZWwpXG5cbiAgICAgICAgaWYoTWF0aC5yYW5kb20oKSA+IDAuNylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tdWx0ID0gZy5yYW5kb21JbnQoMyw2KVxuICAgICAgICAgICAgdGhpcy5idG5MYWJlbC5zdHJpbmcgPSB0aGlzLm11bHQgK1wi5YCN6aKG5Y+WXCJcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmJ0bkxhYmVsLnN0cmluZyA9IFwi5Y+M5YCN6aKG5Y+WXCJcbiAgICAgICAgICAgIHRoaXMubXVsdCA9IDJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpcExhYmVsLnN0cmluZyA9XCLmga3llpzojrflvpdcIiArIHRoaXMuYnRuTGFiZWwuc3RyaW5nICtcIuWlluWKseacuuS8mlwiXG4gICAgfVxuXG4gICAgY2xpY2tfZ2V0KClcbiAgICB7XG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5iYXNlRGlhbW9uZCk7XG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKTtcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG4gICAgc2hhcmVfc3VjKClcbiAgICB7XG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5iYXNlRGlhbW9uZCp0aGlzLm11bHQpO1xuICAgICAgICBVc2VySW5mby5zYXZlKCk7XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgIH1cblxuICAgIGNsaWNrX2dldGV4KClcbiAgICB7XG4gICAgICAgIGxldCBjaG9pc2UgPSBVc2VySW5mby5nZXRDaG9pY2UoQ2hvaWNlVHlwZS5MZXZlbHVwKTtcbiAgICAgICAgaWYoY2hvaXNlID09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFBsYXRmb3JtLnNoYXJlKHRoaXMuc2hhcmVfc3VjLHRoaXMpO1xuICAgICAgICB9ZWxzZSBpZihjaG9pc2UgPT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFyZV9zdWMoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL3ZpZGVvXG4gICAgICAgICAgICBQbGF0Zm9ybS53YXRjaF92aWRlbyh0aGlzLnNoYXJlX3N1Yyx0aGlzKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iXX0=