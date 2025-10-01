"use strict";
cc._RF.push(module, 'b9f111MRGFKg7CINn50/KaQ', 'MoreGameItem');
// framework/wxsdk/MoreGameItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreGameItem = /** @class */ (function (_super) {
    __extends(MoreGameItem, _super);
    function MoreGameItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.content = null;
        _this.icon = null;
        _this.btn = null;
        _this.btnSelf = null;
        _this.star_progress = null;
        _this.player_num = null;
        return _this;
    }
    MoreGameItem.prototype.setStar = function (c) {
        this.star_progress.width = 125 / 5 * c;
    };
    MoreGameItem.prototype.onLoad = function () {
        this.btnSelf = this.getComponent(cc.Button);
    };
    __decorate([
        property(cc.Label)
    ], MoreGameItem.prototype, "title", void 0);
    __decorate([
        property(cc.Label)
    ], MoreGameItem.prototype, "content", void 0);
    __decorate([
        property(cc.Sprite)
    ], MoreGameItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Button)
    ], MoreGameItem.prototype, "btn", void 0);
    __decorate([
        property(cc.Node)
    ], MoreGameItem.prototype, "star_progress", void 0);
    __decorate([
        property(cc.Label)
    ], MoreGameItem.prototype, "player_num", void 0);
    MoreGameItem = __decorate([
        ccclass
    ], MoreGameItem);
    return MoreGameItem;
}(cc.Component));
exports.default = MoreGameItem;

cc._RF.pop();