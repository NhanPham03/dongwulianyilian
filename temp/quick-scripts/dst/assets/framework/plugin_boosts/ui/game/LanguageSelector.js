
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/game/LanguageSelector.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f0708qzMcBHRqFZyTR8C/tR', 'LanguageSelector');
// framework/plugin_boosts/ui/game/LanguageSelector.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var LanguageManager_1 = require("../LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LanguageSelector = /** @class */ (function (_super) {
    __extends(LanguageSelector, _super);
    function LanguageSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LanguageSelector.prototype.onLoad = function () {
        this.manager = LanguageManager_1.default.instance;
    };
    LanguageSelector.prototype.start = function () { };
    LanguageSelector.prototype.setRegion = function (event, msg) {
        if (!this.manager) {
            console.warn("LanguageSelector: manager is null");
            return;
        }
        this.manager.loadLocale(event.target.name);
        this.manager.region = event.target.name;
        console.log("LanguageSelector: Switching to " + event.target.name);
    };
    LanguageSelector = __decorate([
        ccclass
    ], LanguageSelector);
    return LanguageSelector;
}(cc.Component));
exports.default = LanguageSelector;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcZ2FtZVxcTGFuZ3VhZ2VTZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsNEVBQTRFO0FBQzVFLG1CQUFtQjtBQUNuQixzRkFBc0Y7QUFDdEYsOEJBQThCO0FBQzlCLHNGQUFzRjs7QUFFdEYsc0RBQWlEO0FBRTNDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThDLG9DQUFZO0lBQTFEOztJQW9CQSxDQUFDO0lBaEJHLGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUFlLENBQUMsUUFBUSxDQUFDO0lBQzVDLENBQUM7SUFFRCxnQ0FBSyxHQUFMLGNBQVMsQ0FBQztJQUVWLG9DQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsR0FBRztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQWtDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBTSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQW5CZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FvQnBDO0lBQUQsdUJBQUM7Q0FwQkQsQUFvQkMsQ0FwQjZDLEVBQUUsQ0FBQyxTQUFTLEdBb0J6RDtrQkFwQm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMi40L21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMi40L21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMi40L21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9MYW5ndWFnZU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYW5ndWFnZVNlbGVjdG9yIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG1hbmFnZXI6IExhbmd1YWdlTWFuYWdlcjtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge31cblxuICAgIHNldFJlZ2lvbihldmVudCwgbXNnKSB7XG4gICAgICAgIGlmICghdGhpcy5tYW5hZ2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJMYW5ndWFnZVNlbGVjdG9yOiBtYW5hZ2VyIGlzIG51bGxcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZXIubG9hZExvY2FsZShldmVudC50YXJnZXQubmFtZSk7XG4gICAgICAgIHRoaXMubWFuYWdlci5yZWdpb24gPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2coYExhbmd1YWdlU2VsZWN0b3I6IFN3aXRjaGluZyB0byAke2V2ZW50LnRhcmdldC5uYW1lfWApO1xuICAgIH1cbn1cbiJdfQ==