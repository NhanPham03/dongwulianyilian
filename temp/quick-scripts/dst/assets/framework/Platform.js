
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
                    ToastManager_1.Toast.make("分享失败,请尝试换其它群分享");
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
                        ToastManager_1.Toast.make("必须看完视频,才能获取奖励");
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
                        ToastManager_1.Toast.make("必须看完视频,才能获取奖励");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxQbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW9DO0FBQ3BDLGdFQUF3RDtBQUN4RCx5Q0FBb0M7QUFFcEMsMEVBQXFFO0FBQ3JFLHNEQUFpRDtBQUNqRCxtRUFBMkQ7QUFFM0QsSUFBSyxVQU1KO0FBTkQsV0FBSyxVQUFVO0lBRVgsNENBQVMsQ0FBQTtJQUNULDZDQUFJLENBQUE7SUFDSix1REFBUyxDQUFBO0lBQ1QsNkNBQUksQ0FBQTtBQUNSLENBQUMsRUFOSSxVQUFVLEtBQVYsVUFBVSxRQU1kO0FBRUQ7SUFBQTtJQTJYQSxDQUFDO0lBblhVLGtCQUFTLEdBQWhCO1FBRUksSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDeEM7WUFDSSxVQUFVO1lBQ1YsSUFBSSxRQUFRLEdBQUcsV0FBSyxDQUFDLFFBQVEsQ0FBQTtZQUM3QixJQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUM5QjtnQkFDSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUE7YUFDekI7aUJBQUk7Z0JBQ0QsT0FBTyxFQUFFLENBQUE7YUFDWjtTQUNKO2FBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDM0M7WUFDSSxPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUM7U0FDaEM7YUFBSTtZQUNELE9BQU8sS0FBSyxDQUFBO1NBQ2Y7SUFDTCxDQUFDO0lBRU0sZ0JBQU8sR0FBZDtRQUVJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQ3JDO1lBQ0ksT0FBTyxnQkFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO2FBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFF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LEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQ3BDO1lBQ0ksZ0JBQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFBSyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQzdDLHlDQUF5QztZQUN6QyxXQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzNCO2FBQUk7WUFDRCx3Q0FBd0M7U0FDM0M7SUFDTCxDQUFDO0lBdlhNLDhCQUFxQixHQUFHLElBQUksQ0FBQztJQUM3QixnQ0FBdUIsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQUV2QyxrQkFBUyxHQUFHLEtBQUssQ0FBQTtJQUNqQixjQUFLLEdBQUcsS0FBSyxDQUFDO0lBd0dkLHdCQUFlLEdBQVUsSUFBSSxnQkFBTSxFQUFFLENBQUM7SUE2UWpELGVBQUM7Q0EzWEQsQUEyWEMsSUFBQTtrQkEzWG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3eHNkayB9IGZyb20gXCIuL3d4c2RrL3Nka1wiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuaW1wb3J0IEJLVG9vbCBmcm9tIFwiLi9xcXNkay9CS1Rvb2xcIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4vcGx1Z2luX2Jvb3N0cy9nYW1lc3lzL0RldmljZVwiO1xuaW1wb3J0IFNwcml0ZUZyYW1lQ2FjaGUgZnJvbSBcIi4vcGx1Z2luX2Jvb3N0cy9taXNjL1Nwcml0ZUZyYW1lQ2FjaGVcIjtcbmltcG9ydCBTaWduYWwgZnJvbSBcIi4vcGx1Z2luX2Jvb3N0cy9taXNjL1NpZ25hbFwiO1xuaW1wb3J0IHsgZXZlbnQgfSBmcm9tIFwiLi9wbHVnaW5fYm9vc3RzL3V0aWxzL0V2ZW50TWFuYWdlclwiO1xuXG5lbnVtIFd4Q29tbWFuZHNcbntcbiAgICBIaWRlID0gOTksXG4gICAgTmV4dCxcbiAgICBSYW5rU21hbGwsXG4gICAgUmFuayxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm1cbntcbiAgICBzdGF0aWMgYmFubm5lclJlZnJlc2hFbmFibGVkID0gdHJ1ZTtcbiAgICBzdGF0aWMgb25FbnRlckZvcmVncm91bmRTaWduYWwgPSBuZXcgU2lnbmFsKCk7XG5cbiAgICBzdGF0aWMgaXNBbmRyb2lkID0gZmFsc2VcbiAgICBzdGF0aWMgaXNJT1MgPSBmYWxzZTtcblxuICAgIHN0YXRpYyBnZXRPcGVuSUQoKVxuICAgIHtcbiAgICAgICAgaWYoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gd2VjaGF0IFxuICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gd3hzZGsudXNlckluZm9cbiAgICAgICAgICAgIGlmKHVzZXJJbmZvICYmIHVzZXJJbmZvLm9wZW5JRCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJJbmZvLm9wZW5JRFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYgKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIEdhbWVTdGF0dXNJbmZvLm9wZW5JZDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gXCIxMjNcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5pY2soKVxuICAgIHtcbiAgICAgICAgaWYgKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIEJLVG9vbC5nZXROaWNrKCk7XG4gICAgICAgIH1lbHNlIGlmIChjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gICh3eHNkay51c2VySW5mbyAmJiB3eHNkay51c2VySW5mby5uaWNrTmFtZSkgIHx8IFwi6Ieq5beyXCJcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gXCLnjqnlrrboh6rlt7JcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEhlYWQoKVxuICAgIHtcbiAgICAgICAgaWYgKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIEJLVG9vbC5nZXRIZWFkKCk7XG4gICAgICAgIH1lbHNlIGlmIChjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBhdmF0YXJVcmw6XCJodHRwczovL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9RbEhhaWNHWk9EN2RvOUx1WDVXNEFQSFlTclVCcVZhR1VMdXdJU0xVZjM1SXlPT1laM0lYbDduRjVtVzM2SmlhUTlzbnppYXdyQXZra25YNDFTbWVZYTlBUS8xMzJcImNpdHk6XCJcImNvdW50cnk6XCJcImdlbmRlcjoxbGFuZ3VhZ2U6XCJ6aF9DTlwibmlja05hbWU6XCJEYW1vbiBSZW7igbbigbbigbZcInByb3ZpbmNlOlwiXCJcbiAgICAgICAgICAgIGxldCB1c2VySW5mbyA9IHd4c2RrLnVzZXJJbmZvXG4gICAgICAgICAgICBpZih1c2VySW5mbyAmJiB1c2VySW5mby5hdmF0YXJVcmwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB1c2VySW5mby5hdmF0YXJVcmxcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBcImh0dHBzOi8vdGFuay53ZGZ1bm55LmNvbS9zcGVlZF9sb2dvLzIuanBnXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJodHRwczovL3Rhbmsud2RmdW5ueS5jb20vc3BlZWRfbG9nby8xLmpwZ1wiXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9hZEhlYWRRUShzcClcbiAgICB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGFic29sdXRlUGF0aCA9IFwiR2FtZVNhbmRCb3g6Ly9faGVhZC9cIiArIEdhbWVTdGF0dXNJbmZvLm9wZW5JZCArIFwiLmpwZ1wiO1xuICAgICAgICBsZXQgaXNFeGl0ID0gQksuRmlsZVV0aWwuaXNGaWxlRXhpc3QoYWJzb2x1dGVQYXRoKTtcbiAgICAgICAgY2MubG9nKGFic29sdXRlUGF0aCArIFwiIGlzIGV4aXQgOlwiICsgaXNFeGl0KTtcbiAgICAgICAgLy/lpoLmnpzmjIflrprnm67lvZXkuK3lrZjlnKjmraTlm77lg4/lsLHnm7TmjqXmmL7npLrlkKbliJnku47nvZHnu5zojrflj5ZcbiAgICAgICAgaWYgKGlzRXhpdCkge1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoYWJzb2x1dGVQYXRoLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQksuTVFRLkFjY291bnQuZ2V0SGVhZEV4KEdhbWVTdGF0dXNJbmZvLm9wZW5JZCwgZnVuY3Rpb24gKG9JZCwgaW1nUGF0aCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIm9wZW5JZDpcIiArIG9JZCArIFwiIGltZ1BhdGg6XCIgKyBpbWdQYXRoKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXggPSBuZXcgY2MuVGV4dHVyZTJEKCk7XG4gICAgICAgICAgICAgICAgICAgIHRleC5pbml0V2l0aEVsZW1lbnQoaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICB0ZXguaGFuZGxlTG9hZGVkVGV4dHVyZSgpO1xuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSBpbWdQYXRoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZFNlbGZIZWFkKHNwcml0ZSlcbiAgICB7XG4gICAgICAgIGlmIChjYy5zeXMuUVFfUExBWSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9hZEhlYWRRUShzcHJpdGUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFNwcml0ZUZyYW1lQ2FjaGUuaW5zdGFuY2UuZ2V0U3ByaXRlRnJhbWUoUGxhdGZvcm0uZ2V0SGVhZCgpKS50aGVuKHNmPT5zcHJpdGUuc3ByaXRlRnJhbWUgPSBzZilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBleGl0KClcbiAgICB7XG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHd4Lm9mZlNob3coUGxhdGZvcm0ub25FbnRlckZvcmVncm91bmQpXG4gICAgICAgICAgICB3eC5vZmZIaWRlKFBsYXRmb3JtLm9uRW50ZXJCYWNrZ3JvdW5kKVxuICAgICAgICB9ZWxzZSBpZiAoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjb25maWdHZXRTaWduYWw6U2lnbmFsID0gbmV3IFNpZ25hbCgpO1xuXG4gICAgc3RhdGljIGxvZ2luKClcbiAgICB7XG4gICAgICAgIHRoaXMuaXNBbmRyb2lkID0gY2Muc3lzLm9zID09IFwiQW5kcm9pZFwiXG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT0gb3NcIiAsIGNjLnN5cy5vcyk7XG4gICAgICAgIHRoaXMuaXNJT1MgPSBjYy5zeXMub3MgPT0gXCJpT1NcIlxuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICB3eHNkay5sb2dpbigpXG4gICAgICAgICAgICB3eHNkay5yZXF1ZXN0Q29uZmlnKGRhdGE9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ0dldFNpZ25hbC5maXJlKGRhdGEpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gZ2V0IGNvbmYgXG4gICAgICAgICAgICB3eC5vblNob3coUGxhdGZvcm0ub25FbnRlckZvcmVncm91bmQpXG4gICAgICAgICAgICB3eC5vbkhpZGUoUGxhdGZvcm0ub25FbnRlckJhY2tncm91bmQpXG4gICAgICAgIH1lbHNlIGlmIChjYy5zeXMuUVFfUExBWSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIEJLVG9vbC5sb2dpbigpO1xuICAgICAgICAgICAgQksub25FbnRlckZvcmVncm91bmQoUGxhdGZvcm0ub25FbnRlckZvcmVncm91bmQpO1xuICAgICAgICAgICAgQksub25FbnRlckJhY2tncm91bmQoUGxhdGZvcm0ub25FbnRlckJhY2tncm91bmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcXVlc3RTZXJ2ZXJDb25maWdzKG5hbWUsY2FsbGJhY2ssdGFyZ2V0KVxuICAgIHtcbiAgICAgICAgaWYoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgd3hzZGsucmVxdWVzdERCKG5hbWUsY2FsbGJhY2ssdGFyZ2V0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEdhbWVJRCgpXG4gICAge1xuICAgICAgICBpZiAoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICBHYW1lU3RhdHVzSW5mby5nYW1lSWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwic3BlZWRfd2FueWl3YW5cIjtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZXRMYXVuY2hPcHRpb25zKClcbiAgICB7XG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB3eC5nZXRMYXVuY2hPcHRpb25zU3luYygpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgXG5cblxuICAgIHN0YXRpYyBnZXRDaXR5KClcbiAgICB7XG4gICAgICAgIHJldHVybiBcIlwiXG4gICAgfVxuXG4gICAgc3RhdGljIHNoYXJlKGNhbGxiYWNrPyx0YXJnZXQ/KVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIjIyMjIyPlvIDlp4vliIbkuqtcIilcbiAgICAgICAgaWYoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgd3hzZGsub3BlblNoYXJlKCk7XG4gICAgICAgICAgICBsZXQgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgICAgICBQbGF0Zm9ybS5vbkVudGVyRm9yZWdyb3VuZFNpZ25hbC5vbigoKT0+e1xuICAgICAgICAgICAgICAgIFBsYXRmb3JtLm9uRW50ZXJGb3JlZ3JvdW5kU2lnbmFsLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHQ7XG4gICAgICAgICAgICAgICAgaWYoZCA+IDIzMzMpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KF89PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICB9LDUwMClcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy/nlKjmiLflj4rml7bov5Tlm57liIbkuqvlpLHotKUgXG4gICAgICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2UoXCLliIbkuqvlpLHotKUs6K+35bCd6K+V5o2i5YW25a6D576k5YiG5LqrXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2UgaWYoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICBCS1Rvb2wuc2hhcmUodj0+e1xuICAgICAgICAgICAgICAgIGlmKHY9PVwic3VjY2Vzc1wiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvLyBUb2FzdC5tYWtlKFwi5YiG5Lqr5aSx6LSlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiAgY2FsbGJhY2suY2FsbCh0YXJnZXQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgd2F0Y2hfdmlkZW8oY2FsbGJhY2ssdGFyZ2V0PylcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMj5byA5aeL55yL6KeG6aKRXCIpXG4gICAgICAgIGlmKGNjLnN5cy5XRUNIQVRfR0FNRSA9PSBjYy5zeXMucGxhdGZvcm0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHd4c2RrLmxvYWRWaWRlb0FkKChjb2RlLGlzRW5kZWQpPT57XG4gICAgICAgICAgICAgICAgaWYoY29kZSA9PSBcImxvYWRcIilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICAgICAgICAgICAgICAgICAgUGxhdGZvcm0uYmFubm5lclJlZnJlc2hFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY29kZSA9PSBcImNsb3NlXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBQbGF0Zm9ybS5iYW5ubmVyUmVmcmVzaEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZighaXNFbmRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvYXN0Lm1ha2UoXCLlv4XpobvnnIvlrozop4bpopEs5omN6IO96I635Y+W5aWW5YqxXCIpXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIGlmKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy/lhbPpl63og4zmma9cbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICAgICAgICAgIGxldCBpc0ZpbmlzaCA9IGZhbHNlO1xuICAgICAgICAgICAgQktUb29sLmxvYWRWaWRlb0FkKCh2LHZpZGVvKT0+e1xuICAgICAgICAgICAgICAgIGlmKHYgPT0gXCJsb2FkXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWRlby5zaG93KClcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodiA9PSBcImZpbmlzaFwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodj09XCJjbG9zZVwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzRmluaXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgVG9hc3QubWFrZShcIuW/hemhu+eci+WujOinhumikSzmiY3og73ojrflj5blpZblirFcIilcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dCYW5uZXJBZCgpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyMjI+aYvuekukJhbm5lcuW5v+WRilwiKVxuICAgICAgICBpZihjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICB3eHNkay5zaG93QmFubmVyQWQoKTtcbiAgICAgICAgfWVsc2UgaWYoY2Muc3lzLlFRX1BMQVkgPT0gY2Muc3lzLnBsYXRmb3JtKVxuICAgICAgICB7XG4gICAgICAgICAgICBCS1Rvb2wuc2hvd0Jhbm5lckFkKCk7XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdEJhbm5lckFkKGIgPSAxKVxuICAgIHtcbiAgICAgICAgaWYoYiA9PSAwKSByZXR1cm47XG4gICAgICAgIGlmKGNjLnN5cy5RUV9QTEFZID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoXz0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMj5Yqg6L29QmFubmVy5bm/5ZGKXCIpXG4gICAgICAgICAgICAgICAgQktUb29sLmhpZGVCYW5uZXJBZCgpXG4gICAgICAgICAgICAgICAgQktUb29sLmxvYWRCYW5uZXJBZCh2PT57XG4gICAgICAgICAgICAgICAgICAgIHYgPT0gXCJsb2FkXCIgJiYgQktUb29sLnNob3dCYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ICwgMzAwMDAgKVxuICAgICAgICB9ZWxzZSBpZiAoY2Muc3lzLldFQ0hBVF9HQU1FID09IGNjLnN5cy5wbGF0Zm9ybSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoXz0+e1xuICAgICAgICAgICAgICAgIGlmKFBsYXRmb3JtLmJhbm5uZXJSZWZyZXNoRW5hYmxlZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMj5Yqg6L29QmFubmVy5bm/5ZGKXCIpXG4gICAgICAgICAgICAgICAgICAgIHd4c2RrLmhpZGVCYW5uZXJBZCgpXG4gICAgICAgICAgICAgICAgICAgIHd4c2RrLmxvYWRCYW5uZXJBZCh2PT57XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID09IFwibG9hZFwiICYmIHd4c2RrLnNob3dCYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLCA0MDAwMCApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMganVtcFRvKClcbiAgICB7XG4gICAgICAgIC8vIHZhciBkZXNHYW1lSWQgPSAxMjM0OyAvL+i3s+i9rOeahGdhbWVpZO+8jOW/hemhu+S4uuaVsOWtl1xuICAgICAgICAvLyB2YXIgZXh0ZW5kSW5mbyA9IFwiXCI7IC8v6aKd5aSW5Y+C5pWw77yM5b+F6aG75Li65a2X56ym5LiyXG4gICAgICAgIC8vIEJLLlFRLnNraXBHYW1lKGRlc0dhbWVJZCwgZXh0ZW5kSW5mbyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dSYW5rRGlhbG9nKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BsYXRmb3JtXSNzaG93UmFua0RpYWxvZ1wiKTtcbiAgICAgICAgVG9hc3QubWFrZShcIiNbUGxhdGZvcm1dI3Nob3dSYW5rRGlhbG9nXCIpXG4gICAgICAgIFxuICAgICAgICAvLyBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9SYW5rRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgLy8gQW5kcmlvZCDlj5HpgIHmuLjmiI/lv6vmjbfmlrnlvI/liLDmoYzpnaJcblxuICAgIHN0YXRpYyBvbkVudGVyRm9yZWdyb3VuZCgpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PW9uRW50ZXJGb3JlZ3JvdW5kPT09PT09PT09PT09PT09PT09PT09XCIpXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuUVFfUExBWSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy9vbkVudGVyRm9yZWdyb3VuZFxuICAgICAgICAgICAgLy8gRGV2aWNlLnJlc3VtZU11c2ljKClcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpXG4gICAgICAgIH1cbiAgICAgICAgUGxhdGZvcm0ub25FbnRlckZvcmVncm91bmRTaWduYWwuZmlyZSgpO1xuICAgICAgICBldmVudC5lbWl0KFwib25FbnRlckZvcmVncm91bmRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgb25FbnRlckJhY2tncm91bmQoKVxuICAgIHtcbiAgICAgICAgLy8gQksub25FbnRlckJhY2tncm91bmQoZW50ZXJCYWNrZ3JvdW5kTGlzdGVuZXIpO1xuICAgICAgICBldmVudC5lbWl0KFwib25FbnRlckJhY2tncm91bmRcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgIG9uR2FtZUV4aXQoKVxuICAgIHtcbiAgICAgICAgLy8gQksub25HYW1lQ2xvc2UoZ2FtZUNsb3NlTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93U21hbGxSYW5rKClcbiAgICB7XG4gICAgICAgIHd4c2RrLnBvc3RNZXNzYWdlKFd4Q29tbWFuZHMuUmFua1NtYWxsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd1JhbmsoKVxuICAgIHtcbiAgICAgICAgd3hzZGsucG9zdE1lc3NhZ2UoV3hDb21tYW5kcy5SYW5rKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZVJhbmsoKVxuICAgIHtcbiAgICAgICAgd3hzZGsucG9zdE1lc3NhZ2UoV3hDb21tYW5kcy5SYW5rU21hbGwpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldFJhbmtMaXN0KGNhbGxiYWNrLHRhcmdldD8pXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltQbGF0Zm9ybV0j6I635Y+W5o6S6KGM5qac5pWw5o2uXCIpO1xuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlFRX1BMQVkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBCS1Rvb2wuZ2V0UmFua0xpc3QoKGVycm9yQ29kZSxsaXN0KT0+e1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwodGFyZ2V0LGVycm9yQ29kZSxsaXN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZFNjb3JlKHNjb3JlKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbUGxhdGZvcm1dI+S4iuS8oOWIhuaVsFwiKTtcbiAgICAgICAgaWYoIXNjb3JlKSB7IGNvbnNvbGUubG9nKFwic2NvcmUg5LiK5Lyg5aSx6LSl77yabnVsbFwiKTsgcmV0dXJufVxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlFRX1BMQVkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEJLVG9vbC51cGxvYWRTY29yZShzY29yZSk7XG4gICAgICAgIH1lbHNlIGlmIChjYy5zeXMuV0VDSEFUX0dBTUUgPT0gY2Muc3lzLnBsYXRmb3JtKSB7XG4gICAgICAgICAgICAvLyB3eHNkay5wb3N0TWVzc2FnZShXeENvbW1hbmRzLiwgc2NvcmUpO1xuICAgICAgICAgICAgd3hzZGsudXBsb2FkU2NvcmUoc2NvcmUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIiNbUGxhdGZvcm1dI3VwbG9hZFNjb3JlXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=