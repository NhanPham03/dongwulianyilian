"use strict";
cc._RF.push(module, '249bdp7Eg1D5J3WM/KShIsp', 'RankingTemplate');
// Game/Scripts/ui/RankingTemplate.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankingTemplate = /** @class */ (function (_super) {
    __extends(RankingTemplate, _super);
    function RankingTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rankLabel = null;
        _this.nameLabel = null;
        _this.levelLabel = null;
        _this.highlightNode = false;
        _this.data = null;
        return _this;
    }
    RankingTemplate.prototype.onLoad = function () { };
    RankingTemplate.prototype.start = function () { };
    __decorate([
        property(cc.Label)
    ], RankingTemplate.prototype, "rankLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RankingTemplate.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RankingTemplate.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Boolean)
    ], RankingTemplate.prototype, "highlightNode", void 0);
    RankingTemplate = __decorate([
        ccclass
    ], RankingTemplate);
    return RankingTemplate;
}(cc.Component));
exports.default = RankingTemplate;

cc._RF.pop();