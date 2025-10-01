
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/MoreGameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcTW9yZUdhbWVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELDZDQUEyQztBQUVyQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQU9JLGNBQVksRUFBRTtRQUhkLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsT0FBRSxHQUFZLENBQUMsQ0FBQztRQUNoQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBR2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELG9CQUFLLEdBQUw7UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQscUJBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBQ0wsV0FBQztBQUFELENBdEJBLEFBc0JDLElBQUE7QUF0Qlksb0JBQUk7QUF5QmpCO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBMlBDO1FBeFBHLG9CQUFjLEdBQXdCLEVBQUUsQ0FBQztRQWlCekMsY0FBUSxHQUFTLEVBQUUsQ0FBQTtRQUVuQixXQUFLLEdBQVUsRUFBRSxDQUFBO1FBRWpCLFlBQU0sR0FBbUMsRUFBRSxDQUFDOztJQW1PaEQsQ0FBQzt3QkEzUG9CLGVBQWU7SUFNaEMsc0JBQVcsMkJBQVE7YUFBbkI7WUFFSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUMxQjtnQkFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFlLENBQUMsQ0FBQzthQUNwRTtZQUNELE9B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UUFBUSxDQUFDLENBQUE7WUFDOUMsQ0FBQztTQUNKLENBQUMsQ0FBQTtRQUVGLGNBQWM7UUFDZCxhQUFhO0lBQ2pCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCwrQkFBSyxHQUFMO1FBRUksb0JBQW9CO1FBQ3BCLFFBQVE7UUFDUiwwQkFBMEI7UUFDMUIsb0JBQW9CO1FBQ3BCLGlGQUFpRjtRQUNqRixnQkFBZ0I7UUFDaEIsZ0ZBQWdGO1FBQ2hGLHdCQUF3QjtRQUN4Qix5Q0FBeUM7UUFDekMsd0JBQXdCO1FBQ3hCLFFBQVE7UUFDUixJQUFJO1FBQ0osb1hBQW9YO1FBQ3BYLHVCQUF1QjtRQUN2Qix5QkFBeUI7SUFDN0IsQ0FBQzs7SUF2UEQ7UUFEQyxRQUFRLENBQUMsQ0FBQywyQkFBaUIsQ0FBQyxDQUFDOzJEQUNXO0lBSHhCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0EyUG5DO0lBQUQsc0JBQUM7Q0EzUEQsQUEyUEMsQ0EzUDRDLEVBQUUsQ0FBQyxTQUFTLEdBMlB4RDtrQkEzUG9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9yZUdhbWVDb21wb25lbnQgZnJvbSBcIi4vTW9yZUdhbWVDb21wb25lbnRcIjtcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi9HYW1lQ29uZmlnc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IGNsYXNzIFRhc2tcbntcbiAgICBpZDpudW1iZXI7XG4gICAgZ2FtZUNvbmZpZzogYW55O1xuICAgIGlzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNkIDogbnVtYmVyID0gMDtcbiAgICBtYXhfY2QgOm51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3IoaWQpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgc3RhcnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIGZpbmlzaCgpXG4gICAge1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkID0gdGhpcy5tYXhfY2Q7XG4gICAgfVxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9yZUdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShbTW9yZUdhbWVDb21wb25lbnRdKVxuICAgIHJlY29tbWVuZENvbXBzIDpNb3JlR2FtZUNvbXBvbmVudFtdID0gW107XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TW9yZUdhbWVNYW5hZ2VyXG4gICAgc3RhdGljIGdldCBpbnN0YW5jZSgpOk1vcmVHYW1lTWFuYWdlciBcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IGNjLmZpbmQoXCJDYW52YXNcIikuYWRkQ29tcG9uZW50KE1vcmVHYW1lTWFuYWdlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgaW5zdGFuY2UoaylcbiAgICB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gaztcbiAgICB9XG5cbiAgICBnYW1lTGlzdDphbnlbXSA9IFtdXG5cbiAgICB0YXNrczpUYXNrW10gPSBbXVxuXG4gICAgZnJhbWVzOntbaW5kZXg6c3RyaW5nXTpjYy5TcHJpdGVGcmFtZX0gPSB7fTtcblxuICAgIC8qKlxuICAgICAgICBjb250ZW50Olwi5bCE5LqG5Liq55CDXCJcbiAgICAgICAgZXh0cmE6XCJcIlxuICAgICAgICBpY29uOlwiaHR0cHM6Ly8xMTEuMjMxLjk0LjIxMy9nYW1lL2dhbWVyZXMvcmVjb21tZW5kL2dhbWVfMDEvaWNvbi5qcGdcIlxuICAgICAgICBpZDoxXG4gICAgICAgIGltYWdlOlwiaHR0cHM6Ly8xMTEuMjMxLjk0LjIxMy9nYW1lL2dhbWVyZXMvcmVjb21tZW5kL2dhbWVfMDEvcXIucG5nXCJcbiAgICAgICAgdGl0bGU6XCLlsITkuobkuKrnkINcIlxuICAgICAgICB3eF9hcHBpZDpcInd4Y2Q1NmNkMGE2NjE5OTYzOFwiXG4gICAgICAgIGxhdW5jaDpcIlwiXG4gICAgKi9cbiAgICBhc3luYyBnZXRTcHJpdGVGcmFtZSh1cmw6c3RyaW5nKTpQcm9taXNlPGNjLlNwcml0ZUZyYW1lPlxuICAgIHtcbiAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbdXJsXVxuICAgICAgICBpZihmcmFtZSA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Y2MuU3ByaXRlRnJhbWU+KChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICAvLyB1cmwgPSBcImh0dHBzOi8vY3Mtb3AuZG91eXVjZG4uY24vZG91eXUvMjAxOC8wMi8wOS84YTBkZDhmOThhM2ZhMDdjOTU0MzgwMDE3MzQwODQ3Ny5wbmdcIlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW01vcmVHYW1lTWFuYWdlcl0gcmVxdWVzdCBpbWFnZTpcIiArIHVybClcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7dXJsOiB1cmwsIHR5cGU6ICdwbmcnfSwgKGVyciwgdGV4dHVyZSkgPT57XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZih0ZXh0dXJlKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU3ByaXRlRnJhbWUodXJsICxmcmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1mcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZnJhbWUpXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGNjLlNwcml0ZUZyYW1lPigocmVzb2x2ZSxyZWplY3QpPT5yZXNvbHZlKGZyYW1lKSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGFkZFNwcml0ZUZyYW1lKHVybDogc3RyaW5nLCBmcmFtZTogYW55KTogYW55IHtcbiAgICAgICAgdGhpcy5mcmFtZXNbdXJsXSA9IGZyYW1lO1xuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuXG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIE1vcmVHYW1lTWFuYWdlci5pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuXG4gICAgLy90YXNrc1xuICAgIGdldFRhc2tzKHByaW9yaXR5X21pbjogbnVtYmVyLGNvdW50Om51bWJlcik6IGFueSB7XG4gICAgICAgIGxldCB0b2RvID0gW11cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMudGFza3MubGVuZ3RoOyBpICsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMudGFza3NbaV1cbiAgICAgICAgICAgIGlmKHRhc2suZ2FtZUNvbmZpZy5wcmlvcml0eSAmJiB0YXNrLmdhbWVDb25maWcucHJpb3JpdHkgPiBwcmlvcml0eV9taW4pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYodGFzay5jZCA9PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kby5wdXNoKHRhc2spXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGksMSlcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2RvLmxlbmd0aCA+PSBjb3VudCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYodG9kby5sZW5ndGggPCBjb3VudClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8g5Lu75Yqh5LiN6Laz77yM55u05o6l55SoY2TkuK3nmoTku7vliqHooaXlhYVcbiAgICAgICAgICAgIC8vcmVxdWVzdCBmcm9tIGNkIHRhc2tzIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPHRoaXMudGFza3MubGVuZ3RoOyBpICsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy50YXNrc1tpXVxuICAgICAgICAgICAgICAgIGlmKHRvZG8uaW5kZXhPZih0YXNrKSA9PSAtMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRvZG8ucHVzaCh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaSwxKVxuICAgICAgICAgICAgICAgICAgICBpIC0tIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZy5leHRlbmRBcnJheSh0aGlzLnRhc2tzLHRvZG8pO1xuICAgICAgICByZXR1cm4gdG9kbztcbiAgICB9XG5cbiAgICBmaW5pc2hUYXNrcyhsaXN0OiBUYXNrW10pOiBhbnkge1xuICAgICAgICBmb3IodmFyIGkgPSAwIDtpIDwgbGlzdC5sZW5ndGg7IGkgKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdGFzayA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YXNrLmZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRUYXNrcyhsaXN0OlRhc2tbXSk6YW55e1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDAgO2kgPCBsaXN0Lmxlbmd0aDsgaSArKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB0YXNrID0gbGlzdFtpXTsgXG4gICAgICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YXNrLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY3JlYXRlVGFza3MoKVxuICAgIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgOyAgaSA8IHRoaXMuZ2FtZUxpc3QubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHRhc2sgPSBuZXcgVGFzayhpKVxuICAgICAgICAgICAgdGFzay5nYW1lQ29uZmlnID0gdGhpcy5nYW1lTGlzdFtpXVxuICAgICAgICAgICAgdGFzay5nYW1lQ29uZmlnLnByaW9yaXR5ID0gdGFzay5nYW1lQ29uZmlnLnByaW9yaXR5IHx8MTAwO1xuICAgICAgICAgICAgLy8gMTAg5pyA5bCPY2Qg5pe26ZW/IFxuICAgICAgICAgICAgdGFzay5tYXhfY2QgPSAgMTAwIC90YXNrLmdhbWVDb25maWcucHJpb3JpdHkgKiAxMDtcbiAgICAgICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkTGlzdChsaXN0OmFueSlcbiAgICB7XG4gICAgICAgIGlmKGxpc3QgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGlzdCkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmdhbWVMaXN0LnNwbGljZSgwLHRoaXMuZ2FtZUxpc3QubGVuZ3RoKTtcbiAgICAgICAgICAgIGcuZXh0ZW5kQXJyYXkodGhpcy5nYW1lTGlzdCxsaXN0KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmdhbWVMaXN0LnB1c2gobGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9zb3J0IGJ5IHByaW9yaXR5IFxuICAgICAgICB0aGlzLmdhbWVMaXN0LnNvcnQoKGEsYik9PntcbiAgICAgICAgICAgIGlmKCFhLnByaW9yaXR5ICkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZighYi5wcmlvcml0eSkgcmV0dXJuIDA7XG4gICAgICAgICAgICByZXR1cm4gYi5wcmlvcml0eSAtIGEucHJpb3JpdHk7XG4gICAgICAgIH0pXG4gICAgICAgIC8vY3JlYXRlIHRhc2tzXG4gICAgICAgIHRoaXMuY3JlYXRlVGFza3MoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVjb21tZW5kQ29tcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlY29tbWVuZENvbXBzW2ldO1xuICAgICAgICAgICAgZWxlbWVudC5yZXF1ZXN0VGFzaygpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVwZGF0ZUZpbmlzaGVkVGFzaygpXG4gICAge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFza3MubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy50YXNrc1tpXVxuICAgICAgICAgICAgLy9jZCDkuK3nmoTku7vliqFcbiAgICAgICAgICAgIGlmKHRhc2suY2QgPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhc2suY2QgPSBNYXRoLm1heCgwLHRhc2suY2QgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBhcHBJZFx0c3RyaW5nXHRcdOaYr1x06KaB5omT5byA55qE5bCP56iL5bqPIGFwcElkXHRcbiAgICAgICAgcGF0aFx0c3RyaW5nXHRcdOWQplx05omT5byA55qE6aG16Z2i6Lev5b6E77yM5aaC5p6c5Li656m65YiZ5omT5byA6aaW6aG1XHRcbiAgICAgICAgZXh0cmFEYXRhXHRvYmplY3RcdFx05ZCmXHTpnIDopoHkvKDpgJLnu5nnm67moIflsI/nqIvluo/nmoTmlbDmja7vvIznm67moIflsI/nqIvluo/lj6/lnKggQXBwLm9uTGF1bmNo77yMQXBwLm9uU2hvdyDkuK3ojrflj5bliLDov5nku73mlbDmja7jgIJcdFxuICAgICAgICBlbnZWZXJzaW9uXHRzdHJpbmdcdHJlbGVhc2VcdOWQplx06KaB5omT5byA55qE5bCP56iL5bqP54mI5pys44CC5LuF5Zyo5b2T5YmN5bCP56iL5bqP5Li65byA5Y+R54mI5oiW5L2T6aqM54mI5pe25q2k5Y+C5pWw5pyJ5pWI44CC5aaC5p6c5b2T5YmN5bCP56iL5bqP5piv5q2j5byP54mI77yM5YiZ5omT5byA55qE5bCP56iL5bqP5b+F5a6a5piv5q2j5byP54mI44CCXHRcbiAgICAgICAgc3VjY2Vzc1x0ZnVuY3Rpb25cdFx05ZCmXHTmjqXlj6PosIPnlKjmiJDlip/nmoTlm57osIPlh73mlbBcdFxuICAgICAgICBmYWlsXHRmdW5jdGlvblx0XHTlkKZcdOaOpeWPo+iwg+eUqOWksei0peeahOWbnuiwg+WHveaVsFx0XG4gICAgICAgIGNvbXBsZXRlXHRmdW5jdGlvblx0XHTlkKZcdOaOpeWPo+iwg+eUqOe7k+adn+eahOWbnuiwg+WHveaVsO+8iOiwg+eUqOaIkOWKn+OAgeWksei0pemDveS8muaJp+ihjO+8iVxuICAgICAgICBvYmplY3QuZW52VmVyc2lvbiDnmoTlkIjms5XlgLxcblxuICAgICAgICBlbnZWZXJzaW9uID4+LS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgZGV2ZWxvcFx05byA5Y+R54mIXG4gICAgICAgIHRyaWFsXHTkvZPpqozniYhcbiAgICAgICAgcmVsZWFzZVx05q2j5byP54mIXG4gICAgICovXG4gICAgY2xpY2tHYW1lKGdhbWVjZmcpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaJk+W8gOWwj+eoi+W6jy4uLlwiKVxuICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xuICAgICAgICAgICAgYXBwSWQ6Z2FtZWNmZy53eF9hcHBpZCxcbiAgICAgICAgICAgIGV4dHJhRGF0YTp7XG4gICAgICAgICAgICAgICAgd3hfYXBwaWQ6R2FtZUNvbmZpZy53eF9hcHBpZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnZWZXJzaW9uOlwicmVsZWFzZVwiLFxuICAgICAgICAgICAgc3VjY2VzczoocmVzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omT5byA5bCP56iL5bqP5oiQ5YqfIDpcIiArIGdhbWVjZmcud3hfYXBwaWQpXG4gICAgICAgICAgICAgICAgLy8g6Lez6L2s6YCa55+l5pyN5Yqh5ZmoXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOihyZXMpPT57XG4gICAgICAgICAgICAgICAgLy/miZPlvIDlpLHotKVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJk+W8gOWwj+eoi+W6j+Wksei0pSA6XCIgK2dhbWVjZmcud3hfYXBwaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyDmiZPlvIDor6bmg4Ug5oiW6ICF55u05o6l5omT5byAXG4gICAgICAgIC8vY2ZnLmltYWdlICBcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpXG4gICAge1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMudXBkYXRlRmluaXNoZWRUYXNrLDEsY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpXG4gICAge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy51cGRhdGVGaW5pc2hlZFRhc2spO1xuICAgIH1cblxuICAgIHN0YXJ0KClcbiAgICB7XG4gICAgICAgIC8vIGxldCBnYW1lTGlzdCAgPSBbXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgICAgY29udGVudDpcIuWwhOS6huS4queQg1wiLFxuICAgICAgICAvLyAgICAgICAgIGV4dHJhOlwiXCIsXG4gICAgICAgIC8vICAgICAgICAgaWNvbjpcImh0dHBzOi8vMTExLjIzMS45NC4yMTMvZ2FtZS9nYW1lcmVzL3JlY29tbWVuZC9nYW1lXzAxL2ljb24uanBnXCIsXG4gICAgICAgIC8vICAgICAgICAgaWQ6MSxcbiAgICAgICAgLy8gICAgICAgICBpbWFnZTpcImh0dHBzOi8vMTExLjIzMS45NC4yMTMvZ2FtZS9nYW1lcmVzL3JlY29tbWVuZC9nYW1lXzAxL3FyLnBuZ1wiLFxuICAgICAgICAvLyAgICAgICAgIHRpdGxlOlwi5bCE5LqG5Liq55CDXCIsXG4gICAgICAgIC8vICAgICAgICAgd3hfYXBwaWQ6XCJ3eGNkNTZjZDBhNjYxOTk2MzhcIixcbiAgICAgICAgLy8gICAgICAgICBwcmlvcml0eTogOTksXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIF1cbiAgICAgICAgLy8gbGV0IHRlc3QgPSBKU09OLnBhcnNlKCd7XCJwcmlvcml0eVwiOjEwMCxcInRpdGxlXCI6XCLmsLTmnpzms6Hms6HpvplcIixcImV4dHJhXCI6XCJlbXB0eVwiLFwiaWNvblwiOlwiaHR0cHM6Ly83MjY1LXJlbGVhc2UtMmM4N2M0LTEyNTgzOTk0NjMudGNiLnFjbG91ZC5sYS9wcGxpY29uLnBuZz9zaWduPTQzMTE2YTVlY2ZlYWQ2ZTYxNGM1MmI5ODE4Y2IxNWVjXFx1MDAyNnQ9MTU0Nzk3MjQ5N1wiLFwiaW1hZ2VcIjpcImh0dHBzOi8vNzI2NS1yZWxlYXNlLTJjODdjNC0xMjU4Mzk5NDYzLnRjYi5xY2xvdWQubGEvcXJjb2RlICgyKS5qcGc/c2lnbj00M2VkYzUxZjkyNGU4YTRlOTY5ZTcxYzVlMDc1M2FkZlxcdTAwMjZ0PTE1NDc5NzI0MjNcIixcInd4X2FwcGlkXCI6XCJ3eGRiYWNiYmEyZDAyNzcxNTJcIn0nKVxuICAgICAgICAvLyBnYW1lTGlzdC5wdXNoKHRlc3QpO1xuICAgICAgICAvLyB0aGlzLmFkZExpc3QoZ2FtZUxpc3QpXG4gICAgfVxufSJdfQ==