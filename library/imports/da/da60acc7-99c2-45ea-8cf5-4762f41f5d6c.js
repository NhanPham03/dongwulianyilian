"use strict";
cc._RF.push(module, 'da60azHmcJF6oz1R2L0H11s', 'MoreGameDialog');
// framework/wxsdk/MoreGameDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MoreGameManager_1 = require("./MoreGameManager");
var MoreGameItem_1 = require("./MoreGameItem");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreGameDialog = /** @class */ (function (_super) {
    __extends(MoreGameDialog, _super);
    function MoreGameDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.root = null;
        _this.banner = null;
        _this.title = null;
        _this.template = null;
        _this.scrollView = null;
        _this.items = [];
        return _this;
        // update (dt) {}
    }
    MoreGameDialog.prototype.onLoad = function () {
        // this.template
    };
    MoreGameDialog.prototype.start = function () {
    };
    MoreGameDialog.prototype.updateChildWidget = function (node) {
        var widget = node.getComponent(cc.Widget);
        if (widget) {
            widget.updateAlignment();
        }
    };
    MoreGameDialog.prototype.updateView = function () {
        var rect = this.banner.spriteFrame.getRect();
        var size = this.root.getContentSize();
        var ratio = size.width / rect.width;
        var calcHeight = ratio * rect.height;
        this.banner.sizeMode = cc.Sprite.SizeMode.RAW;
        this.banner.node.height = calcHeight;
        var bannerWidget = this.banner.getComponent(cc.Widget);
        bannerWidget.updateAlignment();
        var scrollviewWidget = this.scrollView.getComponent(cc.Widget);
        scrollviewWidget.top = calcHeight;
        scrollviewWidget.updateAlignment();
        g.foreachNode(this.scrollView.node, this.updateChildWidget, this);
        // console.log(size ,rect,calcHeight);
    };
    MoreGameDialog.prototype.onEnable = function () {
        this.scheduleOnce(this.updateView);
    };
    MoreGameDialog.prototype.showBanner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rect;
            return __generator(this, function (_a) {
                rect = this.banner.spriteFrame.getRect();
                this.updateView();
                return [2 /*return*/];
            });
        });
    };
    MoreGameDialog.prototype.toUserfriendlyNum = function (num) {
        if (num > 10000) {
            return (num / 10000).toFixed(1) + "万";
        }
        return num + "";
    };
    MoreGameDialog.prototype.onShown = function () {
        this.showBanner();
        var list = MoreGameManager_1.default.instance.gameList;
        this.scrollView.content.removeAllChildren();
        this.items.splice(0, this.items.length);
        for (var i = 0; i < list.length; i++) {
            var cfg = list[i];
            var node = cc.instantiate(this.template);
            var item = node.getComponent(MoreGameItem_1.default);
            item.title.string = cfg.title;
            item.content.string = cfg.content;
            item.player_num.string = this.toUserfriendlyNum(cfg.players || 100000);
            item.setStar(cfg.star || 4);
            this.items.push(item);
            this.scrollView.content.addChild(node);
            if (item.btn.clickEvents.length > 0)
                item.btn.clickEvents[0].customEventData = i + "";
            if (item.btnSelf.clickEvents.length > 0)
                item.btnSelf.clickEvents[0].customEventData = i + "";
        }
        this.showIcons();
    };
    MoreGameDialog.prototype.showIcons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, i, cfg, item, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        list = MoreGameManager_1.default.instance.gameList;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < list.length)) return [3 /*break*/, 4];
                        cfg = list[i];
                        item = this.items[i];
                        _a = item.icon;
                        return [4 /*yield*/, MoreGameManager_1.default.instance.getSpriteFrame(cfg.icon)];
                    case 2:
                        _a.spriteFrame = _b.sent();
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MoreGameDialog.prototype.on_click_enter = function (sender, i) {
        var list = MoreGameManager_1.default.instance.gameList;
        var cfg = list[Number(i)];
        console.log(cfg);
        MoreGameManager_1.default.instance.clickGame(cfg);
    };
    __decorate([
        property(cc.Node)
    ], MoreGameDialog.prototype, "root", void 0);
    __decorate([
        property(cc.Sprite)
    ], MoreGameDialog.prototype, "banner", void 0);
    __decorate([
        property(cc.Label)
    ], MoreGameDialog.prototype, "title", void 0);
    __decorate([
        property(cc.Node)
    ], MoreGameDialog.prototype, "template", void 0);
    __decorate([
        property(cc.ScrollView)
    ], MoreGameDialog.prototype, "scrollView", void 0);
    MoreGameDialog = __decorate([
        ccclass
    ], MoreGameDialog);
    return MoreGameDialog;
}(cc.Component));
exports.default = MoreGameDialog;

cc._RF.pop();