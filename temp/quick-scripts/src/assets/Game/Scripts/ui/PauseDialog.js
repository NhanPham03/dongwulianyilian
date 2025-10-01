"use strict";
cc._RF.push(module, '83fb9osUoVEppfk8B6mkJYV', 'PauseDialog');
// Game/Scripts/ui/PauseDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Platform_1 = require("../../../framework/Platform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PauseDialog = /** @class */ (function (_super) {
    __extends(PauseDialog, _super);
    function PauseDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PauseDialog.prototype.onLoad = function () { };
    PauseDialog.prototype.start = function () { };
    PauseDialog.prototype.click_share = function () {
        Platform_1.default.share();
    };
    PauseDialog.prototype.click_home = function () {
        cc.director.loadScene("Main");
    };
    PauseDialog.prototype.click_restart = function () {
        cc.director.loadScene("Game");
    };
    PauseDialog = __decorate([
        ccclass
    ], PauseDialog);
    return PauseDialog;
}(cc.Component));
exports.default = PauseDialog;

cc._RF.pop();