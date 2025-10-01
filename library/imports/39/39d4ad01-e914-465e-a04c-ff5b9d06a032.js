"use strict";
cc._RF.push(module, '39d4a0B6RRGXqBM/1udBqAy', 'sdk');
// framework/wxsdk/sdk.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.wxsdk = void 0;
var EventManager_1 = require("../plugin_boosts/utils/EventManager");
var GameConfigs_1 = require("./GameConfigs");
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.videoAd = undefined;
    Global.bannerAd = undefined;
    Global.videoAdLoadCount = 0; //视频广告加载次数
    Global.bannerAdLoadCount = 0; //banner广告加载次数
    return Global;
}());
var WxSdk = /** @class */ (function () {
    function WxSdk() {
    }
    Object.defineProperty(WxSdk.prototype, "Ver", {
        get: function () { return this._version; },
        enumerable: false,
        configurable: true
    });
    WxSdk.prototype.init = function () {
        if (g.iswxgame()) {
            if (this._version == null) {
                this._systemInfo = wx.getSystemInfoSync();
                var ver = this._systemInfo.SDKVersion.replace(/\./g, "");
                this._version = parseInt(ver);
            }
        }
    };
    WxSdk.prototype.requestDB = function (tbname, callback, target) {
        this._db.collection(tbname).get({
            success: function (res) {
                console.log("get " + tbname + " succ:", res.data);
                // self._shareConfig = res.data;
                if (callback)
                    callback.call(target, res.data);
            },
            fail: function (res) {
                console.log("get " + tbname + " fail:");
                if (callback)
                    callback.call(target);
            }
        });
    };
    WxSdk.prototype.requestConfig = function (callback) {
        this._db.collection("t_conf").get({
            success: function (res) {
                console.log("get configs succ:", res.data);
                // self._shareConfig = res.data;
                if (callback)
                    callback(res.data);
            },
            fail: function (res) {
                console.log("get configs fail:", res);
                if (callback)
                    callback(null);
            }
        });
    };
    WxSdk.prototype.requestShareContent = function (callback) {
        var self = this;
        if (this._shareConfig == null) {
            this._db.collection("t_share").get({
                success: function (res) {
                    console.log("share configs succ:", res.data);
                    self._shareConfig = res.data;
                    if (res.data && res.data.length > 0) {
                        var len = res.data.length;
                        var info = res.data[g.randomInt(0, len)];
                        if (callback)
                            callback(info);
                    }
                    else {
                        if (callback)
                            callback(null);
                    }
                }, fail: function (res) {
                    console.log("share configs fail:", res);
                    if (callback)
                        callback(null);
                }
            });
        }
        else {
            var len = this._shareConfig.length;
            var info = this._shareConfig[g.randomInt(0, len)];
            if (callback)
                callback(info);
        }
    };
    WxSdk.prototype.getShareContentSync = function () {
        if (this._shareConfig && this._shareConfig.length > 0) {
            var len = this._shareConfig.length;
            var info = this._shareConfig[g.randomInt(0, len)];
            return info;
        }
        else {
            return { title: GameConfigs_1.GameConfig.default_share_title, imageUrl: cc.url.raw(GameConfigs_1.GameConfig.deafult_share_imgUrl) };
        }
    };
    WxSdk.prototype.getShareContent = function (title) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.requestShareContent(function (info) {
                if (info)
                    resolve(info);
                else {
                    // reject("share config get failed!")
                    var ret = {
                        title: title || GameConfigs_1.GameConfig.default_share_title,
                        imageUrl: cc.url.raw(GameConfigs_1.GameConfig.deafult_share_imgUrl),
                    };
                    resolve(ret);
                }
            });
        });
    };
    WxSdk.prototype.openShare = function (title, uuid, extra) {
        if (extra === void 0) { extra = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!g.iswxgame())
                            return [2 /*return*/];
                        return [4 /*yield*/, this.getShareContent(title)];
                    case 1:
                        info = _a.sent();
                        console.log(info);
                        if (info != null) {
                            // if(this._userInfo && this._userInfo.openId)
                            uuid = uuid || (this._userInfo && this._userInfo.openId) || 0;
                            info.query = "share_id=" + uuid + "&time=" + new Date().getTime() + "&" + extra;
                            // info.callback = ret=>{
                            //     console.error("=>>>>>>>share:" ,ret);
                            // }
                            console.log("open Share", info.query);
                            wx.shareAppMessage(info);
                            // this.recordShare(Share.GAME, uuid);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WxSdk.prototype.createButton = function (callback, x, y, width, height) {
        console.log("-------------createButton");
        var button = wx.createUserInfoButton({
            type: "text",
            text: "     ",
            style: {
                x: x || 0, y: y || 0,
                width: width || cc.winSize.width,
                height: height || cc.winSize.height,
                lineHeight: 40,
                backgroundColor: '#00000000',
                color: '#ffffff'
            }
        });
        button.onTap(function (res) {
            button.destroy();
            if (res && res.userInfo) {
                if (callback)
                    callback(res);
            }
            else if (callback)
                callback(null);
        });
    };
    Object.defineProperty(WxSdk.prototype, "userInfo", {
        get: function () {
            return this._userInfo.userInfo;
        },
        enumerable: false,
        configurable: true
    });
    WxSdk.prototype.getUserInfo = function (callback) {
        console.log("-------------getUserInfo");
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success: function (res) {
                console.log("getUserInfo success.", res);
                if (callback)
                    callback(res);
            }, fail: function (res) {
                console.log("getUserInfo:", res);
                if (callback)
                    callback(null);
            },
            complete: null
        });
    };
    WxSdk.prototype.oldAuthUser = function (callback) {
        wx.authorize({
            scope: "scope.userInfo",
            success: function (res) {
                console.log(res);
                if (callback)
                    callback(true);
            }, fail: function (res) {
                console.log(res);
                if (callback)
                    callback(false);
            },
            complete: null
        });
    };
    WxSdk.prototype.authUserInfo = function (callback) {
        this.wxLogin(function (isLogin) {
            if (!isLogin)
                return;
            wx.getSetting({
                success: function (res) {
                    var auth = res.authSetting;
                    if (auth["scope.userInfo"]) {
                        if (callback)
                            callback(true);
                    }
                    else if (callback)
                        callback(false);
                },
                fail: null,
                complete: null,
            });
        });
    };
    WxSdk.prototype.showShareMenu = function () {
        var self = this;
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
                console.log(res);
            }, fail: function (res) {
                console.log(res);
            },
            complete: null
        });
        wx.onShareAppMessage(function () {
            var content = self.getShareContentSync();
            return content;
        });
    };
    WxSdk.prototype.wxLogin = function (callback) {
        wx.login({
            success: function (res) {
                console.log("code ", res.code);
                if (callback)
                    callback(true);
            }, fail: function (res) {
                if (callback)
                    callback(false);
            },
            complete: null
        });
    };
    WxSdk.prototype.loginToServer = function (userInfo) {
        if (userInfo == null)
            userInfo = {};
        this._userInfo = userInfo;
        userInfo.parentId = this._parentId;
        this.showShareMenu();
        EventManager_1.event.emit("wxlogin");
    };
    WxSdk.prototype.login = function (x, y, width, height) {
        if (!g.iswxgame())
            return;
        var self = this;
        wx.cloud.init({ traceUser: true });
        // this._db = wx.cloud.database({env: "release-2c87c4"});//测试环境
        this._db = wx.cloud.database();
        self.authUserInfo(function (isAuth) {
            if (self._userInfo == null ||
                self._userInfo.userInfo == null) {
                if (self._version >= 220 && !isAuth) {
                    self.createButton(function (userInfo) {
                        self.loginToServer(userInfo);
                    }, x, y, width, height);
                }
                else {
                    if (!isAuth) {
                        self.oldAuthUser(function (isAuth) {
                            if (isAuth) {
                                self.getUserInfo(function (userInfo) {
                                    self.loginToServer(userInfo);
                                });
                            }
                            else
                                self.loginToServer(null);
                        });
                    }
                    else
                        self.getUserInfo(function (userInfo) {
                            self.loginToServer(userInfo);
                        });
                }
            }
        });
    };
    WxSdk.prototype.getParent = function () {
        if (!g.iswxgame())
            return "";
        var info = wx.getLaunchOptionsSync();
        if (info.scene == 1007 || info.scene == 1008) { //通过分享进入游戏
            var openId = info.query["user_id"];
            return openId;
        }
        return ""; //默认
    };
    //发送消息到子域
    WxSdk.prototype.postMessage = function (cmd, data) {
        if (g.iswxgame()) {
            wx.getOpenDataContext().postMessage({
                cmd: cmd,
                data: data
            });
        }
    };
    WxSdk.prototype.uploadScore = function (score, callback) {
        var kvDataList = new Array();
        kvDataList.push({
            key: "score",
            value: score + ""
        });
        var obj = {
            KVDataList: kvDataList,
            success: function (d) {
                if (callback)
                    callback(d);
            },
            fail: function () { },
            complete: function () { },
        };
        wx.setUserCloudStorage(obj);
        // "wxgame": {
        //     "score": 16,
        //     "update_time": 1513080573
        // },
        // "cost_ms": 36500
    };
    WxSdk.prototype.loadBannerAd = function (callback) {
        var _this = this;
        if (Global.bannerAd) {
            Global.bannerAd.destroy();
        }
        if (!this._systemInfo)
            this._systemInfo = wx.getSystemInfoSync();
        var bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-fe3c074ad86d1b59',
            style: {
                left: 0,
                top: 0,
                width: this._systemInfo.windowWidth
            }
        });
        bannerAd.onLoad(function () {
            Global.bannerAd = bannerAd;
            Global.bannerAdLoadCount = 0;
            bannerAd.style.left = _this._systemInfo.windowWidth / 2 - bannerAd.style.realWidth / 2;
            bannerAd.style.top = _this._systemInfo.windowHeight - bannerAd.style.realHeight;
            if (callback)
                callback("load", bannerAd);
        });
        bannerAd.onError(function (err) {
            //加载失败
            console.log("wxsdk onError code:" + err.code + " msg:" + err.msg);
            Global.bannerAdLoadCount += 1;
            if (Global.bannerAdLoadCount < 4) {
                _this.loadBannerAd(callback);
            }
            if (callback)
                callback("error");
        });
    };
    WxSdk.prototype.showBannerAd = function () {
        var _this = this;
        console.log("Wxsdk 显示banner广告", Global.bannerAd);
        if (Global.bannerAd) {
            Global.bannerAd.show();
        }
        else {
            console.log("Wxsdk 不存在banner资源....");
            this.loadBannerAd(function (v, ad) {
                if (v == "load") {
                    _this.showBannerAd();
                }
            });
        }
    };
    WxSdk.prototype.hideBannerAd = function () {
        if (Global.bannerAd) {
            Global.bannerAd.hide();
            // Global.bannerAd = null;
        }
    };
    WxSdk.prototype.loadVideoAd = function (callback) {
        var _this = this;
        console.log("============wxsdk.loadVideoAD");
        // if (!Global.videoAd ) { //如果没有广告资源就加载新的视频广告
        var videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-5214efbe348a768c'
        });
        this.hideBannerAd();
        videoAd.load().then(function () { videoAd.show(); });
        videoAd.onError(function (err) {
            //加载失败
            Global.videoAdLoadCount += 1;
            //尝试4次
            if (Global.videoAdLoadCount < 4) {
                _this.loadVideoAd(callback);
            }
            if (callback)
                callback("error");
        });
        videoAd.onClose(function (ret) {
            //播放结束
            console.log("wxsdk onClose...");
            if (callback)
                callback("close", ret.isEnded);
            Global.videoAd = null;
        });
        videoAd.onLoad(function () {
            //加载成功
            console.log("wxsdk onLoad");
            Global.videoAd = videoAd;
            Global.videoAdLoadCount = 0;
            _this.showBannerAd();
            if (callback)
                callback("load", videoAd);
        });
    };
    return WxSdk;
}());
exports.wxsdk = new WxSdk();

cc._RF.pop();