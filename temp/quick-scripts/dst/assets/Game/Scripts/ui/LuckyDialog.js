
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/ui/LuckyDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a94275+JmtMx6iZb18iwKTe', 'LuckyDialog');
// Game/Scripts/ui/LuckyDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var View_1 = require("../../../framework/plugin_boosts/ui/View");
var Info_1 = require("../Info");
var Platform_1 = require("../../../framework/Platform");
var Device_1 = require("../../../framework/plugin_boosts/gamesys/Device");
var Res_1 = require("../hex-lines-game/Res");
var UIFunctions_1 = require("../../../framework/plugin_boosts/ui/UIFunctions");
var Main_1 = require("../Main");
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LuckyDialog = /** @class */ (function (_super) {
    __extends(LuckyDialog, _super);
    function LuckyDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._canRotate = true;
        _this.sprites = [];
        _this.labels = [];
        _this.btn_freedraw = null;
        _this.btn_videodraw = null;
        _this.freedrawTip = null;
        _this.drawLabel = null;
        // click_draw()
        // {
        // }
        _this.pool = [];
        return _this;
    }
    LuckyDialog_1 = LuckyDialog;
    LuckyDialog.prototype.start = function () { };
    LuckyDialog.prototype.share_succ = function () {
        this.startDraw();
        Info_1.UserInfo.freedrawTime = new Date().getTime();
        Info_1.UserInfo.save();
        Main_1.default.instance.refreshRedpoints();
        this.onShown();
    };
    LuckyDialog.prototype.click_freeedraw = function () {
        if (g.isNextDay(Info_1.UserInfo.freedrawTime)) {
            this.share_succ();
        }
    };
    LuckyDialog.prototype.onLoad = function () {
        for (var i = 0; i < Res_1.R.luckyConfig.json.length; i++) {
            var cfg = Res_1.R.luckyConfig.json[i];
            var chance = parseFloat(cfg.chance);
            for (var j = 0; j < chance * 2; j++) {
                this.pool.push(i);
            }
        }
        this.pool.shuffle();
        console.log(this.pool);
    };
    LuckyDialog.prototype.startDraw = function () {
        var id = g.getRandomInArray(this.pool);
        this.startWheel(id);
        Device_1.default.playEffect(Res_1.R.audio_draw);
    };
    // 5次
    LuckyDialog.prototype.click_videodraw = function () {
        var _this = this;
        if (Info_1.UserInfo.luckyVideoWatchCount >= LuckyDialog_1.MaxVideoCount) {
            if (g.isNextDay(Info_1.UserInfo.luckyVideoWatchTime)) {
                Info_1.UserInfo.luckyVideoWatchCount = 0;
                Info_1.UserInfo.luckyVideoWatchTime = new Date().getTime();
            }
            else {
                // Platform.share(_=>{
                //     this.startDraw()
                // })
                return;
            }
        }
        else {
            Platform_1.default.watch_video(function (_) {
                Info_1.UserInfo.luckyVideoWatchCount++;
                _this.startDraw();
            });
        }
        //video 流量主开通后
        // Platform.watch_video(_=>{
        //     this.startDraw()
        //     UserInfo.luckyVideoWatchCount += 1;
        //     UserInfo.save();
        //     this.onShown()
        //     // Toast.make("还剩" +  (5- UserInfo.luckyVideoWatchCount) +"次机会")
        // });
    };
    LuckyDialog.prototype.calculateAngle = function (index) {
        var angle = -(index - 1) * 60 - 30 - 4 * 360 - this.wheelSp.node.rotation % 360;
        return angle;
    };
    LuckyDialog.prototype.onShown = function () {
        if (Info_1.UserInfo.luckyVideoWatchCount >= LuckyDialog_1.MaxVideoCount) {
            this.drawLabel.string = "已用完";
            UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, false);
        }
        else {
            this.drawLabel.string = "看视频抽奖";
            UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, true);
        }
        if (g.isGreaterDate(new Date(), new Date(Info_1.UserInfo.freedrawTime))) {
            //free draw 
            this.btn_freedraw.interactable = true;
            this.btn_freedraw.node.opacity = 255;
            this.freedrawTip.active = false;
        }
        else {
            this.btn_freedraw.interactable = false;
            this.btn_freedraw.node.opacity = 100;
            this.freedrawTip.active = true;
        }
        for (var i = 0; i < Res_1.R.luckyConfig.json.length; i++) {
            var cfg = Res_1.R.luckyConfig.json[i];
            this.labels[i].string = cfg.gold_reward + "";
        }
    };
    LuckyDialog.prototype.startWheel = function (id) {
        console.log("target wheel:", id);
        var angle = this.calculateAngle(id);
        if (!this._canRotate) {
            // Toast.make('正在给您挑选奖品...');
            ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("luck_loading"));
            return;
        }
        this._canRotate = false;
        var stage3 = cc.rotateBy(Math.abs(angle / 400), angle);
        var callFunc = cc.callFunc(function () {
            this._canRotate = true;
            this.showRes(id);
        }.bind(this));
        var sequence = cc.sequence(stage3, callFunc);
        this.wheelSp.node.runAction(sequence.easing(cc.easeQuadraticActionInOut()));
    };
    LuckyDialog.prototype.showRes = function (id) {
        var cfg = Res_1.R.luckyConfig.json[id];
        var gold = !isNaN((Number(cfg.gold_reward)));
        if (gold) {
            this.getComponent(View_1.default).hide();
            ViewManager_1.default.instance.show("Game/GetDialog", cfg.gold_reward);
        }
        else {
            //神秘
            // Toast.make("恭喜你抽中了 " + cfg.gold_reward);
            var text = LanguageManager_1.default.instance.getText("gold_get");
            ToastManager_1.Toast.make(text + " " + cfg.gold_reward);
            Info_1.UserInfo.unlock(g.randomInt(0, 6));
            // Device.playEffect(R.audio_unlock);
        }
    };
    LuckyDialog.prototype.update = function (dt) {
    };
    LuckyDialog.prototype.click_close = function () {
        if (!this._canRotate) {
            // Toast.make('正在给您挑选奖品...');
            ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("luck_loading"));
            return;
        }
        this.getComponent(View_1.default).hide();
    };
    var LuckyDialog_1;
    LuckyDialog.MaxVideoCount = 5;
    __decorate([
        property(cc.Sprite)
    ], LuckyDialog.prototype, "wheelSp", void 0);
    __decorate([
        property([cc.Sprite])
    ], LuckyDialog.prototype, "sprites", void 0);
    __decorate([
        property([cc.Label])
    ], LuckyDialog.prototype, "labels", void 0);
    __decorate([
        property(cc.Button)
    ], LuckyDialog.prototype, "btn_freedraw", void 0);
    __decorate([
        property(cc.Button)
    ], LuckyDialog.prototype, "btn_videodraw", void 0);
    __decorate([
        property(cc.Node)
    ], LuckyDialog.prototype, "freedrawTip", void 0);
    __decorate([
        property(cc.Label)
    ], LuckyDialog.prototype, "drawLabel", void 0);
    LuckyDialog = LuckyDialog_1 = __decorate([
        ccclass
    ], LuckyDialog);
    return LuckyDialog;
}(cc.Component));
exports.default = LuckyDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEx1Y2t5RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBeUU7QUFDekUsK0VBQTBFO0FBQzFFLGlFQUE0RDtBQUM1RCxnQ0FBbUM7QUFDbkMsd0RBQW1EO0FBQ25ELDBFQUFxRTtBQUNyRSw2Q0FBMEM7QUFDMUMsK0VBQTBFO0FBQzFFLGdDQUEyQjtBQUMzQix1RkFBa0Y7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFxTUM7UUE3TEcsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBTyxHQUFlLEVBQUUsQ0FBQTtRQUd4QixZQUFNLEdBQWMsRUFBRSxDQUFBO1FBR3RCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBSTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFJMUIsZUFBZTtRQUNmLElBQUk7UUFFSixJQUFJO1FBRUosVUFBSSxHQUFHLEVBQUUsQ0FBQTs7SUFpS2IsQ0FBQztvQkFyTW9CLFdBQVc7SUFHNUIsMkJBQUssR0FBTCxjQUFVLENBQUM7SUFvQ1gsZ0NBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixlQUFRLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUMsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsY0FBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUVJLElBQUksQ0FBQyxDQUFDLFNBQVMs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RC9CLE9BQU87T0FDYSxXQUFXLENBcU0vQjtJQUFELGtCQUFDO0NBck1ELEFBcU1DLENBck13QyxFQUFFLENBQUMsU0FBUyxHQXFNcEQ7a0JBck1vQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld1wiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgeyBSIH0gZnJvbSBcIi4uL2hleC1saW5lcy1nYW1lL1Jlc1wiO1xuaW1wb3J0IFVJRnVuY3Rpb25zIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9VSUZ1bmN0aW9uc1wiO1xuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0xhbmd1YWdlTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEx1Y2t5RGlhbG9nIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIFxuICAgIHN0YXJ0ICgpIHt9XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHdoZWVsU3A6Y2MuU3ByaXRlXG5cbiAgICBfY2FuUm90YXRlID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlXSlcbiAgICBzcHJpdGVzOmNjLlNwcml0ZVtdID0gW11cblxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxuICAgIGxhYmVsczpjYy5MYWJlbFtdID0gW11cblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnRuX2ZyZWVkcmF3OmNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ0bl92aWRlb2RyYXc6Y2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGZyZWVkcmF3VGlwOmNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZHJhd0xhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIHN0YXRpYyBNYXhWaWRlb0NvdW50ID0gNTtcblxuICAgIC8vIGNsaWNrX2RyYXcoKVxuICAgIC8vIHtcblxuICAgIC8vIH1cblxuICAgIHBvb2wgPSBbXVxuICAgIFxuXG4gICAgc2hhcmVfc3VjYygpXG4gICAge1xuICAgICAgICB0aGlzLnN0YXJ0RHJhdygpO1xuICAgICAgICBVc2VySW5mby5mcmVlZHJhd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBVc2VySW5mby5zYXZlKClcbiAgICAgICAgTWFpbi5pbnN0YW5jZS5yZWZyZXNoUmVkcG9pbnRzKClcbiAgICAgICAgdGhpcy5vblNob3duKCk7XG4gICAgfVxuXG4gICAgY2xpY2tfZnJlZWVkcmF3KClcbiAgICB7XG4gICAgICAgIGlmIChnLmlzTmV4dERheShVc2VySW5mby5mcmVlZHJhd1RpbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3N1Y2MoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgO2kgPCBSLmx1Y2t5Q29uZmlnLmpzb24ubGVuZ3RoOyBpICsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2ZnID0gUi5sdWNreUNvbmZpZy5qc29uW2ldO1xuICAgICAgICAgICAgbGV0IGNoYW5jZSA9IHBhcnNlRmxvYXQoY2ZnLmNoYW5jZSlcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwIDsgaiA8IGNoYW5jZSAqIDIgOyBqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb29sLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb29sLnNodWZmbGUoKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvb2wpO1xuICAgIH1cblxuICAgIHN0YXJ0RHJhdygpXG4gICAge1xuICAgICAgICBsZXQgaWQgPSBnLmdldFJhbmRvbUluQXJyYXkodGhpcy5wb29sKVxuICAgICAgICB0aGlzLnN0YXJ0V2hlZWwoaWQpXG4gICAgICAgIERldmljZS5wbGF5RWZmZWN0KFIuYXVkaW9fZHJhdyk7XG4gICAgfVxuXG4gICAgLy8gNeasoVxuICAgIGNsaWNrX3ZpZGVvZHJhdygpXG4gICAge1xuICAgICAgICBpZiAoVXNlckluZm8ubHVja3lWaWRlb1dhdGNoQ291bnQgPj0gTHVja3lEaWFsb2cuTWF4VmlkZW9Db3VudClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoZy5pc05leHREYXkoVXNlckluZm8ubHVja3lWaWRlb1dhdGNoVGltZSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vIFBsYXRmb3JtLnNoYXJlKF89PntcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zdGFydERyYXcoKVxuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFBsYXRmb3JtLndhdGNoX3ZpZGVvKF89PntcbiAgICAgICAgICAgICAgICBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCArKyBcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RHJhdygpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vdmlkZW8g5rWB6YeP5Li75byA6YCa5ZCOXG4gICAgICAgIC8vIFBsYXRmb3JtLndhdGNoX3ZpZGVvKF89PntcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhcnREcmF3KClcbiAgICAgICAgLy8gICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ICs9IDE7XG4gICAgICAgIC8vICAgICBVc2VySW5mby5zYXZlKCk7XG4gICAgICAgIC8vICAgICB0aGlzLm9uU2hvd24oKVxuICAgICAgICAvLyAgICAgLy8gVG9hc3QubWFrZShcIui/mOWJqVwiICsgICg1LSBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCkgK1wi5qyh5py65LyaXCIpXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuXG4gICAgY2FsY3VsYXRlQW5nbGUoaW5kZXg6bnVtYmVyKXsvL+WlluWTgeeahGluZGV45LuOMOW8gOWni1xuICAgICAgICBsZXQgYW5nbGUgPSAtKGluZGV4LTEpICogNjAgLSAzMCAgLSAgNCAqIDM2MCAtICB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbiAlMzYwIFxuICAgICAgICByZXR1cm4gYW5nbGVcbiAgICB9XG5cbiAgICBvblNob3duKClcbiAgICB7XG4gICAgICAgIGlmIChVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA+PSAgTHVja3lEaWFsb2cuTWF4VmlkZW9Db3VudClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kcmF3TGFiZWwuc3RyaW5nID0gXCLlt7LnlKjlroxcIlxuICAgICAgICAgICAgVUlGdW5jdGlvbnMuc2V0QnV0dG9uRW5hYmxlZCh0aGlzLmJ0bl92aWRlb2RyYXcsZmFsc2UpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5kcmF3TGFiZWwuc3RyaW5nID0gXCLnnIvop4bpopHmir3lpZZcIlxuICAgICAgICAgICAgVUlGdW5jdGlvbnMuc2V0QnV0dG9uRW5hYmxlZCh0aGlzLmJ0bl92aWRlb2RyYXcsdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoZy5pc0dyZWF0ZXJEYXRlKG5ldyBEYXRlKCksICBuZXcgRGF0ZShVc2VySW5mby5mcmVlZHJhd1RpbWUpKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vZnJlZSBkcmF3IFxuICAgICAgICAgICAgdGhpcy5idG5fZnJlZWRyYXcuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5idG5fZnJlZWRyYXcubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdGhpcy5mcmVlZHJhd1RpcC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWVkcmF3LmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlZHJhdy5ub2RlLm9wYWNpdHkgPSAxMDA7XG4gICAgICAgICAgICB0aGlzLmZyZWVkcmF3VGlwLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMCA7IGk8IFIubHVja3lDb25maWcuanNvbi5sZW5ndGg7IGkgKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baV1cbiAgICAgICAgICAgIHRoaXMubGFiZWxzW2ldLnN0cmluZyA9IGNmZy5nb2xkX3Jld2FyZCArXCJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRXaGVlbChpZClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFyZ2V0IHdoZWVsOlwiICxpZCk7XG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuY2FsY3VsYXRlQW5nbGUoaWQpXG4gICAgICAgIGlmICghdGhpcy5fY2FuUm90YXRlKXtcbiAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoJ+ato+WcqOe7meaCqOaMkemAieWlluWTgS4uLicpO1xuICAgICAgICAgICAgVG9hc3QubWFrZShMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImx1Y2tfbG9hZGluZ1wiKSk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYW5Sb3RhdGUgPSBmYWxzZVxuXG4gICAgICAgIGxldCBzdGFnZTMgPSBjYy5yb3RhdGVCeShNYXRoLmFicyhhbmdsZS80MDApLGFuZ2xlKVxuICAgICAgICBsZXQgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5fY2FuUm90YXRlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5zaG93UmVzKGlkKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKHN0YWdlMyxjYWxsRnVuYylcbiAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucnVuQWN0aW9uKHNlcXVlbmNlLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQoKSkpXG4gICAgfVxuXG4gICAgc2hvd1JlcyhpZClcbiAgICB7XG4gICAgICAgIGxldCBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baWRdXG4gICAgICAgIGxldCBnb2xkID0gIWlzTmFOKChOdW1iZXIoY2ZnLmdvbGRfcmV3YXJkKSkpXG4gICAgICAgIGlmKGdvbGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvR2V0RGlhbG9nXCIsY2ZnLmdvbGRfcmV3YXJkKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvL+elnuenmFxuICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIuaBreWWnOS9oOaKveS4reS6hiBcIiArIGNmZy5nb2xkX3Jld2FyZCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQoXCJnb2xkX2dldFwiKTtcbiAgICAgICAgICAgIFRvYXN0Lm1ha2UoYCR7dGV4dH0gJHtjZmcuZ29sZF9yZXdhcmR9YCk7XG4gICAgICAgICAgICBVc2VySW5mby51bmxvY2soZy5yYW5kb21JbnQoMCw2KSk7XG4gICAgICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX3VubG9jayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cblxuICAgIGNsaWNrX2Nsb3NlKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5fY2FuUm90YXRlKXtcbiAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoJ+ato+WcqOe7meaCqOaMkemAieWlluWTgS4uLicpO1xuICAgICAgICAgICAgVG9hc3QubWFrZShMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImx1Y2tfbG9hZGluZ1wiKSk7XG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG5cbn0iXX0=