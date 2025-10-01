
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/HbDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec5aa26/dhLhpV83mVeVmkA', 'HbDialog');
// Game/Scripts/ui/HbDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Platform_1 = require("../../../framework/Platform");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var Res_1 = require("../hex-lines-game/Res");
var Info_1 = require("../Info");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HbDialog = /** @class */ (function (_super) {
    __extends(HbDialog, _super);
    function HbDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HbDialog.prototype.onLoad = function () { };
    HbDialog.prototype.start = function () { };
    HbDialog.prototype.click = function () {
        var choise = Info_1.UserInfo.getChoice(Info_1.ChoiceType.HB);
        if (choise == 1) {
            Platform_1.default.share(this.share_suc, this);
        }
        else {
            Platform_1.default.watch_video(this.share_suc, this);
        }
    };
    HbDialog.prototype.share_suc = function () {
        var cfg = Res_1.R.skinConfig.json[3];
        ToastManager_1.Toast.make("恭喜获得皮肤 ：" + cfg.text);
        Device_1.default.playEffect(Res_1.R.audio_unlock);
        Info_1.UserInfo.unlock(cfg.id);
        Info_1.UserInfo.selectedSkin = cfg.id;
        Info_1.UserInfo.save();
        ViewManager_1.default.instance.show("Game/ShopDialog");
        this.getComponent(View_1.default).hide();
    };
    HbDialog = __decorate([
        ccclass
    ], HbDialog);
    return HbDialog;
}(cc.Component));
exports.default = HbDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEhiRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFFbkQsK0VBQTBFO0FBQzFFLGlGQUF5RTtBQUN6RSw2Q0FBMEM7QUFDMUMsZ0NBQStDO0FBQy9DLDBFQUFxRTtBQUNyRSxpRUFBNEQ7QUFFdEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7O0lBMkJBLENBQUM7SUF6QkcseUJBQU0sR0FBTixjQUFXLENBQUM7SUFDWix3QkFBSyxHQUFMLGNBQVUsQ0FBQztJQUNYLHdCQUFLLEdBQUw7UUFFSSxJQUFJLE1BQU0sR0FBRyxlQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBRyxNQUFNLElBQUksQ0FBQyxFQUNkO1lBQ0ksa0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUN0QzthQUFLO1lBQ0Ysa0JBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUVMLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBRUksSUFBSSxHQUFHLEdBQUcsT0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUIsb0JBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsZUFBUSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9CLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUExQmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EyQjVCO0lBQUQsZUFBQztDQTNCRCxBQTJCQyxDQTNCcUMsRUFBRSxDQUFDLFNBQVMsR0EyQmpEO2tCQTNCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgTHVja3lEaWFsb2cgZnJvbSBcIi4vTHVja3lEaWFsb2dcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuLi9oZXgtbGluZXMtZ2FtZS9SZXNcIjtcbmltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhiRGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG9uTG9hZCAoKSB7fVxuICAgIHN0YXJ0ICgpIHt9XG4gICAgY2xpY2soKVxuICAgIHtcbiAgICAgICAgbGV0IGNob2lzZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLkhCKTtcbiAgICAgICAgaWYoY2hvaXNlID09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFBsYXRmb3JtLnNoYXJlKHRoaXMuc2hhcmVfc3VjLHRoaXMpXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIFBsYXRmb3JtLndhdGNoX3ZpZGVvKHRoaXMuc2hhcmVfc3VjLHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNoYXJlX3N1YygpXG4gICAge1xuICAgICAgICBsZXQgY2ZnID0gUi5za2luQ29uZmlnLmpzb25bM11cbiAgICAgICAgVG9hc3QubWFrZShcIuaBreWWnOiOt+W+l+earuiCpCDvvJpcIiArIGNmZy50ZXh0KSBcbiAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb191bmxvY2spO1xuICAgICAgICBVc2VySW5mby51bmxvY2soY2ZnLmlkKTtcbiAgICAgICAgVXNlckluZm8uc2VsZWN0ZWRTa2luID0gY2ZnLmlkO1xuICAgICAgICBVc2VySW5mby5zYXZlKCk7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIilcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpO1xuICAgIH1cbn0iXX0=