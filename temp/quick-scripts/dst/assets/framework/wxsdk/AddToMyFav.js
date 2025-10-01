
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/AddToMyFav.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7431S0vqlPiqNKDpwvWLTc', 'AddToMyFav');
// framework/wxsdk/AddToMyFav.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Platform_1 = require("../Platform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PositionType;
(function (PositionType) {
    PositionType[PositionType["left"] = 0] = "left";
    PositionType[PositionType["bottom"] = 1] = "bottom";
    PositionType[PositionType["auto"] = 2] = "auto";
})(PositionType || (PositionType = {}));
var AddToMyFav = /** @class */ (function (_super) {
    __extends(AddToMyFav, _super);
    function AddToMyFav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointer = null;
        _this.posType = PositionType.auto;
        _this.hideAfterSec = 30;
        _this.widget = null;
        return _this;
    }
    AddToMyFav.prototype.onLoad = function () {
        this.widget = this.getComponent(cc.Widget);
    };
    AddToMyFav.prototype.start = function () {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            var options = Platform_1.default.getLaunchOptions();
            console.log("场景值 :", options);
            if (options.scene == 1001 || options.scene == 1089) {
                this.node.active = false;
                return;
            }
        }
        // if(g.isNextDay(UserInfo.showAddFavTime) )
        // {
        //     UserInfo.showAddFavTime = new Date().getTime();
        // }else{
        //     this.node.active = false;
        //     return;
        // }
        if (this.posType == PositionType.auto) {
            var ratio = cc.winSize.height / cc.winSize.width;
            if (ratio > 1.98) {
                this.showStyle2();
            }
            else {
                this.showStyle1();
            }
        }
        else if (this.posType == PositionType.bottom) {
            this.showStyle1();
        }
        else if (this.posType == PositionType.left) {
            this.showStyle2();
        }
        this.scheduleOnce(this.click_hide, this.hideAfterSec);
    };
    AddToMyFav.prototype.click_hide = function () {
        this.node.active = false;
    };
    AddToMyFav.prototype.showStyle1 = function () {
        this.pointer.rotation = 0;
        this.widget.top = 128;
        this.widget.right = 140;
        this.widget.updateAlignment();
    };
    AddToMyFav.prototype.showStyle2 = function () {
        this.pointer.rotation = 90;
        this.widget.top = 40;
        this.widget.right = 300;
        this.widget.updateAlignment();
    };
    __decorate([
        property(cc.Node)
    ], AddToMyFav.prototype, "pointer", void 0);
    __decorate([
        property({ type: cc.Enum(PositionType) })
    ], AddToMyFav.prototype, "posType", void 0);
    __decorate([
        property()
    ], AddToMyFav.prototype, "hideAfterSec", void 0);
    AddToMyFav = __decorate([
        ccclass
    ], AddToMyFav);
    return AddToMyFav;
}(cc.Component));
exports.default = AddToMyFav;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcQWRkVG9NeUZhdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0NBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDLElBQUssWUFLSjtBQUxELFdBQUssWUFBWTtJQUViLCtDQUFJLENBQUE7SUFDSixtREFBTSxDQUFBO0lBQ04sK0NBQUksQ0FBQTtBQUNSLENBQUMsRUFMSSxZQUFZLEtBQVosWUFBWSxRQUtoQjtBQUdEO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBNkVDO1FBMUVHLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFnQixZQUFZLENBQUMsSUFBSSxDQUFDO1FBR3pDLGtCQUFZLEdBQVUsRUFBRSxDQUFDO1FBRXpCLFlBQU0sR0FBYSxJQUFJLENBQUM7O0lBa0U1QixDQUFDO0lBaEVHLDJCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCwwQkFBSyxHQUFMO1FBQ0ksSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFDeEM7WUFDSSxJQUFJLE9BQU8sR0FBRyxrQkFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUE7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksRUFDakQ7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixPQUFPO2FBQ1Y7U0FDSjtRQUNELDRDQUE0QztRQUM1QyxJQUFJO1FBQ0osc0RBQXNEO1FBQ3RELFNBQVM7UUFDVCxnQ0FBZ0M7UUFDaEMsY0FBYztRQUNkLElBQUk7UUFDSixJQUFHLElBQUksQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksRUFDcEM7WUFDSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMvQyxJQUFHLEtBQUssR0FBRyxJQUFJLEVBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCO2lCQUFJO2dCQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtTQUNKO2FBQUssSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQzVDO1lBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ3BCO2FBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQ3pDO1lBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDakMsQ0FBQztJQUdELCtCQUFVLEdBQVY7UUFFSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUF6RUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUM7K0NBQ0U7SUFHekM7UUFEQyxRQUFRLEVBQUU7b0RBQ2M7SUFUUixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNkU5QjtJQUFELGlCQUFDO0NBN0VELEFBNkVDLENBN0V1QyxFQUFFLENBQUMsU0FBUyxHQTZFbkQ7a0JBN0VvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vLi4vR2FtZS9TY3JpcHRzL0luZm9cIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vUGxhdGZvcm1cIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cblxuZW51bSBQb3NpdGlvblR5cGVcbntcbiAgICBsZWZ0LFxuICAgIGJvdHRvbSxcbiAgICBhdXRvLFxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkVG9NeUZhdiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwb2ludGVyOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkVudW0oUG9zaXRpb25UeXBlKX0pXG4gICAgcG9zVHlwZTpQb3NpdGlvblR5cGUgPSBQb3NpdGlvblR5cGUuYXV0bztcblxuICAgIEBwcm9wZXJ0eSgpXG4gICAgaGlkZUFmdGVyU2VjOm51bWJlciA9IDMwO1xuXG4gICAgd2lkZ2V0OmNjLldpZGdldCA9IG51bGw7XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLndpZGdldCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IFBsYXRmb3JtLmdldExhdW5jaE9wdGlvbnMoKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlnLrmma/lgLwgOlwiICxvcHRpb25zKTtcbiAgICAgICAgICAgIGlmKG9wdGlvbnMuc2NlbmUgPT0gMTAwMSB8fCBvcHRpb25zLnNjZW5lID09IDEwODkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZihnLmlzTmV4dERheShVc2VySW5mby5zaG93QWRkRmF2VGltZSkgKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBVc2VySW5mby5zaG93QWRkRmF2VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZih0aGlzLnBvc1R5cGUgPT0gUG9zaXRpb25UeXBlLmF1dG8pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByYXRpbyA9IGNjLndpblNpemUuaGVpZ2h0L2NjLndpblNpemUud2lkdGg7XG4gICAgICAgICAgICBpZihyYXRpbyA+IDEuOTgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U3R5bGUyKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTdHlsZTEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYodGhpcy5wb3NUeXBlID09IFBvc2l0aW9uVHlwZS5ib3R0b20pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0eWxlMSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnBvc1R5cGUgPT0gUG9zaXRpb25UeXBlLmxlZnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0eWxlMigpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xpY2tfaGlkZSx0aGlzLmhpZGVBZnRlclNlYyk7XG4gICAgfVxuXG4gICAgY2xpY2tfaGlkZSgpXG4gICAge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2hvd1N0eWxlMSgpXG4gICAge1xuICAgICAgICB0aGlzLnBvaW50ZXIucm90YXRpb24gPSAwO1xuICAgICAgICB0aGlzLndpZGdldC50b3AgPSAxMjg7XG4gICAgICAgIHRoaXMud2lkZ2V0LnJpZ2h0ID0gMTQwO1xuICAgICAgICB0aGlzLndpZGdldC51cGRhdGVBbGlnbm1lbnQoKVxuICAgIH1cblxuXG4gICAgc2hvd1N0eWxlMigpXG4gICAge1xuICAgICAgICB0aGlzLnBvaW50ZXIucm90YXRpb24gPSA5MDtcbiAgICAgICAgdGhpcy53aWRnZXQudG9wID0gNDA7XG4gICAgICAgIHRoaXMud2lkZ2V0LnJpZ2h0ID0gMzAwO1xuICAgICAgICB0aGlzLndpZGdldC51cGRhdGVBbGlnbm1lbnQoKVxuICAgIH1cbn0iXX0=