
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/GetDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '714f07aCe9N55KDdTLTUVv8', 'GetDialog');
// Game/Scripts/ui/GetDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var Info_1 = require("../Info");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var Platform_1 = require("../../../framework/Platform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetDialog = /** @class */ (function (_super) {
    __extends(GetDialog, _super);
    function GetDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diamondLabel = null;
        _this.count = 0;
        _this.node_close = null;
        return _this;
    }
    GetDialog.prototype.onLoad = function () { };
    GetDialog.prototype.start = function () { };
    GetDialog.prototype.share_suc = function () {
        Info_1.UserInfo.addDiamond(this.count * 2);
        Info_1.UserInfo.save();
        // Device.playEffect(R.audio_get_diamond)
        this.getComponent(View_1.default).hide();
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    GetDialog.prototype.click_double = function () {
        //share 
        //if share suc 
        // this.share_suc()
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Get);
        if (choice == 1) {
            Platform_1.default.share(this.share_suc, this);
        }
        else if (choice == 0) {
            this.share_suc();
        }
        else {
            //video\
            Platform_1.default.watch_video(this.share_suc, this);
        }
    };
    GetDialog.prototype.onShown = function (count) {
        this.count = count;
        // SpriteFrameCache.instance.getSpriteFrame("Game/textures/car/" + cfg.img).then(sf=>this.icon.spriteFrame= sf);
        this.diamondLabel.string = "+" + count;
        this.node_close.active = false;
        this.unschedule(this.delayShow);
        this.scheduleOnce(this.delayShow, 2);
    };
    GetDialog.prototype.delayShow = function () {
        this.node_close.active = true;
    };
    GetDialog.prototype.click_no = function () {
        this.getComponent(View_1.default).hide();
        Info_1.UserInfo.addDiamond(this.count);
        Info_1.UserInfo.save();
        // Device.playEffect(R.audio_get_diamond)
        ViewManager_1.default.instance.show("Game/LuckyDialog");
    };
    __decorate([
        property(cc.Label)
    ], GetDialog.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GetDialog.prototype, "node_close", void 0);
    GetDialog = __decorate([
        ccclass
    ], GetDialog);
    return GetDialog;
}(cc.Component));
exports.default = GetDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEdldERpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBQzVELGdDQUErQztBQUcvQywrRUFBMEU7QUFFMUUsd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBZ0VDO1FBMURHLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBVSxDQUFDLENBQUM7UUFHakIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O0lBcUQvQixDQUFDO0lBOURHLDBCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1oseUJBQUssR0FBTCxjQUFVLENBQUM7SUFXWCw2QkFBUyxHQUFUO1FBRUksZUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBRSxDQUFBO1FBQ3BDLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUVJLFFBQVE7UUFDUixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLElBQUksTUFBTSxHQUFHLGVBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMvQyxJQUFHLE1BQU0sSUFBSSxDQUFDLEVBQ2Q7WUFDSSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO2FBQUssSUFBRyxNQUFNLElBQUksQ0FBQyxFQUNwQjtZQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNuQjthQUFLO1lBQ0YsUUFBUTtZQUNSLGtCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDNUM7SUFDTCxDQUFDO0lBRUQsMkJBQU8sR0FBUCxVQUFRLEtBQUs7UUFFVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixnSEFBZ0g7UUFDaEgsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBRUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ2pDLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixlQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQTtRQUNoQyxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZix5Q0FBeUM7UUFDekMscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDakQsQ0FBQztJQXpERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNVO0lBSzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1M7SUFYVixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBZ0U3QjtJQUFELGdCQUFDO0NBaEVELEFBZ0VDLENBaEVzQyxFQUFFLENBQUMsU0FBUyxHQWdFbEQ7a0JBaEVvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXcgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdcIjtcbmltcG9ydCB7IFVzZXJJbmZvLCBDaG9pY2VUeXBlIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuaW1wb3J0IEx1Y2t5RGlhbG9nIGZyb20gXCIuL0x1Y2t5RGlhbG9nXCI7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy9nYW1lc3lzL0RldmljZVwiO1xuaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZXREaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgb25Mb2FkICgpIHt9XG4gICAgc3RhcnQgKCkge31cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkaWFtb25kTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgY291bnQ6bnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG5vZGVfY2xvc2U6Y2MuTm9kZSA9ICBudWxsO1xuXG5cbiAgICBzaGFyZV9zdWMoKVxuICAgIHtcbiAgICAgICAgVXNlckluZm8uYWRkRGlhbW9uZCh0aGlzLmNvdW50ICogMiApXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKTtcbiAgICAgICAgLy8gRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb19nZXRfZGlhbW9uZClcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpO1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MdWNreURpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX2RvdWJsZSgpXG4gICAge1xuICAgICAgICAvL3NoYXJlIFxuICAgICAgICAvL2lmIHNoYXJlIHN1YyBcbiAgICAgICAgLy8gdGhpcy5zaGFyZV9zdWMoKVxuICAgICAgICBsZXQgY2hvaWNlID0gVXNlckluZm8uZ2V0Q2hvaWNlKENob2ljZVR5cGUuR2V0KVxuICAgICAgICBpZihjaG9pY2UgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgUGxhdGZvcm0uc2hhcmUodGhpcy5zaGFyZV9zdWMsdGhpcyk7ICAgXG4gICAgICAgIH1lbHNlIGlmKGNob2ljZSA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3N1YygpXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIC8vdmlkZW9cXFxuICAgICAgICAgICAgUGxhdGZvcm0ud2F0Y2hfdmlkZW8odGhpcy5zaGFyZV9zdWMsdGhpcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hvd24oY291bnQpXG4gICAge1xuICAgICAgICB0aGlzLmNvdW50ID0gY291bnQ7XG4gICAgICAgIC8vIFNwcml0ZUZyYW1lQ2FjaGUuaW5zdGFuY2UuZ2V0U3ByaXRlRnJhbWUoXCJHYW1lL3RleHR1cmVzL2Nhci9cIiArIGNmZy5pbWcpLnRoZW4oc2Y9PnRoaXMuaWNvbi5zcHJpdGVGcmFtZT0gc2YpO1xuICAgICAgICB0aGlzLmRpYW1vbmRMYWJlbC5zdHJpbmcgPSAgXCIrXCIgKyBjb3VudDtcbiAgICAgICAgdGhpcy5ub2RlX2Nsb3NlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmRlbGF5U2hvdylcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5kZWxheVNob3csMilcbiAgICB9XG5cbiAgICBkZWxheVNob3coKVxuICAgIHtcbiAgICAgICAgdGhpcy5ub2RlX2Nsb3NlLmFjdGl2ZSA9IHRydWVcbiAgICB9XG5cbiAgICBjbGlja19ubygpXG4gICAge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKCk7XG4gICAgICAgIFVzZXJJbmZvLmFkZERpYW1vbmQodGhpcy5jb3VudCApXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX2dldF9kaWFtb25kKVxuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9MdWNreURpYWxvZ1wiKVxuICAgIH1cbn0iXX0=