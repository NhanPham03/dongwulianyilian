
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/PauseDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFBhdXNlRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFFN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7O0lBcUJBLENBQUM7SUFuQkcsNEJBQU0sR0FBTixjQUFXLENBQUM7SUFDWiwyQkFBSyxHQUFMLGNBQVUsQ0FBQztJQUdYLGlDQUFXLEdBQVg7UUFFSSxrQkFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBVSxHQUFWO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUdELG1DQUFhLEdBQWI7UUFFSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBcEJnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBcUIvQjtJQUFELGtCQUFDO0NBckJELEFBcUJDLENBckJ3QyxFQUFFLENBQUMsU0FBUyxHQXFCcEQ7a0JBckJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXVzZURpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQgKCkge31cbiAgICBzdGFydCAoKSB7fVxuXG5cbiAgICBjbGlja19zaGFyZSgpXG4gICAge1xuICAgICAgICBQbGF0Zm9ybS5zaGFyZSgpO1xuICAgIH1cblxuICAgIGNsaWNrX2hvbWUoKVxuICAgIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblwiKVxuICAgIH1cblxuXG4gICAgY2xpY2tfcmVzdGFydCgpXG4gICAge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lXCIpXG4gICAgfVxufSJdfQ==