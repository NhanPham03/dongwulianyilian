
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/RankingTemplate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFJhbmtpbmdUZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFtQkM7UUFaRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsbUJBQWEsR0FBVyxLQUFLLENBQUM7UUFFOUIsVUFBSSxHQUFPLElBQUksQ0FBQzs7SUFDcEIsQ0FBQztJQWpCRyxnQ0FBTSxHQUFOLGNBQVcsQ0FBQztJQUNaLCtCQUFLLEdBQUwsY0FBVSxDQUFDO0lBSVg7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzswREFDUztJQWhCYixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBbUJuQztJQUFELHNCQUFDO0NBbkJELEFBbUJDLENBbkI0QyxFQUFFLENBQUMsU0FBUyxHQW1CeEQ7a0JBbkJvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5raW5nVGVtcGxhdGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgb25Mb2FkICgpIHt9XG4gICAgc3RhcnQgKCkge31cblxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHJhbmtMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbmFtZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGhpZ2hsaWdodE5vZGU6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZGF0YTphbnkgPSBudWxsO1xufSJdfQ==