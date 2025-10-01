"use strict";
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