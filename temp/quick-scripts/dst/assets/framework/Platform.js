
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/Platform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8fc52zVaq1FVrE4//XvMzeK', 'Platform');
// framework/Platform.ts

Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = require("./wxsdk/sdk");
var ToastManager_1 = require("./plugin_boosts/ui/ToastManager");
var BKTool_1 = require("./qqsdk/BKTool");
var SpriteFrameCache_1 = require("./plugin_boosts/misc/SpriteFrameCache");
var Signal_1 = require("./plugin_boosts/misc/Signal");
var EventManager_1 = require("./plugin_boosts/utils/EventManager");
var LanguageManager_1 = require("./plugin_boosts/ui/LanguageManager");
var WxCommands;
(function (WxCommands) {
    WxCommands[WxCommands["Hide"] = 99] = "Hide";
    WxCommands[WxCommands["Next"] = 100] = "Next";
    WxCommands[WxCommands["RankSmall"] = 101] = "RankSmall";
    WxCommands[WxCommands["Rank"] = 102] = "Rank";
})(WxCommands || (WxCommands = {}));
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.getOpenID = function () {
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            // wechat 
            var userInfo = sdk_1.wxsdk.userInfo;
            if (userInfo && userInfo.openID) {
                return userInfo.openID;
            }
            else {
                return "";
            }
        }
        else if (cc.sys.QQ_PLAY == cc.sys.platform) {
            return GameStatusInfo.openId;
        }
        else {
            return "123";
        }
    };
    Platform.getNick = function () {
        if (cc.sys.QQ_PLAY == cc.sys.platform) {
            return BKTool_1.default.getNick();
        }
        else if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            return (sdk_1.wxsdk.userInfo && sdk_1.wxsdk.userInfo.nickName) || "自已";
        }
        else {
            return "玩家自已";
        }
    };
    Platform.getHead = function () {
        if (cc.sys.QQ_PLAY == cc.sys.platform) {
            return BKTool_1.default.getHead();
        }
        else if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            // avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/QlHaicGZOD7do9LuX5W4APHYSrUBqVaGULuwISLUf35IyOOYZ3IXl7nF5mW36JiaQ9snziawrAvkknX41SmeYa9AQ/132"city:""country:""gender:1language:"zh_CN"nickName:"Damon Ren⁶⁶⁶"province:""
            var userInfo = sdk_1.wxsdk.userInfo;
            if (userInfo && userInfo.avatarUrl) {
                return userInfo.avatarUrl;
            }
            else {
                return "https://tank.wdfunny.com/speed_logo/2.jpg";
            }
        }
        return "https://tank.wdfunny.com/speed_logo/1.jpg";
    };
    Platform.loadHeadQQ = function (sp) {
        var self = this;
        var absolutePath = "GameSandBox://_head/" + GameStatusInfo.openId + ".jpg";
        var isExit = BK.FileUtil.isFileExist(absolutePath);
        cc.log(absolutePath + " is exit :" + isExit);
        //如果指定目录中存在此图像就直接显示否则从网络获取
        if (isExit) {
            cc.loader.load(absolutePath, function (err, texture) {
                if (err == null) {
                    sp.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        }
        else {
            BK.MQQ.Account.getHeadEx(GameStatusInfo.openId, function (oId, imgPath) {
                cc.log("openId:" + oId + " imgPath:" + imgPath);
                var image = new Image();
                image.onload = function () {
                    var tex = new cc.Texture2D();
                    tex.initWithElement(image);
                    tex.handleLoadedTexture();
                    sp.spriteFrame = new cc.SpriteFrame(tex);
                };
                image.src = imgPath;
            });
        }
    };
    Platform.loadSelfHead = function (sprite) {
        if (cc.sys.QQ_PLAY == cc.sys.platform) {
            this.loadHeadQQ(sprite);
        }
        else {
            SpriteFrameCache_1.default.instance.getSpriteFrame(Platform.getHead()).then(function (sf) { return sprite.spriteFrame = sf; });
        }
    };
    Platform.exit = function () {
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            wx.offShow(Platform.onEnterForeground);
            wx.offHide(Platform.onEnterBackground);
        }
        else if (cc.sys.QQ_PLAY == cc.sys.platform) {
        }
    };
    Platform.login = function () {
        var _this = this;
        this.isAndroid = cc.sys.os == "Android";
        console.log("================= os", cc.sys.os);
        this.isIOS = cc.sys.os == "iOS";
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            sdk_1.wxsdk.login();
            sdk_1.wxsdk.requestConfig(function (data) {
                _this.configGetSignal.fire(data);
            });
            // get conf 
            wx.onShow(Platform.onEnterForeground);
            wx.onHide(Platform.onEnterBackground);
        }
        else if (cc.sys.QQ_PLAY == cc.sys.platform) {
            BKTool_1.default.login();
            BK.onEnterForeground(Platform.onEnterForeground);
            BK.onEnterBackground(Platform.onEnterBackground);
        }
    };
    Platform.requestServerConfigs = function (name, callback, target) {
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            sdk_1.wxsdk.requestDB(name, callback, target);
        }
    };
    Platform.getGameID = function () {
        if (cc.sys.QQ_PLAY == cc.sys.platform) {
            GameStatusInfo.gameId;
        }
        return "speed_wanyiwan";
    };
    Platform.getLaunchOptions = function () {
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            return wx.getLaunchOptionsSync();
        }
        return {};
    };
    Platform.getCity = function () {
        return "";
    };
    Platform.share = function (callback, target) {
        console.log("######开始分享");
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            sdk_1.wxsdk.openShare();
            var t_1 = new Date().getTime();
            Platform.onEnterForegroundSignal.on(function () {
                Platform.onEnterForegroundSignal.clear();
                var d = new Date().getTime() - t_1;
                if (d > 2333) {
                    setTimeout(function (_) {
                        if (callback)
                            callback.call(target);
                    }, 500);
                }
                else {
                    //用户及时返回分享失败 
                    // Toast.make("分享失败,请尝试换其它群分享")
                    ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("share_fail"));
                }
            });
        }
        else if (cc.sys.QQ_PLAY == cc.sys.platform) {
            BKTool_1.default.share(function (v) {
                if (v == "success") {
                    callback && callback.call(target);
                }
                else {
                    // Toast.make("分享失败")
                }
            });
        }
        else {
            callback && callback.call(target);
        }
    };
    Platform.watch_video = function (callback, target) {
        console.log("######开始看视频");
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            sdk_1.wxsdk.loadVideoAd(function (code, isEnded) {
                if (code == "load") {
                    cc.audioEngine.pauseMusic();
                    Platform.bannnerRefreshEnabled = false;
                }
                else if (code == "close") {
                    Platform.bannnerRefreshEnabled = true;
                    if (!isEnded)
                        // Toast.make("必须看完视频,才能获取奖励")
                        ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("watch_video"));
                    else
                        callback && callback.call(target);
                }
            });
        }
        else if (cc.sys.QQ_PLAY == cc.sys.platform) {
            //关闭背景
            cc.audioEngine.pauseMusic();
            var isFinish_1 = false;
            BKTool_1.default.loadVideoAd(function (v, video) {
                if (v == "load") {
                    video.show();
                }
                else if (v == "finish") {
                    isFinish_1 = true;
                }
                else if (v == "close") {
                    if (!isFinish_1)
                        // Toast.make("必须看完视频,才能获取奖励")
                        ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("watch_video"));
                    else
                        callback && callback.call(target);
                }
            });
        }
        else {
            callback && callback.call(target);
        }
    };
    Platform.showBannerAd = function () {
        console.log("######显示Banner广告");
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            sdk_1.wxsdk.showBannerAd();
        }
        else if (cc.sys.QQ_PLAY == cc.sys.platform) {
            BKTool_1.default.showBannerAd();
        }
        else {
        }
    };
    Platform.initBannerAd = function (b) {
        if (b === void 0) { b = 1; }
        if (b == 0)
            return;
        if (cc.sys.QQ_PLAY == cc.sys.platform) {
            setInterval(function (_) {
                console.log("######加载Banner广告");
                BKTool_1.default.hideBannerAd();
                BKTool_1.default.loadBannerAd(function (v) {
                    v == "load" && BKTool_1.default.showBannerAd();
                });
            }, 30000);
        }
        else if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            setInterval(function (_) {
                if (Platform.bannnerRefreshEnabled) {
                    console.log("######加载Banner广告");
                    sdk_1.wxsdk.hideBannerAd();
                    sdk_1.wxsdk.loadBannerAd(function (v) {
                        v == "load" && sdk_1.wxsdk.showBannerAd();
                    });
                }
            }, 40000);
        }
    };
    Platform.jumpTo = function () {
        // var desGameId = 1234; //跳转的gameid，必须为数字
        // var extendInfo = ""; //额外参数，必须为字符串
        // BK.QQ.skipGame(desGameId, extendInfo);
    };
    Platform.showRankDialog = function () {
        console.log("[Platform]#showRankDialog");
        ToastManager_1.Toast.make("#[Platform]#showRankDialog");
        // ViewManager.instance.show("Game/RankDialog")
    };
    // Andriod 发送游戏快捷方式到桌面
    Platform.onEnterForeground = function () {
        console.log("=====================onEnterForeground=====================");
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            //onEnterForeground
            // Device.resumeMusic()
            cc.audioEngine.resumeMusic();
        }
        else {
            cc.audioEngine.resumeMusic();
        }
        Platform.onEnterForegroundSignal.fire();
        EventManager_1.event.emit("onEnterForeground");
    };
    Platform.onEnterBackground = function () {
        // BK.onEnterBackground(enterBackgroundListener);
        EventManager_1.event.emit("onEnterBackground");
    };
    Platform.onGameExit = function () {
        // BK.onGameClose(gameCloseListener);
    };
    Platform.showSmallRank = function () {
        sdk_1.wxsdk.postMessage(WxCommands.RankSmall);
    };
    Platform.showRank = function () {
        sdk_1.wxsdk.postMessage(WxCommands.Rank);
    };
    Platform.hideRank = function () {
        sdk_1.wxsdk.postMessage(WxCommands.RankSmall);
    };
    Platform.getRankList = function (callback, target) {
        console.log("[Platform]#获取排行榜数据");
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            return BKTool_1.default.getRankList(function (errorCode, list) {
                callback && callback.call(target, errorCode, list);
            });
        }
        else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        }
    };
    Platform.uploadScore = function (score) {
        console.log("[Platform]#上传分数");
        if (!score) {
            console.log("score 上传失败：null");
            return;
        }
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            BKTool_1.default.uploadScore(score);
        }
        else if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            // wxsdk.postMessage(WxCommands., score);
            sdk_1.wxsdk.uploadScore(score);
        }
        else {
            // Toast.make("#[Platform]#uploadScore")
        }
    };
    Platform.bannnerRefreshEnabled = true;
    Platform.onEnterForegroundSignal = new Signal_1.default();
    Platform.isAndroid = false;
    Platform.isIOS = false;
    Platform.configGetSignal = new Signal_1.default();
    return Platform;
}());
exports.default = Platform;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxQbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW9DO0FBQ3BDLGdFQUF3RDtBQUN4RCx5Q0FBb0M7QUFFcEMsMEVBQXFFO0FBQ3JFLHNEQUFpRDtBQUNqRCxtRUFBMkQ7QUFDM0Qsc0VBQWlFO0FBRWpFLElBQUssVUFNSjtBQU5ELFdBQUssVUFBVTtJQUVYLDRDQUFTLENBQUE7SUFDVCw2Q0FBSSxDQUFBO0lBQ0osdURBQVMsQ0FBQTtJQUNULDZDQUFJLENBQUE7QUFDUixDQUFDLEVBTkksVUFBVSxLQUFWLFVBQVUsUUFNZDtBQUVEO0lBQUE7SUE4WEEsQ0FBQztJQXRYVSxrQkFBUyxHQUFoQjtRQUVJLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQ3hDO1lBQ0ksVUFBVTtZQUNWLElBQUksUUFBUSxHQUFHLFdBQUssQ0FBQyxRQUFRLENBQUE7WUFDN0IsSUFBRyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sRUFDOUI7Z0JBQ0ksT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFBO2FBQ3pCO2lCQUFJO2dCQUNELE9BQU8sRUFBRSxDQUFBO2FBQ1o7U0FDSjthQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQzNDO1lBQ0ksT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDO1NBQ2hDO2FBQUk7WUFDRCxPQUFPLEtBQUssQ0FBQTtTQUNmO0lBQ0wsQ0FBQztJQUVNLGdCQUFPLEdBQWQ7UUFFSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUNyQztZQUNJLE9BQU8sZ0JBQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjthQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxX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QWxCLFVBQW1CLEtBQUs7UUFFcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUcsQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFBQyxPQUFNO1NBQUM7UUFDcEQsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFDcEM7WUFDSSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjthQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDN0MseUNBQXlDO1lBQ3pDLFdBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDM0I7YUFBSTtZQUNELHdDQUF3QztTQUMzQztJQUNMLENBQUM7SUExWE0sOEJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQzdCLGdDQUF1QixHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBRXZDLGtCQUFTLEdBQUcsS0FBSyxDQUFBO0lBQ2pCLGNBQUssR0FBRyxLQUFLLENBQUM7SUF3R2Qsd0JBQWUsR0FBVSxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQWdSakQsZUFBQztDQTlYRCxBQThYQyxJQUFBO2tCQTlYb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHd4c2RrIH0gZnJvbSBcIi4vd3hzZGsvc2RrXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5pbXBvcnQgQktUb29sIGZyb20gXCIuL3Fxc2RrL0JLVG9vbFwiO1xuaW1wb3J0IERldmljZSBmcm9tIFwiLi9wbHVnaW5fYm9vc3RzL2dhbWVzeXMvRGV2aWNlXCI7XG5pbXBvcnQgU3ByaXRlRnJhbWVDYWNoZSBmcm9tIFwiLi9wbHVnaW5fYm9vc3RzL21pc2MvU3ByaXRlRnJhbWVDYWNoZVwiO1xuaW1wb3J0IFNpZ25hbCBmcm9tIFwiLi9wbHVnaW5fYm9vc3RzL21pc2MvU2lnbmFsXCI7XG5pbXBvcnQgeyBldmVudCB9IGZyb20gXCIuL3BsdWdpbl9ib29zdHMvdXRpbHMvRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuL3BsdWdpbl9ib29zdHMvdWkvTGFuZ3VhZ2VNYW5hZ2VyXCI7XG5cbmVudW0gV3hDb21tYW5kc1xue1xuICAgIEhpZGUgPSA5OSxcbiAgICBOZXh0LFxuICAgIFJhbmtTbWFsbCxcbiAgICBSYW5rLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF0Zm9ybVxue1xuICAgIHN0YXRpYyBiYW5ubmVyUmVmcmVzaEVuYWJsZWQgPSB0cnVlO1xuICAgIHN0YXRpYyBvbkVudGVyRm9yZWdyb3VuZFNpZ25hbCA9IG5ldyBTaWduYWwoKTtcblxuICAgIHN0YXRpYyBpc0FuZHJvaWQgPSBmYWxzZVxuICAgIHN0YXRpYyBpc0lPUyA9IGZhbHNlO1xuXG4gICAgc3RhdGljIGdldE9wZW5JRCgpXG4gICAge1xuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB3ZWNoYXQgXG4gICAgICAgICAgICBsZXQgdXNlckluZm8gPSB3eHNkay51c2VySW5mb1xuICAgICAgICAgICAgaWYodXNlckluZm8gJiYgdXNlckluZm8ub3BlbklEIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlckluZm8ub3BlbklEXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSBpZiAoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gR2FtZVN0YXR1c0luZm8ub3BlbklkO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBcIjEyM1wiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TmljaygpXG4gICAge1xuICAgICAgICBpZiAoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gQktUb29sLmdldE5pY2soKTtcbiAgICAgICAgfWVsc2UgaWYgKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAgKHd4c2RrLnVzZXJJbmZvICYmIHd4c2RrLnVzZXJJbmZvLm5pY2tOYW1lKSAgfHwgXCLoh6rlt7JcIlxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBcIueOqeWutuiHquW3slwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0SGVhZCgpXG4gICAge1xuICAgICAgICBpZiAoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gQktUb29sLmdldEhlYWQoKTtcbiAgICAgICAgfWVsc2UgaWYgKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGF2YXRhclVybDpcImh0dHBzOi8vd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL1FsSGFpY0daT0Q3ZG85THVYNVc0QVBIWVNyVUJxVmFHVUx1d0lTTFVmMzVJeU9PWVozSVhsN25GNW1XMzZKaWFROXNuemlhd3JBdmtrblg0MVNtZVlhOUFRLzEzMlwiY2l0eTpcIlwiY291bnRyeTpcIlwiZ2VuZGVyOjFsYW5ndWFnZTpcInpoX0NOXCJuaWNrTmFtZTpcIkRhbW9uIFJlbuKBtuKBtuKBtlwicHJvdmluY2U6XCJcIlxuICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gd3hzZGsudXNlckluZm9cbiAgICAgICAgICAgIGlmKHVzZXJJbmZvICYmIHVzZXJJbmZvLmF2YXRhclVybCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJJbmZvLmF2YXRhclVybFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaHR0cHM6Ly90YW5rLndkZnVubnkuY29tL3NwZWVkX2xvZ28vMi5qcGdcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcImh0dHBzOi8vdGFuay53ZGZ1bm55LmNvbS9zcGVlZF9sb2dvLzEuanBnXCJcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkSGVhZFFRKHNwKVxuICAgIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgYWJzb2x1dGVQYXRoID0gXCJHYW1lU2FuZEJveDovL19oZWFkL1wiICsgR2FtZVN0YXR1c0luZm8ub3BlbklkICsgXCIuanBnXCI7XG4gICAgICAgIGxldCBpc0V4aXQgPSBCSy5GaWxlVXRpbC5pc0ZpbGVFeGlzdChhYnNvbHV0ZVBhdGgpO1xuICAgICAgICBjYy5sb2coYWJzb2x1dGVQYXRoICsgXCIgaXMgZXhpdCA6XCIgKyBpc0V4aXQpO1xuICAgICAgICAvL+WmguaenOaMh+WumuebruW9leS4reWtmOWcqOatpOWbvuWDj+WwseebtOaOpeaYvuekuuWQpuWImeS7jue9kee7nOiOt+WPllxuICAgICAgICBpZiAoaXNFeGl0KSB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChhYnNvbHV0ZVBhdGgsIGZ1bmN0aW9uIChlcnIsIHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBCSy5NUVEuQWNjb3VudC5nZXRIZWFkRXgoR2FtZVN0YXR1c0luZm8ub3BlbklkLCBmdW5jdGlvbiAob0lkLCBpbWdQYXRoKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwib3BlbklkOlwiICsgb0lkICsgXCIgaW1nUGF0aDpcIiArIGltZ1BhdGgpO1xuICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleCA9IG5ldyBjYy5UZXh0dXJlMkQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4LmluaXRXaXRoRWxlbWVudChpbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRleC5oYW5kbGVMb2FkZWRUZXh0dXJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IGltZ1BhdGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkU2VsZkhlYWQoc3ByaXRlKVxuICAgIHtcbiAgICAgICAgaWYgKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkSGVhZFFRKHNwcml0ZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgU3ByaXRlRnJhbWVDYWNoZS5pbnN0YW5jZS5nZXRTcHJpdGVGcmFtZShQbGF0Zm9ybS5nZXRIZWFkKCkpLnRoZW4oc2Y9PnNwcml0ZS5zcHJpdGVGcmFtZSA9IHNmKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGV4aXQoKVxuICAgIHtcbiAgICAgICAgaWYoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgd3gub2ZmU2hvdyhQbGF0Zm9ybS5vbkVudGVyRm9yZWdyb3VuZClcbiAgICAgICAgICAgIHd4Lm9mZkhpZGUoUGxhdGZvcm0ub25FbnRlckJhY2tncm91bmQpXG4gICAgICAgIH1lbHNlIGlmIChjYy5zeXMuUVFfUExBWSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbmZpZ0dldFNpZ25hbDpTaWduYWwgPSBuZXcgU2lnbmFsKCk7XG5cbiAgICBzdGF0aWMgbG9naW4oKVxuICAgIHtcbiAgICAgICAgdGhpcy5pc0FuZHJvaWQgPSBjYy5zeXMub3MgPT0gXCJBbmRyb2lkXCJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PSBvc1wiICwgY2Muc3lzLm9zKTtcbiAgICAgICAgdGhpcy5pc0lPUyA9IGNjLnN5cy5vcyA9PSBcImlPU1wiXG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHd4c2RrLmxvZ2luKClcbiAgICAgICAgICAgIHd4c2RrLnJlcXVlc3RDb25maWcoZGF0YT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnR2V0U2lnbmFsLmZpcmUoZGF0YSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBnZXQgY29uZiBcbiAgICAgICAgICAgIHd4Lm9uU2hvdyhQbGF0Zm9ybS5vbkVudGVyRm9yZWdyb3VuZClcbiAgICAgICAgICAgIHd4Lm9uSGlkZShQbGF0Zm9ybS5vbkVudGVyQmFja2dyb3VuZClcbiAgICAgICAgfWVsc2UgaWYgKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgQktUb29sLmxvZ2luKCk7XG4gICAgICAgICAgICBCSy5vbkVudGVyRm9yZWdyb3VuZChQbGF0Zm9ybS5vbkVudGVyRm9yZWdyb3VuZCk7XG4gICAgICAgICAgICBCSy5vbkVudGVyQmFja2dyb3VuZChQbGF0Zm9ybS5vbkVudGVyQmFja2dyb3VuZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVxdWVzdFNlcnZlckNvbmZpZ3MobmFtZSxjYWxsYmFjayx0YXJnZXQpXG4gICAge1xuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICB3eHNkay5yZXF1ZXN0REIobmFtZSxjYWxsYmFjayx0YXJnZXQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0R2FtZUlEKClcbiAgICB7XG4gICAgICAgIGlmIChjYy5zeXMuUVFfUExBWSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIEdhbWVTdGF0dXNJbmZvLmdhbWVJZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJzcGVlZF93YW55aXdhblwiO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGdldExhdW5jaE9wdGlvbnMoKVxuICAgIHtcbiAgICAgICAgaWYoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHd4LmdldExhdW5jaE9wdGlvbnNTeW5jKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICBcblxuXG4gICAgc3RhdGljIGdldENpdHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFwiXCJcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hhcmUoY2FsbGJhY2s/LHRhcmdldD8pXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjI+W8gOWni+WIhuS6q1wiKVxuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICB3eHNkay5vcGVuU2hhcmUoKTtcbiAgICAgICAgICAgIGxldCB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgIFBsYXRmb3JtLm9uRW50ZXJGb3JlZ3JvdW5kU2lnbmFsLm9uKCgpPT57XG4gICAgICAgICAgICAgICAgUGxhdGZvcm0ub25FbnRlckZvcmVncm91bmRTaWduYWwuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdDtcbiAgICAgICAgICAgICAgICBpZihkID4gMjMzMylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgIH0sNTAwKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvL+eUqOaIt+WPiuaXtui/lOWbnuWIhuS6q+Wksei0pSBcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIuWIhuS6q+Wksei0pSzor7flsJ3or5XmjaLlhbblroPnvqTliIbkuqtcIilcbiAgICAgICAgICAgICAgICAgICAgVG9hc3QubWFrZShMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcInNoYXJlX2ZhaWxcIikpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2UgaWYoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICBCS1Rvb2wuc2hhcmUodj0+e1xuICAgICAgICAgICAgICAgIGlmKHY9PVwic3VjY2Vzc1wiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvLyBUb2FzdC5tYWtlKFwi5YiG5Lqr5aSx6LSlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiAgY2FsbGJhY2suY2FsbCh0YXJnZXQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgd2F0Y2hfdmlkZW8oY2FsbGJhY2ssdGFyZ2V0PylcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMj5byA5aeL55yL6KeG6aKRXCIpXG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHd4c2RrLmxvYWRWaWRlb0FkKChjb2RlLGlzRW5kZWQpPT57XG4gICAgICAgICAgICAgICAgaWYoY29kZSA9PSBcImxvYWRcIilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICAgICAgICAgICAgICAgICAgUGxhdGZvcm0uYmFubm5lclJlZnJlc2hFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY29kZSA9PSBcImNsb3NlXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBQbGF0Zm9ybS5iYW5ubmVyUmVmcmVzaEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZighaXNFbmRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoXCLlv4XpobvnnIvlrozop4bpopEs5omN6IO96I635Y+W5aWW5YqxXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2FzdC5tYWtlKExhbmd1YWdlTWFuYWdlci5pbnN0YW5jZS5nZXRUZXh0KFwid2F0Y2hfdmlkZW9cIikpXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIGlmKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy/lhbPpl63og4zmma9cbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICAgICAgICAgIGxldCBpc0ZpbmlzaCA9IGZhbHNlO1xuICAgICAgICAgICAgQktUb29sLmxvYWRWaWRlb0FkKCh2LHZpZGVvKT0+e1xuICAgICAgICAgICAgICAgIGlmKHYgPT0gXCJsb2FkXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWRlby5zaG93KClcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodiA9PSBcImZpbmlzaFwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodj09XCJjbG9zZVwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzRmluaXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIuW/hemhu+eci+WujOinhumikSzmiY3og73ojrflj5blpZblirFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2UoTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQoXCJ3YXRjaF92aWRlb1wiKSlcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dCYW5uZXJBZCgpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjI+aYvuekukJhbm5lcuW5v+WRilwiKVxuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICB3eHNkay5zaG93QmFubmVyQWQoKTtcbiAgICAgICAgfWVsc2UgaWYoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICBCS1Rvb2wuc2hvd0Jhbm5lckFkKCk7XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdEJhbm5lckFkKGIgPSAxKVxuICAgIHtcbiAgICAgICAgaWYoYiA9PSAwKSByZXR1cm47XG4gICAgICAgIGlmKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoXz0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMj5Yqg6L29QmFubmVy5bm/5ZGKXCIpXG4gICAgICAgICAgICAgICAgQktUb29sLmhpZGVCYW5uZXJBZCgpXG4gICAgICAgICAgICAgICAgQktUb29sLmxvYWRCYW5uZXJBZCh2PT57XG4gICAgICAgICAgICAgICAgICAgIHYgPT0gXCJsb2FkXCIgJiYgQktUb29sLnNob3dCYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ICwgMzAwMDAgKVxuICAgICAgICB9ZWxzZSBpZiAoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoXz0+e1xuICAgICAgICAgICAgICAgIGlmKFBsYXRmb3JtLmJhbm5uZXJSZWZyZXNoRW5hYmxlZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMj5Yqg6L29QmFubmVy5bm/5ZGKXCIpXG4gICAgICAgICAgICAgICAgICAgIHd4c2RrLmhpZGVCYW5uZXJBZCgpXG4gICAgICAgICAgICAgICAgICAgIHd4c2RrLmxvYWRCYW5uZXJBZCh2PT57XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID09IFwibG9hZFwiICYmIHd4c2RrLnNob3dCYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLCA0MDAwMCApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMganVtcFRvKClcbiAgICB7XG4gICAgICAgIC8vIHZhciBkZXNHYW1lSWQgPSAxMjM0OyAvL+i3s+i9rOeahGdhbWVpZO+8jOW/hemhu+S4uuaVsOWtl1xuICAgICAgICAvLyB2YXIgZXh0ZW5kSW5mbyA9IFwiXCI7IC8v6aKd5aSW5Y+C5pWw77yM5b+F6aG75Li65a2X56ym5LiyXG4gICAgICAgIC8vIEJLLlFRLnNraXBHYW1lKGRlc0dhbWVJZCwgZXh0ZW5kSW5mbyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dSYW5rRGlhbG9nKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BsYXRmb3JtXSNzaG93UmFua0RpYWxvZ1wiKTtcbiAgICAgICAgVG9hc3QubWFrZShcIiNbUGxhdGZvcm1dI3Nob3dSYW5rRGlhbG9nXCIpXG4gICAgICAgIFxuICAgICAgICAvLyBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9SYW5rRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgLy8gQW5kcmlvZCDlj5HpgIHmuLjmiI/lv6vmjbfmlrnlvI/liLDmoYzpnaJcblxuICAgIHN0YXRpYyBvbkVudGVyRm9yZWdyb3VuZCgpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PW9uRW50ZXJGb3JlZ3JvdW5kPT09PT09PT09PT09PT09PT09PT09XCIpXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuUVFfUExBWSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy9vbkVudGVyRm9yZWdyb3VuZFxuICAgICAgICAgICAgLy8gRGV2aWNlLnJlc3VtZU11c2ljKClcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpXG4gICAgICAgIH1cbiAgICAgICAgUGxhdGZvcm0ub25FbnRlckZvcmVncm91bmRTaWduYWwuZmlyZSgpO1xuICAgICAgICBldmVudC5lbWl0KFwib25FbnRlckZvcmVncm91bmRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgb25FbnRlckJhY2tncm91bmQoKVxuICAgIHtcbiAgICAgICAgLy8gQksub25FbnRlckJhY2tncm91bmQoZW50ZXJCYWNrZ3JvdW5kTGlzdGVuZXIpO1xuICAgICAgICBldmVudC5lbWl0KFwib25FbnRlckJhY2tncm91bmRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgIG9uR2FtZUV4aXQoKVxuICAgIHtcbiAgICAgICAgLy8gQksub25HYW1lQ2xvc2UoZ2FtZUNsb3NlTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93U21hbGxSYW5rKClcbiAgICB7XG4gICAgICAgIHd4c2RrLnBvc3RNZXNzYWdlKFd4Q29tbWFuZHMuUmFua1NtYWxsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd1JhbmsoKVxuICAgIHtcbiAgICAgICAgd3hzZGsucG9zdE1lc3NhZ2UoV3hDb21tYW5kcy5SYW5rKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZVJhbmsoKVxuICAgIHtcbiAgICAgICAgd3hzZGsucG9zdE1lc3NhZ2UoV3hDb21tYW5kcy5SYW5rU21hbGwpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldFJhbmtMaXN0KGNhbGxiYWNrLHRhcmdldD8pXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltQbGF0Zm9ybV0j6I635Y+W5o6S6KGM5qac5pWw5o2uXCIpO1xuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlFRX1BMQVkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBCS1Rvb2wuZ2V0UmFua0xpc3QoKGVycm9yQ29kZSxsaXN0KT0+e1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwodGFyZ2V0LGVycm9yQ29kZSxsaXN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZFNjb3JlKHNjb3JlKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbUGxhdGZvcm1dI+S4iuS8oOWIhuaVsFwiKTtcbiAgICAgICAgaWYoIXNjb3JlKSB7IGNvbnNvbGUubG9nKFwic2NvcmUg5LiK5Lyg5aSx6LSl77yabnVsbFwiKTsgcmV0dXJufVxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlFRX1BMQVkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEJLVG9vbC51cGxvYWRTY29yZShzY29yZSk7XG4gICAgICAgIH1lbHNlIGlmIChjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKSB7XG4gICAgICAgICAgICAvLyB3eHNkay5wb3N0TWVzc2FnZShXeENvbW1hbmRzLiwgc2NvcmUpO1xuICAgICAgICAgICAgd3hzZGsudXBsb2FkU2NvcmUoc2NvcmUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIiNbUGxhdGZvcm1dI3VwbG9hZFNjb3JlXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=