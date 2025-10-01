
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/View.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1217OaHDFCEbPP4vjLJXLh', 'View');
// framework/plugin_boosts/ui/View.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIComponent_1 = require("./UIComponent");
var ViewManager_1 = require("./ViewManager");
var UIFunctions_1 = require("./UIFunctions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDialog = false;
        _this.hasWidget = false;
        _this.opacity = 160;
        _this.childrenAnimation = false;
        _this.touchBlocker = null;
        _this.touchBlockerComp = null;
        // @property
        // showAnimationName:string = "";
        // @property
        // hideAnimationName:string = "";
        // @property([cc.Component.EventHandler])
        // onShownEvents:cc.Component.EventHandler[] = [];
        // @property([cc.Component.EventHandler])
        // onHiddenEvents:cc.Component.EventHandler[] = [];
        _this.animations = [];
        _this._isHiding = false;
        return _this;
    }
    // isTouchEnabled: boolean = true;
    View.prototype.emit = function (event, msg) {
        event.emit(msg);
        // this.node.emit(msg);  
    };
    View.prototype.call = function (event, exp) {
        // eval(exp);
        g.execScript(exp);
    };
    View.prototype.setDelegate = function (target) {
        this.target = target;
    };
    View.prototype.onLoad = function () {
        this.touchBlocker = new cc.Node();
        this.touchBlocker.name = "TouchBlocker";
        this.touchBlocker.width = 2000;
        this.touchBlocker.height = 2000;
        this.touchBlockerComp = this.touchBlocker.addComponent(cc.BlockInputEvents);
        this.node.addChild(this.touchBlocker, 1000);
        if (this.childrenAnimation) {
            this.animations = UIFunctions_1.default.getChildrenAnimations(this.node);
        }
        else {
            var anim = this.node.getComponent(cc.Animation);
            if (anim)
                this.animations.push(anim);
        }
        var components = this.getComponents(cc.Component);
        for (var i = 0; i < components.length; i++) {
            var comp = components[i];
            if (comp != this) {
                if (comp.onShown || comp.onHidden) {
                    this.target = comp;
                    break;
                }
            }
        }
    };
    View.prototype.start = function () {
        this.touchEnabled = true;
    };
    View.prototype.init = function (viewname) {
        this.name = viewname;
    };
    View.prototype.hideAnimationCallback = function () {
        this.node.active = this.visible;
        ViewManager_1.default.instance.checkViewStacks();
    };
    /**
     * //如果 实现了view的animation那么需要 animation 去做隐藏
     * 否则会不会有animtion ，系统 将直接 设置 active 为false
     */
    View.prototype.doHideAnimation = function () {
        // if (!this.isDialog)
        // {
        //todo is in hide animtion return ;
        // if(this.isInHideAnimation())return;
        this.node.active = true;
        this._isHiding = true;
        if (!UIFunctions_1.default.doHideAnimations(this.animations, this.hideAnimationCallback, this)) {
            this.node.active = false;
            this._isHiding = false;
        }
        console.log("[View] hide:", this.name);
        this._visibleDirty = false;
    };
    View.prototype.isInHideAnimation = function () {
        return this._isHiding;
    };
    View.prototype.onHidden = function () {
        this._visibleDirty = false;
        if (this.target && this.target.onHidden)
            this.target.onHidden();
        // cc.Component.EventHandler.emitEvents(this.onHiddenEvents,[params]);
    };
    View.prototype.hide = function () {
        // super.hide()
        //ViewManager remove dd
        this.touchEnabled = false;
        ViewManager_1.default.instance.hide(this.node);
    };
    Object.defineProperty(View.prototype, "visible", {
        get: function () { return this._visibleDirty; },
        enumerable: false,
        configurable: true
    });
    View.prototype.showAnimationNextFrame = function (callback) {
        var _this = this;
        this.scheduleOnce(function (_) {
            UIFunctions_1.default.doShowAnimations(_this.animations, callback);
        }, 0);
    };
    Object.defineProperty(View.prototype, "touchEnabled", {
        get: function () {
            return !this.touchBlocker.active;
        },
        set: function (b) {
            this.touchBlocker.active = !b;
        },
        enumerable: false,
        configurable: true
    });
    // setTouchEnabled(bEnabled){
    //     this.touchBlockerComp.enabled = bEnabled;
    //     // UIFunctions.setTouchEnabled(this.node,bEnabled);
    // }
    View.prototype.show = function () {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        console.log("[View] show:", this.name, params);
        UIFunctions_1.default.stopAnimations(this.animations);
        // call next frames 
        // this.showAnimationDelay()
        //确保在widget 更新结束后开始动画 ，
        return new Promise(function (resolve, reject) {
            var _a;
            var self = _this;
            var showFinishCallback = function () {
                if (!self.touchEnabled)
                    self.touchEnabled = true;
                resolve();
            };
            if (!_this.hasWidget) {
                UIFunctions_1.default.doShowAnimations(_this.animations, showFinishCallback);
            }
            else {
                _this.showAnimationNextFrame(showFinishCallback);
            }
            _this._visibleDirty = true;
            if (_this.target && _this.target.onShown) {
                (_a = _this.target).onShown.apply(_a, params);
            }
            // cc.Component.EventHandler.emitEvents(this.onShownEvents,[params]);
        });
    };
    __decorate([
        property
    ], View.prototype, "isDialog", void 0);
    __decorate([
        property
    ], View.prototype, "hasWidget", void 0);
    __decorate([
        property
    ], View.prototype, "opacity", void 0);
    __decorate([
        property
    ], View.prototype, "childrenAnimation", void 0);
    View = __decorate([
        ccclass
    ], View);
    return View;
}(UIComponent_1.default));
exports.default = View;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLDZDQUF3QztBQUV4Qyw2Q0FBd0M7QUFHbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVc7SUFBN0M7UUFBQSxxRUEwTUM7UUFoTUcsY0FBUSxHQUFXLEtBQUssQ0FBQztRQUd6QixlQUFTLEdBQVcsS0FBSyxDQUFDO1FBSzFCLGFBQU8sR0FBVSxHQUFHLENBQUM7UUFHckIsdUJBQWlCLEdBQVcsS0FBSyxDQUFDO1FBR2xDLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLHNCQUFnQixHQUF1QixJQUFJLENBQUM7UUFFNUMsWUFBWTtRQUNaLGlDQUFpQztRQUNqQyxZQUFZO1FBQ1osaUNBQWlDO1FBRWpDLHlDQUF5QztRQUN6QyxrREFBa0Q7UUFFbEQseUNBQXlDO1FBQ3pDLG1EQUFtRDtRQUVuRCxnQkFBVSxHQUFrQixFQUFFLENBQUM7UUErRC9CLGVBQVMsR0FBVyxLQUFLLENBQUM7O0lBcUc5QixDQUFDO0lBek1HLGtDQUFrQztJQUNsQyxtQkFBSSxHQUFKLFVBQUssS0FBSyxFQUFDLEdBQUc7UUFFVixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLHlCQUF5QjtJQUMzQixDQUFDO0lBa0NELG1CQUFJLEdBQUosVUFBSyxLQUFLLEVBQUMsR0FBVTtRQUVqQixhQUFhO1FBQ2IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsMEJBQVcsR0FBWCxVQUFZLE1BQU07UUFFZCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQscUJBQU0sR0FBTjtRQUdJLElBQUksQ0FBQyxZ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b20gXCIuL1VJQ29tcG9uZW50XCI7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50TWFuYWdlclwiO1xuaW1wb3J0IFVJRnVuY3Rpb25zIGZyb20gXCIuL1VJRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuL1RvYXN0TWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XG4gICAgLy8gaXNUb3VjaEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGVtaXQoZXZlbnQsbXNnKVxuICAgIHtcbiAgICAgICAgZXZlbnQuZW1pdChtc2cpXG4gICAgICAvLyB0aGlzLm5vZGUuZW1pdChtc2cpOyAgXG4gICAgfVxuXG4gICAgbmFtZTpzdHJpbmc7XG4gICAgQHByb3BlcnR5XG4gICAgaXNEaWFsb2c6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5XG4gICAgaGFzV2lkZ2V0OmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHRhcmdldDphbnk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBvcGFjaXR5Om51bWJlciA9IDE2MDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGNoaWxkcmVuQW5pbWF0aW9uOmJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgdG91Y2hCbG9ja2VyOmNjLk5vZGUgPSBudWxsO1xuICAgIHRvdWNoQmxvY2tlckNvbXA6Y2MuQmxvY2tJbnB1dEV2ZW50cyA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHlcbiAgICAvLyBzaG93QW5pbWF0aW9uTmFtZTpzdHJpbmcgPSBcIlwiO1xuICAgIC8vIEBwcm9wZXJ0eVxuICAgIC8vIGhpZGVBbmltYXRpb25OYW1lOnN0cmluZyA9IFwiXCI7XG5cbiAgICAvLyBAcHJvcGVydHkoW2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdKVxuICAgIC8vIG9uU2hvd25FdmVudHM6Y2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcltdID0gW107XG5cbiAgICAvLyBAcHJvcGVydHkoW2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdKVxuICAgIC8vIG9uSGlkZGVuRXZlbnRzOmNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xuXG4gICAgYW5pbWF0aW9uczpjYy5BbmltYXRpb25bXSA9IFtdO1xuXG4gICAgY2FsbChldmVudCxleHA6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgLy8gZXZhbChleHApO1xuICAgICAgICBnLmV4ZWNTY3JpcHQoZXhwKTtcbiAgICB9XG5cbiAgICBzZXREZWxlZ2F0ZSh0YXJnZXQpXG4gICAge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB9XG5cbiAgICBvbkxvYWQoKVxuICAgIHtcblxuICAgICAgICB0aGlzLnRvdWNoQmxvY2tlciA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgIHRoaXMudG91Y2hCbG9ja2VyLm5hbWUgPSBcIlRvdWNoQmxvY2tlclwiXG4gICAgICAgIHRoaXMudG91Y2hCbG9ja2VyLndpZHRoID0gMjAwMDtcbiAgICAgICAgdGhpcy50b3VjaEJsb2NrZXIuaGVpZ2h0ID0gMjAwMDtcbiAgICAgICAgdGhpcy50b3VjaEJsb2NrZXJDb21wID0gdGhpcy50b3VjaEJsb2NrZXIuYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0aGlzLnRvdWNoQmxvY2tlciwxMDAwKVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5jaGlsZHJlbkFuaW1hdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gVUlGdW5jdGlvbnMuZ2V0Q2hpbGRyZW5BbmltYXRpb25zKHRoaXMubm9kZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgYW5pbSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKVxuICAgICAgICAgICAgaWYoYW5pbSlcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaChhbmltKVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRDb21wb25lbnRzKGNjLkNvbXBvbmVudCk7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBjb21wOmFueSA9IGNvbXBvbmVudHNbaV1cbiAgICAgICAgICAgIGlmKGNvbXAgIT0gdGhpcylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihjb21wLm9uU2hvd258fGNvbXAub25IaWRkZW4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGNvbXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc3RhcnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy50b3VjaEVuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGluaXQodmlld25hbWUpXG4gICAge1xuICAgICAgICB0aGlzLm5hbWUgPSB2aWV3bmFtZTtcbiAgICB9XG5cbiAgICBoaWRlQW5pbWF0aW9uQ2FsbGJhY2soKVxuICAgIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRoaXMudmlzaWJsZTtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2UuY2hlY2tWaWV3U3RhY2tzKCk7XG4gICAgfVxuXG4gICAgX2lzSGlkaW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIC8v5aaC5p6cIOWunueOsOS6hnZpZXfnmoRhbmltYXRpb27pgqPkuYjpnIDopoEgYW5pbWF0aW9uIOWOu+WBmumakOiXj1xuICAgICAqIOWQpuWImeS8muS4jeS8muaciWFuaW10aW9uIO+8jOezu+e7nyDlsIbnm7TmjqUg6K6+572uIGFjdGl2ZSDkuLpmYWxzZVxuICAgICAqL1xuICAgIGRvSGlkZUFuaW1hdGlvbigpXG4gICAge1xuICAgICAgICAvLyBpZiAoIXRoaXMuaXNEaWFsb2cpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy90b2RvIGlzIGluIGhpZGUgYW5pbXRpb24gcmV0dXJuIDtcbiAgICAgICAgLy8gaWYodGhpcy5pc0luSGlkZUFuaW1hdGlvbigpKXJldHVybjtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2lzSGlkaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYoIVVJRnVuY3Rpb25zLmRvSGlkZUFuaW1hdGlvbnModGhpcy5hbmltYXRpb25zLHRoaXMuaGlkZUFuaW1hdGlvbkNhbGxiYWNrLHRoaXMpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pc0hpZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1ZpZXddIGhpZGU6XCIsdGhpcy5uYW1lKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZURpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJbkhpZGVBbmltYXRpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSGlkaW5nXG4gICAgfVxuICAgIFxuICAgIG9uSGlkZGVuKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3Zpc2libGVEaXJ0eSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQub25IaWRkZW4pXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5vbkhpZGRlbigpO1xuICAgICAgICAvLyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5vbkhpZGRlbkV2ZW50cyxbcGFyYW1zXSk7XG4gICAgfVxuXG4gICAgaGlkZSgpe1xuICAgICAgICAvLyBzdXBlci5oaWRlKClcbiAgICAgICAgLy9WaWV3TWFuYWdlciByZW1vdmUgZGRcbiAgICAgICAgdGhpcy50b3VjaEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2UuaGlkZSh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIF92aXNpYmxlRGlydHk6Ym9vbGVhbjtcbiAgICBcbiAgICBnZXQgdmlzaWJsZSgpe3JldHVybiB0aGlzLl92aXNpYmxlRGlydHk7fVxuXG5cbiAgICBzaG93QW5pbWF0aW9uTmV4dEZyYW1lKGNhbGxiYWNrKVxuICAgIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoXz0+e1xuICAgICAgICAgICAgVUlGdW5jdGlvbnMuZG9TaG93QW5pbWF0aW9ucyh0aGlzLmFuaW1hdGlvbnMsY2FsbGJhY2spXG4gICAgICAgIH0sMClcbiAgICB9XG5cbiAgICBnZXQgdG91Y2hFbmFibGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiAhdGhpcy50b3VjaEJsb2NrZXIuYWN0aXZlXG4gICAgfVxuXG4gICAgc2V0IHRvdWNoRW5hYmxlZChiKVxuICAgIHtcbiAgICAgICAgdGhpcy50b3VjaEJsb2NrZXIuYWN0aXZlICA9ICFiXG4gICAgfVxuXG4gICAgLy8gc2V0VG91Y2hFbmFibGVkKGJFbmFibGVkKXtcbiAgICAvLyAgICAgdGhpcy50b3VjaEJsb2NrZXJDb21wLmVuYWJsZWQgPSBiRW5hYmxlZDtcbiAgICAvLyAgICAgLy8gVUlGdW5jdGlvbnMuc2V0VG91Y2hFbmFibGVkKHRoaXMubm9kZSxiRW5hYmxlZCk7XG4gICAgLy8gfVxuXG4gICAgc2hvdyguLi5wYXJhbXMpXG4gICAge1xuICAgICAgICBzdXBlci5zaG93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1ZpZXddIHNob3c6XCIsdGhpcy5uYW1lICwgcGFyYW1zKTtcbiAgICAgICAgVUlGdW5jdGlvbnMuc3RvcEFuaW1hdGlvbnModGhpcy5hbmltYXRpb25zKTtcbiAgICAgICBcbiAgICAgICAgLy8gY2FsbCBuZXh0IGZyYW1lcyBcbiAgICAgICAgLy8gdGhpcy5zaG93QW5pbWF0aW9uRGVsYXkoKVxuICAgICAgICAvL+ehruS/neWcqHdpZGdldCDmm7TmlrDnu5PmnZ/lkI7lvIDlp4vliqjnlLsg77yMXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBzaG93RmluaXNoQ2FsbGJhY2sgPSBmdW5jdGlvbigpIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKCFzZWxmLnRvdWNoRW5hYmxlZClcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3VjaEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0aGlzLmhhc1dpZGdldClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVSUZ1bmN0aW9ucy5kb1Nob3dBbmltYXRpb25zKHRoaXMuYW5pbWF0aW9ucyxzaG93RmluaXNoQ2FsbGJhY2spXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltYXRpb25OZXh0RnJhbWUoc2hvd0ZpbmlzaENhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmlzaWJsZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAmJiB0aGlzLnRhcmdldC5vblNob3duKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Lm9uU2hvd24oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLm9uU2hvd25FdmVudHMsW3BhcmFtc10pO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==