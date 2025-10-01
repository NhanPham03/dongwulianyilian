
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/Device.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b88b4v3H5tF7ozLVLmzIPqR', 'Device');
// framework/plugin_boosts/gamesys/Device.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SoundHelper_1 = require("../../qqsdk/SoundHelper");
var Device = /** @class */ (function () {
    function Device() {
    }
    Device.setSoundsEnable = function (b) {
        Device.setSFXEnable(b);
        Device.setBGMEnable(b);
    };
    Device.setSFXEnable = function (b) {
        cc.audioEngine.setEffectsVolume(b == true ? 1 : 0);
        Device.isSfxEnabled = b;
        if (!b) {
            cc.audioEngine.pauseAllEffects();
        }
        else {
            cc.audioEngine.resumeAllEffects();
        }
    };
    Device.useCCAudioEngine = function () {
        this._useCCAudioEngine = true;
    };
    Device.useDefaultAudioEngine = function () {
        this._useCCAudioEngine = false;
    };
    Device.setBGMEnable = function (b) {
        cc.audioEngine.setMusicVolume(b == true ? 1 : 0);
        Device.isBgmEnabled = b;
        if (!b) {
            cc.audioEngine.pauseMusic();
        }
        else {
            cc.audioEngine.resumeMusic();
        }
    };
    Device.playEffect = function (clip, loop) {
        if (loop === void 0) { loop = false; }
        if (Device.isSfxEnabled) {
            if (cc.sys.platform == cc.sys.QQ_PLAY) {
                if (this._useCCAudioEngine) {
                    return cc.audioEngine.playEffect(clip, loop);
                }
                else {
                    SoundHelper_1.default.playSound(clip);
                }
            }
            else
                return cc.audioEngine.playEffect(clip, loop);
        }
    };
    Device.stopMusic = function () {
        cc.audioEngine.stopMusic();
    };
    Device.playMusic = function (clip, loop) {
        if (loop === void 0) { loop = true; }
        if (Device.isBgmEnabled) {
            return cc.audioEngine.playMusic(clip, loop);
        }
    };
    Device.vibrate = function () {
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            wx.vibrateShort();
        }
        else {
            console.log("not support vibrate on except-wx platfrom ");
        }
    };
    Device.isSfxEnabled = true;
    Device.isBgmEnabled = true;
    Device._useCCAudioEngine = false;
    return Device;
}());
exports.default = Device;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxEZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUVsRDtJQUFBO0lBeUZBLENBQUM7SUFsRlUsc0JBQWUsR0FBdEIsVUFBdUIsQ0FBUztRQUU1QixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLG1CQUFZLEdBQW5CLFVBQW9CLENBQUM7UUFFakIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUcsQ0FBQyxDQUFDLEVBQ0w7WUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQ25DO2FBQUk7WUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBSU0sdUJBQWdCLEdBQXZCO1FBRUksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRU0sNEJBQXFCLEdBQTVCO1FBRUksSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRU0sbUJBQVksR0FBbkIsVUFBb0IsQ0FBQztRQUVqQixFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUcsQ0FBQyxDQUFDLEVBQ0w7WUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQzlCO2FBQUk7WUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO1NBQy9CO0lBQ0wsQ0FBQztJQUdNLGlCQUFVLEdBQWpCLFVBQWtCLElBQUksRUFBQyxJQUFZO1FBQVoscUJBQUEsRUFBQSxZQUFZO1FBRS9CLElBQUcsTUFBTSxDQUFDLFlBQVksRUFDdEI7WUFDSSxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUNwQztnQkFDSSxJQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFDekI7b0JBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7aUJBQzlDO3FCQUFJO29CQUNELHFCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMvQjthQUNKOztnQkFDRyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUNsRDtJQUNMLENBQUM7SUFFTSxnQkFBUyxHQUFoQjtRQUVJLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLGdCQUFTLEdBQWhCLFVBQWlCLElBQUksRUFBQyxJQUFXO1FBQVgscUJBQUEsRUFBQSxXQUFXO1FBRTdCLElBQUcsTUFBTSxDQUFDLFlBQVksRUFDdEI7WUFDSSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFTSxjQUFPLEdBQWQ7UUFFSSxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUN4QztZQUNJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtTQUNwQjthQUFJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO1NBQzVEO0lBQ0wsQ0FBQztJQXJGTSxtQkFBWSxHQUFHLElBQUksQ0FBQztJQUVwQixtQkFBWSxHQUFHLElBQUksQ0FBQztJQW9CcEIsd0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBZ0VyQyxhQUFDO0NBekZELEFBeUZDLElBQUE7a0JBekZvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNvdW5kSGVscGVyIGZyb20gXCIuLi8uLi9xcXNkay9Tb3VuZEhlbHBlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2UgXG57XG5cbiAgICBzdGF0aWMgaXNTZnhFbmFibGVkID0gdHJ1ZTtcblxuICAgIHN0YXRpYyBpc0JnbUVuYWJsZWQgPSB0cnVlO1xuXG4gICAgc3RhdGljIHNldFNvdW5kc0VuYWJsZShiOmJvb2xlYW4pXG4gICAge1xuICAgICAgICBEZXZpY2Uuc2V0U0ZYRW5hYmxlKGIpXG4gICAgICAgIERldmljZS5zZXRCR01FbmFibGUoYik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFNGWEVuYWJsZShiKVxuICAgIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZShiID09IHRydWU/MTowKTtcbiAgICAgICAgRGV2aWNlLmlzU2Z4RW5hYmxlZCA9IGI7XG4gICAgICAgIGlmKCFiKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbEVmZmVjdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBfdXNlQ0NBdWRpb0VuZ2luZSA9IGZhbHNlO1xuXG4gICAgc3RhdGljIHVzZUNDQXVkaW9FbmdpbmUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fdXNlQ0NBdWRpb0VuZ2luZSA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHVzZURlZmF1bHRBdWRpb0VuZ2luZSgpXG4gICAge1xuICAgICAgICB0aGlzLl91c2VDQ0F1ZGlvRW5naW5lID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEJHTUVuYWJsZShiKVxuICAgIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoYiA9PSB0cnVlPzE6MCk7XG4gICAgICAgIERldmljZS5pc0JnbUVuYWJsZWQgPSBiO1xuICAgICAgICBpZighYilcbiAgICAgICAge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcGxheUVmZmVjdChjbGlwLGxvb3AgPSBmYWxzZSlcbiAgICB7XG4gICAgICAgIGlmKERldmljZS5pc1NmeEVuYWJsZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuUVFfUExBWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl91c2VDQ0F1ZGlvRW5naW5lKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCxsb29wKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBTb3VuZEhlbHBlci5wbGF5U291bmQoY2xpcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChjbGlwLGxvb3ApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc3RvcE11c2ljKClcbiAgICB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGF5TXVzaWMoY2xpcCxsb29wID0gdHJ1ZSlcbiAgICB7XG4gICAgICAgIGlmKERldmljZS5pc0JnbUVuYWJsZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoY2xpcCxsb29wKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2aWJyYXRlKClcbiAgICB7XG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHd4LnZpYnJhdGVTaG9ydCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3Qgc3VwcG9ydCB2aWJyYXRlIG9uIGV4Y2VwdC13eCBwbGF0ZnJvbSBcIilcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=