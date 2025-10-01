
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/PsFxPlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc35b3gh69DGIz45mLQJxDM', 'PsFxPlayer');
// framework/plugin_boosts/gamesys/PsFxPlayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PsFx_1 = require("./PsFx");
var Device_1 = require("./Device");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PsFxPlayer = /** @class */ (function (_super) {
    __extends(PsFxPlayer, _super);
    function PsFxPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this._fx = null;
        _this.spriteFrame = null;
        _this.duration = -1;
        _this.randomRotaion = false;
        return _this;
        // update (dt) {}
    }
    PsFxPlayer.prototype.start = function () {
    };
    Object.defineProperty(PsFxPlayer.prototype, "fx", {
        get: function () {
            if (this._fx == null && this.prefab) {
                var node = cc.instantiate(this.prefab);
                if (node == null)
                    return null;
                var fx = node.getComponent(PsFx_1.default);
                if (fx == null) {
                    fx = this.addComponent(PsFx_1.default);
                }
                node.setPosition(0, 0);
                node.setParent(this.node);
                this._fx = fx;
            }
            return this._fx;
        },
        enumerable: false,
        configurable: true
    });
    PsFxPlayer.prototype.isPlaying = function () {
        return this.fx.isPlaying;
    };
    PsFxPlayer.prototype.onEnable = function () {
    };
    PsFxPlayer.prototype.onDisable = function () {
        var fx = this._fx;
        if (fx)
            fx.node.active = false;
    };
    PsFxPlayer.prototype.sleep = function (sec) {
        return new Promise(function (resolve, reject) {
            setTimeout(function (_) {
                resolve();
            }, sec);
        });
    };
    ;
    PsFxPlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Device_1.default.playEffect(this.audioClip, false);
                        fx = this.fx;
                        if (!fx) return [3 /*break*/, 1];
                        fx.node.active = true;
                        if (this.randomRotaion)
                            fx.node.rotation = g.randomInt(0, 360);
                        fx.reset();
                        return [2 /*return*/, fx.play(this.audioClip, this.spriteFrame)];
                    case 1:
                        if (!(this.duration > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sleep(this.duration * 1000)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Prefab)
    ], PsFxPlayer.prototype, "prefab", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PsFxPlayer.prototype, "spriteFrame", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], PsFxPlayer.prototype, "audioClip", void 0);
    __decorate([
        property
    ], PsFxPlayer.prototype, "duration", void 0);
    __decorate([
        property
    ], PsFxPlayer.prototype, "randomRotaion", void 0);
    PsFxPlayer = __decorate([
        ccclass
    ], PsFxPlayer);
    return PsFxPlayer;
}(cc.Component));
exports.default = PsFxPlayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxQc0Z4UGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBMEI7QUFDMUIsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBbUZDO1FBaEZHLFlBQU0sR0FBYSxJQUFJLENBQUE7UUFFdkIsU0FBRyxHQUFRLElBQUksQ0FBQztRQUdoQixpQkFBVyxHQUFrQixJQUFJLENBQUE7UUFNakMsY0FBUSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBR3JCLG1CQUFhLEdBQVksS0FBSyxDQUFDOztRQWlFL0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFoRUcsMEJBQUssR0FBTDtJQUNBLENBQUM7SUFFRCxzQkFBSSwwQkFBRTthQUFOO1lBRUksSUFBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUNsQztnQkFDSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsSUFBRyxJQUFJLElBQUksSUFBSTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDN0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQTtnQkFDaEMsSUFBRyxFQUFFLElBQUksSUFBSSxFQUNiO29CQUNJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQsOEJBQVMsR0FBVDtRQUVJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFRLEdBQVI7SUFHQSxDQUFDO0lBRUQsOEJBQVMsR0FBVDtRQUVJLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEIsSUFBRyxFQUFFO1lBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRCwwQkFBSyxHQUFMLFVBQU0sR0FBRztRQUNMLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUMsTUFBTTtZQUM5QixVQUFVLENBQUMsVUFBQSxDQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxFQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ1osQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQUEsQ0FBQztJQUVJLHlCQUFJLEdBQVY7Ozs7Ozt3QkFFSSxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzs2QkFDZCxFQUFFLEVBQUYsd0JBQUU7d0JBRUQsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFHLElBQUksQ0FBQyxhQUFhOzRCQUNqQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQzt3QkFDMUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNYLHNCQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUM7OzZCQUU3QyxDQUFBLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBLEVBQWpCLHdCQUFpQjt3QkFDaEIscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFBOzt3QkFBdEMsU0FBc0MsQ0FBQzs7Ozs7O0tBRWxEO0lBN0VEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ0c7SUFLdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDUTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7aURBQ1I7SUFHdkI7UUFEQyxRQUFRO2dEQUNZO0lBR3JCO1FBREMsUUFBUTtxREFDc0I7SUFqQmQsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW1GOUI7SUFBRCxpQkFBQztDQW5GRCxBQW1GQyxDQW5GdUMsRUFBRSxDQUFDLFNBQVMsR0FtRm5EO2tCQW5Gb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQc0Z4IGZyb20gXCIuL1BzRnhcIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4vRGV2aWNlXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHNGeFBsYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHByZWZhYjpjYy5QcmVmYWIgPSBudWxsXG5cbiAgICBfZng6UHNGeCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgc3ByaXRlRnJhbWU6Y2MuU3ByaXRlRnJhbWUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkF1ZGlvQ2xpcH0pXG4gICAgYXVkaW9DbGlwOmNjLkF1ZGlvQ2xpcDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGR1cmF0aW9uOm51bWJlciA9IC0xO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcmFuZG9tUm90YWlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc3RhcnQgKCkge1xuICAgIH1cblxuICAgIGdldCBmeCgpXG4gICAge1xuICAgICAgICBpZih0aGlzLl9meCA9PSBudWxsICYmIHRoaXMucHJlZmFiKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcbiAgICAgICAgICAgIGlmKG5vZGUgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgZnggPSBub2RlLmdldENvbXBvbmVudChQc0Z4KVxuICAgICAgICAgICAgaWYoZnggPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmeCA9IHRoaXMuYWRkQ29tcG9uZW50KFBzRngpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLDApO1xuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMuX2Z4ID0gZng7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Z4O1xuICAgIH1cblxuICAgIGlzUGxheWluZygpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5meC5pc1BsYXlpbmc7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKVxuICAgIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgb25EaXNhYmxlKClcbiAgICB7XG4gICAgICAgIGxldCBmeCA9IHRoaXMuX2Z4O1xuICAgICAgICBpZihmeClcbiAgICAgICAgICAgIGZ4Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2xlZXAoc2VjKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXz0+e1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gLCBzZWMpXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGFzeW5jIHBsYXkoKVxuICAgIHtcbiAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QodGhpcy5hdWRpb0NsaXAsZmFsc2UpO1xuICAgICAgICBsZXQgZnggPSB0aGlzLmZ4O1xuICAgICAgICBpZihmeClcbiAgICAgICAge1xuICAgICAgICAgICAgZngubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYodGhpcy5yYW5kb21Sb3RhaW9uKVxuICAgICAgICAgICAgICAgIGZ4Lm5vZGUucm90YXRpb24gPSBnLnJhbmRvbUludCgwLDM2MCk7ICBcbiAgICAgICAgICAgIGZ4LnJlc2V0KCk7XG4gICAgICAgICAgICByZXR1cm4gZngucGxheSh0aGlzLmF1ZGlvQ2xpcCx0aGlzLnNwcml0ZUZyYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLmR1cmF0aW9uID4gMCApXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zbGVlcCh0aGlzLmR1cmF0aW9uICogMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19