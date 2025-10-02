
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/wxsdk/WxRankDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80fd3Nn4dFF45QylMONs3ro', 'WxRankDialog');
// framework/wxsdk/WxRankDialog.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Platform_1 = require("../Platform");
var View_1 = require("../plugin_boosts/ui/View");
var ViewManager_1 = require("../plugin_boosts/ui/ViewManager");
var Signal_1 = require("../plugin_boosts/misc/Signal");
var Info_1 = require("../../Game/Scripts/Info");
var RankingTemplate_1 = require("../../Game/Scripts/ui/RankingTemplate");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WxRankDialog = /** @class */ (function (_super) {
    __extends(WxRankDialog, _super);
    function WxRankDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.first = true;
        _this.closeSignal = new Signal_1.default();
        return _this;
    }
    WxRankDialog.prototype.loadRankData = function () {
        return new Promise(function (resolve, reject) {
            var API_URL = "https://5d820f171c8ff70014ef438d.mockapi.io/1/ranking-list";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", API_URL, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        var rankList = JSON.parse(xhr.responseText);
                        rankList.sort(function (a, b) { return b.level - a.level; });
                        var currentUser = {
                            rank: 0,
                            name: Platform_1.default.getNick() || "YOU",
                            level: Info_1.UserInfo.level,
                            isCurrentUser: true
                        };
                        for (var i = 0; i < rankList.length; i++) {
                            if (Info_1.UserInfo.level >= rankList[i].level) {
                                currentUser.rank = i + 1;
                                rankList.splice(i, 0, currentUser);
                                break;
                            }
                        }
                        rankList = rankList.slice(0, 10);
                        rankList.forEach(function (r, i) { return r.rank = i + 1; });
                        console.log(rankList);
                        resolve(rankList);
                    }
                    catch (e) {
                        console.error("Error parsing ranks: " + e);
                        reject(e);
                    }
                }
                else if (xhr.readyState === 4) {
                    console.error("Error fetching ranks: " + xhr.status);
                    reject(xhr.status);
                }
            };
            xhr.send();
        });
    };
    WxRankDialog.prototype.showRanks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rankList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadRankData()];
                    case 1:
                        rankList = _a.sent();
                        this.scrollView.showlist(function (node, data, i) {
                            var rank = node.getComponent(RankingTemplate_1.default);
                            rank.data = data;
                            rank.rankLabel.string = data.rank;
                            rank.levelLabel.string = data.level;
                            rank.nameLabel.string = data.name;
                            if (data.isCurrentUser) {
                                rank.rankLabel.node.color = cc.Color.MAGENTA;
                                rank.levelLabel.node.color = cc.Color.MAGENTA;
                                rank.nameLabel.node.color = cc.Color.MAGENTA;
                            }
                        }, rankList);
                        return [2 /*return*/];
                }
            });
        });
    };
    WxRankDialog.prototype.onShown = function (callback, target) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.closeSignal.on(callback, target);
                        if (!this.first) return [3 /*break*/, 1];
                        this.scheduleOnce(this.reOpen, 0.1);
                        return [3 /*break*/, 3];
                    case 1:
                        Platform_1.default.showRank();
                        return [4 /*yield*/, this.showRanks()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WxRankDialog.prototype.reOpen = function () {
        Platform_1.default.showRank();
        this.first = false;
        this.getComponent(View_1.default).hide();
        // setTimeout(() => {
        ViewManager_1.default.instance.show("wechat/WxRankDialog");
        // }, 100);
    };
    WxRankDialog.prototype.click_close = function () {
        Platform_1.default.hideRank();
        this.getComponent(View_1.default).hide();
        this.closeSignal.fire();
    };
    __decorate([
        property(cc.ScrollView)
    ], WxRankDialog.prototype, "scrollView", void 0);
    WxRankDialog = __decorate([
        ccclass
    ], WxRankDialog);
    return WxRankDialog;
}(cc.Component));
exports.default = WxRankDialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFx3eHNka1xcV3hSYW5rRGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBbUM7QUFDbkMsaURBQTRDO0FBQzVDLCtEQUEwRDtBQUUxRCx1REFBa0Q7QUFDbEQsZ0RBQW1EO0FBQ25ELHlFQUFvRTtBQUc5RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQXdHQztRQXJHRyxnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsV0FBSyxHQUFXLElBQUksQ0FBQztRQUVyQixpQkFBVyxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDOztJQWlHL0IsQ0FBQztJQS9GRyxtQ0FBWSxHQUFaO1FBQ0ksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLElBQU0sT0FBTyxHQUFHLDREQUE0RCxDQUFDO1lBRTdFLElBQU0sR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRS9CLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRztnQkFDckIsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtvQkFDNUMsSUFBSTt3QkFDQSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQWpCLENBQWlCLENBQUMsQ0FBQzt3QkFFM0MsSUFBTSxXQUFX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LENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLENBQUE7NkJBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQVYsd0JBQVU7d0JBRVQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFBOzs7d0JBRWxDLGtCQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3BCLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUM7Ozs7OztLQUc5QjtJQUVELDZCQUFNLEdBQU47UUFFSSxrQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IscUJBQXFCO1FBQ2pCLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ3BELFdBQVc7SUFFZixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUVJLGtCQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFwR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztvREFDUztJQUhoQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBd0doQztJQUFELG1CQUFDO0NBeEdELEFBd0dDLENBeEd5QyxFQUFFLENBQUMsU0FBUyxHQXdHckQ7a0JBeEdvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4uL3BsdWdpbl9ib29zdHMvdWkvVmlld1wiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9wbHVnaW5fYm9vc3RzL3V0aWxzL0NvbW1vblwiO1xuaW1wb3J0IFNpZ25hbCBmcm9tIFwiLi4vcGx1Z2luX2Jvb3N0cy9taXNjL1NpZ25hbFwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vLi4vR2FtZS9TY3JpcHRzL0luZm9cIjtcbmltcG9ydCBSYW5raW5nVGVtcGxhdGUgZnJvbSBcIi4uLy4uL0dhbWUvU2NyaXB0cy91aS9SYW5raW5nVGVtcGxhdGVcIjtcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFd4UmFua0RpYWxvZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XG5cbiAgICBmaXJzdDpib29sZWFuID0gdHJ1ZTtcblxuICAgIGNsb3NlU2lnbmFsID0gbmV3IFNpZ25hbCgpO1xuXG4gICAgbG9hZFJhbmtEYXRhKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBBUElfVVJMID0gXCJodHRwczovLzVkODIwZjE3MWM4ZmY3MDAxNGVmNDM4ZC5tb2NrYXBpLmlvLzEvcmFua2luZy1saXN0XCI7XG5cbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgQVBJX1VSTCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmtMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmFua0xpc3Quc29ydCgoYSwgYikgPT4gYi5sZXZlbCAtIGEubGV2ZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFBsYXRmb3JtLmdldE5pY2soKSB8fCBcIllPVVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiBVc2VySW5mby5sZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRVc2VyOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmtMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFVzZXJJbmZvLmxldmVsID49IHJhbmtMaXN0W2ldLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRVc2VyLnJhbmsgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFua0xpc3Quc3BsaWNlKGksIDAsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rTGlzdCA9IHJhbmtMaXN0LnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmtMaXN0LmZvckVhY2goKHIsIGkpID0+IHIucmFuayA9IGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmtMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmFua0xpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgcmFua3M6IFwiICsgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHJhbmtzOiBcIiArIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoeGhyLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2hvd1JhbmtzKCkge1xuICAgICAgICBjb25zdCByYW5rTGlzdCA9IGF3YWl0IHRoaXMubG9hZFJhbmtEYXRhKCk7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNob3dsaXN0KChub2RlOiBjYy5Ob2RlLCBkYXRhOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHJhbmsgPSBub2RlLmdldENvbXBvbmVudChSYW5raW5nVGVtcGxhdGUpO1xuICAgICAgICAgICAgcmFuay5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHJhbmsucmFua0xhYmVsLnN0cmluZyA9IGRhdGEucmFuaztcbiAgICAgICAgICAgIHJhbmsubGV2ZWxMYWJlbC5zdHJpbmcgPSBkYXRhLmxldmVsO1xuICAgICAgICAgICAgcmFuay5uYW1lTGFiZWwuc3RyaW5nID0gZGF0YS5uYW1lO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5pc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmFuay5yYW5rTGFiZWwubm9kZS5jb2xvciA9IGNjLkNvbG9yLk1BR0VOVEE7XG4gICAgICAgICAgICAgICAgcmFuay5sZXZlbExhYmVsLm5vZGUuY29sb3IgPSBjYy5Db2xvci5NQUdFTlRBO1xuICAgICAgICAgICAgICAgIHJhbmsubmFtZUxhYmVsLm5vZGUuY29sb3IgPSBjYy5Db2xvci5NQUdFTlRBO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCByYW5rTGlzdCk7XG4gICAgfVxuXG4gICAgYXN5bmMgb25TaG93bihjYWxsYmFjayx0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZ25hbC5vbihjYWxsYmFjayx0YXJnZXQpXG4gICAgICAgIGlmKHRoaXMuZmlyc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMucmVPcGVuLDAuMSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBQbGF0Zm9ybS5zaG93UmFuaygpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zaG93UmFua3MoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZU9wZW4oKVxuICAgIHtcbiAgICAgICAgUGxhdGZvcm0uc2hvd1JhbmsoKTtcbiAgICAgICAgdGhpcy5maXJzdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChWaWV3KS5oaWRlKCk7XG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgVmlld01hbmFnZXIuaW5zdGFuY2Uuc2hvdyhcIndlY2hhdC9XeFJhbmtEaWFsb2dcIilcbiAgICAgICAgLy8gfSwgMTAwKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY2xpY2tfY2xvc2UoKVxuICAgIHtcbiAgICAgICAgUGxhdGZvcm0uaGlkZVJhbmsoKTtcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVmlldykuaGlkZSgpO1xuICAgICAgICB0aGlzLmNsb3NlU2lnbmFsLmZpcmUoKTtcbiAgICB9XG59XG4iXX0=