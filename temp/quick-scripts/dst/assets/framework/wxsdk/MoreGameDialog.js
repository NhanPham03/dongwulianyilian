
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/MoreGameDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcTW9yZUdhbWVEaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCwrQ0FBMEM7QUFFMUMsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFFN0YsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUE4SEM7UUEzSEcsVUFBSSxHQUFXLElBQUksQ0FBQztRQUdwQixZQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFHaEMsV0FBSyxHQUFvQixFQUFFLENBQUE7O1FBMkczQixpQkFBaUI7SUFDckIsQ0FBQztJQTFHRywrQkFBTSxHQUFOO1FBRUksZ0JBQWdCO0lBRXBCLENBQUM7SUFFRCw4QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDBDQUFpQixHQUFqQixVQUFrQixJQUFJO1FBRWxCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUcsTUFBTSxFQUNUO1lBQ0ksTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELG1DQUFVLEdBQVY7UUFFSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFB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QyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hCLHlCQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBeEhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0U7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDSTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNHO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztzREFDUTtJQWZmLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0E4SGxDO0lBQUQscUJBQUM7Q0E5SEQsQUE4SEMsQ0E5SDJDLEVBQUUsQ0FBQyxTQUFTLEdBOEh2RDtrQkE5SG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9yZUdhbWVNYW5hZ2VyIGZyb20gXCIuL01vcmVHYW1lTWFuYWdlclwiO1xuaW1wb3J0IE1vcmVHYW1lSXRlbSBmcm9tIFwiLi9Nb3JlR2FtZUl0ZW1cIjtcblxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3JlR2FtZURpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByb290OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiYW5uZXI6Y2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aXRsZTpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0ZW1wbGF0ZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxuICAgIHNjcm9sbFZpZXc6Y2MuU2Nyb2xsVmlldyA9IG51bGw7XG5cblxuICAgIGl0ZW1zIDogTW9yZUdhbWVJdGVtW10gPSBbXVxuXG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIC8vIHRoaXMudGVtcGxhdGVcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVDaGlsZFdpZGdldChub2RlKVxuICAgIHtcbiAgICAgICAgbGV0IHdpZGdldCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XG4gICAgICAgIGlmKHdpZGdldCkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZpZXcoKVxuICAgIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmJhbm5lci5zcHJpdGVGcmFtZS5nZXRSZWN0KCk7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy5yb290LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGxldCByYXRpbyA9IHNpemUud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgICBsZXQgY2FsY0hlaWdodCA9IHJhdGlvICogcmVjdC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYmFubmVyLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlJBVztcbiAgICAgICAgdGhpcy5iYW5uZXIubm9kZS5oZWlnaHQgPSBjYWxjSGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhbm5lcldpZGdldCA9IHRoaXMuYmFubmVyLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICBiYW5uZXJXaWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XG5cbiAgICAgICAgbGV0IHNjcm9sbHZpZXdXaWRnZXQgPSB0aGlzLnNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldClcbiAgICAgICAgc2Nyb2xsdmlld1dpZGdldC50b3AgPSBjYWxjSGVpZ2h0O1xuICAgICAgICBzY3JvbGx2aWV3V2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xuICAgICAgICBnLmZvcmVhY2hOb2RlKHRoaXMuc2Nyb2xsVmlldy5ub2RlLHRoaXMudXBkYXRlQ2hpbGRXaWRnZXQsdGhpcylcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2l6ZSAscmVjdCxjYWxjSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpXG4gICAge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnVwZGF0ZVZpZXcpXG4gICAgICAgIFxuICAgIH1cblxuICAgIGFzeW5jIHNob3dCYW5uZXIoKVxuICAgIHtcbiAgICAgICAgLy8gdGhpcy5iYW5uZXIuc3ByaXRlRnJhbWUgPSBhd2FpdCBNb3JlR2FtZU1hbmFnZXIuaW5zdGFuY2UuZ2V0U3ByaXRlRnJhbWUodXJsKTtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmJhbm5lci5zcHJpdGVGcmFtZS5nZXRSZWN0KCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHRvVXNlcmZyaWVuZGx5TnVtKG51bTpudW1iZXIpXG4gICAge1xuICAgICAgICBpZihudW0gPiAxMDAwMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIChudW0vMTAwMDApLnRvRml4ZWQoMSkgKyBcIuS4h1wiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bSArXCJcIjtcbiAgICB9XG5cbiAgICBvblNob3duKClcbiAgICB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcigpXG4gICAgICAgIGxldCBsaXN0ID0gTW9yZUdhbWVNYW5hZ2VyLmluc3RhbmNlLmdhbWVMaXN0XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKDAsdGhpcy5pdGVtcy5sZW5ndGgpXG4gICAgICAgIGZvciAodmFyIGkgPSAwIDtpIDwgbGlzdC5sZW5ndGg7IGkgKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjZmcgPSBsaXN0W2ldO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRlbXBsYXRlKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBub2RlLmdldENvbXBvbmVudChNb3JlR2FtZUl0ZW0pXG4gICAgICAgICAgICBpdGVtLnRpdGxlLnN0cmluZyA9IGNmZy50aXRsZTtcbiAgICAgICAgICAgIGl0ZW0uY29udGVudC5zdHJpbmcgPSBjZmcuY29udGVudFxuICAgICAgICAgICAgaXRlbS5wbGF5ZXJfbnVtLnN0cmluZyA9IHRoaXMudG9Vc2VyZnJpZW5kbHlOdW0oY2ZnLnBsYXllcnN8fDEwMDAwMClcbiAgICAgICAgICAgIGl0ZW0uc2V0U3RhcihjZmcuc3Rhcnx8IDQpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuYWRkQ2hpbGQobm9kZSlcbiAgICAgICAgICAgIGlmKGl0ZW0uYnRuLmNsaWNrRXZlbnRzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgaXRlbS5idG4uY2xpY2tFdmVudHNbMF0uY3VzdG9tRXZlbnREYXRhID0gaSArXCJcIjtcbiAgICAgICAgICAgIGlmKGl0ZW0uYnRuU2VsZi5jbGlja0V2ZW50cy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIGl0ZW0uYnRuU2VsZi5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGEgPSBpICtcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0ljb25zKClcbiAgICB9XG5cblxuICAgIGFzeW5jIHNob3dJY29ucygpXG4gICAge1xuICAgICAgICBsZXQgbGlzdCA9IE1vcmVHYW1lTWFuYWdlci5pbnN0YW5jZS5nYW1lTGlzdFxuICAgICAgICBmb3IgKHZhciBpID0gMCA7aSA8IGxpc3QubGVuZ3RoOyBpICsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2ZnID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtc1tpXVxuICAgICAgICAgICAgaXRlbS5pY29uLnNwcml0ZUZyYW1lID0gYXdhaXQgTW9yZUdhbWVNYW5hZ2VyLmluc3RhbmNlLmdldFNwcml0ZUZyYW1lKGNmZy5pY29uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25fY2xpY2tfZW50ZXIoc2VuZGVyLGkpXG4gICAge1xuICAgICAgICBsZXQgbGlzdCA9IE1vcmVHYW1lTWFuYWdlci5pbnN0YW5jZS5nYW1lTGlzdFxuICAgICAgICB2YXIgY2ZnID0gbGlzdFtOdW1iZXIoaSldOyBcbiAgICAgICAgY29uc29sZS5sb2coY2ZnKVxuICAgICAgICBNb3JlR2FtZU1hbmFnZXIuaW5zdGFuY2UuY2xpY2tHYW1lKGNmZylcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19