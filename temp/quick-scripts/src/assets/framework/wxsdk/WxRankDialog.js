"use strict";
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