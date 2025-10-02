
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
            // this.drawLabel.string = "已用完"
            this.drawLabel.string = LanguageManager_1.default.instance.getText("no_draw");
            UIFunctions_1.default.setButtonEnabled(this.btn_videodraw, false);
        }
        else {
            // this.drawLabel.string = "看视频抽奖"
            this.drawLabel.string = LanguageManager_1.default.instance.getText("watch_video");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEx1Y2t5RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBeUU7QUFDekUsK0VBQTBFO0FBQzFFLGlFQUE0RDtBQUM1RCxnQ0FBbUM7QUFDbkMsd0RBQW1EO0FBQ25ELDBFQUFxRTtBQUNyRSw2Q0FBMEM7QUFDMUMsK0VBQTBFO0FBQzFFLGdDQUEyQjtBQUMzQix1RkFBa0Y7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUF1TUM7UUEvTEcsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBTyxHQUFlLEVBQUUsQ0FBQTtRQUd4QixZQUFNLEdBQWMsRUFBRSxDQUFBO1FBR3RCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBSTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFJMUIsZUFBZTtRQUNmLElBQUk7UUFFSixJQUFJO1FBRUosVUFBSSxHQUFHLEVBQUUsQ0FBQTs7SUFtS2IsQ0FBQztvQkF2TW9CLFdBQVc7SUFHNUIsMkJBQUssR0FBTCxjQUFVLENBQUM7SUFvQ1gsZ0NBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixlQUFRLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUMsZUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsY0FBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUVJLElBQUksQ0FBQyxDQUFDLFNBQVMs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QyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUkzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNPO0lBM0JULFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0F1TS9CO0lBQUQsa0JBQUM7Q0F2TUQsQUF1TUMsQ0F2TXdDLEVBQUUsQ0FBQyxTQUFTLEdBdU1wRDtrQkF2TW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3XCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9QbGF0Zm9ybVwiO1xuaW1wb3J0IERldmljZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvZ2FtZXN5cy9EZXZpY2VcIjtcbmltcG9ydCB7IFIgfSBmcm9tIFwiLi4vaGV4LWxpbmVzLWdhbWUvUmVzXCI7XG5pbXBvcnQgVUlGdW5jdGlvbnMgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1VJRnVuY3Rpb25zXCI7XG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvTGFuZ3VhZ2VNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVja3lEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgXG4gICAgc3RhcnQgKCkge31cblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgd2hlZWxTcDpjYy5TcHJpdGVcblxuICAgIF9jYW5Sb3RhdGUgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxuICAgIHNwcml0ZXM6Y2MuU3ByaXRlW10gPSBbXVxuXG4gICAgQHByb3BlcnR5KFtjYy5MYWJlbF0pXG4gICAgbGFiZWxzOmNjLkxhYmVsW10gPSBbXVxuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBidG5fZnJlZWRyYXc6Y2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnRuX3ZpZGVvZHJhdzpjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZnJlZWRyYXdUaXA6Y2MuTm9kZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkcmF3TGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgc3RhdGljIE1heFZpZGVvQ291bnQgPSA1O1xuXG4gICAgLy8gY2xpY2tfZHJhdygpXG4gICAgLy8ge1xuXG4gICAgLy8gfVxuXG4gICAgcG9vbCA9IFtdXG4gICAgXG5cbiAgICBzaGFyZV9zdWNjKClcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhcnREcmF3KCk7XG4gICAgICAgIFVzZXJJbmZvLmZyZWVkcmF3VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICBNYWluLmluc3RhbmNlLnJlZnJlc2hSZWRwb2ludHMoKVxuICAgICAgICB0aGlzLm9uU2hvd24oKTtcbiAgICB9XG5cbiAgICBjbGlja19mcmVlZWRyYXcoKVxuICAgIHtcbiAgICAgICAgaWYgKGcuaXNOZXh0RGF5KFVzZXJJbmZvLmZyZWVkcmF3VGltZSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfc3VjYygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCA7aSA8IFIubHVja3lDb25maWcuanNvbi5sZW5ndGg7IGkgKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baV07XG4gICAgICAgICAgICBsZXQgY2hhbmNlID0gcGFyc2VGbG9hdChjZmcuY2hhbmNlKVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAgOyBqIDwgY2hhbmNlICogMiA7IGorKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvb2wucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvb2wuc2h1ZmZsZSgpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucG9vbCk7XG4gICAgfVxuXG4gICAgc3RhcnREcmF3KClcbiAgICB7XG4gICAgICAgIGxldCBpZCA9IGcuZ2V0UmFuZG9tSW5BcnJheSh0aGlzLnBvb2wpXG4gICAgICAgIHRoaXMuc3RhcnRXaGVlbChpZClcbiAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb19kcmF3KTtcbiAgICB9XG5cbiAgICAvLyA15qyhXG4gICAgY2xpY2tfdmlkZW9kcmF3KClcbiAgICB7XG4gICAgICAgIGlmIChVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA+PSBMdWNreURpYWxvZy5NYXhWaWRlb0NvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihnLmlzTmV4dERheShVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hUaW1lKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8gUGxhdGZvcm0uc2hhcmUoXz0+e1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXJ0RHJhdygpXG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgUGxhdGZvcm0ud2F0Y2hfdmlkZW8oXz0+e1xuICAgICAgICAgICAgICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ICsrIFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREcmF3KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy92aWRlbyDmtYHph4/kuLvlvIDpgJrlkI5cbiAgICAgICAgLy8gUGxhdGZvcm0ud2F0Y2hfdmlkZW8oXz0+e1xuICAgICAgICAvLyAgICAgdGhpcy5zdGFydERyYXcoKVxuICAgICAgICAvLyAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoQ291bnQgKz0gMTtcbiAgICAgICAgLy8gICAgIFVzZXJJbmZvLnNhdmUoKTtcbiAgICAgICAgLy8gICAgIHRoaXMub25TaG93bigpXG4gICAgICAgIC8vICAgICAvLyBUb2FzdC5tYWtlKFwi6L+Y5YmpXCIgKyAgKDUtIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50KSArXCLmrKHmnLrkvJpcIilcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG5cbiAgICBjYWxjdWxhdGVBbmdsZShpbmRleDpudW1iZXIpey8v5aWW5ZOB55qEaW5kZXjku44w5byA5aeLXG4gICAgICAgIGxldCBhbmdsZSA9IC0oaW5kZXgtMSkgKiA2MCAtIDMwICAtICA0ICogMzYwIC0gIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uICUzNjAgXG4gICAgICAgIHJldHVybiBhbmdsZVxuICAgIH1cblxuICAgIG9uU2hvd24oKVxuICAgIHtcbiAgICAgICAgaWYgKFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ID49ICBMdWNreURpYWxvZy5NYXhWaWRlb0NvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBcIuW3sueUqOWujFwiXG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcIm5vX2RyYXdcIik7XG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5zZXRCdXR0b25FbmFibGVkKHRoaXMuYnRuX3ZpZGVvZHJhdyxmYWxzZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBcIueci+inhumikeaKveWlllwiXG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcIndhdGNoX3ZpZGVvXCIpO1xuICAgICAgICAgICAgVUlGdW5jdGlvbnMuc2V0QnV0dG9uRW5hYmxlZCh0aGlzLmJ0bl92aWRlb2RyYXcsdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoZy5pc0dyZWF0ZXJEYXRlKG5ldyBEYXRlKCksICBuZXcgRGF0ZShVc2VySW5mby5mcmVlZHJhd1RpbWUpKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vZnJlZSBkcmF3IFxuICAgICAgICAgICAgdGhpcy5idG5fZnJlZWRyYXcuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5idG5fZnJlZWRyYXcubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdGhpcy5mcmVlZHJhd1RpcC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWVkcmF3LmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlZHJhdy5ub2RlLm9wYWNpdHkgPSAxMDA7XG4gICAgICAgICAgICB0aGlzLmZyZWVkcmF3VGlwLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMCA7IGk8IFIubHVja3lDb25maWcuanNvbi5sZW5ndGg7IGkgKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baV1cbiAgICAgICAgICAgIHRoaXMubGFiZWxzW2ldLnN0cmluZyA9IGNmZy5nb2xkX3Jld2FyZCArXCJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRXaGVlbChpZClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFyZ2V0IHdoZWVsOlwiICxpZCk7XG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuY2FsY3VsYXRlQW5nbGUoaWQpXG4gICAgICAgIGlmICghdGhpcy5fY2FuUm90YXRlKXtcbiAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoJ+ato+WcqOe7meaCqOaMkemAieWlluWTgS4uLicpO1xuICAgICAgICAgICAgVG9hc3QubWFrZShMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImx1Y2tfbG9hZGluZ1wiKSk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYW5Sb3RhdGUgPSBmYWxzZVxuXG4gICAgICAgIGxldCBzdGFnZTMgPSBjYy5yb3RhdGVCeShNYXRoLmFicyhhbmdsZS80MDApLGFuZ2xlKVxuICAgICAgICBsZXQgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5fY2FuUm90YXRlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5zaG93UmVzKGlkKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKHN0YWdlMyxjYWxsRnVuYylcbiAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucnVuQWN0aW9uKHNlcXVlbmNlLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQoKSkpXG4gICAgfVxuXG4gICAgc2hvd1JlcyhpZClcbiAgICB7XG4gICAgICAgIGxldCBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baWRdXG4gICAgICAgIGxldCBnb2xkID0gIWlzTmFOKChOdW1iZXIoY2ZnLmdvbGRfcmV3YXJkKSkpXG4gICAgICAgIGlmKGdvbGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvR2V0RGlhbG9nXCIsY2ZnLmdvbGRfcmV3YXJkKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvL+elnuenmFxuICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIuaBreWWnOS9oOaKveS4reS6hiBcIiArIGNmZy5nb2xkX3Jld2FyZCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQoXCJnb2xkX2dldFwiKTtcbiAgICAgICAgICAgIFRvYXN0Lm1ha2UoYCR7dGV4dH0gJHtjZmcuZ29sZF9yZXdhcmR9YCk7XG4gICAgICAgICAgICBVc2VySW5mby51bmxvY2soZy5yYW5kb21JbnQoMCw2KSk7XG4gICAgICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX3VubG9jayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cblxuICAgIGNsaWNrX2Nsb3NlKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5fY2FuUm90YXRlKXtcbiAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoJ+ato+WcqOe7meaCqOaMkemAieWlluWTgS4uLicpO1xuICAgICAgICAgICAgVG9hc3QubWFrZShMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImx1Y2tfbG9hZGluZ1wiKSk7XG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpXG4gICAgfVxuXG5cbn0iXX0=