"use strict";
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