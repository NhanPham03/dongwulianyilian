
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/sdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcc2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTREO0FBQzVELDZDQUEyQztBQUUzQztJQUFBO0lBT0EsQ0FBQztJQUxVLGNBQU8sR0FBRSxTQUFTLENBQUE7SUFDbEIsZUFBUSxHQUFFLFNBQVMsQ0FBQTtJQUVuQix1QkFBZ0IsR0FBRSxDQUFDLENBQUEsQ0FBQyxVQUFVO0lBQzlCLHdCQUFpQixHQUFFLENBQUMsQ0FBQSxDQUFDLGNBQWM7SUFDOUMsYUFBQztDQVBELEFBT0MsSUFBQTtBQUNEO0lBQUE7SUE0WUEsQ0FBQztJQW5ZRyxzQkFBVyxzQkFBRzthQUFkLGNBQTJCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2xELG9CQUFJLEdBQUo7UUFDSSxJQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNiLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQ3hCO2dCQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUJBQVMsR0FBVCxVQUFVLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTTtRQUU1QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDNUIsT0FBTyxFQUFFLFVBQVMsR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUUsTUFBTSxHQUFFLFFBQVEsRUFBRyxHQUFHLENBQUMsSUFB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LENBQUMsTUFBTSxFQUFHLE9BQU8sQ0FBQyxDQUFBO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVMLFlBQUM7QUFBRCxDQTVZQSxBQTRZQyxJQUFBO0FBRVUsUUFBQSxLQUFLLEdBQVMsSUFBSSxLQUFLLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV2ZW50IH0gZnJvbSBcIi4uL3BsdWdpbl9ib29zdHMvdXRpbHMvRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4vR2FtZUNvbmZpZ3NcIjtcblxuY2xhc3MgR2xvYmFsXG57XG4gICAgc3RhdGljIHZpZGVvQWQ9IHVuZGVmaW5lZFxuICAgIHN0YXRpYyBiYW5uZXJBZD0gdW5kZWZpbmVkXG5cbiAgICBzdGF0aWMgdmlkZW9BZExvYWRDb3VudD0gMCAvL+inhumikeW5v+WRiuWKoOi9veasoeaVsFxuICAgIHN0YXRpYyBiYW5uZXJBZExvYWRDb3VudD0gMCAvL2Jhbm5lcuW5v+WRiuWKoOi9veasoeaVsFxufVxuY2xhc3MgV3hTZGsge1xuICAgIFxuICAgIF91c2VySW5mbzogYW55O1xuICAgIF9wYXJlbnRJZDogYW55O1xuICAgIF9zaGFyZUNvbmZpZzogYW55O1xuICAgIF9kYjphbnk7XG4gICAgX3ZlcnNpb246IG51bWJlcjtcbiAgICBfc3lzdGVtSW5mbzphbnk7XG5cbiAgICBwdWJsaWMgZ2V0IFZlcigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdmVyc2lvbjsgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmKGcuaXN3eGdhbWUoKSkge1xuICAgICAgICAgICAgaWYodGhpcy5fdmVyc2lvbiA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N5c3RlbUluZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgICAgIGxldCB2ZXIgPSB0aGlzLl9zeXN0ZW1JbmZvLlNES1ZlcnNpb24ucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHBhcnNlSW50KHZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXF1ZXN0REIodGJuYW1lLGNhbGxiYWNrLHRhcmdldClcbiAgICB7XG4gICAgICAgIHRoaXMuX2RiLmNvbGxlY3Rpb24odGJuYW1lKS5nZXQoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldCBcIisgdGJuYW1lICtcIiBzdWNjOlwiICwgcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5fc2hhcmVDb25maWcgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjayljYWxsYmFjay5jYWxsKHRhcmdldCxyZXMuZGF0YSk7XG4gICAgICAgICAgICB9LCBmYWlsOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IFwiKyB0Ym5hbWUgK1wiIGZhaWw6XCIpXG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Q29uZmlnKGNhbGxiYWNrKVxuICAgIHtcbiAgICAgICAgdGhpcy5fZGIuY29sbGVjdGlvbihcInRfY29uZlwiKS5nZXQoe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldCBjb25maWdzIHN1Y2M6XCIgLCByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAvLyBzZWxmLl9zaGFyZUNvbmZpZyA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKWNhbGxiYWNrKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH0sIGZhaWw6IChyZXMpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXQgY29uZmlncyBmYWlsOlwiICwgcmVzKVxuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RTaGFyZUNvbnRlbnQoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZih0aGlzLl9zaGFyZUNvbmZpZyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9kYi5jb2xsZWN0aW9uKFwidF9zaGFyZVwiKS5nZXQoe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2hhcmUgY29uZmlncyBzdWNjOlwiICwgcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3NoYXJlQ29uZmlnID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSByZXMuZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IHJlcy5kYXRhW2cucmFuZG9tSW50KDAsIGxlbildO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spY2FsbGJhY2soaW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhudWxsKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFpbDogKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzaGFyZSBjb25maWdzIGZhaWw6XCIgLCByZXMpXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhudWxsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMuX3NoYXJlQ29uZmlnLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5fc2hhcmVDb25maWdbZy5yYW5kb21JbnQoMCwgbGVuKV07XG4gICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2soaW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTaGFyZUNvbnRlbnRTeW5jKClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMuX3NoYXJlQ29uZmlnICYmIHRoaXMuX3NoYXJlQ29uZmlnLmxlbmd0aCA+IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLl9zaGFyZUNvbmZpZy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuX3NoYXJlQ29uZmlnW2cucmFuZG9tSW50KDAsIGxlbildO1xuICAgICAgICAgICAgcmV0dXJuIGluZm9cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlOkdhbWVDb25maWcuZGVmYXVsdF9zaGFyZV90aXRsZSxpbWFnZVVybDpjYy51cmwucmF3KEdhbWVDb25maWcuZGVhZnVsdF9zaGFyZV9pbWdVcmwpfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2hhcmVDb250ZW50KHRpdGxlPyk6UHJvbWlzZTx7dGl0bGU6c3RyaW5nLGltYWdlVXJsOnN0cmluZyxxdWVyeT86c3RyaW5nLHN1Y2Nlc3M/OihyZXM6YW55KT0+dm9pZH0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFNoYXJlQ29udGVudChpbmZvPT57XG4gICAgICAgICAgICAgICAgaWYoaW5mbylcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbmZvKVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWplY3QoXCJzaGFyZSBjb25maWcgZ2V0IGZhaWxlZCFcIilcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldD0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8IEdhbWVDb25maWcuZGVmYXVsdF9zaGFyZV90aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBjYy51cmwucmF3KEdhbWVDb25maWcuZGVhZnVsdF9zaGFyZV9pbWdVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1hZ2VVcmw6IFwiaHR0cHM6Ly83NDY1LXRlcy0zMTNmNTYtMTI1NzYzMDE4MC50Y2IucWNsb3VkLmxhL3NoYXJlL3h1YW5jaHVhbl8xLnBuZz9zaWduPTY1MTMwNmRkY2Q5ZGQyZjI0ZWExNGQyNGUxZGFkYzBlJnQ9MTUzNzAyNDU1OFwiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIG9wZW5TaGFyZSh0aXRsZT8gLHV1aWQ/LGV4dHJhID0gXCJcIikge1xuICAgICAgICBpZighZy5pc3d4Z2FtZSgpKSByZXR1cm47XG4gICAgICAgIGxldCBpbmZvID0gYXdhaXQgdGhpcy5nZXRTaGFyZUNvbnRlbnQodGl0bGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmZvKTtcbiAgICAgICAgaWYoaW5mbyAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBpZih0aGlzLl91c2VySW5mbyAmJiB0aGlzLl91c2VySW5mby5vcGVuSWQpXG4gICAgICAgICAgICB1dWlkID0gdXVpZCB8fCAodGhpcy5fdXNlckluZm8gJiZ0aGlzLl91c2VySW5mby5vcGVuSWQpIHx8IDBcbiAgICAgICAgICAgIGluZm8ucXVlcnkgPSBcInNoYXJlX2lkPVwiK3V1aWQgKyBcIiZ0aW1lPVwiKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIFwiJlwiICtleHRyYTtcbiAgICAgICAgICAgIC8vIGluZm8uY2FsbGJhY2sgPSByZXQ9PntcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKFwiPT4+Pj4+Pj5zaGFyZTpcIiAscmV0KTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlbiBTaGFyZVwiLGluZm8ucXVlcnkpXG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2UoaW5mbyk7XG4gICAgICAgICAgICAvLyB0aGlzLnJlY29yZFNoYXJlKFNoYXJlLkdBTUUsIHV1aWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b24oY2FsbGJhY2ssIHg/LCB5Pywgd2lkdGg/LCBoZWlnaHQ/KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLWNyZWF0ZUJ1dHRvblwiKTtcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHd4LmNyZWF0ZVVzZXJJbmZvQnV0dG9uKHtcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgdGV4dDpcIiAgICAgXCIsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHg6IHggfHwgMCwgeTogeSB8fCAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCB8fCBjYy53aW5TaXplLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0IHx8IGNjLndpblNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6NDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOicjMDAwMDAwMDAnLFxuICAgICAgICAgICAgICAgIGNvbG9yOicjZmZmZmZmJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYnV0dG9uLm9uVGFwKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICBidXR0b24uZGVzdHJveSgpO1xuICAgICAgICAgICAgaWYocmVzICYmIHJlcy51c2VySW5mbykge1xuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHVzZXJJbmZvKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VySW5mby51c2VySW5mbztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFVzZXJJbmZvKGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLWdldFVzZXJJbmZvXCIpO1xuICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICBsYW5nOiBcInpoX0NOXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0VXNlckluZm8gc3VjY2Vzcy5cIiwgcmVzKTtcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH0sIGZhaWw6IChyZXMpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRVc2VySW5mbzpcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IG51bGxcbiAgICAgICAgfSk7ICAgICAgICAgXG4gICAgfVxuXG4gICAgb2xkQXV0aFVzZXIoY2FsbGJhY2spIHtcbiAgICAgICAgd3guYXV0aG9yaXplKHtcbiAgICAgICAgICAgIHNjb3BlOiBcInNjb3BlLnVzZXJJbmZvXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICAgICAgfSwgZmFpbDogKHJlcyk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhmYWxzZSk7XG4gICAgICAgICAgICB9LCBjb21wbGV0ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhdXRoVXNlckluZm8oY2FsbGJhY2spIHtcblxuICAgICAgICB0aGlzLnd4TG9naW4oKGlzTG9naW4pPT57XG4gICAgICAgICAgICBpZighaXNMb2dpbikgcmV0dXJuO1xuICAgICAgICAgICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1dGggPSByZXMuYXV0aFNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmKGF1dGhbXCJzY29wZS51c2VySW5mb1wiXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjYWxsYmFjaykgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0sIGZhaWw6IG51bGwsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBzaG93U2hhcmVNZW51KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcyk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgfSxmYWlsOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICB9LGNvbXBsZXRlOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBzZWxmLmdldFNoYXJlQ29udGVudFN5bmMoKTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgd3hMb2dpbihjYWxsYmFjaykge1xuICAgICAgICB3eC5sb2dpbih7XG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29kZSBcIiwgcmVzLmNvZGUpO1xuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgIH0sIGZhaWw6IChyZXMpPT57XG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgICAgICAgIH0sIGNvbXBsZXRlOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBsb2dpblRvU2VydmVyKHVzZXJJbmZvKSB7XG4gICAgICAgIGlmKHVzZXJJbmZvPT1udWxsKSB1c2VySW5mbz17fTtcbiAgICAgICAgdGhpcy5fdXNlckluZm8gPSB1c2VySW5mbztcbiAgICAgICAgdXNlckluZm8ucGFyZW50SWQgPSB0aGlzLl9wYXJlbnRJZDtcbiAgICAgICAgdGhpcy5zaG93U2hhcmVNZW51KCk7XG4gICAgICAgIGV2ZW50LmVtaXQoXCJ3eGxvZ2luXCIpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9naW4oeD8sIHk/LCB3aWR0aD8sIGhlaWdodD8pe1xuICAgICAgICBpZighZy5pc3d4Z2FtZSgpKXJldHVyblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LmNsb3VkLmluaXQoe3RyYWNlVXNlcjogdHJ1ZX0pO1xuICAgICAgICAvLyB0aGlzLl9kYiA9IHd4LmNsb3VkLmRhdGFiYXNlKHtlbnY6IFwicmVsZWFzZS0yYzg3YzRcIn0pOy8v5rWL6K+V546v5aKDXG4gICAgICAgIHRoaXMuX2RiID0gd3guY2xvdWQuZGF0YWJhc2UoKTtcblxuICAgICAgICBzZWxmLmF1dGhVc2VySW5mbygoaXNBdXRoKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5fdXNlckluZm8gPT0gbnVsbCB8fCBcbiAgICAgICAgICAgICAgICBzZWxmLl91c2VySW5mby51c2VySW5mbyA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmLl92ZXJzaW9uID49IDIyMCAmJiAhaXNBdXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlQnV0dG9uKCh1c2VySW5mbyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Ub1NlcnZlcih1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc0F1dGgpeyBzZWxmLm9sZEF1dGhVc2VyKChpc0F1dGgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpc0F1dGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFVzZXJJbmZvKCh1c2VySW5mbyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpblRvU2VydmVyKHVzZXJJbmZvKTsgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Ugc2VsZi5sb2dpblRvU2VydmVyKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KX0gZWxzZSBzZWxmLmdldFVzZXJJbmZvKCh1c2VySW5mbyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Ub1NlcnZlcih1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBhcmVudCgpIHtcbiAgICAgICAgaWYoIWcuaXN3eGdhbWUoKSkgcmV0dXJuIFwiXCJcbiAgICAgICAgbGV0IGluZm8gPSB3eC5nZXRMYXVuY2hPcHRpb25zU3luYygpO1xuICAgICAgICBpZihpbmZvLnNjZW5lID09IDEwMDcgfHwgaW5mby5zY2VuZSA9PSAxMDA4KSB7Ly/pgJrov4fliIbkuqvov5vlhaXmuLjmiI9cbiAgICAgICAgICAgIGxldCBvcGVuSWQgPSBpbmZvLnF1ZXJ5W1widXNlcl9pZFwiXTtcbiAgICAgICAgICAgIHJldHVybiBvcGVuSWRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjsgLy/pu5jorqRcbiAgICB9XG5cbiAgICAvL+WPkemAgea2iOaBr+WIsOWtkOWfn1xuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShjbWQsIGRhdGE/KSB7XG4gICAgICAgIGlmKGcuaXN3eGdhbWUoKSkge1xuICAgICAgICAgICAgd3guZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGNtZDogY21kLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwbG9hZFNjb3JlKHNjb3JlLGNhbGxiYWNrPylcbiAgICB7XG4gICAgICAgIHZhciBrdkRhdGFMaXN0PW5ldyBBcnJheSgpO1xuICAgICAgICBrdkRhdGFMaXN0LnB1c2goe1xuICAgICAgICAgICAga2V5Olwic2NvcmVcIixcbiAgICAgICAgICAgIHZhbHVlOnNjb3JlK1wiXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgIEtWRGF0YUxpc3Q6a3ZEYXRhTGlzdCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKGQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDpmdW5jdGlvbigpe30sXG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe30sXG4gICAgICAgIH1cbiAgICAgICAgd3guc2V0VXNlckNsb3VkU3RvcmFnZShvYmopXG4gICAgICAgIC8vIFwid3hnYW1lXCI6IHtcbiAgICAgICAgLy8gICAgIFwic2NvcmVcIjogMTYsXG4gICAgICAgIC8vICAgICBcInVwZGF0ZV90aW1lXCI6IDE1MTMwODA1NzNcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gXCJjb3N0X21zXCI6IDM2NTAwXG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRCYW5uZXJBZChjYWxsYmFjaz8pe1xuICAgICAgICBpZihHbG9iYWwuYmFubmVyQWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEdsb2JhbC5iYW5uZXJBZC5kZXN0cm95KClcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5fc3lzdGVtSW5mbylcbiAgICAgICAgICAgIHRoaXMuX3N5c3RlbUluZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICBsZXQgYmFubmVyQWQgPSB3eC5jcmVhdGVCYW5uZXJBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogJ2FkdW5pdC1mZTNjMDc0YWQ4NmQxYjU5JyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICB0b3A6IDAsLy9jYy52aXNpYmxlUmVjdC5oZWlnaHRcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5fc3lzdGVtSW5mby53aW5kb3dXaWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBiYW5uZXJBZC5vbkxvYWQoKCk9PntcbiAgICAgICAgICAgIEdsb2JhbC5iYW5uZXJBZCA9IGJhbm5lckFkO1xuICAgICAgICAgICAgR2xvYmFsLmJhbm5lckFkTG9hZENvdW50ID0gMDtcbiAgICAgICAgICAgIGJhbm5lckFkLnN0eWxlLmxlZnQgPSB0aGlzLl9zeXN0ZW1JbmZvLndpbmRvd1dpZHRoLzIgLSBiYW5uZXJBZC5zdHlsZS5yZWFsV2lkdGgvMjtcbiAgICAgICAgICAgIGJhbm5lckFkLnN0eWxlLnRvcCA9IHRoaXMuX3N5c3RlbUluZm8ud2luZG93SGVpZ2h0IC0gYmFubmVyQWQuc3R5bGUucmVhbEhlaWdodDtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhcImxvYWRcIiAsYmFubmVyQWQpXG4gICAgICAgIH0pXG4gICAgICAgIGJhbm5lckFkLm9uRXJyb3IoKGVycikgPT57XG4gICAgICAgICAgICAvL+WKoOi9veWksei0pVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eHNkayBvbkVycm9yIGNvZGU6XCIgKyBlcnIuY29kZSArIFwiIG1zZzpcIiArIGVyci5tc2cpO1xuICAgICAgICAgICAgR2xvYmFsLmJhbm5lckFkTG9hZENvdW50ICs9IDE7XG4gICAgICAgICAgICBpZiAoR2xvYmFsLmJhbm5lckFkTG9hZENvdW50IDwgNCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEJhbm5lckFkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhcImVycm9yXCIpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QmFubmVyQWQoKTogYW55IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXeHNkayDmmL7npLpiYW5uZXLlub/lkYpcIixHbG9iYWwuYmFubmVyQWQpXG4gICAgICAgIGlmIChHbG9iYWwuYmFubmVyQWQpIHtcbiAgICAgICAgICAgIEdsb2JhbC5iYW5uZXJBZC5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIld4c2RrIOS4jeWtmOWcqGJhbm5lcui1hOa6kC4uLi5cIik7XG4gICAgICAgICAgICB0aGlzLmxvYWRCYW5uZXJBZCgodixhZCk9PntcbiAgICAgICAgICAgICAgICBpZih2PT1cImxvYWRcIilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Jhbm5lckFkKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVCYW5uZXJBZCgpIHtcbiAgICAgICAgaWYgKEdsb2JhbC5iYW5uZXJBZCkge1xuICAgICAgICAgICAgR2xvYmFsLmJhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgICAgIC8vIEdsb2JhbC5iYW5uZXJBZCA9IG51bGw7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgbG9hZFZpZGVvQWQoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT13eHNkay5sb2FkVmlkZW9BRFwiKTtcbiAgICAgICAgLy8gaWYgKCFHbG9iYWwudmlkZW9BZCApIHsgLy/lpoLmnpzmsqHmnInlub/lkYrotYTmupDlsLHliqDovb3mlrDnmoTop4bpopHlub/lkYpcbiAgICAgICAgbGV0IHZpZGVvQWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtNTIxNGVmYmUzNDhhNzY4YydcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5oaWRlQmFubmVyQWQoKTtcbiAgICAgICAgdmlkZW9BZC5sb2FkKCkudGhlbigoKT0+e3ZpZGVvQWQuc2hvdygpO30pO1xuICAgICAgICB2aWRlb0FkLm9uRXJyb3IoZXJyPT4ge1xuICAgICAgICAgICAgLy/liqDovb3lpLHotKVcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkTG9hZENvdW50ICs9IDE7XG4gICAgICAgICAgICAvL+WwneivlTTmrKFcbiAgICAgICAgICAgIGlmIChHbG9iYWwudmlkZW9BZExvYWRDb3VudCA8IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRWaWRlb0FkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhcImVycm9yXCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZpZGVvQWQub25DbG9zZShmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgICAvL+aSreaUvue7k+adn1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eHNkayBvbkNsb3NlLi4uXCIpO1xuICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKFwiY2xvc2VcIixyZXQuaXNFbmRlZClcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlkZW9BZC5vbkxvYWQoKCk9PntcbiAgICAgICAgICAgIC8v5Yqg6L295oiQ5YqfXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInd4c2RrIG9uTG9hZFwiKTtcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkID0gdmlkZW9BZDtcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkTG9hZENvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Jhbm5lckFkKCk7XG4gICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2soXCJsb2FkXCIgLCB2aWRlb0FkKVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGxldCB3eHNkazpXeFNkayA9IG5ldyBXeFNkaygpOyJdfQ==