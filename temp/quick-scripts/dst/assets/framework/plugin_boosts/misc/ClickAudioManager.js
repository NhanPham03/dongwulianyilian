
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/ClickAudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '679c3x/ZwhD8KnIy6p5lX5y', 'ClickAudioManager');
// framework/plugin_boosts/misc/ClickAudioManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ClickAudio_1 = require("./ClickAudio");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ClickAudioManager = /** @class */ (function (_super) {
    __extends(ClickAudioManager, _super);
    function ClickAudioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.elastic = false;
        return _this;
        // update (dt) {}
    }
    ClickAudioManager.prototype.onLoad = function () {
        g.foreachNode(this.node, this.each, this);
    };
    ClickAudioManager.prototype.each = function (item) {
        //if button 
        if (!item.getComponent(cc.Button))
            return;
        var comp = item.getComponent(ClickAudio_1.default);
        if (comp == null) {
            comp = item.addComponent(ClickAudio_1.default);
            comp.elastic = this.elastic;
            comp.audio = this.audio;
        }
    };
    ClickAudioManager.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], ClickAudioManager.prototype, "audio", void 0);
    __decorate([
        property
    ], ClickAudioManager.prototype, "elastic", void 0);
    ClickAudioManager = __decorate([
        ccclass
    ], ClickAudioManager);
    return ClickAudioManager;
}(cc.Component));
exports.default = ClickAudioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxDbGlja0F1ZGlvTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNDO0FBQ2hDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBNkJDO1FBMUJHLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRzNCLGFBQU8sR0FBVyxLQUFLLENBQUM7O1FBc0J4QixpQkFBaUI7SUFDckIsQ0FBQztJQXJCRyxrQ0FBTSxHQUFOO1FBQ0ksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxJQUFZO1FBRWIsWUFBWTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFBO1FBQ3hDLElBQUcsSUFBSSxJQUFJLElBQUksRUFDZjtZQUNJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUNELGlDQUFLLEdBQUw7SUFFQSxDQUFDO0lBdkJEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQztvREFDSjtJQUczQjtRQURDLFFBQVE7c0RBQ2U7SUFOUCxpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQTZCckM7SUFBRCx3QkFBQztDQTdCRCxBQTZCQyxDQTdCOEMsRUFBRSxDQUFDLFNBQVMsR0E2QjFEO2tCQTdCb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENsaWNrQXVkaW8gZnJvbSBcIi4vQ2xpY2tBdWRpb1wiO1xuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja0F1ZGlvTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkF1ZGlvQ2xpcH0pXG4gICAgYXVkaW8gOmNjLkF1ZGlvQ2xpcCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHlcbiAgICBlbGFzdGljOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGcuZm9yZWFjaE5vZGUodGhpcy5ub2RlLHRoaXMuZWFjaCx0aGlzKVxuICAgIH1cbiAgICBcbiAgICBlYWNoKGl0ZW06Y2MuTm9kZSlcbiAgICB7XG4gICAgICAgIC8vaWYgYnV0dG9uIFxuICAgICAgICBpZiAoIWl0ZW0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpIHJldHVybjtcbiAgICAgICAgbGV0IGNvbXAgPSBpdGVtLmdldENvbXBvbmVudChDbGlja0F1ZGlvKVxuICAgICAgICBpZihjb21wID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbXAgPSBpdGVtLmFkZENvbXBvbmVudChDbGlja0F1ZGlvKTtcbiAgICAgICAgICAgIGNvbXAuZWxhc3RpYyA9IHRoaXMuZWxhc3RpY1xuICAgICAgICAgICAgY29tcC5hdWRpbyA9IHRoaXMuYXVkaW87XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==