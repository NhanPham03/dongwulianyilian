"use strict";
cc._RF.push(module, '1f843kK46NKi6g8v7uZN6EC', 'MoreGameManager');
// framework/wxsdk/MoreGameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var MoreGameComponent_1 = require("./MoreGameComponent");
var GameConfigs_1 = require("./GameConfigs");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Task = /** @class */ (function () {
    function Task(id) {
        this.isRunning = false;
        this.cd = 0;
        this.max_cd = 0;
        this.id = id;
    }
    Task.prototype.start = function () {
        this.isRunning = true;
    };
    Task.prototype.finish = function () {
        this.isRunning = false;
        this.cd = this.max_cd;
    };
    return Task;
}());
exports.Task = Task;
var MoreGameManager = /** @class */ (function (_super) {
    __extends(MoreGameManager, _super);
    function MoreGameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.recommendComps = [];
        _this.gameList = [];
        _this.tasks = [];
        _this.frames = {};
        return _this;
    }
    MoreGameManager_1 = MoreGameManager;
    Object.defineProperty(MoreGameManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = cc.find("Canvas").addComponent(MoreGameManager_1);
            }
            return this._instance;
        },
        set: function (k) {
            this._instance = k;
        },
        enumerable: false,
        configurable: true
    });
    /**
        content:"射了个球"
        extra:""
        icon:"https://111.231.94.213/game/gameres/recommend/game_01/icon.jpg"
        id:1
        image:"https://111.231.94.213/game/gameres/recommend/game_01/qr.png"
        title:"射了个球"
        wx_appid:"wxcd56cd0a66199638"
        launch:""
    */
    MoreGameManager.prototype.getSpriteFrame = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var frame;
            var _this = this;
            return __generator(this, function (_a) {
                frame = this.frames[url];
                if (frame == null) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // url = "https://cs-op.douyucdn.cn/douyu/2018/02/09/8a0dd8f98a3fa07c9543800173408477.png"
                            console.log("[MoreGameManager] request image:" + url);
                            cc.loader.load({ url: url, type: 'png' }, function (err, texture) {
                                if (texture) {
                                    frame = new cc.SpriteFrame(texture);
                                    _this.addSpriteFrame(url, frame);
                                    // this.node.getComponent(cc.Sprite).spriteFrame=frame;
                                    resolve(frame);
                                }
                                else {
                                    reject();
                                }
                            });
                        })];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(frame); })];
            });
        });
    };
    MoreGameManager.prototype.addSpriteFrame = function (url, frame) {
        this.frames[url] = frame;
        return frame;
    };
    MoreGameManager.prototype.onLoad = function () {
        MoreGameManager_1.instance = this;
    };
    //tasks
    MoreGameManager.prototype.getTasks = function (priority_min, count) {
        var todo = [];
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            if (task.gameConfig.priority && task.gameConfig.priority > priority_min) {
                if (task.cd == 0) {
                    todo.push(task);
                    this.tasks.splice(i, 1);
                    i--;
                }
            }
            if (todo.length >= count)
                break;
        }
        if (todo.length < count) {
            // 任务不足，直接用cd中的任务补充
            //request from cd tasks 
            for (var i = 0; i < this.tasks.length; i++) {
                var task = this.tasks[i];
                if (todo.indexOf(task) == -1) {
                    todo.push(task);
                    this.tasks.splice(i, 1);
                    i--;
                }
            }
        }
        g.extendArray(this.tasks, todo);
        return todo;
    };
    MoreGameManager.prototype.finishTasks = function (list) {
        for (var i = 0; i < list.length; i++) {
            var task = list[i];
            if (task) {
                task.finish();
            }
        }
    };
    MoreGameManager.prototype.startTasks = function (list) {
        for (var i = 0; i < list.length; i++) {
            var task = list[i];
            if (task) {
                task.start();
            }
        }
    };
    MoreGameManager.prototype.createTasks = function () {
        for (var i = 0; i < this.gameList.length; i++) {
            var task = new Task(i);
            task.gameConfig = this.gameList[i];
            task.gameConfig.priority = task.gameConfig.priority || 100;
            // 10 最小cd 时长 
            task.max_cd = 100 / task.gameConfig.priority * 10;
            this.tasks.push(task);
        }
    };
    MoreGameManager.prototype.addList = function (list) {
        if (list == null)
            return;
        if (Array.isArray(list)) {
            this.gameList.splice(0, this.gameList.length);
            g.extendArray(this.gameList, list);
        }
        else {
            this.gameList.push(list);
        }
        //sort by priority 
        this.gameList.sort(function (a, b) {
            if (!a.priority)
                return 1;
            if (!b.priority)
                return 0;
            return b.priority - a.priority;
        });
        //create tasks
        this.createTasks();
        for (var i = 0; i < this.recommendComps.length; i++) {
            var element = this.recommendComps[i];
            element.requestTask();
        }
    };
    MoreGameManager.prototype.updateFinishedTask = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            //cd 中的任务
            if (task.cd > 0) {
                task.cd = Math.max(0, task.cd - 1);
            }
        }
    };
    /**
     * appId	string		是	要打开的小程序 appId
        path	string		否	打开的页面路径，如果为空则打开首页
        extraData	object		否	需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
        envVersion	string	release	否	要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
        success	function		否	接口调用成功的回调函数
        fail	function		否	接口调用失败的回调函数
        complete	function		否	接口调用结束的回调函数（调用成功、失败都会执行）
        object.envVersion 的合法值

        envVersion >>--------------------
        develop	开发版
        trial	体验版
        release	正式版
     */
    MoreGameManager.prototype.clickGame = function (gamecfg) {
        console.log("打开小程序...");
        wx.navigateToMiniProgram({
            appId: gamecfg.wx_appid,
            extraData: {
                wx_appid: GameConfigs_1.GameConfig.wx_appid,
            },
            envVersion: "release",
            success: function (res) {
                console.log("打开小程序成功 :" + gamecfg.wx_appid);
                // 跳转通知服务器
            },
            fail: function (res) {
                //打开失败
                console.log("打开小程序失败 :" + gamecfg.wx_appid);
            }
        });
        // 打开详情 或者直接打开
        //cfg.image  
    };
    MoreGameManager.prototype.onEnable = function () {
        this.schedule(this.updateFinishedTask, 1, cc.macro.REPEAT_FOREVER);
    };
    MoreGameManager.prototype.onDisable = function () {
        this.unschedule(this.updateFinishedTask);
    };
    MoreGameManager.prototype.start = function () {
        // let gameList  = [
        //     {
        //         content:"射了个球",
        //         extra:"",
        //         icon:"https://111.231.94.213/game/gameres/recommend/game_01/icon.jpg",
        //         id:1,
        //         image:"https://111.231.94.213/game/gameres/recommend/game_01/qr.png",
        //         title:"射了个球",
        //         wx_appid:"wxcd56cd0a66199638",
        //         priority: 99,
        //     }
        // ]
        // let test = JSON.parse('{"priority":100,"title":"水果泡泡龙","extra":"empty","icon":"https://7265-release-2c87c4-1258399463.tcb.qcloud.la/pplicon.png?sign=43116a5ecfead6e614c52b9818cb15ec\u0026t=1547972497","image":"https://7265-release-2c87c4-1258399463.tcb.qcloud.la/qrcode (2).jpg?sign=43edc51f924e8a4e969e71c5e0753adf\u0026t=1547972423","wx_appid":"wxdbacbba2d0277152"}')
        // gameList.push(test);
        // this.addList(gameList)
    };
    var MoreGameManager_1;
    __decorate([
        property([MoreGameComponent_1.default])
    ], MoreGameManager.prototype, "recommendComps", void 0);
    MoreGameManager = MoreGameManager_1 = __decorate([
        ccclass
    ], MoreGameManager);
    return MoreGameManager;
}(cc.Component));
exports.default = MoreGameManager;

cc._RF.pop();