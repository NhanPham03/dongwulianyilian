
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LocalizedLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '814c1HwtVFNLaiMu7AVRLev', 'LocalizedLabel');
// Game/Scripts/ui/LocalizedLabel.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LocalizedLabel = /** @class */ (function (_super) {
    __extends(LocalizedLabel, _super);
    function LocalizedLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textKey = "";
        _this._label = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    LocalizedLabel.prototype.updateLabel = function () {
        if (!this._label || !this.textKey) {
            return;
        }
        var localizedText = LanguageManager_1.default.instance.getText(this.textKey);
        this._label.string = localizedText;
    };
    LocalizedLabel.prototype.onLoad = function () {
        this._label = this.getComponent(cc.Label);
        this.updateLabel();
        LanguageManager_1.default.instance.node.on("lang-changed", this.updateLabel, this);
    };
    LocalizedLabel.prototype.start = function () { };
    __decorate([
        property
    ], LocalizedLabel.prototype, "textKey", void 0);
    LocalizedLabel = __decorate([
        ccclass
    ], LocalizedLabel);
    return LocalizedLabel;
}(cc.Component));
exports.default = LocalizedLabel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXExvY2FsaXplZExhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQiw0RUFBNEU7QUFDNUUsbUJBQW1CO0FBQ25CLHNGQUFzRjtBQUN0Riw4QkFBOEI7QUFDOUIsc0ZBQXNGOztBQUV0Rix1RkFBa0Y7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUE0QkM7UUF6QkcsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUViLFlBQU0sR0FBYSxJQUFJLENBQUM7O1FBc0JoQyxpQkFBaUI7SUFDckIsQ0FBQztJQXJCRyx3QkFBd0I7SUFFeEIsb0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixPQUFPO1NBQ1Y7UUFFRCxJQUFNLGFBQWEsR0FBRyx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLHlCQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELDhCQUFLLEdBQUwsY0FBVSxDQUFDO0lBdEJYO1FBREMsUUFBUTttREFDWTtJQUhKLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0E0QmxDO0lBQUQscUJBQUM7Q0E1QkQsQUE0QkMsQ0E1QjJDLEVBQUUsQ0FBQyxTQUFTLEdBNEJ2RDtrQkE1Qm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzIuNC9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzIuNC9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzIuNC9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvTGFuZ3VhZ2VNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxpemVkTGFiZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5XG4gICAgdGV4dEtleTogc3RyaW5nID0gXCJcIjtcblxuICAgIHByaXZhdGUgX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIHVwZGF0ZUxhYmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xhYmVsIHx8ICF0aGlzLnRleHRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBcblxuICAgICAgICBjb25zdCBsb2NhbGl6ZWRUZXh0ID0gTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQodGhpcy50ZXh0S2V5KTtcbiAgICAgICAgdGhpcy5fbGFiZWwuc3RyaW5nID0gbG9jYWxpemVkVGV4dDtcbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLl9sYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5pbnN0YW5jZS5ub2RlLm9uKFwibGFuZy1jaGFuZ2VkXCIsIHRoaXMudXBkYXRlTGFiZWwsIHRoaXMpXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge31cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=