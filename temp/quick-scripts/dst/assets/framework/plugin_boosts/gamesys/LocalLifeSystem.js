
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/LocalLifeSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '550c0O4ualLIYQoOOiFtGsz', 'LocalLifeSystem');
// framework/plugin_boosts/gamesys/LocalLifeSystem.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeSystem = exports.LocalLifeSystem = void 0;
var EventManager_1 = require("../utils/EventManager");
var Signal_1 = require("../misc/Signal");
var LocalLifeSystem = /** @class */ (function () {
    function LocalLifeSystem() {
        //生成一颗星需要的时间 
        this.sec_per_live = 60 * 5;
        //最多可得多少颗
        this.live_free_get = 5;
        this.max_freeLives_seconds = this.live_free_get * this.sec_per_live;
        this.livesSeconds = 0;
        this.isEnabledAutoRecovery = true;
        this.recoverySignal = new Signal_1.default();
    }
    LocalLifeSystem.prototype.init = function (liveSec, live_free) {
        if (liveSec === void 0) { liveSec = null; }
        if (live_free === void 0) { live_free = null; }
        this.sec_per_live = liveSec || this.sec_per_live;
        this.live_free_get = live_free || this.live_free_get;
        this.max_freeLives_seconds = this.sec_per_live * this.live_free_get;
        this.livesSeconds = 0;
        this.lastLifeSaveTime = Number(localStorage.getItem("sys_life_lastLifeSaveTime") || new Date().getTime());
        g.setGlobalInstance(exports.LifeSystem, "LocalLifeSystem");
        EventManager_1.event.on("onEnterForeground", this.onEnterForeground, this);
        this.onTimeRequested(new Date().getTime());
        console.log("体力系统初始化", this);
    };
    LocalLifeSystem.prototype.onEnterForeground = function () {
        this.onTimeRequested(new Date().getTime());
    };
    Object.defineProperty(LocalLifeSystem.prototype, "nextLifeTime", {
        get: function () {
            return (this.lives + 1) * this.sec_per_live - this.livesSeconds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalLifeSystem.prototype, "lives", {
        get: function () {
            return Math.floor(this.livesSeconds / this.sec_per_live);
        },
        enumerable: false,
        configurable: true
    });
    LocalLifeSystem.prototype.save = function () {
        this.lastLifeSaveTime = new Date().getTime();
        localStorage.setItem("sys_life_lastLifeSaveTime", this.lastLifeSaveTime + "");
    };
    LocalLifeSystem.prototype.onTimeRequested = function (time) {
        if (this.lastLifeSaveTime) {
            var timeElapsed = Math.floor((time - this.lastLifeSaveTime) / 1000);
            this.livesSeconds = Math.min(this.max_freeLives_seconds, timeElapsed);
        }
    };
    LocalLifeSystem.prototype.startCheck = function (callback, target) {
        var _this = this;
        if (this.task_checkLives)
            return;
        var lastHeart = callback.call(target);
        this.task_checkLives = setInterval(function (_) {
            var heart = callback.call(target);
            if (lastHeart != heart && heart == _this.live_free_get - 1) {
                _this.livesSeconds = 0;
                _this.save();
            }
            if (heart < _this.live_free_get) {
                // this.checkForSpawnLives();
                _this.livesSeconds = _this.livesSeconds + 1;
                if (heart + _this.lives > heart) {
                    console.log("获得在线奖励一颗星", _this.lives);
                    _this.recoverySignal.fire(_this.lives);
                    _this.livesSeconds = 0;
                    _this.save();
                }
            }
            lastHeart = heart;
        }, 1000);
    };
    return LocalLifeSystem;
}());
exports.LocalLifeSystem = LocalLifeSystem;
exports.LifeSystem = new LocalLifeSystem();
// 

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxMb2NhbExpZmVTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBOEM7QUFDOUMseUNBQW9DO0FBR3BDO0lBQUE7UUFFQyxhQUFhO1FBQ2IsaUJBQVksR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFFO1FBQ3ZCLFNBQVM7UUFDVCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQiwwQkFBcUIsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFNL0QsaUJBQVksR0FBVSxDQUFDLENBQUE7UUFHdkIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7SUF1RXRDLENBQUM7SUF0RUEsOEJBQUksR0FBSixVQUFLLE9BQWMsRUFBQyxTQUFnQjtRQUEvQix3QkFBQSxFQUFBLGNBQWM7UUFBQywwQkFBQSxFQUFBLGdCQUFnQjtRQUVuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDcEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsSUFBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDeEcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGtCQUFVLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVsRCxvQkFBSyxDQUFDLEVB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QUF6RlksMENBQWU7QUEyRmpCLFFBQUEsVUFBVSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7QUFDOUMsR0FBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2NhbFRpbWVTeXN0ZW0gZnJvbSBcIi4vTG9jYWxUaW1lU3lzdGVtXCI7XG5pbXBvcnQgeyBldmVudCB9IGZyb20gXCIuLi91dGlscy9FdmVudE1hbmFnZXJcIjtcbmltcG9ydCBTaWduYWwgZnJvbSBcIi4uL21pc2MvU2lnbmFsXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uL1BsYXRmb3JtXCI7XG5cbmV4cG9ydCBjbGFzcyBMb2NhbExpZmVTeXN0ZW1cbntcblx0Ly/nlJ/miJDkuIDpopfmmJ/pnIDopoHnmoTml7bpl7QgXG5cdHNlY19wZXJfbGl2ZSA9IDYwICogNSA7XG5cdC8v5pyA5aSa5Y+v5b6X5aSa5bCR6aKXXG5cdGxpdmVfZnJlZV9nZXQgPSA1O1xuXHRcblx0bWF4X2ZyZWVMaXZlc19zZWNvbmRzID0gdGhpcy5saXZlX2ZyZWVfZ2V0ICogdGhpcy5zZWNfcGVyX2xpdmU7XG5cblx0dGFza19ydW5TcGF3bkxpdmVzOm51bWJlcjtcblxuXHR0YXNrX2NoZWNrTGl2ZXM6bnVtYmVyO1xuXG5cdGxpdmVzU2Vjb25kczpudW1iZXIgPSAwXG5cdGxhc3RMaWZlU2F2ZVRpbWU6bnVtYmVyO1xuXG5cdGlzRW5hYmxlZEF1dG9SZWNvdmVyeSA9IHRydWU7XG5cdFxuXHRwdWJsaWMgcmVjb3ZlcnlTaWduYWwgPSBuZXcgU2lnbmFsKCk7XG5cdGluaXQobGl2ZVNlYyA9IG51bGwsbGl2ZV9mcmVlID0gbnVsbClcblx0e1xuXHRcdHRoaXMuc2VjX3Blcl9saXZlID0gbGl2ZVNlYyB8fCB0aGlzLnNlY19wZXJfbGl2ZVxuXHRcdHRoaXMubGl2ZV9mcmVlX2dldCA9IGxpdmVfZnJlZSB8fCB0aGlzLmxpdmVfZnJlZV9nZXRcblx0XHR0aGlzLm1heF9mcmVlTGl2ZXNfc2Vjb25kcyA9IHRoaXMuc2VjX3Blcl9saXZlICogdGhpcy5saXZlX2ZyZWVfZ2V0O1xuXHRcdHRoaXMubGl2ZXNTZWNvbmRzID0gMFxuXHRcdHRoaXMubGFzdExpZmVTYXZlVGltZSA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN5c19saWZlX2xhc3RMaWZlU2F2ZVRpbWVcIil8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSlcblx0XHRnLnNldEdsb2JhbEluc3RhbmNlKExpZmVTeXN0ZW0sXCJMb2NhbExpZmVTeXN0ZW1cIik7XG5cblx0XHRldmVudC5vbihcIm9uRW50ZXJGb3JlZ3JvdW5kXCIsdGhpcy5vbkVudGVyRm9yZWdyb3VuZCx0aGlzKVxuXHRcdHRoaXMub25UaW1lUmVxdWVzdGVkKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcblx0XHRjb25zb2xlLmxvZyhcIuS9k+WKm+ezu+e7n+WIneWni+WMllwiLHRoaXMpO1xuXHR9XG5cblx0b25FbnRlckZvcmVncm91bmQoKVxuXHR7XG5cdFx0dGhpcy5vblRpbWVSZXF1ZXN0ZWQobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXHR9XG5cblx0Z2V0IG5leHRMaWZlVGltZSgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMubGl2ZXMgKyAxKSAqIHRoaXMuc2VjX3Blcl9saXZlIC0gdGhpcy5saXZlc1NlY29uZHM7XG5cdH1cblxuXHRnZXQgbGl2ZXMoKVxuXHR7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5saXZlc1NlY29uZHMgLyB0aGlzLnNlY19wZXJfbGl2ZSlcblx0fVxuXG5cdHNhdmUoKVxuXHR7XG5cdFx0dGhpcy5sYXN0TGlmZVNhdmVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzeXNfbGlmZV9sYXN0TGlmZVNhdmVUaW1lXCIsdGhpcy5sYXN0TGlmZVNhdmVUaW1lK1wiXCIpXG5cdH1cblxuXHRvblRpbWVSZXF1ZXN0ZWQodGltZSlcblx0e1xuXHRcdGlmICh0aGlzLmxhc3RMaWZlU2F2ZVRpbWUpXG5cdFx0e1xuXHRcdFx0bGV0IHRpbWVFbGFwc2VkID0gTWF0aC5mbG9vcigodGltZSAtIHRoaXMubGFzdExpZmVTYXZlVGltZSkvMTAwMClcblx0XHRcdHRoaXMubGl2ZXNTZWNvbmRzID0gTWF0aC5taW4odGhpcy5tYXhfZnJlZUxpdmVzX3NlY29uZHMsIHRpbWVFbGFwc2VkKVxuXHRcdH1cblx0fVxuXG5cdHN0YXJ0Q2hlY2soY2FsbGJhY2ssdGFyZ2V0KVxuXHR7XG5cdFx0aWYodGhpcy50YXNrX2NoZWNrTGl2ZXMpIHJldHVybjtcblx0XHRsZXQgbGFzdEhlYXJ0ID0gY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuXHRcdHRoaXMudGFza19jaGVja0xpdmVzID0gc2V0SW50ZXJ2YWwoXz0+e1xuXHRcdFx0bGV0IGhlYXJ0ID0gY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuXHRcdFx0aWYobGFzdEhlYXJ0ICE9IGhlYXJ0ICYmIGhlYXJ0ID09IHRoaXMubGl2ZV9mcmVlX2dldCAtIDEpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMubGl2ZXNTZWNvbmRzID0gMDtcblx0XHRcdFx0dGhpcy5zYXZlKCk7XG5cdFx0XHR9IFxuXHRcdFx0aWYgKGhlYXJ0IDwgdGhpcy5saXZlX2ZyZWVfZ2V0KSB7IFxuXHRcdFx0XHQvLyB0aGlzLmNoZWNrRm9yU3Bhd25MaXZlcygpO1xuXHRcdFx0XHR0aGlzLmxpdmVzU2Vjb25kcyA9IHRoaXMubGl2ZXNTZWNvbmRzICsgMTtcblx0XHRcdFx0aWYgKCBoZWFydCArIHRoaXMubGl2ZXMgPiBoZWFydClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi6I635b6X5Zyo57q/5aWW5Yqx5LiA6aKX5pifXCIsdGhpcy5saXZlcylcblx0XHRcdFx0XHR0aGlzLnJlY292ZXJ5U2lnbmFsLmZpcmUodGhpcy5saXZlcyk7XG5cdFx0XHRcdFx0dGhpcy5saXZlc1NlY29uZHMgPSAwO1xuXHRcdFx0XHRcdHRoaXMuc2F2ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRsYXN0SGVhcnQgPSBoZWFydDtcblx0XHR9LDEwMDApXG5cdH1cblxufVxuXG5leHBvcnQgdmFyIExpZmVTeXN0ZW0gPSBuZXcgTG9jYWxMaWZlU3lzdGVtKCk7XG4vLyBcbiJdfQ==