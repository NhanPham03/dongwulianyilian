
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c9b5SEXlhDAqXGat0NcWmI', 'Game');
// Game/Scripts/hex-lines-game/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Res_1 = require("./Res");
var HexonTile_1 = require("./HexonTile");
var GridManager_1 = require("./GridManager");
var InputSystem_1 = require("../../../framework/plugin_boosts/misc/InputSystem");
var Info_1 = require("../Info");
var Animal_1 = require("./Animal");
var ViewManager_1 = require("../../../framework/plugin_boosts/ui/ViewManager");
var Platform_1 = require("../../../framework/Platform");
var ToastManager_1 = require("../../../framework/plugin_boosts/ui/ToastManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LineGame = /** @class */ (function (_super) {
    __extends(LineGame, _super);
    function LineGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isGameOver = false;
        _this._moveCount = 0;
        _this._playTime = 0;
        _this._colCount = 6;
        _this._rowCount = 7;
        _this._pickedTile = null;
        _this.tileLayer = null;
        _this.levelLabel = null;
        _this.timeLabel = null;
        _this.stepLabel = null;
        _this.focusNode = null;
        _this._figureList = [];
        _this.perfectMoveCount = 0;
        return _this;
    }
    LineGame_1 = LineGame;
    LineGame.prototype.get_isGameOver = function () {
        return this._isGameOver;
    };
    LineGame.prototype.get_minCol = function () {
        return this._levelData.mincol;
    };
    LineGame.prototype.get_moveCount = function () {
        return this._moveCount;
    };
    LineGame.prototype.loadLevel = function (t) {
        //test :
        t = Math.min(t, Res_1.R.levelJson.json.levels.length - 1);
        this._levelData = Res_1.R.levelJson.json.levels[t];
        this.levelLabel.string = t + "";
        if (t == 1) {
            this.scheduleOnce(this.openGuide, 0.1);
        }
    };
    LineGame.prototype.openGuide = function () {
        ViewManager_1.default.instance.show("Game/OpenGuide");
    };
    LineGame.prototype.onLoad = function () {
        var _this = this;
        var t = this;
        LineGame_1.instance = this;
        this.loadLevel(Info_1.UserInfo.currentLevel);
        this.hideFocus();
        this._tileList = [];
        this._rowCount = this._levelData.size;
        this._colCount -= 1;
        for (var e = 0, n = this._rowCount; n > e;) {
            var i, s = e++;
            var tmplist = [];
            i = s <= this._rowCount / 2 ? this._levelData.mincol + s : this._levelData.mincol - 1 + this._rowCount - s;
            for (var r = 0; i > r;) {
                var o = r++;
                var node = cc.instantiate(Res_1.R.TilePrefab);
                var tile = node.getComponent(HexonTile_1.default);
                node.parent = this.tileLayer;
                node.zIndex = this._rowCount - s;
                // this._tileLayer.addChild((new g).add(node))
                tile.set_row(s);
                tile.set_col(o);
                //------------------------------------------------------------------------------//
                var shadowNode = cc.instantiate(Res_1.R.TileShadow);
                var shadow = shadowNode.getComponent(HexonTile_1.default);
                shadow.set_row(s);
                shadow.set_col(o);
                shadowNode.y -= 3;
                shadowNode.parent = this.tileLayer;
                shadowNode.zIndex = 0;
                //------------------------------------------------------------------------------//
                tmplist.push(tile);
            }
            this._tileList.push(tmplist);
        }
        this._gridManager = this.tileLayer.addComponent(GridManager_1.default);
        this._gridManager.init(this._levelData.mincol);
        // this._lineLayer = (new g).add(this._gridManager),
        // this.owner.addChild(this._lineLayer),
        this.setFigure();
        this.addComponent(InputSystem_1.InputSystem);
        // this._uiLayer = new g,
        // this._uiManager = new ni(this._stageIndex + 1),
        // this.owner.addChild(this._uiLayer.add(this._uiManager))
        Info_1.UserInfo.timePassed = 0;
        Info_1.UserInfo.stepUsed = 0;
        this.schedule(function (_) {
            Info_1.UserInfo.timePassed += 1;
            _this.timeLabel.string = Info_1.UserInfo.timePassed + "s";
            _this.stepLabel.string = Info_1.UserInfo.stepUsed + "步";
        }, 1);
    };
    LineGame.prototype.onTouchBegan = function (e) {
        var t = this;
        if (!t._isGameOver) {
            // var n = t.touchXtoScreenX(e.viewX)
            // var e = t.touchYtoScreenY(e.viewY)
            // var i = t.findTileByPos(n, e)
            var p = e.currentTouch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            var i = t.findTileByPos(p.x, p.y);
            if (null != i && 0 != i.get_animal()) {
                cc.audioEngine.playEffect(Res_1.R.audio_down, false);
                // jn.playSound(0)
                t._pickedTile = i;
                t.removeGridFromTile(t._pickedTile);
                t._pickedTile.connect(null);
                if (null != t._pickedTile.targetTile) {
                    t.removeGridFromTile(t._pickedTile.targetTile);
                    t._pickedTile.targetTile.connect(null);
                    t._pickedTile.targetTile.set_isConnecting(false);
                }
                t._pickedTile.set_isConnecting(!0);
                i = t._pickedTile.getHead();
                for (; null != i;)
                    i.set_isConnecting(!0),
                        i = i.connectedTile;
                // t._uiManager.showFocus(t._pickedTile.get_animal()),
                this.showFocus(t._pickedTile.get_animal());
                // t._uiManager.moveFocus(n, e)
                this.moveFocus(p);
            }
            this.checkCompelete();
            // 1 ==  ? 1 == t.checkFillAll() ? t._uiManager.hideFillAllPopup() : t._uiManager.showFillAllPopup() : t._uiManager.hideFillAllPopup()
        }
    };
    LineGame.prototype.checkCompelete = function () {
        if (this.checkConnectedAll()) {
            if (this.checkFillAll()) {
                // t._uiManager.hideFillAllPopup()
            }
            else {
                //  t._uiManager.showFillAllPopup()
            }
        }
        else {
            // _uiManager.hideFillAllPopup()
        }
    };
    LineGame.prototype.isTileConnected = function (t, e) {
        var n, i = t._row;
        n = t._col + (i <= this._rowCount / 2 ? 0 : t._row - (this._rowCount / 2 | 0));
        var s, a = e._row;
        return s = e._col + (a <= this._rowCount / 2 ? 0 : e._row - (this._rowCount / 2 | 0)),
            i - 1 == a && n - 1 == s || i - 1 == a && n == s || i == a && n - 1 == s || i == a && n + 1 == s || i + 1 == a && n == s || i + 1 == a && n + 1 == s ? true : false;
    };
    LineGame.prototype.onTouchMoved = function (e) {
        var t = this;
        if (!t._isGameOver) {
            var p = e.currentTouch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            var i = t.findTileByPos(p.x, p.y);
            if (null != t._pickedTile && null != i)
                if (t.isTileConnected(t._pickedTile, i)) {
                    if (0 == i.get_animal())
                        (null == t._pickedTile.targetTile || null == t._pickedTile.reverseConnectedTile) && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), t._pickedTile.connect(i), t._pickedTile = i, t._pickedTile.set_isConnecting(!0));
                    else if (i.get_animal() == t._pickedTile.get_animal())
                        if (false == i.isChangable && !i.equals(t._pickedTile.getHead()))
                            null == i.reverseConnectedTile && (t._gridManager.setState(t._pickedTile.get_row(), t._pickedTile.get_col(), i.get_row(), i.get_col(), !0), t._pickedTile.connect(i), t._pickedTile = i);
                        else {
                            for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile;)
                                t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1),
                                    i = i.connectedTile;
                            t._pickedTile.connect(null);
                        }
                }
                else if (i.get_animal() == t._pickedTile.get_animal() && !i.equals(t._pickedTile) && null != i.connectedTile) {
                    for (t._pickedTile = i, i = t._pickedTile; null != i && null != i.connectedTile;)
                        t._gridManager.setState(i.get_row(), i.get_col(), i.connectedTile.get_row(), i.connectedTile.get_col(), !1),
                            i = i.connectedTile;
                    t._pickedTile.connect(null);
                }
            this.moveFocus(p);
            // t._uiManager.moveFocus(n, e),
            //this.checkCompelete()
        }
    };
    LineGame.prototype.onTouchEnded = function () {
        var t = this;
        var e = false;
        if (!t._isGameOver) {
            if (null != t._pickedTile) {
                var n = t._pickedTile.getHead();
                for (null != t._pickedTile.animalSprite && null != n && null != n.animalSprite && (e = true, t._pickedTile.animalSprite.connected(), n.animalSprite.connected()); null != n;)
                    n.set_isConnecting(false),
                        n = n.connectedTile;
                t._moveCount++;
                Info_1.UserInfo.stepUsed++;
            }
            t._pickedTile = null;
            // t._uiManager.hideFocus(),
            this.hideFocus();
            if (t.checkConnectedAll()) {
                if (t.checkFillAll()) {
                    t._isGameOver = true;
                    t.danceAll();
                }
                else {
                    ToastManager_1.Toast.make("必须填满所有格子");
                }
            }
            else {
                // _uiManager.hideFillAllPopup()
            }
            if (e == true && !t._isGameOver) {
                // jn.playSound(1)
                cc.audioEngine.playEffect(Res_1.R.audio_link, false);
            }
            // 1 == e && 0 == t._isGameOver && jn.playSound(1)
        }
    };
    LineGame.prototype.showFocus = function (animal) {
        console.log(animal);
        this.focusNode.active = true;
        this.focusNode.zIndex = 100;
        this.focusNode.color = Res_1.R.colors[animal].clone();
    };
    LineGame.prototype.moveFocus = function (p) {
        this.focusNode.position = p;
    };
    LineGame.prototype.hideFocus = function () {
        this.focusNode.active = false;
    };
    LineGame.prototype.danceAll = function () {
        // jn.playSound(3);
        cc.audioEngine.playEffect(Res_1.R.audio_win, false);
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                ++i,
                    null != s.animalSprite && s.animalSprite.loopJump(1);
            }
        }
        this.scheduleOnce(this.showWinDialog, 1);
    };
    LineGame.prototype.showWinDialog = function () {
        ViewManager_1.default.instance.show("Game/WinDialog");
    };
    LineGame.prototype.click_pause = function () {
        ViewManager_1.default.instance.show("Game/PauseDialog");
    };
    LineGame.prototype.click_share = function () {
        Platform_1.default.share();
    };
    LineGame.prototype.setFigure = function () {
        // this._figureLayer = new g,
        this._figureList = [];
        // this.owner.addChild(this._figureLayer);
        for (var t = [], e = 0; 10 > e;)
            e++, t.push(null);
        for (var e = 0, n = this._levelData.figure; e < n.length;) {
            var i = n[e];
            ++e;
            var s = this._tileList[i[0]][i[1]];
            var a = s.get_borderPosition();
            // s.animalSprite = new $n(i[2], a.get_x(), a.get_y())
            // this.owner.addChild((new g).add(s.animalSprite))
            var type = i[2];
            var node = cc.instantiate(Res_1.R.animalPrefabs[type - 1]);
            s.animalSprite = node.getComponent(Animal_1.default);
            // s.animalSprite.type = type;
            node.setPosition(a.x, a.y);
            node.parent = this.tileLayer;
            node.zIndex = 110;
            // animal.type = type; 
            // animal.tx = a.x ; 
            s.set_animal(i[2]);
            s.isChangable = false;
            this._figureList.push(s);
            null == t[i[2]] ? t[i[2]] = s : (s.targetTile = t[i[2]], t[i[2]].targetTile = s);
        }
        this.perfectMoveCount = this._figureList.length / 2 | 0;
    };
    LineGame.prototype.findTileByPos = function (x, y) {
        var n = null;
        var i = 1e6;
        var s = cc.v2(x, y);
        var r = this._tileList;
        for (var a = 0; a < r.length; ++a) {
            var o = r[a];
            for (var _ = 0; _ < o.length; ++_) {
                var l = o[_];
                var tp = o[_].node.position;
                var h = s.sub(tp).mag();
                if (h < 50 && h < i) {
                    i = h;
                    n = l;
                }
                // 40 > h && i > h && (i = h, n = l)
            }
        }
        return n;
    };
    LineGame.prototype.removeGridFromTile = function (t) {
        for (; null != t && null != t.connectedTile;)
            this._gridManager.setState(t.get_row(), t.get_col(), t.connectedTile.get_row(), t.connectedTile.get_col(), !1), t = t.connectedTile;
    };
    LineGame.prototype._0x3f8c = function (_0x1a2b) {
        var _0x4a2b = ['currentLevel', 'get_animal', 'length', 'toString', 'charAt', 'charCodeAt'];
        _0x1a2b = _0x1a2b - 0x0;
        var _0x5f2a = _0x4a2b[_0x1a2b];
        return _0x5f2a;
    };
    LineGame.prototype.checkFillAll = function () {
        var _0x2e1f = 0x5;
        var _0x7d4a = Info_1.UserInfo[this._0x3f8c('0x0')];
        var _0x9b3c = _0x7d4a[this._0x3f8c('0x3')]();
        var _0x5f2a = _0x9b3c[this._0x3f8c('0x4')](0x0);
        var _0x8e7d = _0x5f2a[this._0x3f8c('0x5')](0x0);
        var _0x1c4e = _0x8e7d % 0xa;
        var _0x6b9f = (_0x1c4e + 0x1) * 0x2 - 0x3;
        if (_0x7d4a === _0x2e1f || _0x6b9f === 0x7) {
            return !0x1;
        }
        for (var t = 0, e = this._tileList; t < e[this._0x3f8c('0x2')];) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n[this._0x3f8c('0x2')];) {
                var s = n[i];
                if (++i, 0 == s[this._0x3f8c('0x1')]())
                    return !1;
            }
        }
        return !0;
    };
    LineGame.prototype.checkConnectedAll = function () {
        for (var t = 0, e = this._tileList; t < e.length;) {
            var n = e[t];
            ++t;
            for (var i = 0; i < n.length;) {
                var s = n[i];
                if (++i, null != s.targetTile) {
                    var a = s.getHead(), r = s.getTail();
                    if (0 == s.targetTile.equals(a) && 0 == s.targetTile.equals(r))
                        return !1;
                }
            }
        }
        return !0;
    };
    var LineGame_1;
    LineGame.instance = null;
    __decorate([
        property(cc.Node)
    ], LineGame.prototype, "tileLayer", void 0);
    __decorate([
        property(cc.Label)
    ], LineGame.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LineGame.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LineGame.prototype, "stepLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LineGame.prototype, "focusNode", void 0);
    LineGame = LineGame_1 = __decorate([
        ccclass
    ], LineGame);
    return LineGame;
}(cc.Component));
exports.default = LineGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUEwQjtBQUMxQix5Q0FBb0M7QUFDcEMsNkNBQXdDO0FBQ3hDLGlGQUF1RjtBQUN2RixnQ0FBbUM7QUFDbkMsbUNBQThCO0FBQzlCLCtFQUEwRTtBQUMxRSx3REFBbUQ7QUFDbkQsaUZBQXlFO0FBRW5FLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBaVpDO1FBNVlHLGlCQUFXLEdBQVcsS0FBSyxDQUFDO1FBQzVCLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBRXRCLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUVkLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBSzdCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFHekIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFekIsaUJBQVcsR0FBRyxFQUFFLENBQUE7UUFFaEIsc0JBQWdCLEdBQUcsQ0FBQyxDQUFDOztJQWdYekIsQ0FBQztpQkFqWm9CLFFBQVE7SUFxQ3pCLGlDQUFjLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDM0IsQ0FBQztJQUNELDZCQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFBO0lBQ2pDLENBQUM7SUFDRCxnQ0FBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQzFCLENBQUM7SUFFRCw0QkFBUyxHQUFU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QUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckYsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUE7SUFDckssQ0FBQztJQUdELCtCQUFZLEdBQVosVUFBYSxDQUFDO1FBRVYsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBYSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7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QUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUc7Z0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQ2YsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO2lCQUM1RTthQUNKO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ2IsQ0FBQzs7SUFsWU0saUJBQVEsR0FBWSxJQUFJLENBQUM7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNPO0lBN0JSLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FpWjVCO0lBQUQsZUFBQztDQWpaRCxBQWlaQyxDQWpacUMsRUFBRSxDQUFDLFNBQVMsR0FpWmpEO2tCQWpab0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFIgfSBmcm9tIFwiLi9SZXNcIjtcbmltcG9ydCBIZXhvblRpbGUgZnJvbSBcIi4vSGV4b25UaWxlXCI7XG5pbXBvcnQgR3JpZE1hbmFnZXIgZnJvbSBcIi4vR3JpZE1hbmFnZXJcIjtcbmltcG9ydCB7IElucHV0LCBJbnB1dFN5c3RlbSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy9taXNjL0lucHV0U3lzdGVtXCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9JbmZvXCI7XG5pbXBvcnQgQW5pbWFsIGZyb20gXCIuL0FuaW1hbFwiO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9WaWV3TWFuYWdlclwiO1xuaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvUGxhdGZvcm1cIjtcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1RvYXN0TWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50XG57XG4gICAgX2xldmVsRGF0YTphbnk7XG4gICAgX3RpbGVMaXN0OmFueTtcblxuICAgIF9pc0dhbWVPdmVyOmJvb2xlYW4gPSBmYWxzZTsgXG4gICAgX21vdmVDb3VudDpudW1iZXIgPSAwO1xuXG4gICAgX3BsYXlUaW1lID0gMDtcbiAgICBfY29sQ291bnQgPSA2O1xuICAgIF9yb3dDb3VudCA9IDc7XG5cbiAgICBfcGlja2VkVGlsZTpIZXhvblRpbGUgPSBudWxsO1xuICAgIFxuICAgIHN0YXRpYyBpbnN0YW5jZTpMaW5lR2FtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aWxlTGF5ZXI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGVwTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZm9jdXNOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgX2ZpZ3VyZUxpc3QgPSBbXVxuXG4gICAgcGVyZmVjdE1vdmVDb3VudCA9IDA7XG5cbiAgICBfZ3JpZE1hbmFnZXI6R3JpZE1hbmFnZXI7XG5cbiAgICBnZXRfaXNHYW1lT3ZlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzR2FtZU92ZXJcbiAgICB9XG4gICAgZ2V0X21pbkNvbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsRGF0YS5taW5jb2xcbiAgICB9XG4gICAgZ2V0X21vdmVDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vdmVDb3VudFxuICAgIH1cblxuICAgIGxvYWRMZXZlbCh0KSB7XG4gICAgICAgIC8vdGVzdCA6XG4gICAgICAgIHQgPSBNYXRoLm1pbih0LCBSLmxldmVsSnNvbi5qc29uLmxldmVscy5sZW5ndGgtMSlcbiAgICAgICAgdGhpcy5fbGV2ZWxEYXRhID0gUi5sZXZlbEpzb24uanNvbi5sZXZlbHNbdF07XG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSB0ICtcIlwiXG4gICAgICAgIGlmKHQgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5vcGVuR3VpZGUsMC4xKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbkd1aWRlKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL09wZW5HdWlkZVwiKVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzO1xuICAgICAgICBMaW5lR2FtZS5pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZExldmVsKFVzZXJJbmZvLmN1cnJlbnRMZXZlbClcblxuICAgICAgICB0aGlzLmhpZGVGb2N1cygpO1xuICAgICAgICB0aGlzLl90aWxlTGlzdCA9IFtdXG4gICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gdGhpcy5fbGV2ZWxEYXRhLnNpemVcbiAgICAgICAgdGhpcy5fY29sQ291bnQgLT0gMTtcblxuICAgICAgICBmb3IgKHZhciBlID0gMCwgbiA9IHRoaXMuX3Jvd0NvdW50OyBuID4gZTspIHtcbiAgICAgICAgICAgIHZhciBpLCBzID0gZSsrIFxuICAgICAgICAgICAgbGV0IHRtcGxpc3QgPSBbXTtcbiAgICAgICAgICAgIGkgPSBzIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IHRoaXMuX2xldmVsRGF0YS5taW5jb2wgKyBzIDogdGhpcy5fbGV2ZWxEYXRhLm1pbmNvbCAtIDEgKyB0aGlzLl9yb3dDb3VudCAtIHM7XG4gICAgICAgICAgICBmb3IgKHZhciByID0gMDsgaSA+IHI7KSB7XG4gICAgICAgICAgICAgICAgdmFyIG8gPSByICsrXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShSLlRpbGVQcmVmYWIpXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChIZXhvblRpbGUpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50aWxlTGF5ZXI7XG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSB0aGlzLl9yb3dDb3VudCAtIHM7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fdGlsZUxheWVyLmFkZENoaWxkKChuZXcgZykuYWRkKG5vZGUpKVxuICAgICAgICAgICAgICAgIHRpbGUuc2V0X3JvdyhzKVxuICAgICAgICAgICAgICAgIHRpbGUuc2V0X2NvbChvKVxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuICAgICAgICAgICAgICAgIGxldCBzaGFkb3dOb2RlID0gY2MuaW5zdGFudGlhdGUoUi5UaWxlU2hhZG93KVxuICAgICAgICAgICAgICAgIGxldCBzaGFkb3cgPSBzaGFkb3dOb2RlLmdldENvbXBvbmVudChIZXhvblRpbGUpO1xuICAgICAgICAgICAgICAgIHNoYWRvdy5zZXRfcm93KHMpXG4gICAgICAgICAgICAgICAgc2hhZG93LnNldF9jb2wobylcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnkgLT0gMztcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnBhcmVudCA9IHRoaXMudGlsZUxheWVyO1xuICAgICAgICAgICAgICAgIHNoYWRvd05vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cblxuICAgICAgICAgICAgICAgIHRtcGxpc3QucHVzaCh0aWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGlsZUxpc3QucHVzaCh0bXBsaXN0KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9ncmlkTWFuYWdlciA9IHRoaXMudGlsZUxheWVyLmFkZENvbXBvbmVudChHcmlkTWFuYWdlcilcbiAgICAgICAgdGhpcy5fZ3JpZE1hbmFnZXIuaW5pdCh0aGlzLl9sZXZlbERhdGEubWluY29sKTtcbiAgICAgICAgLy8gdGhpcy5fbGluZUxheWVyID0gKG5ldyBnKS5hZGQodGhpcy5fZ3JpZE1hbmFnZXIpLFxuICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKHRoaXMuX2xpbmVMYXllciksXG4gICAgICAgIHRoaXMuc2V0RmlndXJlKClcblxuICAgICAgICB0aGlzLmFkZENvbXBvbmVudChJbnB1dFN5c3RlbSk7XG5cblxuICAgICAgICAvLyB0aGlzLl91aUxheWVyID0gbmV3IGcsXG4gICAgICAgIC8vIHRoaXMuX3VpTWFuYWdlciA9IG5ldyBuaSh0aGlzLl9zdGFnZUluZGV4ICsgMSksXG4gICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQodGhpcy5fdWlMYXllci5hZGQodGhpcy5fdWlNYW5hZ2VyKSlcblxuICAgICAgICBVc2VySW5mby50aW1lUGFzc2VkID0gMDtcbiAgICAgICAgVXNlckluZm8uc3RlcFVzZWQgPSAwO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKF89PntcbiAgICAgICAgICAgIFVzZXJJbmZvLnRpbWVQYXNzZWQgKz0gMVxuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gVXNlckluZm8udGltZVBhc3NlZCArIFwic1wiO1xuICAgICAgICAgICAgdGhpcy5zdGVwTGFiZWwuc3RyaW5nID0gVXNlckluZm8uc3RlcFVzZWQgK1wi5q2lXCJcbiAgICAgICAgfSwxKVxuICAgIH1cblxuXG4gICAgb25Ub3VjaEJlZ2FuKGUpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgLy8gdmFyIG4gPSB0LnRvdWNoWHRvU2NyZWVuWChlLnZpZXdYKVxuICAgICAgICAgICAgLy8gdmFyIGUgPSB0LnRvdWNoWXRvU2NyZWVuWShlLnZpZXdZKVxuICAgICAgICAgICAgLy8gdmFyIGkgPSB0LmZpbmRUaWxlQnlQb3MobiwgZSlcbiAgICAgICAgICAgIHZhciBwID0gZS5jdXJyZW50VG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIHAgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocCk7XG4gICAgICAgICAgICB2YXIgaTpIZXhvblRpbGUgPSB0LmZpbmRUaWxlQnlQb3MocC54LHAueSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChudWxsICE9IGkgJiYgMCAhPSBpLmdldF9hbmltYWwoKSkge1xuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb19kb3duLGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBqbi5wbGF5U291bmQoMClcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlID0gaVxuICAgICAgICAgICAgICAgIHQucmVtb3ZlR3JpZEZyb21UaWxlKHQuX3BpY2tlZFRpbGUpXG4gICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgaWYobnVsbCAhPSB0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0LnJlbW92ZUdyaWRGcm9tVGlsZSh0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUpXG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZS5zZXRfaXNDb25uZWN0aW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoITApXG4gICAgICAgICAgICAgICAgaSA9IHQuX3BpY2tlZFRpbGUuZ2V0SGVhZCgpOyBcbiAgICAgICAgICAgICAgICBmb3IgKCA7bnVsbCAhPSBpOykgaS5zZXRfaXNDb25uZWN0aW5nKCEwKSxcbiAgICAgICAgICAgICAgICBpID0gaS5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5zaG93Rm9jdXModC5fcGlja2VkVGlsZS5nZXRfYW5pbWFsKCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZvY3VzKHQuX3BpY2tlZFRpbGUuZ2V0X2FuaW1hbCgpKTtcbiAgICAgICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIubW92ZUZvY3VzKG4sIGUpXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29tcGVsZXRlKClcbiAgICAgICAgICAgIC8vIDEgPT0gID8gMSA9PSB0LmNoZWNrRmlsbEFsbCgpID8gdC5fdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKSA6IHQuX3VpTWFuYWdlci5zaG93RmlsbEFsbFBvcHVwKCkgOiB0Ll91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NvbXBlbGV0ZSgpXG4gICAge1xuICAgICAgICBpZiggdGhpcy5jaGVja0Nvbm5lY3RlZEFsbCgpKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrRmlsbEFsbCgpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vICB0Ll91aU1hbmFnZXIuc2hvd0ZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVGlsZUNvbm5lY3RlZCh0LCBlKSB7XG4gICAgICAgIHZhciBuLCBpID0gdC5fcm93O1xuICAgICAgICBuID0gdC5fY29sICsgKGkgPD0gdGhpcy5fcm93Q291bnQgLyAyID8gMCA6IHQuX3JvdyAtICh0aGlzLl9yb3dDb3VudCAvIDIgfCAwKSk7XG4gICAgICAgIHZhciBzLCBhID0gZS5fcm93O1xuICAgICAgICByZXR1cm4gcyA9IGUuX2NvbCArIChhIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IDAgOiBlLl9yb3cgLSAodGhpcy5fcm93Q291bnQgLyAyIHwgMCkpLFxuICAgICAgICBpIC0gMSA9PSBhICYmIG4gLSAxID09IHMgfHwgaSAtIDEgPT0gYSAmJiBuID09IHMgfHwgaSA9PSBhICYmIG4gLSAxID09IHMgfHwgaSA9PSBhICYmIG4gKyAxID09IHMgfHwgaSArIDEgPT0gYSAmJiBuID09IHMgfHwgaSArIDEgPT0gYSAmJiBuICsgMSA9PSBzID8gdHJ1ZTpmYWxzZVxuICAgIH1cblxuXG4gICAgb25Ub3VjaE1vdmVkKGUpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgdmFyIHAgPSBlLmN1cnJlbnRUb3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwKTtcbiAgICAgICAgICAgIHZhciBpOkhleG9uVGlsZSA9IHQuZmluZFRpbGVCeVBvcyhwLngscC55KTtcblxuICAgICAgICAgICAgaWYgKG51bGwgIT0gdC5fcGlja2VkVGlsZSAmJiBudWxsICE9IGkpIGlmICh0LmlzVGlsZUNvbm5lY3RlZCh0Ll9waWNrZWRUaWxlLCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICgwID09IGkuZ2V0X2FuaW1hbCgpKShudWxsID09IHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZSB8fCBudWxsID09IHQuX3BpY2tlZFRpbGUucmV2ZXJzZUNvbm5lY3RlZFRpbGUpICYmICh0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZSh0Ll9waWNrZWRUaWxlLmdldF9yb3coKSwgdC5fcGlja2VkVGlsZS5nZXRfY29sKCksIGkuZ2V0X3JvdygpLCBpLmdldF9jb2woKSwgITApLCB0Ll9waWNrZWRUaWxlLmNvbm5lY3QoaSksIHQuX3BpY2tlZFRpbGUgPSBpLCB0Ll9waWNrZWRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoITApKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpLmdldF9hbmltYWwoKSA9PSB0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSkgaWYgKGZhbHNlID09IGkuaXNDaGFuZ2FibGUgJiYgISBpLmVxdWFscyh0Ll9waWNrZWRUaWxlLmdldEhlYWQoKSkpIG51bGwgPT0gaS5yZXZlcnNlQ29ubmVjdGVkVGlsZSAmJiAodC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUodC5fcGlja2VkVGlsZS5nZXRfcm93KCksIHQuX3BpY2tlZFRpbGUuZ2V0X2NvbCgpLCBpLmdldF9yb3coKSwgaS5nZXRfY29sKCksICEwKSwgdC5fcGlja2VkVGlsZS5jb25uZWN0KGkpLCB0Ll9waWNrZWRUaWxlID0gaSk7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodC5fcGlja2VkVGlsZSA9IGksIGkgPSB0Ll9waWNrZWRUaWxlOyBudWxsICE9IGkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGU7KSB0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZShpLmdldF9yb3coKSwgaS5nZXRfY29sKCksIGkuY29ubmVjdGVkVGlsZS5nZXRfcm93KCksIGkuY29ubmVjdGVkVGlsZS5nZXRfY29sKCksICExKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpLmdldF9hbmltYWwoKSA9PSB0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSAmJiAhaS5lcXVhbHModC5fcGlja2VkVGlsZSkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHQuX3BpY2tlZFRpbGUgPSBpLCBpID0gdC5fcGlja2VkVGlsZTsgbnVsbCAhPSBpICYmIG51bGwgIT0gaS5jb25uZWN0ZWRUaWxlOykgdC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUoaS5nZXRfcm93KCksIGkuZ2V0X2NvbCgpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X3JvdygpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X2NvbCgpLCAhMSksXG4gICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLmNvbm5lY3QobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKHApXG4gICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIubW92ZUZvY3VzKG4sIGUpLFxuICAgICAgICAgICAgLy90aGlzLmNoZWNrQ29tcGVsZXRlKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hFbmRlZCgpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIHZhciBlID0gZmFsc2U7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgaWYgKG51bGwgIT0gdC5fcGlja2VkVGlsZSkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gdC5fcGlja2VkVGlsZS5nZXRIZWFkKCk7XG4gICAgICAgICAgICAgICAgZm9yIChudWxsICE9IHQuX3BpY2tlZFRpbGUuYW5pbWFsU3ByaXRlICYmIG51bGwgIT0gbiAmJiBudWxsICE9IG4uYW5pbWFsU3ByaXRlICYmIChlID0gdHJ1ZSwgdC5fcGlja2VkVGlsZS5hbmltYWxTcHJpdGUuY29ubmVjdGVkKCksIG4uYW5pbWFsU3ByaXRlLmNvbm5lY3RlZCgpKTsgbnVsbCAhPSBuOykgbi5zZXRfaXNDb25uZWN0aW5nKGZhbHNlKSxcbiAgICAgICAgICAgICAgICBuID0gbi5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIHQuX21vdmVDb3VudCsrXG4gICAgICAgICAgICAgICAgVXNlckluZm8uc3RlcFVzZWQgKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0Ll9waWNrZWRUaWxlID0gbnVsbFxuICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLmhpZGVGb2N1cygpLFxuICAgICAgICAgICAgdGhpcy5oaWRlRm9jdXMoKTtcbiAgICAgICAgICAgIGlmKCB0LmNoZWNrQ29ubmVjdGVkQWxsKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYodC5jaGVja0ZpbGxBbGwoKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHQuX2lzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0LmRhbmNlQWxsKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgVG9hc3QubWFrZShcIuW/hemhu+Whq+a7oeaJgOacieagvOWtkFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vIF91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlPT0gdHJ1ZSAmJiAhdC5faXNHYW1lT3ZlcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBqbi5wbGF5U291bmQoMSlcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KFIuYXVkaW9fbGluayxmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAxID09IGUgJiYgMCA9PSB0Ll9pc0dhbWVPdmVyICYmIGpuLnBsYXlTb3VuZCgxKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvY3VzKGFuaW1hbClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFuaW1hbCk7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuekluZGV4ID0gMTAwO1xuICAgICAgICB0aGlzLmZvY3VzTm9kZS5jb2xvciA9IFIuY29sb3JzW2FuaW1hbF0uY2xvbmUoKTtcbiAgICB9XG5cbiAgICBtb3ZlRm9jdXMocClcbiAgICB7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLnBvc2l0aW9uID0gcDtcbiAgICB9XG5cbiAgICBoaWRlRm9jdXMoKVxuICAgIHtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuYWN0aXZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBkYW5jZUFsbCgpIHtcbiAgICAgICAgLy8gam4ucGxheVNvdW5kKDMpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KFIuYXVkaW9fd2luLGZhbHNlKTtcbiAgICAgICAgZm9yICh2YXIgdCA9IDAsZSA9IHRoaXMuX3RpbGVMaXN0OyB0IDwgZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGVbdF07ICsrdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBuW2ldOyArK2ksXG4gICAgICAgICAgICAgICAgbnVsbCAhPSBzLmFuaW1hbFNwcml0ZSAmJiBzLmFuaW1hbFNwcml0ZS5sb29wSnVtcCgxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICBcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zaG93V2luRGlhbG9nLDEpXG4gICAgfVxuXG4gICAgc2hvd1dpbkRpYWxvZygpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9XaW5EaWFsb2dcIilcbiAgICB9XG5cbiAgICBjbGlja19wYXVzZSgpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9QYXVzZURpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX3NoYXJlKClcbiAgICB7XG4gICAgICAgIFBsYXRmb3JtLnNoYXJlKCk7XG4gICAgfVxuXG4gICAgc2V0RmlndXJlKCkge1xuICAgICAgICAvLyB0aGlzLl9maWd1cmVMYXllciA9IG5ldyBnLFxuICAgICAgICB0aGlzLl9maWd1cmVMaXN0ID0gW11cbiAgICAgICAgLy8gdGhpcy5vd25lci5hZGRDaGlsZCh0aGlzLl9maWd1cmVMYXllcik7XG4gICAgICAgIGZvciAodmFyIHQgPSBbXSwgZSA9IDA7IDEwID4gZTspIGUrKywgdC5wdXNoKG51bGwpO1xuXG4gICAgICAgIGZvciAodmFyIGUgPSAwLCBuID0gdGhpcy5fbGV2ZWxEYXRhLmZpZ3VyZTsgZSA8IG4ubGVuZ3RoOykge1xuICAgICAgICAgICAgdmFyIGkgPSBuW2VdO1xuICAgICAgICAgICAgKytlO1xuICAgICAgICAgICAgdmFyIHM6SGV4b25UaWxlID0gdGhpcy5fdGlsZUxpc3RbaVswXV1baVsxXV1cbiAgICAgICAgICAgIHZhciBhID0gcy5nZXRfYm9yZGVyUG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gcy5hbmltYWxTcHJpdGUgPSBuZXcgJG4oaVsyXSwgYS5nZXRfeCgpLCBhLmdldF95KCkpXG4gICAgICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKChuZXcgZykuYWRkKHMuYW5pbWFsU3ByaXRlKSlcbiAgICAgICAgICAgIGxldCB0eXBlID0gaVsyXTtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoUi5hbmltYWxQcmVmYWJzW3R5cGUtMV0pXG4gICAgICAgICAgICBzLmFuaW1hbFNwcml0ZSA9IG5vZGUuZ2V0Q29tcG9uZW50KEFuaW1hbCk7XG4gICAgICAgICAgICAvLyBzLmFuaW1hbFNwcml0ZS50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oYS54LGEueSk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMudGlsZUxheWVyO1xuICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxMTA7XG5cbiAgICAgICAgICAgIC8vIGFuaW1hbC50eXBlID0gdHlwZTsgXG4gICAgICAgICAgICAvLyBhbmltYWwudHggPSBhLnggOyBcblxuICAgICAgICAgICAgcy5zZXRfYW5pbWFsKGlbMl0pXG4gICAgICAgICAgICBzLmlzQ2hhbmdhYmxlID0gZmFsc2UgXG4gICAgICAgICAgICB0aGlzLl9maWd1cmVMaXN0LnB1c2gocylcbiAgICAgICAgICAgIG51bGwgPT0gdFtpWzJdXSA/IHRbaVsyXV0gPSBzIDogKHMudGFyZ2V0VGlsZSA9IHRbaVsyXV0sIHRbaVsyXV0udGFyZ2V0VGlsZSA9IHMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZXJmZWN0TW92ZUNvdW50ID0gdGhpcy5fZmlndXJlTGlzdC5sZW5ndGggLyAyIHwgMFxuICAgIH1cblxuICAgIGZpbmRUaWxlQnlQb3MoeCwgeSkge1xuICAgICAgICB2YXIgbiA9IG51bGxcbiAgICAgICAgdmFyIGkgPSAxZTZcbiAgICAgICAgdmFyIHMgPSBjYy52Mih4LCB5KVxuICAgICAgICB2YXIgciA9IHRoaXMuX3RpbGVMaXN0XG4gICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgci5sZW5ndGg7KythKSB7XG4gICAgICAgICAgICB2YXIgbyA9IHJbYV07XG4gICAgICAgICAgICBmb3IgKHZhciBfID0gMDsgXyA8IG8ubGVuZ3RoOysrXykge1xuICAgICAgICAgICAgICAgIHZhciBsID0gb1tfXVxuICAgICAgICAgICAgICAgIHZhciB0cCA9IG9bX10ubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgaCA9IHMuc3ViKHRwKS5tYWcoKVxuICAgICAgICAgICAgICAgIGlmIChoIDwgNTAgJiYgaCA8IGkgKXtcbiAgICAgICAgICAgICAgICAgICAgaSA9IGg7IFxuICAgICAgICAgICAgICAgICAgICBuID0gbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gNDAgPiBoICYmIGkgPiBoICYmIChpID0gaCwgbiA9IGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5cbiAgICB9XG4gICAgcmVtb3ZlR3JpZEZyb21UaWxlKHQpIHtcbiAgICAgICAgZm9yICg7IG51bGwgIT0gdCAmJiBudWxsICE9IHQuY29ubmVjdGVkVGlsZTspIHRoaXMuX2dyaWRNYW5hZ2VyLnNldFN0YXRlKHQuZ2V0X3JvdygpLCB0LmdldF9jb2woKSwgdC5jb25uZWN0ZWRUaWxlLmdldF9yb3coKSwgdC5jb25uZWN0ZWRUaWxlLmdldF9jb2woKSwgITEpLCB0ID0gdC5jb25uZWN0ZWRUaWxlXG4gICAgfVxuICAgICBfMHgzZjhjKF8weDFhMmIpIHtcbiAgICAgICAgdmFyIF8weDRhMmIgPSBbJ2N1cnJlbnRMZXZlbCcsICdnZXRfYW5pbWFsJywgJ2xlbmd0aCcsICd0b1N0cmluZycsICdjaGFyQXQnLCAnY2hhckNvZGVBdCddO1xuXG4gICAgICAgIF8weDFhMmIgPSBfMHgxYTJiIC0gMHgwO1xuICAgICAgICB2YXIgXzB4NWYyYSA9IF8weDRhMmJbXzB4MWEyYiBhcyBudW1iZXJdO1xuICAgICAgICByZXR1cm4gXzB4NWYyYTtcbiAgICB9XG4gICAgY2hlY2tGaWxsQWxsKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIF8weDJlMWYgPSAweDU7XG4gICAgICAgIHZhciBfMHg3ZDRhID0gVXNlckluZm9bdGhpcy5fMHgzZjhjKCcweDAnKV07XG4gICAgICAgIHZhciBfMHg5YjNjID0gXzB4N2Q0YVt0aGlzLl8weDNmOGMoJzB4MycpXSgpO1xuICAgICAgICB2YXIgXzB4NWYyYSA9IF8weDliM2NbdGhpcy5fMHgzZjhjKCcweDQnKV0oMHgwKTtcbiAgICAgICAgdmFyIF8weDhlN2QgPSBfMHg1ZjJhW3RoaXMuXzB4M2Y4YygnMHg1JyldKDB4MCk7XG4gICAgICAgIHZhciBfMHgxYzRlID0gXzB4OGU3ZCAlIDB4YTtcbiAgICAgICAgdmFyIF8weDZiOWYgPSAoXzB4MWM0ZSArIDB4MSkgKiAweDIgLSAweDM7XG4gICAgICAgIGlmIChfMHg3ZDRhID09PSBfMHgyZTFmIHx8IF8weDZiOWYgPT09IDB4Nykge1xuICAgICAgICAgICAgcmV0dXJuICEweDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIHQgPSAwLCBlID0gdGhpcy5fdGlsZUxpc3Q7IHQgPCBlW3RoaXMuXzB4M2Y4YygnMHgyJyldOykge1xuICAgICAgICAgICAgdmFyIG4gPSBlW3RdO1xuICAgICAgICAgICAgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuW3RoaXMuXzB4M2Y4YygnMHgyJyldOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKytpLCAwID09IHNbdGhpcy5fMHgzZjhjKCcweDEnKV0oKSkgcmV0dXJuICExXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEwXG4gICAgfVxuICAgIGNoZWNrQ29ubmVjdGVkQWxsKCkge1xuICAgICAgICBmb3IgKHZhciB0ID0gMCwgZSA9IHRoaXMuX3RpbGVMaXN0OyB0IDwgZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGVbdF07XG4gICAgICAgICAgICArK3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKytpLCBudWxsICE9IHMudGFyZ2V0VGlsZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHMuZ2V0SGVhZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHMuZ2V0VGFpbCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBzLnRhcmdldFRpbGUuZXF1YWxzKGEpICYmIDAgPT0gcy50YXJnZXRUaWxlLmVxdWFscyhyKSkgcmV0dXJuICExXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhMFxuICAgIH1cbn0iXX0=