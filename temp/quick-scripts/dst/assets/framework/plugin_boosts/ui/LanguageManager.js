
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/LanguageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '641ec7EogpPr44ghO9Sy2IA', 'LanguageManager');
// framework/plugin_boosts/ui/LanguageManager.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var Res_1 = require("../../../Game/Scripts/hex-lines-game/Res");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LanguageManager = /** @class */ (function (_super) {
    __extends(LanguageManager, _super);
    function LanguageManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.region = "vn";
        return _this;
        // update (dt) {}
    }
    LanguageManager_1 = LanguageManager;
    LanguageManager.prototype.loadLocale = function (r) {
        for (var _i = 0, _a = Res_1.R.localeJson.json.locale; _i < _a.length; _i++) {
            var locale = _a[_i];
            if (locale.region == r) {
                this._locale = locale;
                this.node.emit("lang-changed");
                break;
            }
        }
    };
    LanguageManager.prototype.getText = function (key) {
        return this._locale[key] || key;
    };
    LanguageManager.prototype.onLoad = function () {
        LanguageManager_1.instance = this;
        g.setGlobalInstance(this);
        this.loadLocale(this.region);
        cc.game.addPersistRootNode(this.node);
    };
    LanguageManager.prototype.start = function () {
        console.log("Current locale: " + this.region);
    };
    var LanguageManager_1;
    __decorate([
        property
    ], LanguageManager.prototype, "region", void 0);
    LanguageManager = LanguageManager_1 = __decorate([
        ccclass
    ], LanguageManager);
    return LanguageManager;
}(cc.Component));
exports.default = LanguageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQiw0RUFBNEU7QUFDNUUsbUJBQW1CO0FBQ25CLHNGQUFzRjtBQUN0Riw4QkFBOEI7QUFDOUIsc0ZBQXNGOztBQUV0RixnRUFBNkQ7QUFFdkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFzQ0M7UUE5QkcsWUFBTSxHQUEwQixJQUFJLENBQUM7O1FBNkJyQyxpQkFBaUI7SUFDckIsQ0FBQzt3QkF0Q29CLGVBQWU7SUFVaEMsb0NBQVUsR0FBVixVQUFXLENBQUM7UUFDUixLQUFxQixVQUF3QixFQUF4QixLQUFBLE9BQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBeEIsY0FBd0IsRUFBeEIsSUFBd0IsRUFBRTtZQUExQyxJQUFNLE1BQU0sU0FBQTtZQUNiLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFL0IsTUFBTTthQUNUO1NBQ0o7SUFDTCxDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLEdBQUc7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0ksaUJBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsK0JBQUssR0FBTDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQW1CLElBQUksQ0FBQyxNQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDOztJQTNCRDtRQURDLFFBQVE7bURBQzRCO0lBUnBCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FzQ25DO0lBQUQsc0JBQUM7Q0F0Q0QsQUFzQ0MsQ0F0QzRDLEVBQUUsQ0FBQyxTQUFTLEdBc0N4RDtrQkF0Q29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzIuNC9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzIuNC9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzIuNC9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgUiB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL1NjcmlwdHMvaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFuZ3VhZ2VNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIF9sb2NhbGU6IGFueTtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIHN0YXRpYyBpbnN0YW5jZTogTGFuZ3VhZ2VNYW5hZ2VyO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcmVnaW9uOiBcInpoLUNOXCIgfCBcInZuXCIgfCBcImVuXCIgPSBcInZuXCI7XG5cbiAgICBsb2FkTG9jYWxlKHIpIHtcbiAgICAgICAgZm9yIChjb25zdCBsb2NhbGUgb2YgUi5sb2NhbGVKc29uLmpzb24ubG9jYWxlKSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlLnJlZ2lvbiA9PSByKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KFwibGFuZy1jaGFuZ2VkXCIpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlW2tleV0gfHwga2V5O1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlID0gdGhpcztcbiAgICAgICAgZy5zZXRHbG9iYWxJbnN0YW5jZSh0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkTG9jYWxlKHRoaXMucmVnaW9uKTtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEN1cnJlbnQgbG9jYWxlOiAke3RoaXMucmVnaW9ufWApO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=