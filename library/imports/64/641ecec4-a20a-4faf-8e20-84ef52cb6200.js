"use strict";
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