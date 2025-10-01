
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/DCBackground.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d867LSTWNEB7LUL3KAjVve', 'DCBackground');
// Game/Scripts/ui/DCBackground.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DCUI_1 = require("../../../framework/plugin_boosts/ui/DCUI");
var SpriteFrameCache_1 = require("../../../framework/plugin_boosts/misc/SpriteFrameCache");
var Info_1 = require("../Info");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DCBackground = /** @class */ (function (_super) {
    __extends(DCBackground, _super);
    function DCBackground() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DCBackground.prototype.onLoad = function () {
        this.sprite = this.getComponent(cc.Sprite);
    };
    DCBackground.prototype.start = function () { };
    DCBackground.prototype.onValueChanged = function (v) {
        var _this = this;
        var data = Info_1.UserInfo.getSkinById(v);
        console.log(data);
        SpriteFrameCache_1.default.instance.getSpriteFrame("Game/Textures/Bgs/" + data.img + ".png").then(function (sf) { return _this.sprite.spriteFrame = sf; });
    };
    DCBackground = __decorate([
        ccclass
    ], DCBackground);
    return DCBackground;
}(DCUI_1.default));
exports.default = DCBackground;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXERDQmFja2dyb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBQzVELDJGQUFzRjtBQUN0RixnQ0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQUk7SUFBOUM7O0lBZ0JBLENBQUM7SUFiRyw2QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNEJBQUssR0FBTCxjQUFVLENBQUM7SUFFWCxxQ0FBYyxHQUFkLFVBQWUsQ0FBQztRQUFoQixpQkFLQztRQUhHLElBQUksSUFBSSxHQUFHLGVBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQiwwQkFBZ0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixHQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFFLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUE1QixDQUE0QixDQUFDLENBQUM7SUFDMUgsQ0FBQztJQWZnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBZ0JoQztJQUFELG1CQUFDO0NBaEJELEFBZ0JDLENBaEJ5QyxjQUFJLEdBZ0I3QztrQkFoQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRENVSSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvRENVSVwiO1xuaW1wb3J0IFNwcml0ZUZyYW1lQ2FjaGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL21pc2MvU3ByaXRlRnJhbWVDYWNoZVwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vSW5mb1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERDQmFja2dyb3VuZCBleHRlbmRzIERDVUkge1xuXG4gICAgc3ByaXRlOmNjLlNwcml0ZTtcbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHt9XG5cbiAgICBvblZhbHVlQ2hhbmdlZCh2KVxuICAgIHtcbiAgICAgICAgbGV0IGRhdGEgPSBVc2VySW5mby5nZXRTa2luQnlJZCh2KTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIFNwcml0ZUZyYW1lQ2FjaGUuaW5zdGFuY2UuZ2V0U3ByaXRlRnJhbWUoXCJHYW1lL1RleHR1cmVzL0Jncy9cIitkYXRhLmltZytcIi5wbmdcIikudGhlbihzZj0+dGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSBzZik7XG4gICAgfVxufSJdfQ==