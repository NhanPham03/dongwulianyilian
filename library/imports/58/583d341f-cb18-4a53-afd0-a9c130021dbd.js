"use strict";
cc._RF.push(module, '583d3QfyxhKU6/QqcEwAh29', 'MoreGameStyle');
// framework/wxsdk/MoreGameStyle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MoreGameComponent_1 = require("./MoreGameComponent");
//小游戏跳转
//https://developers.weixin.qq.com/miniprogram/dev/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html?search-key=navigateToMiniProgram
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreGameStyle = /** @class */ (function (_super) {
    __extends(MoreGameStyle, _super);
    function MoreGameStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icons = [];
        _this.buttons = [];
        _this.labels = [];
        _this.datas = [];
        return _this;
        // update (dt) {}
    }
    Object.defineProperty(MoreGameStyle.prototype, "count", {
        get: function () {
            return this.icons.length;
        },
        enumerable: false,
        configurable: true
    });
    MoreGameStyle.prototype.onLoad = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            var btn = this.buttons[i];
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "MoreGameStyle";
            eventHandler.handler = "onClick";
            eventHandler.customEventData = i + "";
            btn.clickEvents.push(eventHandler);
            this.labels[i].node.active = false;
            this.icons[i].node.active = false;
            btn.interactable = false;
        }
    };
    MoreGameStyle.prototype.onClick = function (sender, data) {
        var i = Number(data);
        var list = this.list;
        var task = list[i];
        this.manager.clickGame(task.gameConfig);
    };
    MoreGameStyle.prototype.onShow = function () {
        var list = this.list;
        var _loop_1 = function () {
            var task = list[i];
            var icon = this_1.icons[i];
            if (task) {
                var label = this_1.labels[i];
                label.string = task.gameConfig.title;
                this_1.labels[i].node.active = true;
                icon.node.active = true;
                this_1.buttons[i].interactable = true;
                this_1.manager.getSpriteFrame(task.gameConfig.icon).then(function (sf) {
                    icon.spriteFrame = sf;
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.icons.length; i++) {
            _loop_1();
        }
    };
    __decorate([
        property([cc.Sprite])
    ], MoreGameStyle.prototype, "icons", void 0);
    __decorate([
        property([cc.Button])
    ], MoreGameStyle.prototype, "buttons", void 0);
    __decorate([
        property([cc.Label])
    ], MoreGameStyle.prototype, "labels", void 0);
    MoreGameStyle = __decorate([
        ccclass
    ], MoreGameStyle);
    return MoreGameStyle;
}(MoreGameComponent_1.default));
exports.default = MoreGameStyle;

cc._RF.pop();