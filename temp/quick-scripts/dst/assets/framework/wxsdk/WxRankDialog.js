
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/WxRankDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80fd3Nn4dFF45QylMONs3ro', 'WxRankDialog');
// framework/wxsdk/WxRankDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Platform_1 = require("../Platform");
var View_1 = require("../plugin_boosts/ui/View");
var ViewManager_1 = require("../plugin_boosts/ui/ViewManager");
var Signal_1 = require("../plugin_boosts/misc/Signal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WxRankDialog = /** @class */ (function (_super) {
    __extends(WxRankDialog, _super);
    function WxRankDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.first = true;
        _this.closeSignal = new Signal_1.default();
        return _this;
    }
    WxRankDialog.prototype.onShown = function (callback, target) {
        this.closeSignal.on(callback, target);
        if (this.first) {
            this.scheduleOnce(this.reOpen, 0.1);
        }
        else {
            Platform_1.default.showRank();
        }
    };
    WxRankDialog.prototype.reOpen = function () {
        Platform_1.default.showRank();
        this.first = false;
        this.getComponent(View_1.default).hide();
        // setTimeout(() => {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
        // }, 100);
    };
    WxRankDialog.prototype.click_close = function () {
        Platform_1.default.hideRank();
        this.getComponent(View_1.default).hide();
        this.closeSignal.fire();
    };
    WxRankDialog = __decorate([
        ccclass
    ], WxRankDialog);
    return WxRankDialog;
}(cc.Component));
exports.default = WxRankDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcV3hSYW5rRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBbUM7QUFDbkMsaURBQTRDO0FBQzVDLCtEQUEwRDtBQUUxRCx1REFBa0Q7QUFHNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFnQ0M7UUE5QkcsV0FBSyxHQUFXLElBQUksQ0FBQztRQUVyQixpQkFBVyxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDOztJQTRCL0IsQ0FBQztJQTNCRyw4QkFBTyxHQUFQLFVBQVEsUUFBUSxFQUFDLE1BQU07UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQTtTQUNyQzthQUFJO1lBQ0Qsa0JBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QjtJQUVMLENBQUM7SUFFRCw2QkFBTSxHQUFOO1FBRUksa0JBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLHFCQUFxQjtRQUNqQixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNwRCxXQUFXO0lBQ2YsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFFSSxrQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBL0JnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBZ0NoQztJQUFELG1CQUFDO0NBaENELEFBZ0NDLENBaEN5QyxFQUFFLENBQUMsU0FBUyxHQWdDckQ7a0JBaENvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4uL3BsdWdpbl9ib29zdHMvdWkvVmlld1wiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9wbHVnaW5fYm9vc3RzL3V0aWxzL0NvbW1vblwiO1xuaW1wb3J0IFNpZ25hbCBmcm9tIFwiLi4vcGx1Z2luX2Jvb3N0cy9taXNjL1NpZ25hbFwiO1xuXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3hSYW5rRGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBcbiAgICBmaXJzdDpib29sZWFuID0gdHJ1ZTtcblxuICAgIGNsb3NlU2lnbmFsID0gbmV3IFNpZ25hbCgpO1xuICAgIG9uU2hvd24oY2FsbGJhY2ssdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWduYWwub24oY2FsbGJhY2ssdGFyZ2V0KVxuICAgICAgICBpZih0aGlzLmZpcnN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnJlT3BlbiwwLjEpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgUGxhdGZvcm0uc2hvd1JhbmsoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZU9wZW4oKVxuICAgIHtcbiAgICAgICAgUGxhdGZvcm0uc2hvd1JhbmsoKTtcbiAgICAgICAgdGhpcy5maXJzdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKCk7XG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIndlY2hhdC9XeFJhbmtEaWFsb2dcIilcbiAgICAgICAgLy8gfSwgMTAwKTtcbiAgICB9XG5cbiAgICBjbGlja19jbG9zZSgpXG4gICAge1xuICAgICAgICBQbGF0Zm9ybS5oaWRlUmFuaygpO1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VTaWduYWwuZmlyZSgpO1xuICAgIH1cbn1cbiJdfQ==