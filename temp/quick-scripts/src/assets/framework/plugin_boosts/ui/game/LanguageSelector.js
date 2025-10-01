"use strict";
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