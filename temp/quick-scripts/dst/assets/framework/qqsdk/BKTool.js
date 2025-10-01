
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/qqsdk/BKTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '313f56eFUNNW6GE0RObNSkH', 'BKTool');
// framework/qqsdk/BKTool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.PUIN = "2896237320";
    Global.headUrl = "";
    Global.nickName = "";
    Global.videoAd = undefined;
    Global.bannerAd = undefined;
    Global.videoAdLoadCount = 0; //视频广告加载次数
    Global.viewAdLoadCount = 0;
    Global.bannerAdLoadCount = 0; //banner广告加载次数
    return Global;
}());
// GameStatusInfo.src 其他取值
// 场景值（src）	场景描述	期望体验
// 100	AIO面板点击开始游戏	进入游戏大厅
// 108	AIO面板点击大面板小房子按钮	进入游戏大厅
// 110	AIO消息流文字识别	进入游戏大厅
// 202	热聊folder中点击进入游戏按钮	进入游戏大厅
// 207	旧版玩一玩WEB页面启动游戏	进入游戏大厅
// 208	新版玩一玩WEB页面启动游戏	进入游戏大厅
// 209	厘米城WEB页面启动游戏	进入游戏大厅
// 220	扫描二维码打开游戏	进入游戏大厅
// 200	点击AIO游戏邀请消息	"判断roomid若可加入则直接加入游戏不可加入相应提示后打开大厅"
// 204	在微信点击游戏邀请后打开手Q后启动游戏	同200
// 203	同200	将在手Q7.6.0后废弃
// 201	点击AIO游戏分享消息	根据拓展数据做相应处理
var BKTool = /** @class */ (function () {
    function BKTool() {
    }
    // static BKGet(url, callback, custom) {
    //     let httpUtil = new BK.HttpUtil(url);
    //     httpUtil.setHttpMethod("get");
    //     httpUtil.custom = custom;
    //     //绑定回调对象
    //     httpUtil.requestAsync(callback.bind(httpUtil));
    // }
    /**
     * 跳转到其他游戏
     * @param {Number} gameId
     */
    BKTool.skipGame = function (gameId) {
        BK.QQ.skipGame(gameId, "IJPay");
    };
    /**
     * 判断手Q版本
     * @param {String} ver1 7.9.0.3820 当前版本
     * @param {String} ver2 7.8.5 指定版本
     */
    BKTool.versionCompare = function (ver1, ver2) {
        ver1 = parseInt(ver1.replace(/\./g, "").substring(0, 3));
        ver2 = parseInt(ver2.replace(/\./g, "").substring(0, 3));
        if (ver1 >= ver2) {
            return true;
        }
        else {
            return false;
        }
    };
    BKTool.shareToArk = function () {
        BK.Share.share({
            qqImgUrl: 'http://hudong.qq.com/docs/engine/img/848B76B5530AA7EE7B38E9A1267D7086.png',
            isToFriend: true,
            summary: '单渠道分享-By Javen',
            extendInfo: 'IJPay',
            success: function (succObj) {
                console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
            },
            fail: function (failObj) {
                console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
            },
            complete: function () {
                console.log('分享完成，不论成功失败');
            }
        });
    };
    BKTool.share = function (callback) {
        BK.Share.share({
            qqImgUrl: 'http://hudong.qq.com/docs/engine/img/848B76B5530AA7EE7B38E9A1267D7086.png',
            socialPicPath: 'GameRes://qrcode.png',
            title: '测试轻游戏',
            summary: '多渠道分享-By Javen',
            extendInfo: 'IJPay',
            // isToFriend:"false",
            success: function (succObj) {
                //{"reqCode":1,"ret":0,"gameId":3603,"aioType":1,"shareTo":0,"isFirstTimeShare":0}
                //ret成功：0；失败：1；取消：2
                //shareTo 分享渠道：QQ：0；QZone：1；微信：2；朋友圈：3
                console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
                if (succObj.data.ret == 0) {
                    callback && callback("success", succObj.data);
                }
                else {
                    callback && callback("fail", succObj.data);
                }
            },
            fail: function (failObj) {
                console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
                callback && callback("fail");
            },
            complete: function () {
                console.log('分享完成，不论成功失败');
            }
        });
    };
    BKTool.shareLink = function () {
        BK.Share.share({
            qqImgUrl: 'http://hudong.qq.com/docs/engine/img/848B76B5530AA7EE7B38E9A1267D7086.png',
            msgUrl: 'https://gitee.com/javen205/Brickengine_Guide?',
            title: '测试轻游戏',
            summary: 'H5链接分享-By Javen',
        });
    };
    BKTool.screenShotShare = function () {
        //实际像素
        var pixelSize = BK.Director.screenPixelSize;
        var pWidth = pixelSize.width;
        var pWheight = pixelSize.height;
        BK.Share.share({
            range: {
                x: pWidth / 2,
                y: pWheight / 2,
                width: pWidth,
                height: pWheight
            },
            qqImgUrl: "",
            title: '测试轻游戏',
            summary: "截图分享-By Javen",
            extendInfo: 'IJPay',
            success: function (succObj) {
                console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
            },
            fail: function (failObj) {
                console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
            },
            complete: function () {
                console.log('分享完成,不论成功失败');
            }
        });
    };
    BKTool.follow = function () {
        console.log("Global.PUIN>" + Global.PUIN);
        BK.QQ.enterPubAccountCard(Global.PUIN);
    };
    BKTool.getNick = function () {
        return Global.nickName;
    };
    BKTool.createShortCut = function () {
        var extendInfo = ""; //扩展字段
        BK.QQ.createShortCut(extendInfo);
    };
    BKTool.getHead = function () {
        return Global.headUrl;
    };
    /**
        打开一个网页
    */
    BKTool.prototype.openUrl = function (url) {
        BK.MQQ.Webview.open(url);
    };
    /**
* 存储游戏个人私有数据
* @param data 要存储的数据.
*/
    BKTool.prototype.saveGameData = function (data) {
        // 存储游戏个人私有数据
        // var data = {
        //     maxScore: 100,              // 一个历史最高积分
        //     // 不同游戏模式下存的数据，列表来的，可以根据自身需求使用，这里面的数据，后台不做任何处理，怎么来怎么回
        //     modeDatas:[
        //         {       // 字段都是自己定义的，后台不做任何处理
        //             maxScore: 1,
        //             mode: 1,
        //         },
        //         {       // 字段都是自己定义的，后台不做任何处理
        //             maxScore: 2,
        //             mode: 2,
        //         },
        //     ],
        // }
        return new Promise(function (resolve) {
            // 保存个人数据
            BK.QQ.saveGameData(data, function (errCode, cmd, data) {
                BK.Console.log(1, 1, 'saveGameData : ' + errCode + ', ' + cmd + ', ' + data);
                resolve({ errCode: errCode, cmd: cmd, data: data });
            });
        });
    };
    /**
    * 拉取游戏个人私有数据
    */
    BKTool.prototype.loadGameData = function () {
        return new Promise(function (resolve) {
            BK.QQ.loadGameData(function (errCode, cmd, data) {
                // 这里返回的 data，就是上面存储游戏个人私有数据时候传入的 data
                BK.Console.log(1, 1, 'loadGameData : ' + errCode + ', ' + cmd + ', ' + data);
                resolve({ errCode: errCode, cmd: cmd, data: data });
            });
        });
    };
    /**
  * 派发红包
  * @param {string} extendInfo 扩展的信息..
  */
    BKTool.prototype.sendB2CRedPacket = function (extendInfo) {
        return new Promise(function (resolve) {
            // var extendInfo = "xxxxxxx";
            BK.QQ.sendB2CRedPacket(extendInfo, function (errCode, cmd, data) {
                BK.Script.log(1, 1, 'sendB2CRedPacket : ' + errCode + ', ' + cmd + ', ' + JSON.stringify(data));
                if (errCode == 0) {
                    //派发成功
                }
                else {
                    //派发失败
                }
                resolve({ errCode: errCode, cmd: cmd, data: data });
            });
        });
    };
    BKTool.login = function () {
        BK.MQQ.Account.getHead(GameStatusInfo.openId, function (openId, imgPath) {
            // resolve(imgPath)
            Global.headUrl = imgPath;
        });
        BK.MQQ.Account.getNick(GameStatusInfo.openId, function (openId, nickName) {
            Global.nickName = nickName;
        });
    };
    BKTool.test = function () {
        // BK.QQ.fetchOpenKey(function (errCode, cmd, data) {
        // 	console.log("[fetchOpenKey]",errCode, cmd, data)
        //     if (errCode == 0) {
        //          var openKey = data.openKey;
        //      }
        // });
        var openId = GameStatusInfo.openId;
        console.log("openId:", openId);
        var systemInfo = BK.getSystemInfoSync();
        BK.Console.log('游戏版本号:' + systemInfo.gameVersion);
        BK.Console.log('是否房主:' + systemInfo.isMaster); //使用厘米秀房间时才有效
        BK.Console.log('房间号:' + systemInfo.roomId); //使用厘米秀房间时才有效
        BK.Console.log('系统版本:' + systemInfo.osVersion);
        BK.Console.log('网络类型:' + systemInfo.networkType);
        BK.Console.log('平台:' + systemInfo.platform);
        BK.Console.log('当前用户的标识:' + systemInfo.openId);
        BK.Console.log('手机qq版本:' + systemInfo.QQVer);
        BK.Console.log('是否首次安装:' + systemInfo.isFirstInstall);
        BK.Console.log('当前聊天窗类型:' + systemInfo.aioType);
        BK.Console.log('游戏启动入口:' + systemInfo.src);
        BK.Console.log('是否为管理账号:' + systemInfo.isWhiteUser);
        BK.Console.log('游戏类型:' + systemInfo.gameType);
        BK.Console.log('具体机型:' + systemInfo.model);
        BK.Console.log('性别:' + systemInfo.sex);
    };
    /**
     * 成绩上报
     * @param {*} level
     * @param {*} callback
     */
    BKTool.uploadScore = function (score, callback) {
        var data = {
            userData: [{
                    openId: GameStatusInfo.openId,
                    startMs: (new Date().getTime() - 60 * 5 * 1000).toString(),
                    endMs: ((new Date()).getTime()).toString(),
                    scoreInfo: {
                        score: score,
                    },
                },],
            attr: {
                score: {
                    type: 'rank',
                    order: 1,
                }
            },
        };
        BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
            console.log("-------------uploadScoreWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
            if (callback) {
                callback(errCode, data);
            }
        });
    };
    /**
     * 拉取排行榜数据
     * @param {*} callback [code,list]
     */
    BKTool.getRankList = function (callback) {
        var attr = "score";
        var order = 1; //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
        var rankType = 0; //要查询的排行榜类型，0: 好友排行榜
        BK.QQ.getRankListWithoutRoom(attr, order, rankType, function (errCode, cmd, data) {
            console.log("--------------------getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode);
            if (errCode != 0) {
                callback && callback(errCode);
                return;
            }
            if (data) {
                var rankList = data.data.ranking_list;
                console.log("=====data not null " + rankList.length);
                //{"data":{"ranking_list":["nick":"Damon Ren","score":304,"selfFlag":1,"url":"","seqId":0]}}
                console.log(JSON.stringify(data));
                if (callback) {
                    callback(errCode, rankList);
                }
            }
        });
    };
    /**
     * //展示广告 Global.videoAd.show();
     * 预加载视频广告
     */
    BKTool.loadVideoAd = function (callback) {
        console.log("============BKTOOl.loadVideoAD", Global.videoAd);
        // if (!Global.videoAd ) { //如果没有广告资源就加载新的视频广告
        var videoAd = BK.Advertisement.createVideoAd();
        videoAd.onError(function (err) {
            //加载失败
            console.log(">>>>>>>>>BKTools onError code:" + err.code + " msg:" + err.msg);
            Global.viewAdLoadCount += 1;
            //尝试4次
            if (Global.viewAdLoadCount < 4) {
                BKTool.loadVideoAd(callback);
            }
            if (callback)
                callback("error");
        });
        videoAd.onPlayFinish(function () {
            //播放结束
            console.log("BKTools onPlayFinish...");
            Global.videoAd = undefined;
            if (callback)
                callback("finish");
        });
        videoAd.onClose(function () {
            //播放结束
            console.log("BKTools onClose...");
            if (callback)
                callback("close");
            Global.videoAd = undefined;
        });
        videoAd.onLoad(function () {
            //加载成功
            console.log("BKTools onLoad");
            Global.videoAd = videoAd;
            Global.videoAdLoadCount = 0;
            if (callback)
                callback("load", videoAd);
        });
    };
    //  else {
    //     console.log("BKTools 已存在广告资源 或者 非QQ玩一玩平台....");
    // }
    /**
     * //展示广告 Global.bannerAd.show();
     * 预加载banner广告
     * 1001静态banner，1002动态banner，1003 广点通banner(7.8.0)
     */
    BKTool.loadBannerAd = function (callback, viewId) {
        if (!viewId) {
            var qqVer = BK.getSystemInfoSync().QQVer;
            console.log("当前手Q版本:" + qqVer);
            var isBig = BKTool.versionCompare(qqVer, "7.8.5"); //如果大于7.8.5
            console.log("当前版本大于7.8.5:" + isBig);
            if (isBig) {
                viewId = 1003;
            }
            else {
                viewId = 1002;
            }
        }
        console.log("loadBannerAd viewId:" + viewId);
        var bannerAd = BK.Advertisement.createBannerAd({
            viewId: viewId,
        });
        bannerAd.onError(function (err) {
            //加载失败
            console.log("BKTools onError code:" + err.code + " msg:" + err.msg);
            Global.bannerAdLoadCount += 1;
            if (Global.bannerAdLoadCount < 4) {
                BKTool.loadBannerAd(callback, viewId);
            }
            if (callback)
                callback("error");
        });
        bannerAd.onLoad(function () {
            //加载成功
            console.log("BKTools onLoad");
            Global.bannerAd = bannerAd;
            Global.viewAdLoadCount = 0;
            if (callback)
                callback("load", bannerAd);
        });
    };
    BKTool.showBannerAd = function () {
        console.log("BKTools 显示banner广告");
        if (Global.bannerAd) {
            Global.bannerAd.show();
        }
        else {
            console.log("BKTools 不存在banner资源....");
            BKTool.loadBannerAd(function (v, ad) {
                if (v == "load") {
                    BKTool.showBannerAd();
                }
            });
        }
    };
    BKTool.hideBannerAd = function () {
        if (Global.bannerAd) {
            Global.bannerAd.hide();
            Global.bannerAd = undefined;
        }
        else {
            console.log("BKTools 不存在banner资源无法关闭....");
        }
    };
    BKTool.showToast = function (title, duration) {
        if (!duration) {
            duration = 3000;
        }
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            BK.UI.showToast({
                title: title,
                duration: duration,
                complete: function () {
                    console.log("BKTools showToast complete:" + title);
                }
            });
        }
    };
    /**
     * 开启屏幕常亮
     */
    BKTool.keepScreenOn = function () {
        BK.Device.keepScreenOn({
            isKeepOn: true
        });
    };
    /**
     * 取消屏幕常亮
     */
    BKTool.cancelKeepScreenOn = function () {
        BK.Device.keepScreenOn({
            isKeepOn: false
        });
    };
    return BKTool;
}());
exports.default = BKTool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxxcXNka1xcQktUb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBWUEsQ0FBQztJQVZVLFdBQUksR0FBRSxZQUFZLENBQUE7SUFFbEIsY0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNaLGVBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxjQUFPLEdBQUUsU0FBUyxDQUFBO0lBQ2xCLGVBQVEsR0FBRSxTQUFTLENBQUE7SUFFbkIsdUJBQWdCLEdBQUUsQ0FBQyxDQUFBLENBQUMsVUFBVTtJQUM5QixzQkFBZSxHQUFHLENBQUMsQ0FBQTtJQUNuQix3QkFBaUIsR0FBRSxDQUFDLENBQUEsQ0FBQyxjQUFjO0lBQzlDLGFBQUM7Q0FaRCxBQVlDLElBQUE7QUFDRCwwQkFBMEI7QUFDMUIscUJBQXFCO0FBQ3JCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLCtCQUErQjtBQUMvQiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDBCQUEwQjtBQUMxQix1QkFBdUI7QUFDdkIscURBQXFEO0FBQ3JELCtCQUErQjtBQUMvQix3QkFBd0I7QUFDeEIsOEJBQThCO0FBRTlCO0lBQUE7SUFnY0EsQ0FBQztJQTdiRyx3Q0FBd0M7SUFDeEMsMkNBQTJDO0lBQzNDLHFDQUFxQztJQUNyQyxnQ0FBZ0M7SUFDaEMsZUFBZTtJQUNmLHNEQUFzRDtJQUN0RCxJQUFJO0lBRUo7OztPQUdHO0lBQ0ksZUFBUSxHQUFmLFVBQWdCLE1BQU07UUFDbEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRDs7OztPQUlHO0lBQ0kscUJBQWMsR0FBckIsVUFBc0IsSUFBSSxFQUFFLElBQUk7UUFDNUIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxT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QUFPLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFL0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUduQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGtCQUFXLEdBQWxCLFVBQW1CLEtBQUssRUFBRSxRQUFTO1FBQy9CLElBQUksSUFBSSxHQUFHO1lB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QUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDdkQsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0ksbUJBQVksR0FBbkI7UUFDSSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNuQixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Q7O09BRUc7SUFDSSx5QkFBa0IsR0FBekI7UUFDSSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNuQixRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUwsYUFBQztBQUFELENBaGNBLEFBZ2NDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBHbG9iYWxcbntcbiAgICBzdGF0aWMgUFVJTj0gXCIyODk2MjM3MzIwXCJcblxuICAgIHN0YXRpYyBoZWFkVXJsID0gXCJcIlxuICAgIHN0YXRpYyBuaWNrTmFtZSA9IFwiXCI7XG4gICAgc3RhdGljIHZpZGVvQWQ9IHVuZGVmaW5lZFxuICAgIHN0YXRpYyBiYW5uZXJBZD0gdW5kZWZpbmVkXG5cbiAgICBzdGF0aWMgdmlkZW9BZExvYWRDb3VudD0gMCAvL+inhumikeW5v+WRiuWKoOi9veasoeaVsFxuICAgIHN0YXRpYyB2aWV3QWRMb2FkQ291bnQgPSAwIFxuICAgIHN0YXRpYyBiYW5uZXJBZExvYWRDb3VudD0gMCAvL2Jhbm5lcuW5v+WRiuWKoOi9veasoeaVsFxufVxuLy8gR2FtZVN0YXR1c0luZm8uc3JjIOWFtuS7luWPluWAvFxuLy8g5Zy65pmv5YC877yIc3Jj77yJXHTlnLrmma/mj4/ov7BcdOacn+acm+S9k+mqjFxuLy8gMTAwXHRBSU/pnaLmnb/ngrnlh7vlvIDlp4vmuLjmiI9cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMTA4XHRBSU/pnaLmnb/ngrnlh7vlpKfpnaLmnb/lsI/miL/lrZDmjInpkq5cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMTEwXHRBSU/mtojmga/mtYHmloflrZfor4bliKtcdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMjAyXHTng63ogYpmb2xkZXLkuK3ngrnlh7vov5vlhaXmuLjmiI/mjInpkq5cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMjA3XHTml6fniYjnjqnkuIDnjqlXRULpobXpnaLlkK/liqjmuLjmiI9cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMjA4XHTmlrDniYjnjqnkuIDnjqlXRULpobXpnaLlkK/liqjmuLjmiI9cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMjA5XHTljpjnsbPln45XRULpobXpnaLlkK/liqjmuLjmiI9cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMjIwXHTmiavmj4/kuoznu7TnoIHmiZPlvIDmuLjmiI9cdOi/m+WFpea4uOaIj+Wkp+WOhVxuLy8gMjAwXHTngrnlh7tBSU/muLjmiI/pgoDor7fmtojmga9cdFwi5Yik5patcm9vbWlk6Iul5Y+v5Yqg5YWl5YiZ55u05o6l5Yqg5YWl5ri45oiP5LiN5Y+v5Yqg5YWl55u45bqU5o+Q56S65ZCO5omT5byA5aSn5Y6FXCJcbi8vIDIwNFx05Zyo5b6u5L+h54K55Ye75ri45oiP6YKA6K+35ZCO5omT5byA5omLUeWQjuWQr+WKqOa4uOaIj1x05ZCMMjAwXG4vLyAyMDNcdOWQjDIwMFx05bCG5Zyo5omLUTcuNi4w5ZCO5bqf5byDXG4vLyAyMDFcdOeCueWHu0FJT+a4uOaIj+WIhuS6q+a2iOaBr1x05qC55o2u5ouT5bGV5pWw5o2u5YGa55u45bqU5aSE55CGXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJLVG9vbFxue1xuXG4gICAgLy8gc3RhdGljIEJLR2V0KHVybCwgY2FsbGJhY2ssIGN1c3RvbSkge1xuICAgIC8vICAgICBsZXQgaHR0cFV0aWwgPSBuZXcgQksuSHR0cFV0aWwodXJsKTtcbiAgICAvLyAgICAgaHR0cFV0aWwuc2V0SHR0cE1ldGhvZChcImdldFwiKTtcbiAgICAvLyAgICAgaHR0cFV0aWwuY3VzdG9tID0gY3VzdG9tO1xuICAgIC8vICAgICAvL+e7keWumuWbnuiwg+WvueixoVxuICAgIC8vICAgICBodHRwVXRpbC5yZXF1ZXN0QXN5bmMoY2FsbGJhY2suYmluZChodHRwVXRpbCkpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOi3s+i9rOWIsOWFtuS7lua4uOaIj1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBnYW1lSWQgXG4gICAgICovXG4gICAgc3RhdGljIHNraXBHYW1lKGdhbWVJZCkge1xuICAgICAgICBCSy5RUS5za2lwR2FtZShnYW1lSWQsIFwiSUpQYXlcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIpOaWreaJi1HniYjmnKxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmVyMSA3LjkuMC4zODIwIOW9k+WJjeeJiOacrFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2ZXIyIDcuOC41IOaMh+WumueJiOacrFxuICAgICAqL1xuICAgIHN0YXRpYyB2ZXJzaW9uQ29tcGFyZSh2ZXIxLCB2ZXIyKSB7XG4gICAgICAgIHZlcjEgPSBwYXJzZUludCh2ZXIxLnJlcGxhY2UoL1xcLi9nLCBcIlwiKS5zdWJzdHJpbmcoMCwgMykpO1xuICAgICAgICB2ZXIyID0gcGFyc2VJbnQodmVyMi5yZXBsYWNlKC9cXC4vZywgXCJcIikuc3Vic3RyaW5nKDAsIDMpKTtcbiAgICAgICAgaWYgKHZlcjEgPj0gdmVyMikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2hhcmVUb0FyaygpIHtcbiAgICAgICAgQksuU2hhcmUuc2hhcmUoe1xuICAgICAgICAgICAgcXFJbWdVcmw6ICdodHRwOi8vaHVkb25nLnFxLmNvbS9kb2NzL2VuZ2luZS9pbWcvODQ4Qjc2QjU1MzBBQTdFRTdCMzhFOUExMjY3RDcwODYucG5nJyxcbiAgICAgICAgICAgIGlzVG9GcmllbmQ6IHRydWUsXG4gICAgICAgICAgICBzdW1tYXJ5OiAn5Y2V5rig6YGT5YiG5LqrLUJ5IEphdmVuJyxcbiAgICAgICAgICAgIGV4dGVuZEluZm86ICdJSlBheScsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoc3VjY09iaikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliIbkuqvmiJDlip8nLCBzdWNjT2JqLmNvZGUsIEpTT04uc3RyaW5naWZ5KHN1Y2NPYmouZGF0YSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChmYWlsT2JqKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WIhuS6q+Wksei0pScsIGZhaWxPYmouY29kZSwgSlNPTi5zdHJpbmdpZnkoZmFpbE9iai5tc2cpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliIbkuqvlrozmiJDvvIxcYuS4jeiuuuaIkOWKn+Wksei0pScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hhcmUoY2FsbGJhY2spIHtcbiAgICAgICAgQksuU2hhcmUuc2hhcmUoe1xuICAgICAgICAgICAgcXFJbWdVcmw6ICdodHRwOi8vaHVkb25nLnFxLmNvbS9kb2NzL2VuZ2luZS9pbWcvODQ4Qjc2QjU1MzBBQTdFRTdCMzhFOUExMjY3RDcwODYucG5nJyxcbiAgICAgICAgICAgIHNvY2lhbFBpY1BhdGg6ICdHYW1lUmVzOi8vcXJjb2RlLnBuZycsXG4gICAgICAgICAgICB0aXRsZTogJ+a1i+ivlei9u+a4uOaIjycsXG4gICAgICAgICAgICBzdW1tYXJ5OiAn5aSa5rig6YGT5YiG5LqrLUJ5IEphdmVuJyxcbiAgICAgICAgICAgIGV4dGVuZEluZm86ICdJSlBheScsXG4gICAgICAgICAgICAvLyBpc1RvRnJpZW5kOlwiZmFsc2VcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChzdWNjT2JqKSB7XG4gICAgICAgICAgICAgICAgLy97XCJyZXFDb2RlXCI6MSxcInJldFwiOjAsXCJnYW1lSWRcIjozNjAzLFwiYWlvVHlwZVwiOjEsXCJzaGFyZVRvXCI6MCxcImlzRmlyc3RUaW1lU2hhcmVcIjowfVxuICAgICAgICAgICAgICAgIC8vcmV05oiQ5Yqf77yaMO+8m+Wksei0pe+8mjHvvJvlj5bmtojvvJoyXG4gICAgICAgICAgICAgICAgLy9zaGFyZVRvIOWIhuS6q+a4oOmBk++8mlFR77yaMO+8m1Fab25l77yaMe+8m+W+ruS/oe+8mjLvvJvmnIvlj4vlnIjvvJozXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WIhuS6q+aIkOWKnycsIHN1Y2NPYmouY29kZSwgSlNPTi5zdHJpbmdpZnkoc3VjY09iai5kYXRhKSk7XG4gICAgICAgICAgICAgICAgaWYoc3VjY09iai5kYXRhLnJldCA9PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soXCJzdWNjZXNzXCIsc3VjY09iai5kYXRhKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soXCJmYWlsXCIsc3VjY09iai5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGZhaWxPYmopIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5aSx6LSlJywgZmFpbE9iai5jb2RlLCBKU09OLnN0cmluZ2lmeShmYWlsT2JqLm1zZykpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKFwiZmFpbFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliIbkuqvlrozmiJDvvIxcYuS4jeiuuuaIkOWKn+Wksei0pScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hhcmVMaW5rKCkge1xuICAgICAgICBCSy5TaGFyZS5zaGFyZSh7XG4gICAgICAgICAgICBxcUltZ1VybDogJ2h0dHA6Ly9odWRvbmcucXEuY29tL2RvY3MvZW5naW5lL2ltZy84NDhCNzZCNTUzMEFBN0VFN0IzOEU5QTEyNjdENzA4Ni5wbmcnLFxuICAgICAgICAgICAgbXNnVXJsOiAnaHR0cHM6Ly9naXRlZS5jb20vamF2ZW4yMDUvQnJpY2tlbmdpbmVfR3VpZGU/JywgLy/kuI3liqDpl67lj7fliIbkuqvnmoTpk77mjqXml6Dms5Xnm7TmjqXorr/pl65cbiAgICAgICAgICAgIHRpdGxlOiAn5rWL6K+V6L275ri45oiPJyxcbiAgICAgICAgICAgIHN1bW1hcnk6ICdINemTvuaOpeWIhuS6qy1CeSBKYXZlbicsXG4gICAgICAgICAgICAvL+WIhuS6q+WHuuWOu+eahOmTvuaOpeS4ulxuICAgICAgICAgICAgLy9odHRwczovL2dpdGVlLmNvbS9qYXZlbjIwNS9Ccmlja2VuZ2luZV9HdWlkZT8mZ2FtZUlkPea4uOaIj0lEJnJvb21JZD3miL/pl7RJRCZnYW1lVmVyc2lvbj3muLjmiI/niYjmnKzlj7cmdWluPVFR5Y+356CBXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzY3JlZW5TaG90U2hhcmUoKSB7XG4gICAgICAgIC8v5a6e6ZmF5YOP57SgXG4gICAgICAgIHZhciBwaXhlbFNpemUgPSBCSy5EaXJlY3Rvci5zY3JlZW5QaXhlbFNpemU7XG4gICAgICAgIHZhciBwV2lkdGggPSBwaXhlbFNpemUud2lkdGg7XG4gICAgICAgIHZhciBwV2hlaWdodCA9IHBpeGVsU2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgQksuU2hhcmUuc2hhcmUoe1xuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICB4OiBwV2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHk6IHBXaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICB3aWR0aDogcFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogcFdoZWlnaHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxcUltZ1VybDpcIlwiLC8vIOWIhuS6q+WIsFFR55qE5Zu+54mH572R57uc6ZO+5o6l77yM5b+F6YCJ77yM5LuF5pSv5oyB572R57uc6ZO+5o6lXG4gICAgICAgICAgICB0aXRsZTogJ+a1i+ivlei9u+a4uOaIjycsXG4gICAgICAgICAgICBzdW1tYXJ5OiBcIuaIquWbvuWIhuS6qy1CeSBKYXZlblwiLFxuICAgICAgICAgICAgZXh0ZW5kSW5mbzogJ0lKUGF5JyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChzdWNjT2JqKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WIhuS6q+aIkOWKnycsIHN1Y2NPYmouY29kZSwgSlNPTi5zdHJpbmdpZnkoc3VjY09iai5kYXRhKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGZhaWxPYmopIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5aSx6LSlJywgZmFpbE9iai5jb2RlLCBKU09OLnN0cmluZ2lmeShmYWlsT2JqLm1zZykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WIhuS6q+WujOaIkCzkuI3orrrmiJDlip/lpLHotKUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvbGxvdygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHbG9iYWwuUFVJTj5cIiArIEdsb2JhbC5QVUlOKTtcbiAgICAgICAgQksuUVEuZW50ZXJQdWJBY2NvdW50Q2FyZChHbG9iYWwuUFVJTik7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5pY2soKSB7XG4gICAgICAgIHJldHVybiBHbG9iYWwubmlja05hbWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVNob3J0Q3V0KClcbiAgICB7XG4gICAgICAgIHZhciBleHRlbmRJbmZvID0gXCJcIjsvL+aJqeWxleWtl+autVxuICAgICAgICBCSy5RUS5jcmVhdGVTaG9ydEN1dChleHRlbmRJbmZvKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGdldEhlYWQoKXtcbiAgICBcdHJldHVybiBHbG9iYWwuaGVhZFVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICBcdOaJk+W8gOS4gOS4que9kemhtVxuICAgICovXG4gICAgb3BlblVybCh1cmwpe1xuICAgIFx0QksuTVFRLldlYnZpZXcub3Blbih1cmwpO1xuICAgIH1cblxuICAgICAgICAvKipcbiAgICAqIOWtmOWCqOa4uOaIj+S4quS6uuengeacieaVsOaNrlxuICAgICogQHBhcmFtIGRhdGEg6KaB5a2Y5YKo55qE5pWw5o2uLlxuICAgICovXG4gICAgc2F2ZUdhbWVEYXRhKGRhdGEpe1xuICAgICAgICAvLyDlrZjlgqjmuLjmiI/kuKrkurrnp4HmnInmlbDmja5cbiAgICAgICAgLy8gdmFyIGRhdGEgPSB7XG4gICAgICAgIC8vICAgICBtYXhTY29yZTogMTAwLCAgICAgICAgICAgICAgLy8g5LiA5Liq5Y6G5Y+y5pyA6auY56ev5YiGXG4gICAgICAgIC8vICAgICAvLyDkuI3lkIzmuLjmiI/mqKHlvI/kuIvlrZjnmoTmlbDmja7vvIzliJfooajmnaXnmoTvvIzlj6/ku6XmoLnmja7oh6rouqvpnIDmsYLkvb/nlKjvvIzov5nph4zpnaLnmoTmlbDmja7vvIzlkI7lj7DkuI3lgZrku7vkvZXlpITnkIbvvIzmgI7kuYjmnaXmgI7kuYjlm55cbiAgICAgICAgLy8gICAgIG1vZGVEYXRhczpbXG4gICAgICAgIC8vICAgICAgICAgeyAgICAgICAvLyDlrZfmrrXpg73mmK/oh6rlt7HlrprkuYnnmoTvvIzlkI7lj7DkuI3lgZrku7vkvZXlpITnkIZcbiAgICAgICAgLy8gICAgICAgICAgICAgbWF4U2NvcmU6IDEsXG4gICAgICAgIC8vICAgICAgICAgICAgIG1vZGU6IDEsXG4gICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICB7ICAgICAgIC8vIOWtl+autemDveaYr+iHquW3seWumuS5ieeahO+8jOWQjuWPsOS4jeWBmuS7u+S9leWkhOeQhlxuICAgICAgICAvLyAgICAgICAgICAgICBtYXhTY29yZTogMixcbiAgICAgICAgLy8gICAgICAgICAgICAgbW9kZTogMixcbiAgICAgICAgLy8gICAgICAgICB9LFxuICAgICAgICAvLyAgICAgXSxcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgICAgICAvLyDkv53lrZjkuKrkurrmlbDmja5cbiAgICAgICAgICAgIEJLLlFRLnNhdmVHYW1lRGF0YShkYXRhLCAoZXJyQ29kZSwgY21kLCBkYXRhKT0+e1xuICAgICAgICAgICAgICAgIEJLLkNvbnNvbGUubG9nKDEsIDEsICdzYXZlR2FtZURhdGEgOiAnICsgZXJyQ29kZSArICcsICcgKyBjbWQgKyAnLCAnICsgZGF0YSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7ZXJyQ29kZTplcnJDb2RlLCBjbWQ6Y21kLCBkYXRhOmRhdGF9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog5ouJ5Y+W5ri45oiP5Liq5Lq656eB5pyJ5pWw5o2uXG4gICAgKi9cbiAgICBsb2FkR2FtZURhdGEoKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xuICAgICAgICAgICAgQksuUVEubG9hZEdhbWVEYXRhKChlcnJDb2RlLCBjbWQsIGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIC8vIOi/memHjOi/lOWbnueahCBkYXRh77yM5bCx5piv5LiK6Z2i5a2Y5YKo5ri45oiP5Liq5Lq656eB5pyJ5pWw5o2u5pe25YCZ5Lyg5YWl55qEIGRhdGFcbiAgICAgICAgICAgICAgICBCSy5Db25zb2xlLmxvZygxLCAxLCAnbG9hZEdhbWVEYXRhIDogJyArIGVyckNvZGUgKyAnLCAnICsgY21kICsgJywgJyArIGRhdGEpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe2VyckNvZGU6ZXJyQ29kZSwgY21kOmNtZCwgZGF0YTpkYXRhfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgICAgLyoqXG4gICAgKiDmtL7lj5HnuqLljIVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbmRJbmZvIOaJqeWxleeahOS/oeaBry4uXG4gICAgKi9cbiAgICBzZW5kQjJDUmVkUGFja2V0KGV4dGVuZEluZm8pe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgICAgICAvLyB2YXIgZXh0ZW5kSW5mbyA9IFwieHh4eHh4eFwiO1xuICAgICAgICAgICAgQksuUVEuc2VuZEIyQ1JlZFBhY2tldChleHRlbmRJbmZvLGZ1bmN0aW9uKGVyckNvZGUsIGNtZCwgZGF0YSl7XG4gICAgICAgICAgICAgICAgQksuU2NyaXB0LmxvZygxLCAxLCAnc2VuZEIyQ1JlZFBhY2tldCA6ICcgKyBlcnJDb2RlICsgJywgJyArIGNtZCArICcsICcgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgaWYoZXJyQ29kZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgLy/mtL7lj5HmiJDlip9cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy/mtL7lj5HlpLHotKVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHtlcnJDb2RlOmVyckNvZGUsIGNtZDpjbWQsIGRhdGE6ZGF0YX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2dpbigpXG4gICAge1xuICAgICAgICBCSy5NUVEuQWNjb3VudC5nZXRIZWFkKEdhbWVTdGF0dXNJbmZvLm9wZW5JZCwob3BlbklkLCBpbWdQYXRoKT0+IHtcbiAgICAgICAgICAgIC8vIHJlc29sdmUoaW1nUGF0aClcbiAgICAgICAgICAgIEdsb2JhbC5oZWFkVXJsID0gaW1nUGF0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIEJLLk1RUS5BY2NvdW50LmdldE5pY2soR2FtZVN0YXR1c0luZm8ub3BlbklkLCAob3BlbklkLG5pY2tOYW1lKT0+e1xuICAgICAgICAgICAgR2xvYmFsLm5pY2tOYW1lID0gbmlja05hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0ZXN0KCl7XG5cdFx0Ly8gQksuUVEuZmV0Y2hPcGVuS2V5KGZ1bmN0aW9uIChlcnJDb2RlLCBjbWQsIGRhdGEpIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwiW2ZldGNoT3BlbktleV1cIixlcnJDb2RlLCBjbWQsIGRhdGEpXG5cdFx0Ly8gICAgIGlmIChlcnJDb2RlID09IDApIHtcblx0XHQvLyAgICAgICAgICB2YXIgb3BlbktleSA9IGRhdGEub3BlbktleTtcblx0XHQvLyAgICAgIH1cblx0XHQvLyB9KTtcblx0XHR2YXIgb3BlbklkID0gR2FtZVN0YXR1c0luZm8ub3BlbklkO1xuXHRcdGNvbnNvbGUubG9nKFwib3BlbklkOlwiLG9wZW5JZCk7XG4gICAgXHR2YXIgc3lzdGVtSW5mbyA9IEJLLmdldFN5c3RlbUluZm9TeW5jKCk7XG5cblx0XHRCSy5Db25zb2xlLmxvZygn5ri45oiP54mI5pys5Y+3Oicrc3lzdGVtSW5mby5nYW1lVmVyc2lvbik7XG5cdFx0QksuQ29uc29sZS5sb2coJ+aYr+WQpuaIv+S4uzonK3N5c3RlbUluZm8uaXNNYXN0ZXIpOyAgIC8v5L2/55So5Y6Y57Gz56eA5oi/6Ze05pe25omN5pyJ5pWIXG5cdFx0QksuQ29uc29sZS5sb2coJ+aIv+mXtOWPtzonK3N5c3RlbUluZm8ucm9vbUlkKTsgLy/kvb/nlKjljpjnsbPnp4DmiL/pl7Tml7bmiY3mnInmlYhcblx0XHRCSy5Db25zb2xlLmxvZygn57O757uf54mI5pysOicrc3lzdGVtSW5mby5vc1ZlcnNpb24pO1xuXHRcdEJLLkNvbnNvbGUubG9nKCfnvZHnu5znsbvlnos6JytzeXN0ZW1JbmZvLm5ldHdvcmtUeXBlKTtcblxuXHRcdEJLLkNvbnNvbGUubG9nKCflubPlj7A6JytzeXN0ZW1JbmZvLnBsYXRmb3JtKTtcblx0XHRCSy5Db25zb2xlLmxvZygn5b2T5YmN55So5oi355qE5qCH6K+GOicrc3lzdGVtSW5mby5vcGVuSWQpO1xuXHRcdEJLLkNvbnNvbGUubG9nKCfmiYvmnLpxceeJiOacrDonK3N5c3RlbUluZm8uUVFWZXIpO1xuXG5cdFx0QksuQ29uc29sZS5sb2coJ+aYr+WQpummluasoeWuieijhTonK3N5c3RlbUluZm8uaXNGaXJzdEluc3RhbGwpO1xuXHRcdEJLLkNvbnNvbGUubG9nKCflvZPliY3ogYrlpKnnqpfnsbvlnos6JytzeXN0ZW1JbmZvLmFpb1R5cGUpO1xuXHRcdEJLLkNvbnNvbGUubG9nKCfmuLjmiI/lkK/liqjlhaXlj6M6JytzeXN0ZW1JbmZvLnNyYyk7XG5cdFx0QksuQ29uc29sZS5sb2coJ+aYr+WQpuS4uueuoeeQhui0puWPtzonK3N5c3RlbUluZm8uaXNXaGl0ZVVzZXIpO1xuXHRcdEJLLkNvbnNvbGUubG9nKCfmuLjmiI/nsbvlnos6JytzeXN0ZW1JbmZvLmdhbWVUeXBlKTtcblx0XHRCSy5Db25zb2xlLmxvZygn5YW35L2T5py65Z6LOicrc3lzdGVtSW5mby5tb2RlbCk7XG5cdFx0QksuQ29uc29sZS5sb2coJ+aAp+WIqzonK3N5c3RlbUluZm8uc2V4KTtcblxuICAgIFx0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oiQ57up5LiK5oqlXG4gICAgICogQHBhcmFtIHsqfSBsZXZlbCBcbiAgICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrIFxuICAgICAqL1xuICAgIHN0YXRpYyB1cGxvYWRTY29yZShzY29yZSwgY2FsbGJhY2s/KSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdXNlckRhdGE6IFt7XG4gICAgICAgICAgICAgICAgb3BlbklkOiBHYW1lU3RhdHVzSW5mby5vcGVuSWQsXG4gICAgICAgICAgICAgICAgc3RhcnRNczogKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gNjAgKiA1ICogMTAwMCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBlbmRNczogKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgc2NvcmVJbmZvOiB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSwgXSxcbiAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICBzY29yZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncmFuaycsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiAxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIEJLLlFRLnVwbG9hZFNjb3JlV2l0aG91dFJvb20oMSwgZGF0YSwgZnVuY3Rpb24gKGVyckNvZGUsIGNtZCwgZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tdXBsb2FkU2NvcmVXaXRob3V0Um9vbSBjYWxsYmFjayAgY21kXCIgKyBjbWQgKyBcIiBlcnJDb2RlOlwiICsgZXJyQ29kZSArIFwiICBkYXRhOlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyQ29kZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmi4nlj5bmjpLooYzmppzmlbDmja5cbiAgICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrIFtjb2RlLGxpc3RdXG4gICAgICovXG4gICAgc3RhdGljIGdldFJhbmtMaXN0KGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBhdHRyID0gXCJzY29yZVwiO1xuICAgICAgICBsZXQgb3JkZXIgPSAxOyAvL+aOkuW6j+eahOaWueazle+8mlsgMTog5LuO5aSn5Yiw5bCPKOWNleWxgCnvvIwyOiDku47lsI/liLDlpKco5Y2V5bGAKe+8jDM6IOeUseWkp+WIsOWwjyjntK/np68pXVxuICAgICAgICBsZXQgcmFua1R5cGUgPSAwOy8v6KaB5p+l6K+i55qE5o6S6KGM5qac57G75Z6L77yMMDog5aW95Y+L5o6S6KGM5qacXG4gICAgICAgIEJLLlFRLmdldFJhbmtMaXN0V2l0aG91dFJvb20oYXR0ciwgb3JkZXIsIHJhbmtUeXBlLCBmdW5jdGlvbiAoZXJyQ29kZSwgY21kLCBkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tZ2V0UmFua0xpc3RXaXRob3V0Um9vbSBjYWxsYmFjayAgY21kXCIgKyBjbWQgKyBcIiBlcnJDb2RlOlwiICsgZXJyQ29kZSk7XG4gICAgICAgICAgICBpZiAoZXJyQ29kZSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZXJyQ29kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFua0xpc3QgPSBkYXRhLmRhdGEucmFua2luZ19saXN0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT1kYXRhIG5vdCBudWxsIFwiICsgcmFua0xpc3QubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvL3tcImRhdGFcIjp7XCJyYW5raW5nX2xpc3RcIjpbXCJuaWNrXCI6XCJEYW1vbiBSZW5cIixcInNjb3JlXCI6MzA0LFwic2VsZkZsYWdcIjoxLFwidXJsXCI6XCJcIixcInNlcUlkXCI6MF19fVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyQ29kZSwgcmFua0xpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIC8v5bGV56S65bm/5ZGKIEdsb2JhbC52aWRlb0FkLnNob3coKTtcbiAgICAgKiDpooTliqDovb3op4bpopHlub/lkYpcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZFZpZGVvQWQoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT1CS1RPT2wubG9hZFZpZGVvQURcIiAsIEdsb2JhbC52aWRlb0FkKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGlmICghR2xvYmFsLnZpZGVvQWQgKSB7IC8v5aaC5p6c5rKh5pyJ5bm/5ZGK6LWE5rqQ5bCx5Yqg6L295paw55qE6KeG6aKR5bm/5ZGKXG4gICAgICAgIGxldCB2aWRlb0FkID0gQksuQWR2ZXJ0aXNlbWVudC5jcmVhdGVWaWRlb0FkKCk7XG4gICAgICAgIHZpZGVvQWQub25FcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAvL+WKoOi9veWksei0pVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI+Pj4+Pj4+Pj5CS1Rvb2xzIG9uRXJyb3IgY29kZTpcIiArIGVyci5jb2RlICsgXCIgbXNnOlwiICsgZXJyLm1zZyk7XG4gICAgICAgICAgICBHbG9iYWwudmlld0FkTG9hZENvdW50ICs9IDE7XG4gICAgICAgICAgICAvL+WwneivlTTmrKFcbiAgICAgICAgICAgIGlmIChHbG9iYWwudmlld0FkTG9hZENvdW50IDwgNCkge1xuICAgICAgICAgICAgICAgIEJLVG9vbC5sb2FkVmlkZW9BZChjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2soXCJlcnJvclwiKVxuICAgICAgICB9KTtcblxuICAgICAgICB2aWRlb0FkLm9uUGxheUZpbmlzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL+aSreaUvue7k+adn1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCS1Rvb2xzIG9uUGxheUZpbmlzaC4uLlwiKTtcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKFwiZmluaXNoXCIpXG4gICAgICAgIH0pO1xuICAgICAgICB2aWRlb0FkLm9uQ2xvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy/mkq3mlL7nu5PmnZ9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQktUb29scyBvbkNsb3NlLi4uXCIpO1xuICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKFwiY2xvc2VcIilcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkID0gdW5kZWZpbmVkO1xuICAgICAgICB9KTtcblxuICAgICAgICB2aWRlb0FkLm9uTG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL+WKoOi9veaIkOWKn1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCS1Rvb2xzIG9uTG9hZFwiKTtcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkID0gdmlkZW9BZDtcbiAgICAgICAgICAgIEdsb2JhbC52aWRlb0FkTG9hZENvdW50ID0gMDtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhcImxvYWRcIiAsIHZpZGVvQWQpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgLy8gIGVsc2Uge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJCS1Rvb2xzIOW3suWtmOWcqOW5v+WRiui1hOa6kCDmiJbogIUg6Z2eUVHnjqnkuIDnjqnlubPlj7AuLi4uXCIpO1xuICAgICAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiAvL+WxleekuuW5v+WRiiBHbG9iYWwuYmFubmVyQWQuc2hvdygpO1xuICAgICAqIOmihOWKoOi9vWJhbm5lcuW5v+WRilxuICAgICAqIDEwMDHpnZnmgIFiYW5uZXLvvIwxMDAy5Yqo5oCBYmFubmVy77yMMTAwMyDlub/ngrnpgJpiYW5uZXIoNy44LjApXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRCYW5uZXJBZChjYWxsYmFjaz8sIHZpZXdJZD8pIHtcbiAgICAgICAgaWYgKCF2aWV3SWQpIHtcbiAgICAgICAgICAgIGxldCBxcVZlciA9IEJLLmdldFN5c3RlbUluZm9TeW5jKCkuUVFWZXI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeaJi1HniYjmnKw6XCIgKyBxcVZlcik7XG4gICAgICAgICAgICBsZXQgaXNCaWcgPSBCS1Rvb2wudmVyc2lvbkNvbXBhcmUocXFWZXIsIFwiNy44LjVcIik7IC8v5aaC5p6c5aSn5LqONy44LjVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN54mI5pys5aSn5LqONy44LjU6XCIgKyBpc0JpZyk7XG4gICAgICAgICAgICBpZiAoaXNCaWcpIHtcbiAgICAgICAgICAgICAgICB2aWV3SWQgPSAxMDAzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWV3SWQgPSAxMDAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZEJhbm5lckFkIHZpZXdJZDpcIiArIHZpZXdJZCk7XG4gICAgICAgIGxldCBiYW5uZXJBZCA9IEJLLkFkdmVydGlzZW1lbnQuY3JlYXRlQmFubmVyQWQoe1xuICAgICAgICAgICAgdmlld0lkOiB2aWV3SWQsXG4gICAgICAgIH0pO1xuICAgICAgICBiYW5uZXJBZC5vbkVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIC8v5Yqg6L295aSx6LSlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJLVG9vbHMgb25FcnJvciBjb2RlOlwiICsgZXJyLmNvZGUgKyBcIiBtc2c6XCIgKyBlcnIubXNnKTtcbiAgICAgICAgICAgIEdsb2JhbC5iYW5uZXJBZExvYWRDb3VudCArPSAxO1xuICAgICAgICAgICAgaWYgKEdsb2JhbC5iYW5uZXJBZExvYWRDb3VudCA8IDQpIHtcbiAgICAgICAgICAgICAgICBCS1Rvb2wubG9hZEJhbm5lckFkKGNhbGxiYWNrLHZpZXdJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2soXCJlcnJvclwiKVxuICAgICAgICB9KTtcbiAgICAgICAgYmFubmVyQWQub25Mb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8v5Yqg6L295oiQ5YqfXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJLVG9vbHMgb25Mb2FkXCIpO1xuICAgICAgICAgICAgR2xvYmFsLmJhbm5lckFkID0gYmFubmVyQWQ7XG4gICAgICAgICAgICBHbG9iYWwudmlld0FkTG9hZENvdW50ID0gMDtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhcImxvYWRcIiAsYmFubmVyQWQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93QmFubmVyQWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQktUb29scyDmmL7npLpiYW5uZXLlub/lkYpcIilcbiAgICAgICAgaWYgKEdsb2JhbC5iYW5uZXJBZCkge1xuICAgICAgICAgICAgR2xvYmFsLmJhbm5lckFkLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQktUb29scyDkuI3lrZjlnKhiYW5uZXLotYTmupAuLi4uXCIpO1xuICAgICAgICAgICAgQktUb29sLmxvYWRCYW5uZXJBZCgodixhZCk9PntcbiAgICAgICAgICAgICAgICBpZih2PT1cImxvYWRcIilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEJLVG9vbC5zaG93QmFubmVyQWQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGVCYW5uZXJBZCgpIHtcbiAgICAgICAgaWYgKEdsb2JhbC5iYW5uZXJBZCkge1xuICAgICAgICAgICAgR2xvYmFsLmJhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgICAgIEdsb2JhbC5iYW5uZXJBZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQktUb29scyDkuI3lrZjlnKhiYW5uZXLotYTmupDml6Dms5XlhbPpl60uLi4uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dUb2FzdCh0aXRsZSwgZHVyYXRpb24pIHtcbiAgICAgICAgaWYgKCFkdXJhdGlvbikge1xuICAgICAgICAgICAgZHVyYXRpb24gPSAzMDAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlFRX1BMQVkpIHtcbiAgICAgICAgICAgIEJLLlVJLnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJLVG9vbHMgc2hvd1RvYXN0IGNvbXBsZXRlOlwiICsgdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW8gOWQr+Wxj+W5leW4uOS6rlxuICAgICAqL1xuICAgIHN0YXRpYyBrZWVwU2NyZWVuT24oKSB7XG4gICAgICAgIEJLLkRldmljZS5rZWVwU2NyZWVuT24oe1xuICAgICAgICAgICAgaXNLZWVwT246IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPlua2iOWxj+W5leW4uOS6rlxuICAgICAqL1xuICAgIHN0YXRpYyBjYW5jZWxLZWVwU2NyZWVuT24oKSB7XG4gICAgICAgIEJLLkRldmljZS5rZWVwU2NyZWVuT24oe1xuICAgICAgICAgICAgaXNLZWVwT246IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19