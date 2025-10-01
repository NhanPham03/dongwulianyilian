
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/Res.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '81fb28+15NDNaH9M81MKxwU', 'Res');
// Game/Scripts/hex-lines-game/Res.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.R = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.R = null;
var Res = /** @class */ (function (_super) {
    __extends(Res, _super);
    function Res() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.localeJson = null;
        _this.levelJson = null;
        _this.TilePrefab = null;
        _this.TileShadow = null;
        _this.Line46 = null;
        _this.Line37 = null;
        _this.Line19 = null;
        _this.audio_bgm = null;
        _this.audio_unlock = null;
        _this.audio_invalid = null;
        _this.audio_draw = null;
        _this.audio_down = null;
        _this.audio_win = null;
        _this.audio_link = null;
        _this.audio_get_diamond = null;
        _this.tileTextures = [];
        _this.animalPrefabs = [];
        _this.skinConfig = null;
        _this.luckyConfig = null;
        _this.colors = [];
        return _this;
    }
    Res.prototype.onLoad = function () {
        exports.R = this;
    };
    Res.prototype.start = function () {
    };
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "localeJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "levelJson", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "TilePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "TileShadow", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "Line46", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "Line37", void 0);
    __decorate([
        property(cc.Prefab)
    ], Res.prototype, "Line19", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_bgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_unlock", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_invalid", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_draw", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_down", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_win", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_link", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Res.prototype, "audio_get_diamond", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Res.prototype, "tileTextures", void 0);
    __decorate([
        property([cc.Prefab])
    ], Res.prototype, "animalPrefabs", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "skinConfig", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Res.prototype, "luckyConfig", void 0);
    __decorate([
        property([cc.Color])
    ], Res.prototype, "colors", void 0);
    Res = __decorate([
        ccclass
    ], Res);
    return Res;
}(cc.Component));
exports.default = Res;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXFJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRS9CLFFBQUEsQ0FBQyxHQUFPLElBQUksQ0FBQztBQUV4QjtJQUFpQyx1QkFBWTtJQUE3QztRQUFBLHFFQXNFQztRQW5FRyxnQkFBVSxHQUFnQixJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFnQixJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixZQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFnQixJQUFJLENBQUM7UUFHOUIsa0JBQVksR0FBZ0IsSUFBSSxDQUFDO1FBR2pDLG1CQUFhLEdBQWdCLElBQUksQ0FBQztRQUdsQyxnQkFBVSxHQUFnQixJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBRy9CLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRzlCLGdCQUFVLEdBQWdCLElBQUksQ0FBQztRQUcvQix1QkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBR3RDLGtCQUFZLEdBQW9CLEVBQUUsQ0FBQTtRQUdsQyxtQkFBYSxHQUFlLEVBQUUsQ0FBQTtRQUc5QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFHaEMsaUJBQVcsR0FBa0IsSUFBSSxDQUFDO1FBR2xDLFlBQU0sR0FBZ0IsRUFBRSxDQUFBOztJQVU1QixDQUFDO0lBUkcsb0JBQU0sR0FBTjtRQUNJLFNBQUMsR0FBRyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQsbUJBQUssR0FBTDtJQUVBLENBQUM7SUFqRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzsyQ0FDUTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDOzBDQUNPO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyQ0FDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VDQUNJO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dUNBQ0k7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1Q0FDSTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7MENBQ0Q7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDOzZDQUNFO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQzs4Q0FDRztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7MkNBQ0E7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDOzJDQUNBO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQzswQ0FDRDtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7MkNBQ0E7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDO2tEQUNPO0lBR3RDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZDQUNPO0lBR2xDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzhDQUNRO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7MkNBQ1M7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0Q0FDVztJQUdsQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt1Q0FDRztJQTVEUCxHQUFHO1FBRHZCLE9BQU87T0FDYSxHQUFHLENBc0V2QjtJQUFELFVBQUM7Q0F0RUQsQUFzRUMsQ0F0RWdDLEVBQUUsQ0FBQyxTQUFTLEdBc0U1QztrQkF0RW9CLEdBQUciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IHZhciBSOlJlcyA9IG51bGw7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxuICAgIGxvY2FsZUpzb246Y2MuSnNvbkFzc2V0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Kc29uQXNzZXQpXG4gICAgbGV2ZWxKc29uOmNjLkpzb25Bc3NldCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIFRpbGVQcmVmYWI6Y2MuUHJlZmFiICA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIFRpbGVTaGFkb3c6Y2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgTGluZTQ2OmNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIExpbmUzNzpjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBMaW5lMTk6Y2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBhdWRpb19iZ206Y2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBhdWRpb191bmxvY2s6Y2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBhdWRpb19pbnZhbGlkOmNjLkF1ZGlvQ2xpcCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkF1ZGlvQ2xpcH0pXG4gICAgYXVkaW9fZHJhdzpjYy5BdWRpb0NsaXAgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5BdWRpb0NsaXB9KVxuICAgIGF1ZGlvX2Rvd246Y2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBhdWRpb193aW46Y2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQXVkaW9DbGlwfSlcbiAgICBhdWRpb19saW5rOmNjLkF1ZGlvQ2xpcCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkF1ZGlvQ2xpcH0pXG4gICAgYXVkaW9fZ2V0X2RpYW1vbmQ6Y2MuQXVkaW9DbGlwID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHRpbGVUZXh0dXJlczpjYy5TcHJpdGVGcmFtZVtdID0gW11cbiAgICBcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgYW5pbWFsUHJlZmFiczpjYy5QcmVmYWJbXSA9IFtdXG5cbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxuICAgIHNraW5Db25maWc6Y2MuSnNvbkFzc2V0ID0gIG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxuICAgIGx1Y2t5Q29uZmlnOiBjYy5Kc29uQXNzZXQgPSAgbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuQ29sb3JdKVxuICAgIGNvbG9yczogY2MuQ29sb3IgW10gPSBbXVxuICAgIFxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIFIgPSB0aGlzO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxufSJdfQ==