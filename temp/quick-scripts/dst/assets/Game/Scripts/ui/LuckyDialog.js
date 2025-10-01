
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
            ToastManager_1.Toast.make('正在给您挑选奖品...');
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
            ToastManager_1.Toast.make("恭喜你抽中了 " + cfg.gold_reward);
            Info_1.UserInfo.unlock(g.randomInt(0, 6));
            // Device.playEffect(R.audio_unlock);
        }
    };
    LuckyDialog.prototype.update = function (dt) {
    };
    LuckyDialog.prototype.click_close = function () {
        if (!this._canRotate) {
            ToastManager_1.Toast.make('正在给您挑选奖品...');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcdWlcXEx1Y2t5RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRkFBeUU7QUFDekUsK0VBQTBFO0FBQzFFLGlFQUE0RDtBQUM1RCxnQ0FBbUM7QUFDbkMsd0RBQW1EO0FBQ25ELDBFQUFxRTtBQUNyRSw2Q0FBMEM7QUFDMUMsK0VBQTBFO0FBQzFFLGdDQUEyQjtBQUVyQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQWlNQztRQXpMRyxnQkFBVSxHQUFHLElBQUksQ0FBQztRQUdsQixhQUFPLEdBQWUsRUFBRSxDQUFBO1FBR3hCLFlBQU0sR0FBYyxFQUFFLENBQUE7UUFHdEIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFJM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUkxQixlQUFlO1FBQ2YsSUFBSTtRQUVKLElBQUk7UUFFSixVQUFJLEdBQUcsRUFBRSxDQUFBOztJQTZKYixDQUFDO29CQWpNb0IsV0FBVztJQUc1QiwyQkFBSyxHQUFMLGNBQVUsQ0FBQztJQW9DWCxnQ0FBVSxHQUFWO1FBRUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGVBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM1QyxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZixjQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBRUksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUMsRUFDdEM7WUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDcEI7SUFDTCxDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQ25EO1lBQ0ksSUFBSSxHQUFHLEdBQUcsT0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRyxDQUFDLEVBQUUsRUFDckM7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFFSSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsT0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLO0lBQ0wscUNBQWUsR0FBZjtRQUFBLGlCQTRCQztRQTFCRyxJQUFJLGVBQVEsQ0FBQyxvQkFBb0IsSUFBSSxhQUFXLENBQUMsYUFBYSxFQUM5RDtZQUNJLElBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFRLENBQUMsbUJBQW1CLENBQUMsRUFDNUM7Z0JBQ0ksZUFBUSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztnQkFDbEMsZUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkQ7aUJBQUk7Z0JBQ0Qsc0JBQXNCO2dCQUN0Qix1QkFBdUI7Z0JBQ3ZCLEtBQUs7Z0JBQ0wsT0FBTzthQUNWO1NBQ0o7YUFBSTtZQUNELGtCQUFRLENBQUMsV0FBVyxDQUFDLFVBQUEsQ0FBQztnQkFDbEIsZUFBUSxDQUFDLG9CQUFvQixFQUFHLENBQUE7Z0JBQ2hDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtTQUNMO1FBQ0QsY0FBYztRQUNkLDRCQUE0QjtRQUM1Qix1QkFBdUI7UUFDdkIsMENBQTBDO1FBQzFDLHVCQUF1QjtRQUN2QixxQkFBcUI7UUFDckIsdUVBQXVFO1FBQ3ZFLE1BQU07SUFDVixDQUFDO0lBR0Qsb0NBQWMsR0FBZCxVQUFlLEtBQVk7UUFDdkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFLLENBQUMsR0FBRyxHQUFHLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFFLEdBQUcsQ0FBQTtRQUMvRSxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUVJLElBQUksZUFBUSxDQUFDLG9CQUFvQixJQUFLLGFBQVcsQ0FBQyxhQUFhLEVBQy9EO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQzdCLHFCQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxLQUFLLENBQUMsQ0FBQTtTQUN6RDthQUFJO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFBO1lBQy9CLHFCQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUN4RDtRQUNELElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFHLElBQUksSUFBSSxDQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUNqRTtZQUNJLFlBQVk7WUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7WUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FDbEM7YUFBSTtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNsQztRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRSxPQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQ25EO1lBQ0ksSUFBSSxHQUFHLEdBQUcsT0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRSxFQUFFLENBQUE7U0FDOUM7SUFDTCxDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLEVBQUU7UUFFVCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2pCLG9CQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFCLE9BQU07U0FDVDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO1FBRXZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNiLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMvRSxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLEVBQUU7UUFFTixJQUFJLEdBQUcsR0FBRyxPQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoQyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVDLElBQUcsSUFBSSxFQUNQO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUM5QixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQzlEO2FBQ0c7WUFDQSxJQUFJO1lBQ0osb0JBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4QyxlQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMscUNBQXFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxFQUFFO0lBRVQsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNqQixvQkFBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQixPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xDLENBQUM7O0lBaktNLHlCQUFhLEdBQUcsQ0FBQyxDQUFDO0lBdkJ6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNIO0lBS2pCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dEQUNFO0lBR3hCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDOytDQUNDO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBSTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ087SUEzQlQsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWlNL0I7SUFBRCxrQkFBQztDQWpNRCxBQWlNQyxDQWpNd0MsRUFBRSxDQUFDLFNBQVMsR0FpTXBEO2tCQWpNb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdcIjtcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy9nYW1lc3lzL0RldmljZVwiO1xuaW1wb3J0IHsgUiB9IGZyb20gXCIuLi9oZXgtbGluZXMtZ2FtZS9SZXNcIjtcbmltcG9ydCBVSUZ1bmN0aW9ucyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVUlGdW5jdGlvbnNcIjtcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVja3lEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgXG4gICAgc3RhcnQgKCkge31cblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgd2hlZWxTcDpjYy5TcHJpdGVcblxuICAgIF9jYW5Sb3RhdGUgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxuICAgIHNwcml0ZXM6Y2MuU3ByaXRlW10gPSBbXVxuXG4gICAgQHByb3BlcnR5KFtjYy5MYWJlbF0pXG4gICAgbGFiZWxzOmNjLkxhYmVsW10gPSBbXVxuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBidG5fZnJlZWRyYXc6Y2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnRuX3ZpZGVvZHJhdzpjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZnJlZWRyYXdUaXA6Y2MuTm9kZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkcmF3TGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgc3RhdGljIE1heFZpZGVvQ291bnQgPSA1O1xuXG4gICAgLy8gY2xpY2tfZHJhdygpXG4gICAgLy8ge1xuXG4gICAgLy8gfVxuXG4gICAgcG9vbCA9IFtdXG4gICAgXG5cbiAgICBzaGFyZV9zdWNjKClcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhcnREcmF3KCk7XG4gICAgICAgIFVzZXJJbmZvLmZyZWVkcmF3VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIFVzZXJJbmZvLnNhdmUoKVxuICAgICAgICBNYWluLmluc3RhbmNlLnJlZnJlc2hSZWRwb2ludHMoKVxuICAgICAgICB0aGlzLm9uU2hvd24oKTtcbiAgICB9XG5cbiAgICBjbGlja19mcmVlZWRyYXcoKVxuICAgIHtcbiAgICAgICAgaWYgKGcuaXNOZXh0RGF5KFVzZXJJbmZvLmZyZWVkcmF3VGltZSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfc3VjYygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCA7aSA8IFIubHVja3lDb25maWcuanNvbi5sZW5ndGg7IGkgKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baV07XG4gICAgICAgICAgICBsZXQgY2hhbmNlID0gcGFyc2VGbG9hdChjZmcuY2hhbmNlKVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAgOyBqIDwgY2hhbmNlICogMiA7IGorKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvb2wucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvb2wuc2h1ZmZsZSgpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucG9vbCk7XG4gICAgfVxuXG4gICAgc3RhcnREcmF3KClcbiAgICB7XG4gICAgICAgIGxldCBpZCA9IGcuZ2V0UmFuZG9tSW5BcnJheSh0aGlzLnBvb2wpXG4gICAgICAgIHRoaXMuc3RhcnRXaGVlbChpZClcbiAgICAgICAgRGV2aWNlLnBsYXlFZmZlY3QoUi5hdWRpb19kcmF3KTtcbiAgICB9XG5cbiAgICAvLyA15qyhXG4gICAgY2xpY2tfdmlkZW9kcmF3KClcbiAgICB7XG4gICAgICAgIGlmIChVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA+PSBMdWNreURpYWxvZy5NYXhWaWRlb0NvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihnLmlzTmV4dERheShVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hUaW1lKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VySW5mby5sdWNreVZpZGVvV2F0Y2hDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8gUGxhdGZvcm0uc2hhcmUoXz0+e1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXJ0RHJhdygpXG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgUGxhdGZvcm0ud2F0Y2hfdmlkZW8oXz0+e1xuICAgICAgICAgICAgICAgIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ICsrIFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREcmF3KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy92aWRlbyDmtYHph4/kuLvlvIDpgJrlkI5cbiAgICAgICAgLy8gUGxhdGZvcm0ud2F0Y2hfdmlkZW8oXz0+e1xuICAgICAgICAvLyAgICAgdGhpcy5zdGFydERyYXcoKVxuICAgICAgICAvLyAgICAgVXNlckluZm8ubHVja3lWaWRlb1dhdGNoQ291bnQgKz0gMTtcbiAgICAgICAgLy8gICAgIFVzZXJJbmZvLnNhdmUoKTtcbiAgICAgICAgLy8gICAgIHRoaXMub25TaG93bigpXG4gICAgICAgIC8vICAgICAvLyBUb2FzdC5tYWtlKFwi6L+Y5YmpXCIgKyAgKDUtIFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50KSArXCLmrKHmnLrkvJpcIilcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG5cbiAgICBjYWxjdWxhdGVBbmdsZShpbmRleDpudW1iZXIpey8v5aWW5ZOB55qEaW5kZXjku44w5byA5aeLXG4gICAgICAgIGxldCBhbmdsZSA9IC0oaW5kZXgtMSkgKiA2MCAtIDMwICAtICA0ICogMzYwIC0gIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uICUzNjAgXG4gICAgICAgIHJldHVybiBhbmdsZVxuICAgIH1cblxuICAgIG9uU2hvd24oKVxuICAgIHtcbiAgICAgICAgaWYgKFVzZXJJbmZvLmx1Y2t5VmlkZW9XYXRjaENvdW50ID49ICBMdWNreURpYWxvZy5NYXhWaWRlb0NvdW50KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBcIuW3sueUqOWujFwiXG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5zZXRCdXR0b25FbmFibGVkKHRoaXMuYnRuX3ZpZGVvZHJhdyxmYWxzZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbC5zdHJpbmcgPSBcIueci+inhumikeaKveWlllwiXG4gICAgICAgICAgICBVSUZ1bmN0aW9ucy5zZXRCdXR0b25FbmFibGVkKHRoaXMuYnRuX3ZpZGVvZHJhdyx0cnVlKVxuICAgICAgICB9XG4gICAgICAgIGlmIChnLmlzR3JlYXRlckRhdGUobmV3IERhdGUoKSwgIG5ldyBEYXRlKFVzZXJJbmZvLmZyZWVkcmF3VGltZSkpIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9mcmVlIGRyYXcgXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlZHJhdy5pbnRlcmFjdGFibGUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLmJ0bl9mcmVlZHJhdy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICB0aGlzLmZyZWVkcmF3VGlwLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5idG5fZnJlZWRyYXcuaW50ZXJhY3RhYmxlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuYnRuX2ZyZWVkcmF3Lm5vZGUub3BhY2l0eSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuZnJlZWRyYXdUaXAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwIDsgaTwgUi5sdWNreUNvbmZpZy5qc29uLmxlbmd0aDsgaSArKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGNmZyA9IFIubHVja3lDb25maWcuanNvbltpXVxuICAgICAgICAgICAgdGhpcy5sYWJlbHNbaV0uc3RyaW5nID0gY2ZnLmdvbGRfcmV3YXJkICtcIlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydFdoZWVsKGlkKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXJnZXQgd2hlZWw6XCIgLGlkKTtcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5jYWxjdWxhdGVBbmdsZShpZClcbiAgICAgICAgaWYgKCF0aGlzLl9jYW5Sb3RhdGUpe1xuICAgICAgICAgICAgVG9hc3QubWFrZSgn5q2j5Zyo57uZ5oKo5oyR6YCJ5aWW5ZOBLi4uJyk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYW5Sb3RhdGUgPSBmYWxzZVxuXG4gICAgICAgIGxldCBzdGFnZTMgPSBjYy5yb3RhdGVCeShNYXRoLmFicyhhbmdsZS80MDApLGFuZ2xlKVxuICAgICAgICBsZXQgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5fY2FuUm90YXRlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5zaG93UmVzKGlkKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKHN0YWdlMyxjYWxsRnVuYylcbiAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucnVuQWN0aW9uKHNlcXVlbmNlLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQoKSkpXG4gICAgfVxuXG4gICAgc2hvd1JlcyhpZClcbiAgICB7XG4gICAgICAgIGxldCBjZmcgPSBSLmx1Y2t5Q29uZmlnLmpzb25baWRdXG4gICAgICAgIGxldCBnb2xkID0gIWlzTmFOKChOdW1iZXIoY2ZnLmdvbGRfcmV3YXJkKSkpXG4gICAgICAgIGlmKGdvbGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIkdhbWUvR2V0RGlhbG9nXCIsY2ZnLmdvbGRfcmV3YXJkKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvL+elnuenmFxuICAgICAgICAgICAgVG9hc3QubWFrZShcIuaBreWWnOS9oOaKveS4reS6hiBcIiArIGNmZy5nb2xkX3Jld2FyZCk7XG4gICAgICAgICAgICBVc2VySW5mby51bmxvY2soZy5yYW5kb21JbnQoMCw2KSk7XG4gICAgICAgICAgICAvLyBEZXZpY2UucGxheUVmZmVjdChSLmF1ZGlvX3VubG9jayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cblxuICAgIGNsaWNrX2Nsb3NlKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5fY2FuUm90YXRlKXtcbiAgICAgICAgICAgIFRvYXN0Lm1ha2UoJ+ato+WcqOe7meaCqOaMkemAieWlluWTgS4uLicpO1xuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFZpZXcpLmhpZGUoKVxuICAgIH1cblxuXG59Il19