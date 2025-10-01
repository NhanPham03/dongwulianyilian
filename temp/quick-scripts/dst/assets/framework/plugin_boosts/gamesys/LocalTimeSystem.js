
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/LocalTimeSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f847KAJNJCwrvg4K3CKFUv', 'LocalTimeSystem');
// framework/plugin_boosts/gamesys/LocalTimeSystem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LocalTimeSystem = /** @class */ (function () {
    function LocalTimeSystem() {
    }
    LocalTimeSystem.init = function (utc_msec) {
        if (utc_msec == null || utc_msec == undefined)
            return;
        LocalTimeSystem.utc_sec = utc_msec;
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            wx.onHide(this.onHidden);
            wx.onShow(this.onShown);
        }
        g.setGlobalInstance(LocalTimeSystem);
    };
    LocalTimeSystem.startTimer = function () {
        this.timer = setInterval(function (_) {
            LocalTimeSystem.utc_sec += 1000;
        }, 1000);
    };
    LocalTimeSystem.stopTimer = function () {
        clearInterval(this.timer);
    };
    LocalTimeSystem.getSec = function () {
        return LocalTimeSystem.utc_sec || new Date().getTime() / 1000;
    };
    LocalTimeSystem.getDate = function () {
        if (LocalTimeSystem.utc_sec) {
            var date = new Date();
            date.setTime(LocalTimeSystem.utc_sec * 1000);
            return date;
        }
        return new Date();
    };
    LocalTimeSystem.onHidden = function () {
        console.log("game enter background");
        // this.stopTimer();
    };
    LocalTimeSystem.onShown = function () {
        console.log("game enter foreground");
        // this.startTimer();
    };
    return LocalTimeSystem;
}());
exports.default = LocalTimeSystem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxMb2NhbFRpbWVTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUF1REEsQ0FBQztJQW5EVSxvQkFBSSxHQUFYLFVBQVksUUFBZTtRQUV2QixJQUFHLFFBQVEsSUFBSSxJQUFJLElBQUUsUUFBUSxJQUFJLFNBQVM7WUFBQyxPQUFPO1FBQ2xELGVBQWUsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ25DLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQ3hDO1lBQ0ksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDMUI7UUFDRCxDQUFDLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLDBCQUFVLEdBQWpCO1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsVUFBQSxDQUFDO1lBQ3RCLGVBQWUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDO1FBQ3BDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSx5QkFBUyxHQUFoQjtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLHNCQUFNLEdBQWI7UUFFSSxPQUFPLGVBQWUsQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBQyxJQUFJLENBQUM7SUFDaEUsQ0FBQztJQUVNLHVCQUFPLEdBQWQ7UUFFSSxJQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQzFCO1lBQ0ksSUFBSSxJQUFJLEdBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUV0QixDQUFDO0lBR00sd0JBQVEsR0FBZjtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNwQyxvQkFBb0I7SUFDeEIsQ0FBQztJQUNNLHVCQUFPLEdBQWQ7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDcEMscUJBQXFCO0lBQ3pCLENBQUM7SUFDTCxzQkFBQztBQUFELENBdkRBLEFBdURDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbFRpbWVTeXN0ZW1cbntcbiAgICBzdGF0aWMgdXRjX3NlYzpudW1iZXJcbiAgICBzdGF0aWMgdGltZXI6bnVtYmVyO1xuICAgIHN0YXRpYyBpbml0KHV0Y19tc2VjOm51bWJlcilcbiAgICB7XG4gICAgICAgIGlmKHV0Y19tc2VjID09IG51bGx8fHV0Y19tc2VjID09IHVuZGVmaW5lZClyZXR1cm47XG4gICAgICAgIExvY2FsVGltZVN5c3RlbS51dGNfc2VjID0gdXRjX21zZWM7XG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHd4Lm9uSGlkZSh0aGlzLm9uSGlkZGVuKTtcbiAgICAgICAgICAgIHd4Lm9uU2hvdyh0aGlzLm9uU2hvd24pXG4gICAgICAgIH1cbiAgICAgICAgZy5zZXRHbG9iYWxJbnN0YW5jZShMb2NhbFRpbWVTeXN0ZW0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdGFydFRpbWVyKClcbiAgICB7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbChfPT57XG4gICAgICAgICAgICBMb2NhbFRpbWVTeXN0ZW0udXRjX3NlYyArPSAxMDAwO1xuICAgICAgICB9LDEwMDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdG9wVGltZXIoKXtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0U2VjKCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gTG9jYWxUaW1lU3lzdGVtLnV0Y19zZWMgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkvMTAwMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RGF0ZSgpXG4gICAge1xuICAgICAgICBpZihMb2NhbFRpbWVTeXN0ZW0udXRjX3NlYylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSAgbmV3IERhdGUoKVxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKExvY2FsVGltZVN5c3RlbS51dGNfc2VjKjEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgICAgIFxuICAgIH1cbiAgXG4gICAgc3RhdGljIGxhc3RMb2NhbFRpbWU6bnVtYmVyO1xuICAgIHN0YXRpYyBvbkhpZGRlbigpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgZW50ZXIgYmFja2dyb3VuZFwiKVxuICAgICAgICAvLyB0aGlzLnN0b3BUaW1lcigpO1xuICAgIH1cbiAgICBzdGF0aWMgb25TaG93bigpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgZW50ZXIgZm9yZWdyb3VuZFwiKVxuICAgICAgICAvLyB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICB9XG59Il19