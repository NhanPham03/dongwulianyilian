
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/ShopDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b7cbT64WtHxpoRfvlVr4EN', 'ShopDialog');
// Game/Scripts/ui/ShopDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShopItemTemplate_1 = require("./ShopItemTemplate");
var SpriteFrameCache_1 = require("../../../framework/plugin_boosts/misc/SpriteFrameCache");
var Res_1 = require("../hex-lines-game/Res");
var Platform_1 = require("../../../framework/Platform");
var Info_1 = require("../Info");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var UIFunctions_1 = require("../../../framework/plugin_boosts/ui/UIFunctions");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var Main_1 = require("../Main");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopDialog = /** @class */ (function (_super) {
    __extends(ShopDialog, _super);
    function ShopDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollview = null;
        _this.freeDiamondLabel = null;
        _this.freeDiamondBtn = null;
        return _this;
    }
    ShopDialog.prototype.onLoad = function () {
        // this.scrollview
    };
    ShopDialog.prototype.start = function () {
    };
    ShopDialog.prototype.onShown = function () {
        var _this = this;
        // {"id":"1","mini_img":"a1","img":"a2","cost":"100"},
        this.scrollview.showlist(function (node, data, i) {
            // console.log(i,data);
            var item = node.getComponent(ShopItemTemplate_1.default);
            item.data = data;
            item.diamondLabel.string = data.cost;
            var isLocked = !Info_1.UserInfo.isUnlock(data.id);
            item.btnBuyNode.active = isLocked;
            item.maskNode.active = isLocked;
            item.borderNode.color = cc.Color.WHITE;
            item.titleLabel.string = data.text;
            item.selectedFlag.active = Info_1.UserInfo.selectedSkin == data.id;
            item.btnSignal.add(_this.click_unlock, _this);
            SpriteFrameCache_1.default.instance.getSpriteFrame("Game/Textures/ThumbBgs/" + data.mini_img + ".jpg").then(function (sf) { return item.bgmini.spriteFrame = sf; });
        }, Res_1.R.skinConfig.json);
        this.refreshBtnStatus();
    };
    ShopDialog.prototype.refreshBtnStatus = function () {
        if (g.isNextDay(Info_1.UserInfo.shopFreeDiamondTime)) {
            this.freeDiamondLabel.string = "免费得50";
            UIFunctions_1.default.setButtonEnabled(this.freeDiamondBtn, true);
        }
        else {
            this.freeDiamondLabel.string = "已领取";
            UIFunctions_1.default.setButtonEnabled(this.freeDiamondBtn, false);
        }
    };
    ShopDialog.prototype.click_close = function () {
    };
    ShopDialog.prototype.share_succ = function () {
        Info_1.UserInfo.addDiamond(50);
        Info_1.UserInfo.shopFreeDiamondTime = new Date().getTime();
        Info_1.UserInfo.save();
        this.refreshBtnStatus();
    };
    ShopDialog.prototype.click_free = function () {
        var choice = Info_1.UserInfo.getChoice(Info_1.ChoiceType.Shop);
        if (choice == 1) {
            Platform_1.default.share(this.share_succ, this);
        }
        else if (choice == 0) {
            this.share_succ();
        }
        else {
            //video
            Platform_1.default.watch_video(this.share_succ, this);
        }
    };
    ShopDialog.prototype.selectBg = function (data) {
        Info_1.UserInfo.selectedSkin = data.id;
        Info_1.UserInfo.save();
        this.onShown();
    };
    ShopDialog.prototype.click_unlock = function (data) {
        if (Info_1.UserInfo.isUnlock(data.id)) {
            //select 
            this.selectBg(data);
            ToastManager_1.Toast.make("已选择 " + data.text);
            return;
        }
        if (Info_1.UserInfo.diamond >= data.cost) {
            Info_1.UserInfo.diamond -= data.cost;
            Info_1.UserInfo.unlock(data.id);
            this.selectBg(data);
            ToastManager_1.Toast.make(cc.js.formatStr("%s已解锁", data.text));
            Device_1.default.playEffect(Res_1.R.audio_unlock);
            if (Main_1.default.instance)
                Main_1.default.instance.refreshRedpoints();
        }
        else {
            ToastManager_1.Toast.make("钻石不足");
            Device_1.default.playEffect(Res_1.R.audio_invalid);
        }
    };
    __decorate([
        property(cc.ScrollView)
    ], ShopDialog.prototype, "scrollview", void 0);
    __decorate([
        property(cc.Label)
    ], ShopDialog.prototype, "freeDiamondLabel", void 0);
    __decorate([
        property(cc.Button)
    ], ShopDialog.prototype, "freeDiamondBtn", void 0);
    ShopDialog = __decorate([
        ccclass
    ], ShopDialog);
    return ShopDialog;
}(cc.Component));
exports.default = ShopDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXFNob3BEaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUNsRCwyRkFBc0Y7QUFDdEYsNkNBQTBDO0FBQzFDLHdEQUFtRDtBQUNuRCxnQ0FBK0M7QUFDL0MsaUZBQXlFO0FBQ3pFLCtFQUEwRTtBQUMxRSwwRUFBcUU7QUFDckUsZ0NBQTJCO0FBRXJCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBbUdDO1FBaEdHLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxzQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFHbEMsb0JBQWMsR0FBYyxJQUFJLENBQUM7O0lBMEZyQyxDQUFDO0lBeEZHLDJCQUFNLEdBQU47UUFDSSxrQkFBa0I7SUFDdEIsQ0FBQztJQUVELDBCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsNEJBQU8sR0FBUDtRQUFBLGlCQWtCQztRQWpCRyxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBQyxJQUFhLEVBQUUsSUFBUyxFQUFFLENBQVM7WUFDekQsdUJBQXVCO1lBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsMEJBQWdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksUUFBUSxHQUFHLENBQUMsZUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENB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SUFBSSxlQUFRLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDL0IsZUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlCLGVBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkIsb0JBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQy9DLGdCQUFNLENBQUMsVUFBVSxDQUFDLE9BQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNqQyxJQUFJLGNBQUksQ0FBQyxRQUFRO2dCQUNiLGNBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtTQUN2QzthQUFNO1lBQ0gsb0JBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsT0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ3JDO0lBQ0wsQ0FBQztJQTlGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO2tEQUNTO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDYTtJQVRoQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBbUc5QjtJQUFELGlCQUFDO0NBbkdELEFBbUdDLENBbkd1QyxFQUFFLENBQUMsU0FBUyxHQW1HbkQ7a0JBbkdvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNob3BJdGVtVGVtcGxhdGUgZnJvbSBcIi4vU2hvcEl0ZW1UZW1wbGF0ZVwiO1xuaW1wb3J0IFNwcml0ZUZyYW1lQ2FjaGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL21pc2MvU3ByaXRlRnJhbWVDYWNoZVwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuLi9oZXgtbGluZXMtZ2FtZS9SZXNcIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgeyBVc2VySW5mbywgQ2hvaWNlVHlwZSB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBVSUZ1bmN0aW9ucyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVUlGdW5jdGlvbnNcIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcERpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBzY3JvbGx2aWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBmcmVlRGlhbW9uZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGZyZWVEaWFtb25kQnRuOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyB0aGlzLnNjcm9sbHZpZXdcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIG9uU2hvd24oKSB7XG4gICAgICAgIC8vIHtcImlkXCI6XCIxXCIsXCJtaW5pX2ltZ1wiOlwiYTFcIixcImltZ1wiOlwiYTJcIixcImNvc3RcIjpcIjEwMFwifSxcbiAgICAgICAgdGhpcy5zY3JvbGx2aWV3LnNob3dsaXN0KChub2RlOiBjYy5Ob2RlLCBkYXRhOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaSxkYXRhKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gbm9kZS5nZXRDb21wb25lbnQoU2hvcEl0ZW1UZW1wbGF0ZSk7XG4gICAgICAgICAgICBpdGVtLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgaXRlbS5kaWFtb25kTGFiZWwuc3RyaW5nID0gZGF0YS5jb3N0O1xuICAgICAgICAgICAgbGV0IGlzTG9ja2VkID0gIVVzZXJJbmZvLmlzVW5sb2NrKGRhdGEuaWQpO1xuICAgICAgICAgICAgaXRlbS5idG5CdXlOb2RlLmFjdGl2ZSA9IGlzTG9ja2VkXG4gICAgICAgICAgICBpdGVtLm1hc2tOb2RlLmFjdGl2ZSA9IGlzTG9ja2VkO1xuICAgICAgICAgICAgaXRlbS5ib3JkZXJOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgICAgICBpdGVtLnRpdGxlTGFiZWwuc3RyaW5nID0gZGF0YS50ZXh0O1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZEZsYWcuYWN0aXZlID0gVXNlckluZm8uc2VsZWN0ZWRTa2luID09IGRhdGEuaWQ7XG4gICAgICAgICAgICBpdGVtLmJ0blNpZ25hbC5hZGQodGhpcy5jbGlja191bmxvY2ssIHRoaXMpXG4gICAgICAgICAgICBTcHJpdGVGcmFtZUNhY2hlLmluc3RhbmNlLmdldFNwcml0ZUZyYW1lKFwiR2FtZS9UZXh0dXJlcy9UaHVtYkJncy9cIiArIGRhdGEubWluaV9pbWcgKyBcIi5qcGdcIikudGhlbihzZiA9PiBpdGVtLmJnbWluaS5zcHJpdGVGcmFtZSA9IHNmKVxuICAgICAgICB9LCBSLnNraW5Db25maWcuanNvbilcblxuICAgICAgICB0aGlzLnJlZnJlc2hCdG5TdGF0dXMoKTtcbiAgICB9XG5cbiAgICByZWZyZXNoQnRuU3RhdHVzKCkge1xuICAgICAgICBpZiAoZy5pc05leHREYXkoVXNlckluZm8uc2hvcEZyZWVEaWFtb25kVGltZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZnJlZURpYW1vbmRMYWJlbC5zdHJpbmcgPSBcIuWFjei0ueW+lzUwXCJcbiAgICAgICAgICAgIFVJRnVuY3Rpb25zLnNldEJ1dHRvbkVuYWJsZWQodGhpcy5mcmVlRGlhbW9uZEJ0biwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJlZURpYW1vbmRMYWJlbC5zdHJpbmcgPSBcIuW3sumihuWPllwiXG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5zZXRCdXR0b25FbmFibGVkKHRoaXMuZnJlZURpYW1vbmRCdG4sIGZhbHNlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tfY2xvc2UoKSB7XG5cbiAgICB9XG5cbiAgICBzaGFyZV9zdWNjKCkge1xuICAgICAgICBVc2VySW5mby5hZGREaWFtb25kKDUwKTtcbiAgICAgICAgVXNlckluZm8uc2hvcEZyZWVEaWFtb25kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgdGhpcy5yZWZyZXNoQnRuU3RhdHVzKCk7XG4gICAgfVxuXG4gICAgY2xpY2tfZnJlZSgpIHtcbiAgICAgICAgbGV0IGNob2ljZSA9IFVzZXJJbmZvLmdldENob2ljZShDaG9pY2VUeXBlLlNob3ApXG4gICAgICAgIGlmIChjaG9pY2UgPT0gMSkge1xuICAgICAgICAgICAgUGxhdGZvcm0uc2hhcmUodGhpcy5zaGFyZV9zdWNjLCB0aGlzKVxuICAgICAgICB9IGVsc2UgaWYgKGNob2ljZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3N1Y2MoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy92aWRlb1xuICAgICAgICAgICAgUGxhdGZvcm0ud2F0Y2hfdmlkZW8odGhpcy5zaGFyZV9zdWNjLCB0aGlzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0QmcoZGF0YSkge1xuICAgICAgICBVc2VySW5mby5zZWxlY3RlZFNraW4gPSBkYXRhLmlkO1xuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgdGhpcy5vblNob3duKCk7XG4gICAgfVxuXG4gICAgY2xpY2tfdW5sb2NrKGRhdGEpIHtcbiAgICAgICAgaWYgKFVzZXJJbmZvLmlzVW5sb2NrKGRhdGEuaWQpKSB7XG4gICAgICAgICAgICAvL3NlbGVjdCBcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QmcoZGF0YSk7XG4gICAgICAgICAgICBUb2FzdC5tYWtlKFwi5bey6YCJ5oupIFwiICsgZGF0YS50ZXh0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVc2VySW5mby5kaWFtb25kID49IGRhdGEuY29zdCkge1xuICAgICAgICAgICAgVXNlckluZm8uZGlhbW9uZCAtPSBkYXRhLmNvc3Q7XG4gICAgICAgICAgICBVc2VySW5mby51bmxvY2soZGF0YS5pZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEJnKGRhdGEpXG4gICAgICAgICAgICBUb2FzdC5tYWtlKGNjLmpzLmZvcm1hdFN0cihcIiVz5bey6Kej6ZSBXCIsIGRhdGEudGV4dCkpXG4gICAgICAgICAgICBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX3VubG9jaylcbiAgICAgICAgICAgIGlmIChNYWluLmluc3RhbmNlKVxuICAgICAgICAgICAgICAgIE1haW4uaW5zdGFuY2UucmVmcmVzaFJlZHBvaW50cygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUb2FzdC5tYWtlKFwi6ZK755+z5LiN6LazXCIpXG4gICAgICAgICAgICBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX2ludmFsaWQpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=