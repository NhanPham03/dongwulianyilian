"use strict";
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