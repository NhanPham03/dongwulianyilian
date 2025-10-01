"use strict";
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