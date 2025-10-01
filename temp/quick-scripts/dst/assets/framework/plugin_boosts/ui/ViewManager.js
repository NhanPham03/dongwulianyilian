
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/ViewManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0f79TopoBICobmtQjrjutG', 'ViewManager');
// framework/plugin_boosts/ui/ViewManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("./View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TAG = "[ViewManager]";
var ViewManager = /** @class */ (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        // baseDir:string = "assets/"
        _this._views = {};
        // 
        _this.modal = null;
        _this.modalOpacity = 160;
        return _this;
        // update (dt) {}
    }
    ViewManager_1 = ViewManager;
    ViewManager.prototype.onLoad = function () {
        ViewManager_1.instance = this;
        this.modal.active = false;
        this.modal.zIndex = 999;
        g.setGlobalInstance(this);
        // cc.game.addPersistRootNode(this.node);
        // this.node.getComponent(cc.Widget).target = cc.find("Canvas")
    };
    ViewManager.prototype.onEnable = function () {
    };
    ViewManager.prototype.onDestroy = function () {
        // cc.game.removePersistRootNode(this.node);
        for (var key in this._views) {
            delete this._views[key];
        }
    };
    ViewManager.prototype.start = function () {
        //load prefab
        // this.modal.active = false;
        // this.sprite = this.getComponent(cc.Sprite)
        // this.modal.zIndex = 999;
    };
    ViewManager.prototype.getVisibleDialog = function () {
        for (var name in this._views) {
            var view = this._views[name];
            if (view.isDialog) {
                if (this.isVisible(name)) {
                    return view;
                }
            }
        }
        return null;
    };
    ViewManager.prototype.hasVisibleDialog = function () {
        for (var name in this._views) {
            var view = this._views[name];
            if (view.isDialog) {
                if (this.isVisible(name)) {
                    return true;
                }
            }
        }
        return false;
    };
    ViewManager.prototype.isVisible = function (viewname) {
        var view = null;
        if (typeof (viewname) == "string")
            view = this._views[viewname];
        else
            view = viewname;
        //todo check type 
        if (view) {
            return view.node.active;
        }
        return false;
    };
    ViewManager.prototype.attachViewComp = function (existingView) {
        var viewComp = null;
        if (viewComp == null || viewComp == undefined) {
            viewComp = existingView.getComponent(View_1.default);
            if (viewComp == null) {
                viewComp = existingView.addComponent(View_1.default);
                viewComp.init(existingView.name);
            }
            this._views[existingView.name] = viewComp;
        }
        return viewComp;
    };
    ViewManager.prototype.showView = function (view) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.modal.active = view.isDialog;
        //check has popuped dialog and  all currentview is dialog show modal forcely.
        if (this.hasVisibleDialog() || view.isDialog) {
            this.modal.active = true;
        }
        if (view.isDialog) {
            this.modal.opacity = view.opacity;
        }
        return view.show.apply(view, params);
    };
    ViewManager.prototype.showFromPrefab = function (prefab, prefabPath) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var view = this._views[prefabPath];
        if (view == null) {
            var node = cc.instantiate(prefab);
            view = node.getComponent(View_1.default);
            if (view == null) {
                view = node.addComponent(View_1.default);
                view.isDialog = true;
                //default is dialog
            }
            var widget = view.getComponent(cc.Widget);
            if (widget)
                widget.target = cc.find("Canvas");
            view.init(prefabPath);
            this._views[prefabPath] = view;
            if (view.isDialog) {
                this.node.addChild(node, 1000);
            }
            else {
                this.node.addChild(node, 1000);
            }
            // g.foreachNode(view.node,this.updateWidgets,this)
        }
        // node = view.node;
        this.node.color.setA(255);
        console.log(TAG, "show view:" + prefabPath);
        return this.showView.apply(this, __spreadArrays([view], params));
    };
    ViewManager.prototype.showFromPrefabPath = function (prefabPath) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var view = this._views[prefabPath];
        if (view == null || view == undefined) {
            console.log("start load prefab:" + prefabPath);
            var beforeTime_1 = new Date().getTime();
            cc.loader.loadRes(prefabPath, cc.Prefab, function (e, prefab) {
                console.log(TAG, "prefab loaded : " + prefabPath + " " + (new Date().getTime() - beforeTime_1) + "ms");
                _this.showFromPrefab.apply(_this, __spreadArrays([prefab, prefabPath], params));
            });
        }
        else {
            // this.sprite.enabled = false;
            this.modal.active = view.isDialog;
            if (this.hasVisibleDialog() || view.isDialog) {
                this.modal.active = true;
                this.modal.opacity = view.opacity;
            }
            console.log(TAG, "show view:" + prefabPath, params);
            // let viewnode = view.node;
            // view.node.x = 0;
            // view.node.y = 0;
            return view.show.apply(view, params);
        }
    };
    ViewManager.prototype.preload = function (prefabPath) {
        var _this = this;
        var view = this._views[prefabPath];
        if (view == null || view == undefined) {
            cc.loader.loadRes(prefabPath, cc.Prefab, function (e, prefab) {
                console.log(TAG, "preload view" + prefabPath);
                var node = cc.instantiate(prefab);
                view = node.getComponent(View_1.default);
                var widget = view.getComponent(cc.Widget);
                if (widget)
                    widget.target = cc.find("Canvas");
                view.init(prefabPath);
                _this._views[prefabPath] = view;
                // this.scheduleOnce(_=>node.active = false,0);
                if (view.isDialog) {
                    _this.node.addChild(node, 1000);
                }
                else {
                    _this.node.addChild(node, 1000);
                }
                view.hide();
            });
        }
        else {
        }
    };
    // will enableTouch next show up
    ViewManager.prototype.disableTouch = function (viewNode) {
        var view = viewNode.getComponent(View_1.default);
        if (view) {
            view.touchEnabled = false;
        }
    };
    ViewManager.prototype.enableTouch = function (viewNode) {
        var view = viewNode.getComponent(View_1.default);
        if (view) {
            view.touchEnabled = true;
        }
    };
    ViewManager.prototype.show = function (view) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // disable current view 's touch  
        if (typeof (view) == "string") {
            return this.showFromPrefabPath.apply(this, __spreadArrays([view], params));
        }
        else {
            if (view == null || view == undefined)
                return;
            if (view.node)
                view = view.node;
            var v = this.attachViewComp(view);
            return this.showView.apply(this, __spreadArrays([v], params));
        }
    };
    ViewManager.prototype.hide = function (viewname, playHideAnim) {
        if (playHideAnim === void 0) { playHideAnim = true; }
        if (typeof (viewname) != "string") {
            // get view name 
            if (viewname == null || viewname == undefined)
                return;
            this.attachViewComp(viewname);
            viewname = viewname.name;
        }
        var view = this._views[viewname];
        if (view != null && view != undefined) {
            view.node.active = false;
            if (view.isDialog) {
                //todo: should support dialog hide animtion  later 
                this.modal.active = false;
            }
            if (this.hasVisibleDialog()) {
                this.modal.active = true;
            }
            // if(view.isInHideAnimation())
            //     return;
            // view.hide();
            if (playHideAnim)
                view.doHideAnimation();
            view.onHidden();
        }
    };
    ViewManager.prototype.checkViewStacks = function () {
        var dialog = this.getVisibleDialog();
        if (dialog) {
            this.modal.active = true;
            this.modal.opacity = dialog.opacity;
        }
    };
    ViewManager.prototype.hideAll = function () {
        for (var viewname in this._views) {
            // let view = this._views[viewname]
            this.hide(viewname);
        }
    };
    var ViewManager_1;
    __decorate([
        property(cc.Node)
    ], ViewManager.prototype, "modal", void 0);
    __decorate([
        property
    ], ViewManager.prototype, "modalOpacity", void 0);
    ViewManager = ViewManager_1 = __decorate([
        ccclass
    ], ViewManager);
    return ViewManager;
}(cc.Component));
exports.default = ViewManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVmlld01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUdwQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFJLEdBQUcsR0FBVSxlQUFlLENBQUE7QUFFaEM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUF5U0M7UUFyU0csZUFBZTtRQUVmLDZCQUE2QjtRQUU3QixZQUFNLEdBQXlCLEVBQUUsQ0FBQTtRQUVyQyxHQUFHO1FBRUMsV0FBSyxHQUFXLElBQUksQ0FBQztRQUdyQixrQkFBWSxHQUFVLEdBQUcsQ0FBQzs7UUF5UjFCLGlCQUFpQjtJQUNyQixDQUFDO29CQXpTb0IsV0FBVztJQWtCNUIsNEJBQU0sR0FBTjtRQUVJLGFBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDeEIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLHlDQUF5QztRQUN6QywrREFBK0Q7SUFDbkUsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFHQSxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUVJLDRDQUE0QztRQUM1QyxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxhQUFhO1FBRWIsNkJBQTZCO1FBQzdCLDZDQUE2QztRQUM3QywyQkFBMkI7SUFDL0IsQ0FBQztJQUNPLHNDQUFnQixHQUF4QjtR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QUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFFSSxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDN0IsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDOztJQTFSRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNHO0lBR3JCO1FBREMsUUFBUTtxREFDaUI7SUFmVCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeVMvQjtJQUFELGtCQUFDO0NBelNELEFBeVNDLENBelN3QyxFQUFFLENBQUMsU0FBUyxHQXlTcEQ7a0JBelNvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXcgZnJvbSBcIi4vVmlld1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi9Ub2FzdE1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbnZhciBUQUc6c3RyaW5nID0gXCJbVmlld01hbmFnZXJdXCJcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBzdGF0aWMgaW5zdGFuY2U6Vmlld01hbmFnZXI7XG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICAvLyBiYXNlRGlyOnN0cmluZyA9IFwiYXNzZXRzL1wiXG5cbiAgICBfdmlld3M6e1tpbmRleDpzdHJpbmddOlZpZXd9ID0ge31cblxuLy8gXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9kYWw6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHlcbiAgICBtb2RhbE9wYWNpdHk6bnVtYmVyID0gMTYwO1xuXG5cbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLm1vZGFsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vZGFsLnpJbmRleCA9IDk5OTtcbiAgICAgICAgZy5zZXRHbG9iYWxJbnN0YW5jZSh0aGlzKTtcbiAgICAgICAgLy8gY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNjLmZpbmQoXCJDYW52YXNcIilcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpXG4gICAge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgLy8gY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5fdmlld3Mpe1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ZpZXdzW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vbG9hZCBwcmVmYWJcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMubW9kYWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuc3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxuICAgICAgICAvLyB0aGlzLm1vZGFsLnpJbmRleCA9IDk5OTtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlRGlhbG9nKClcbiAgICB7XG4gICAgICAgIGZvcih2YXIgbmFtZSBpbiB0aGlzLl92aWV3cylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3c1tuYW1lXVxuICAgICAgICAgICAgaWYodmlldy5pc0RpYWxvZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUobmFtZSkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzVmlzaWJsZURpYWxvZygpXG4gICAge1xuICAgICAgICBmb3IodmFyIG5hbWUgaW4gdGhpcy5fdmlld3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5fdmlld3NbbmFtZV1cbiAgICAgICAgICAgIGlmKHZpZXcuaXNEaWFsb2cpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKG5hbWUpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWaXNpYmxlKHZpZXduYW1lKVxuICAgIHtcbiAgICAgICAgbGV0IHZpZXcgPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mKHZpZXduYW1lKSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgdmlldyA9IHRoaXMuX3ZpZXdzW3ZpZXduYW1lXVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2aWV3ID0gdmlld25hbWU7XG4gICAgICAgIC8vdG9kbyBjaGVjayB0eXBlIFxuICAgICAgICBpZiAodmlldylcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHZpZXcubm9kZS5hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hWaWV3Q29tcChleGlzdGluZ1ZpZXc6Y2MuTm9kZSk6Vmlld1xuICAgIHtcbiAgICAgICAgbGV0IHZpZXdDb21wID0gbnVsbDtcbiAgICAgICAgaWYodmlld0NvbXAgPT0gbnVsbHx8IHZpZXdDb21wID09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmlld0NvbXAgPSBleGlzdGluZ1ZpZXcuZ2V0Q29tcG9uZW50KFZpZXcpO1xuICAgICAgICAgICAgaWYodmlld0NvbXAgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3Q29tcCA9IGV4aXN0aW5nVmlldy5hZGRDb21wb25lbnQoVmlldyk7XG4gICAgICAgICAgICAgICAgdmlld0NvbXAuaW5pdChleGlzdGluZ1ZpZXcubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92aWV3c1tleGlzdGluZ1ZpZXcubmFtZV0gPSB2aWV3Q29tcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmlld0NvbXA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Vmlldyh2aWV3LC4uLnBhcmFtcylcbiAgICB7XG4gICAgICAgIHRoaXMubW9kYWwuYWN0aXZlID0gdmlldy5pc0RpYWxvZztcbiAgICAgICAgLy9jaGVjayBoYXMgcG9wdXBlZCBkaWFsb2cgYW5kICBhbGwgY3VycmVudHZpZXcgaXMgZGlhbG9nIHNob3cgbW9kYWwgZm9yY2VseS5cbiAgICAgICAgaWYgKHRoaXMuaGFzVmlzaWJsZURpYWxvZygpIHx8IHZpZXcuaXNEaWFsb2cpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuYWN0aXZlID0gIHRydWU7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuaXNEaWFsb2cpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwub3BhY2l0eSA9IHZpZXcub3BhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmlldy5zaG93KC4uLnBhcmFtcyk7XG4gICAgfVxuXG4gICAgc2hvd0Zyb21QcmVmYWIocHJlZmFiOmNjLlByZWZhYixwcmVmYWJQYXRoOnN0cmluZyAsLi4ucGFyYW1zKVxuICAgIHtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3c1twcmVmYWJQYXRoXTtcbiAgICAgICAgaWYodmlldyA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYilcbiAgICAgICAgICAgIHZpZXcgPSBub2RlLmdldENvbXBvbmVudChWaWV3KVxuICAgICAgICAgICAgaWYodmlldyA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXcgPSBub2RlLmFkZENvbXBvbmVudChWaWV3KTtcbiAgICAgICAgICAgICAgICB2aWV3LmlzRGlhbG9nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvL2RlZmF1bHQgaXMgZGlhbG9nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdmlldy5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgICAgIGlmKHdpZGdldClcbiAgICAgICAgICAgICAgICB3aWRnZXQudGFyZ2V0ID0gY2MuZmluZChcIkNhbnZhc1wiKVxuICAgICAgICAgICAgdmlldy5pbml0KHByZWZhYlBhdGgpO1xuICAgICAgICAgICAgdGhpcy5fdmlld3NbcHJlZmFiUGF0aF0gPSB2aWV3O1xuICAgICAgICAgICAgaWYodmlldy5pc0RpYWxvZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSwxMDAwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlLDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZy5mb3JlYWNoTm9kZSh2aWV3Lm5vZGUsdGhpcy51cGRhdGVXaWRnZXRzLHRoaXMpXG4gICAgICAgIH1cbiAgICAgICAgLy8gbm9kZSA9IHZpZXcubm9kZTtcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yLnNldEEoMjU1KTtcbiAgICAgICAgY29uc29sZS5sb2coVEFHLFwic2hvdyB2aWV3OlwiICsgcHJlZmFiUGF0aCApXG4gICAgICAgIHJldHVybiB0aGlzLnNob3dWaWV3KHZpZXcsLi4ucGFyYW1zKTtcbiAgICB9XG5cbiAgICBzaG93RnJvbVByZWZhYlBhdGgocHJlZmFiUGF0aDpzdHJpbmcsLi4ucGFyYW1zKVxuICAgIHtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3c1twcmVmYWJQYXRoXVxuICAgICAgICBpZih2aWV3ID09IG51bGwgfHx2aWV3ID09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGFydCBsb2FkIHByZWZhYjpcIiArcHJlZmFiUGF0aClcbiAgICAgICAgICAgIGxldCBiZWZvcmVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwcmVmYWJQYXRoLGNjLlByZWZhYiwoZSxwcmVmYWI6Y2MuUHJlZmFiKSA9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsXCJwcmVmYWIgbG9hZGVkIDogXCIrIHByZWZhYlBhdGggK1wiIFwiKyAgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gYmVmb3JlVGltZSkgK1wibXNcIilcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGcm9tUHJlZmFiKHByZWZhYixwcmVmYWJQYXRoLC4uLnBhcmFtcyk7XG4gICAgICAgICAgICB9KSBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyB0aGlzLnNwcml0ZS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLmFjdGl2ZSA9IHZpZXcuaXNEaWFsb2c7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNWaXNpYmxlRGlhbG9nKCkgfHwgdmlldy5pc0RpYWxvZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLmFjdGl2ZSA9ICB0cnVlOyAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5vcGFjaXR5ID0gdmlldy5vcGFjaXR5OyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRyxcInNob3cgdmlldzpcIiArIHByZWZhYlBhdGggLHBhcmFtcylcbiAgICAgICAgICAgIC8vIGxldCB2aWV3bm9kZSA9IHZpZXcubm9kZTtcbiAgICAgICAgICAgIC8vIHZpZXcubm9kZS54ID0gMDtcbiAgICAgICAgICAgIC8vIHZpZXcubm9kZS55ID0gMDtcbiAgICAgICAgICAgIHJldHVybiAgdmlldy5zaG93KC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVsb2FkKHByZWZhYlBhdGg6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3c1twcmVmYWJQYXRoXVxuICAgICAgICBpZih2aWV3ID09IG51bGwgfHx2aWV3ID09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMocHJlZmFiUGF0aCxjYy5QcmVmYWIsKGUscHJlZmFiOmNjLlByZWZhYikgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLFwicHJlbG9hZCB2aWV3XCIrIHByZWZhYlBhdGgpXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXG4gICAgICAgICAgICAgICAgdmlldyA9IG5vZGUuZ2V0Q29tcG9uZW50KFZpZXcpO1xuICAgICAgICAgICAgICAgIGxldCB3aWRnZXQgPSB2aWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICAgICAgICAgIGlmKHdpZGdldClcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRhcmdldCA9IGNjLmZpbmQoXCJDYW52YXNcIilcbiAgICAgICAgICAgICAgICB2aWV3LmluaXQocHJlZmFiUGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld3NbcHJlZmFiUGF0aF0gPSB2aWV3O1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKF89Pm5vZGUuYWN0aXZlID0gZmFsc2UsMCk7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXcuaXNEaWFsb2cpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSwxMDAwKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUsMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpZXcuaGlkZSgpO1xuICAgICAgICAgICAgfSkgXG4gICAgICAgIH1lbHNle1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gd2lsbCBlbmFibGVUb3VjaCBuZXh0IHNob3cgdXBcbiAgICBkaXNhYmxlVG91Y2godmlld05vZGUpXG4gICAge1xuICAgICAgICBsZXQgdmlldyA9IHZpZXdOb2RlLmdldENvbXBvbmVudChWaWV3KVxuICAgICAgICBpZih2aWV3KVxuICAgICAgICB7XG4gICAgICAgICAgICB2aWV3LnRvdWNoRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlVG91Y2godmlld05vZGUpXG4gICAge1xuICAgICAgICBsZXQgdmlldyA9IHZpZXdOb2RlLmdldENvbXBvbmVudChWaWV3KVxuICAgICAgICBpZih2aWV3KVxuICAgICAgICB7XG4gICAgICAgICAgICB2aWV3LnRvdWNoRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHNob3codmlldywgLi4ucGFyYW1zKVxuICAgIHtcbiAgICAgICAgLy8gZGlzYWJsZSBjdXJyZW50IHZpZXcgJ3MgdG91Y2ggIFxuICAgICAgICBpZiAodHlwZW9mKHZpZXcpID09IFwic3RyaW5nXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dGcm9tUHJlZmFiUGF0aCh2aWV3LC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGx8fCB2aWV3ID09IHVuZGVmaW5lZCkgIHJldHVybjtcbiAgICAgICAgICAgIGlmKHZpZXcubm9kZSkgdmlldyA9IHZpZXcubm9kZTtcbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5hdHRhY2hWaWV3Q29tcCh2aWV3KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1ZpZXcodiwuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBoaWRlKHZpZXduYW1lLHBsYXlIaWRlQW5pbSA9IHRydWUpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Yodmlld25hbWUpICE9IFwic3RyaW5nXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGdldCB2aWV3IG5hbWUgXG4gICAgICAgICAgICBpZiAodmlld25hbWUgPT0gbnVsbHx8IHZpZXduYW1lID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hWaWV3Q29tcCh2aWV3bmFtZSlcbiAgICAgICAgICAgIHZpZXduYW1lID0gdmlld25hbWUubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXdzW3ZpZXduYW1lXVxuICAgICAgICBpZih2aWV3ICE9IG51bGwgJiYgdmlldyAhPSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh2aWV3LmlzRGlhbG9nICl7XG4gICAgICAgICAgICAgICAgLy90b2RvOiBzaG91bGQgc3VwcG9ydCBkaWFsb2cgaGlkZSBhbmltdGlvbiAgbGF0ZXIgXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuaGFzVmlzaWJsZURpYWxvZygpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmKHZpZXcuaXNJbkhpZGVBbmltYXRpb24oKSlcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyB2aWV3LmhpZGUoKTtcbiAgICAgICAgICAgIGlmKHBsYXlIaWRlQW5pbSApXG4gICAgICAgICAgICAgICAgdmlldy5kb0hpZGVBbmltYXRpb24oKTtcbiAgICAgICAgICAgIHZpZXcub25IaWRkZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrVmlld1N0YWNrcygpXG4gICAge1xuICAgICAgICBsZXQgZGlhbG9nID0gdGhpcy5nZXRWaXNpYmxlRGlhbG9nKClcbiAgICAgICAgaWYoZGlhbG9nKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLm9wYWNpdHkgPSBkaWFsb2cub3BhY2l0eTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVBbGwoKVxuICAgIHtcbiAgICAgICAgZm9yICh2YXIgdmlld25hbWUgaW4gdGhpcy5fdmlld3Mpe1xuICAgICAgICAgICAgLy8gbGV0IHZpZXcgPSB0aGlzLl92aWV3c1t2aWV3bmFtZV1cbiAgICAgICAgICAgIHRoaXMuaGlkZSh2aWV3bmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19