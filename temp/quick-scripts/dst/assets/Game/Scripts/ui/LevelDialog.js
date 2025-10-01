
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LevelDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c94fc8PDtI1o3JM9m3WRKN', 'LevelDialog');
// Game/Scripts/ui/LevelDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Info_1 = require("../Info");
var LevelSelector_1 = require("../../../framework/plugin_boosts/ui/game/LevelSelector");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelDialog = /** @class */ (function (_super) {
    __extends(LevelDialog, _super);
    function LevelDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelDialog.prototype.onLoad = function () { };
    LevelDialog.prototype.start = function () { };
    LevelDialog.prototype.onShown = function () {
        this.selector.currentLevel = Info_1.UserInfo.level;
        this.selector.refresh();
        this.scheduleOnce(this.refreshLevels, 0.1);
    };
    LevelDialog.prototype.refreshLevels = function () {
        this.selector.scrollToCurrentLevel();
    };
    LevelDialog.prototype.select_level = function (lvnode) {
        this.gotoLevel(lvnode.name);
    };
    LevelDialog.prototype.refreshLevelItem = function (data) {
    };
    LevelDialog.prototype.gotoLevel = function (lv) {
        lv = parseInt(lv);
        console.log("enter level", lv);
        Info_1.UserInfo.currentLevel = lv;
        cc.director.loadScene("Game");
    };
    LevelDialog.prototype.click_continue = function () {
        this.gotoLevel(Info_1.UserInfo.level);
    };
    __decorate([
        property(LevelSelector_1.default)
    ], LevelDialog.prototype, "selector", void 0);
    LevelDialog = __decorate([
        ccclass
    ], LevelDialog);
    return LevelDialog;
}(cc.Component));
exports.default = LevelDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXExldmVsRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBbUM7QUFDbkMsd0ZBQW1GO0FBRTdFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEOztJQTBDQSxDQUFDO0lBeENHLDRCQUFNLEdBQU4sY0FBVyxDQUFDO0lBQ1osMkJBQUssR0FBTCxjQUFVLENBQUM7SUFJWCw2QkFBTyxHQUFQO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsZUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsbUNBQWEsR0FBYjtRQUVJLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLE1BQU07UUFHZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLElBQUk7SUFFckIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxFQUFFO1FBRVIsRUFBRSxHQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqQyxlQUFRLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUMzQixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUVJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFwQ0Q7UUFEQyxRQUFRLENBQUMsdUJBQWEsQ0FBQztpREFDRDtJQUxOLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EwQy9CO0lBQUQsa0JBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBMENwRDtrQkExQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgTGV2ZWxTZWxlY3RvciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvZ2FtZS9MZXZlbFNlbGVjdG9yXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgb25Mb2FkICgpIHt9XG4gICAgc3RhcnQgKCkge31cbiAgICBAcHJvcGVydHkoTGV2ZWxTZWxlY3RvcilcbiAgICBzZWxlY3RvcjpMZXZlbFNlbGVjdG9yO1xuXG4gICAgb25TaG93bigpXG4gICAge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLmN1cnJlbnRMZXZlbCA9IFVzZXJJbmZvLmxldmVsO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJlZnJlc2goKVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMucmVmcmVzaExldmVscywgMC4xKVxuICAgIH1cblxuICAgIHJlZnJlc2hMZXZlbHMoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5zY3JvbGxUb0N1cnJlbnRMZXZlbCgpO1xuICAgIH1cblxuICAgIHNlbGVjdF9sZXZlbChsdm5vZGUpXG4gICAge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nb3RvTGV2ZWwobHZub2RlLm5hbWUpXG4gICAgfVxuXG4gICAgcmVmcmVzaExldmVsSXRlbShkYXRhKVxuICAgIHtcbiAgICB9XG5cbiAgICBnb3RvTGV2ZWwobHYpXG4gICAge1xuICAgICAgICBsdiA9ICBwYXJzZUludChsdilcbiAgICAgICAgY29uc29sZS5sb2coXCJlbnRlciBsZXZlbFwiICAsIGx2KTtcbiAgICAgICAgVXNlckluZm8uY3VycmVudExldmVsID0gbHY7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVcIilcbiAgICB9XG5cbiAgICBjbGlja19jb250aW51ZSgpXG4gICAge1xuICAgICAgICB0aGlzLmdvdG9MZXZlbChVc2VySW5mby5sZXZlbClcbiAgICB9XG59Il19