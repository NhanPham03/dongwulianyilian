
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
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
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
        // Toast.make("恭喜获得皮肤 ：" + cfg.text) 
        var text = LanguageManager_1.default.instance.getText("skin_get");
        ToastManager_1.Toast.make(text + " " + cfg.text);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEhiRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFFbkQsK0VBQTBFO0FBQzFFLGlGQUF5RTtBQUN6RSw2Q0FBMEM7QUFDMUMsZ0NBQStDO0FBQy9DLDBFQUFxRTtBQUNyRSxpRUFBNEQ7QUFDNUQsdUZBQWtGO0FBRTVFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEOztJQTZCQSxDQUFDO0lBM0JHLHlCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1osd0JBQUssR0FBTCxjQUFVLENBQUM7SUFDWCx3QkFBSyxHQUFMO1FBRUksSUFBSSxNQUFNLEdBQUcsZUFBUSxDQUFDLFNBQVMsQ0FBQyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUcsTUFBTSxJQUFJLENBQUMsRUFDZDtZQUNJLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDdEM7YUFBSztZQUNGLGtCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0M7SUFFTCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUVJLElBQUksR0FBRyxHQUFHLE9BQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlCLHFDQUFxQztRQUNyQyxJQUFNLElBQUksR0FBRyx5QkFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekQsb0JBQUssQ0FBQyxJQUFJLENBQUksSUFBSSxTQUFJLEdBQUcsQ0FBQyxJQUFNLENBQUMsQ0FBQTtRQUNqQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsZUFBUSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9CLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUE1QmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E2QjVCO0lBQUQsZUFBQztDQTdCRCxBQTZCQyxDQTdCcUMsRUFBRSxDQUFDLFNBQVMsR0E2QmpEO2tCQTdCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgTHVja3lEaWFsb2cgZnJvbSBcIi4vTHVja3lEaWFsb2dcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuLi9oZXgtbGluZXMtZ2FtZS9SZXNcIjtcbmltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld1wiO1xuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvTGFuZ3VhZ2VNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGJEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgb25Mb2FkICgpIHt9XG4gICAgc3RhcnQgKCkge31cbiAgICBjbGljaygpXG4gICAge1xuICAgICAgICBsZXQgY2hvaXNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuSEIpO1xuICAgICAgICBpZihjaG9pc2UgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgUGxhdGZvcm0uc2hhcmUodGhpcy5zaGFyZV9zdWMsdGhpcylcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgUGxhdGZvcm0ud2F0Y2hfdmlkZW8odGhpcy5zaGFyZV9zdWMsdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2hhcmVfc3VjKClcbiAgICB7XG4gICAgICAgIGxldCBjZmcgPSBSLnNraW5Db25maWcuanNvblszXVxuICAgICAgICAvLyBUb2FzdC5tYWtlKFwi5oGt5Zac6I635b6X55qu6IKkIO+8mlwiICsgY2ZnLnRleHQpIFxuICAgICAgICBjb25zdCB0ZXh0ID0gTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQoXCJza2luX2dldFwiKVxuICAgICAgICBUb2FzdC5tYWtlKGAke3RleHR9ICR7Y2ZnLnRleHR9YClcbiAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb191bmxvY2spO1xuICAgICAgICBVc2VySW5mby51bmxvY2soY2ZnLmlkKTtcbiAgICAgICAgVXNlckluZm8uc2VsZWN0ZWRTa2luID0gY2ZnLmlkO1xuICAgICAgICBVc2VySW5mby5zYXZlKCk7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1Nob3BEaWFsb2dcIilcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpO1xuICAgIH1cbn0iXX0=