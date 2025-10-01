
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/MoreGameComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '662f9RcpGtJGpMGll8qVj04', 'MoreGameComponent');
// framework/wxsdk/MoreGameComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MoreGameManager_1 = require("./MoreGameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreGameComponent = /** @class */ (function (_super) {
    __extends(MoreGameComponent, _super);
    function MoreGameComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isManaged = true;
        _this.refreshInterval = 60;
        _this.priority_min = 50;
        _this._list = [];
        return _this;
    }
    Object.defineProperty(MoreGameComponent.prototype, "count", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoreGameComponent.prototype, "manager", {
        get: function () {
            return MoreGameManager_1.default.instance;
        },
        enumerable: false,
        configurable: true
    });
    MoreGameComponent.prototype.requestTask = function () {
        var list = this.manager.getTasks(this.priority_min, this.count);
        this.manager.finishTasks(this._list);
        this.show(list);
        this.manager.startTasks(list);
    };
    MoreGameComponent.prototype.start = function () {
    };
    MoreGameComponent.prototype.onEnable = function () {
        this.schedule(this.requestTask, this.refreshInterval, cc.macro.REPEAT_FOREVER, 0);
    };
    MoreGameComponent.prototype.onDisable = function () {
        this.unschedule(this.requestTask);
    };
    MoreGameComponent.prototype.onShow = function () {
    };
    MoreGameComponent.prototype.show = function (list) {
        this._list = list;
        this.onShow();
    };
    Object.defineProperty(MoreGameComponent.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property
    ], MoreGameComponent.prototype, "refreshInterval", void 0);
    __decorate([
        property
    ], MoreGameComponent.prototype, "priority_min", void 0);
    MoreGameComponent = __decorate([
        ccclass
    ], MoreGameComponent);
    return MoreGameComponent;
}(cc.Component));
exports.default = MoreGameComponent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcTW9yZUdhbWVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUEwRDtBQUVwRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQXlEQztRQXRERyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLHFCQUFlLEdBQVcsRUFBRSxDQUFDO1FBRzdCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBRTFCLFdBQUssR0FBVSxFQUFFLENBQUE7O0lBOENyQixDQUFDO0lBNUNHLHNCQUFJLG9DQUFLO2FBQVQsY0FBWSxPQUFPLENBQUMsQ0FBQyxDQUFBLENBQUM7OztPQUFBO0lBRXRCLHNCQUFJLHNDQUFPO2FBQVg7WUFFSSxPQUFPLHlCQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsdUNBQVcsR0FBWDtRQUVJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxpQ0FBSyxHQUFMO0lBR0EsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxrQ0FBTSxHQUFOO0lBR0EsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxJQUFJO1FBRUwsSUFBSSxDQUFDLEtBQUssR0FBSSxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxzQkFBSSxtQ0FBSTthQUFSO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBbEREO1FBREMsUUFBUTs4REFDb0I7SUFHN0I7UUFEQyxRQUFROzJEQUNpQjtJQVRULGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBeURyQztJQUFELHdCQUFDO0NBekRELEFBeURDLENBekQ4QyxFQUFFLENBQUMsU0FBUyxHQXlEMUQ7a0JBekRvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9yZUdhbWVNYW5hZ2VyLCB7IFRhc2sgfSBmcm9tIFwiLi9Nb3JlR2FtZU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9yZUdhbWVDb21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnRcbntcbiAgICBfbWFuYWdlcjpNb3JlR2FtZU1hbmFnZXI7XG4gICAgaXNNYW5hZ2VkOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcmVmcmVzaEludGVydmFsOiBudW1iZXIgPSA2MDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaW9yaXR5X21pbiA6bnVtYmVyID0gNTA7XG5cbiAgICBfbGlzdDpUYXNrW10gPSBbXVxuXG4gICAgZ2V0IGNvdW50KCl7cmV0dXJuIDA7fVxuXG4gICAgZ2V0IG1hbmFnZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIE1vcmVHYW1lTWFuYWdlci5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICByZXF1ZXN0VGFzaygpXG4gICAge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMubWFuYWdlci5nZXRUYXNrcyh0aGlzLnByaW9yaXR5X21pbix0aGlzLmNvdW50KTtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLmZpbmlzaFRhc2tzKHRoaXMuX2xpc3QpXG4gICAgICAgIHRoaXMuc2hvdyhsaXN0KTtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnN0YXJ0VGFza3MobGlzdCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKVxuICAgIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgb25FbmFibGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnJlcXVlc3RUYXNrLHRoaXMucmVmcmVzaEludGVydmFsLGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLDApXG4gICAgfVxuXG4gICAgb25EaXNhYmxlKClcbiAgICB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnJlcXVlc3RUYXNrKTtcbiAgICB9XG5cbiAgICBvblNob3coKVxuICAgIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2hvdyhsaXN0KVxuICAgIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9ICBsaXN0O1xuICAgICAgICB0aGlzLm9uU2hvdygpO1xuICAgIH1cblxuICAgIGdldCBsaXN0KCk6IFRhc2tbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0XG4gICAgfVxufSJdfQ==