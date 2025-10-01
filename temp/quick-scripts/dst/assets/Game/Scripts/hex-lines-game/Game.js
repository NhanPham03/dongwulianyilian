
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
var LanguageManager_1 = require("../../../framework/plugin_boosts/ui/LanguageManager");
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
            _this.stepLabel.string = Info_1.UserInfo.stepUsed + LanguageManager_1.default.instance.getText("step_count");
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
        // CONDITION BELOW BLOCKS LV 5 COMPLETION
        // if (_0x7d4a === _0x2e1f || _0x6b9f === 0x7) {
        //     return !0x1;
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUEwQjtBQUMxQix5Q0FBb0M7QUFDcEMsNkNBQXdDO0FBQ3hDLGlGQUF1RjtBQUN2RixnQ0FBbUM7QUFDbkMsbUNBQThCO0FBQzlCLCtFQUEwRTtBQUMxRSx3REFBbUQ7QUFDbkQsaUZBQXlFO0FBQ3pFLHVGQUFrRjtBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQW1aQztRQTlZRyxpQkFBVyxHQUFXLEtBQUssQ0FBQztRQUM1QixnQkFBVSxHQUFVLENBQUMsQ0FBQztRQUV0QixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFFZCxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUs3QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGlCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRWhCLHNCQUFnQixHQUFHLENBQUMsQ0FBQzs7SUFrWHpCLENBQUM7aUJBblpvQixRQUFRO0lBcUN6QixpQ0FBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7SUFDRCw2QkFBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsZ0NBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUMxQixDQUFDO0lB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QyxFQUFFO29CQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO3dCQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNsUyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRTt3QkFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUFFLElBQUksSUFBSSxDQUFDLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcs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WUFDSixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRztnQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDZixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7aUJBQzVFO2FBQ0o7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDYixDQUFDOztJQXBZTSxpQkFBUSxHQUFZLElBQUksQ0FBQztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ087SUE3QlIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW1aNUI7SUFBRCxlQUFDO0NBblpELEFBbVpDLENBblpxQyxFQUFFLENBQUMsU0FBUyxHQW1aakQ7a0JBblpvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUiB9IGZyb20gXCIuL1Jlc1wiO1xuaW1wb3J0IEhleG9uVGlsZSBmcm9tIFwiLi9IZXhvblRpbGVcIjtcbmltcG9ydCBHcmlkTWFuYWdlciBmcm9tIFwiLi9HcmlkTWFuYWdlclwiO1xuaW1wb3J0IHsgSW5wdXQsIElucHV0U3lzdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL21pc2MvSW5wdXRTeXN0ZW1cIjtcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL0luZm9cIjtcbmltcG9ydCBBbmltYWwgZnJvbSBcIi4vQW5pbWFsXCI7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL1ZpZXdNYW5hZ2VyXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9QbGF0Zm9ybVwiO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVG9hc3RNYW5hZ2VyXCI7XG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9MYW5ndWFnZU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudFxue1xuICAgIF9sZXZlbERhdGE6YW55O1xuICAgIF90aWxlTGlzdDphbnk7XG5cbiAgICBfaXNHYW1lT3Zlcjpib29sZWFuID0gZmFsc2U7IFxuICAgIF9tb3ZlQ291bnQ6bnVtYmVyID0gMDtcblxuICAgIF9wbGF5VGltZSA9IDA7XG4gICAgX2NvbENvdW50ID0gNjtcbiAgICBfcm93Q291bnQgPSA3O1xuXG4gICAgX3BpY2tlZFRpbGU6SGV4b25UaWxlID0gbnVsbDtcbiAgICBcbiAgICBzdGF0aWMgaW5zdGFuY2U6TGluZUdhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdGlsZUxheWVyOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxldmVsTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpbWVMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RlcExhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGZvY3VzTm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIF9maWd1cmVMaXN0ID0gW11cblxuICAgIHBlcmZlY3RNb3ZlQ291bnQgPSAwO1xuXG4gICAgX2dyaWRNYW5hZ2VyOkdyaWRNYW5hZ2VyO1xuXG4gICAgZ2V0X2lzR2FtZU92ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0dhbWVPdmVyXG4gICAgfVxuICAgIGdldF9taW5Db2woKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbERhdGEubWluY29sXG4gICAgfVxuICAgIGdldF9tb3ZlQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb3ZlQ291bnRcbiAgICB9XG5cbiAgICBsb2FkTGV2ZWwodCkge1xuICAgICAgICAvL3Rlc3QgOlxuICAgICAgICB0ID0gTWF0aC5taW4odCwgUi5sZXZlbEpzb24uanNvbi5sZXZlbHMubGVuZ3RoLTEpXG4gICAgICAgIHRoaXMuX2xldmVsRGF0YSA9IFIubGV2ZWxKc29uLmpzb24ubGV2ZWxzW3RdO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gdCArXCJcIlxuICAgICAgICBpZih0ID09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMub3Blbkd1aWRlLDAuMSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5HdWlkZSgpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9PcGVuR3VpZGVcIilcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcztcbiAgICAgICAgTGluZUdhbWUuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvYWRMZXZlbChVc2VySW5mby5jdXJyZW50TGV2ZWwpXG5cbiAgICAgICAgdGhpcy5oaWRlRm9jdXMoKTtcbiAgICAgICAgdGhpcy5fdGlsZUxpc3QgPSBbXVxuICAgICAgICB0aGlzLl9yb3dDb3VudCA9IHRoaXMuX2xldmVsRGF0YS5zaXplXG4gICAgICAgIHRoaXMuX2NvbENvdW50IC09IDE7XG5cbiAgICAgICAgZm9yICh2YXIgZSA9IDAsIG4gPSB0aGlzLl9yb3dDb3VudDsgbiA+IGU7KSB7XG4gICAgICAgICAgICB2YXIgaSwgcyA9IGUrKyBcbiAgICAgICAgICAgIGxldCB0bXBsaXN0ID0gW107XG4gICAgICAgICAgICBpID0gcyA8PSB0aGlzLl9yb3dDb3VudCAvIDIgPyB0aGlzLl9sZXZlbERhdGEubWluY29sICsgcyA6IHRoaXMuX2xldmVsRGF0YS5taW5jb2wgLSAxICsgdGhpcy5fcm93Q291bnQgLSBzO1xuICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IGkgPiByOykge1xuICAgICAgICAgICAgICAgIHZhciBvID0gciArK1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoUi5UaWxlUHJlZmFiKVxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoSGV4b25UaWxlKTtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMudGlsZUxheWVyO1xuICAgICAgICAgICAgICAgIG5vZGUuekluZGV4ID0gdGhpcy5fcm93Q291bnQgLSBzO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RpbGVMYXllci5hZGRDaGlsZCgobmV3IGcpLmFkZChub2RlKSlcbiAgICAgICAgICAgICAgICB0aWxlLnNldF9yb3cocylcbiAgICAgICAgICAgICAgICB0aWxlLnNldF9jb2wobylcblxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cbiAgICAgICAgICAgICAgICBsZXQgc2hhZG93Tm9kZSA9IGNjLmluc3RhbnRpYXRlKFIuVGlsZVNoYWRvdylcbiAgICAgICAgICAgICAgICBsZXQgc2hhZG93ID0gc2hhZG93Tm9kZS5nZXRDb21wb25lbnQoSGV4b25UaWxlKTtcbiAgICAgICAgICAgICAgICBzaGFkb3cuc2V0X3JvdyhzKVxuICAgICAgICAgICAgICAgIHNoYWRvdy5zZXRfY29sKG8pXG4gICAgICAgICAgICAgICAgc2hhZG93Tm9kZS55IC09IDM7XG4gICAgICAgICAgICAgICAgc2hhZG93Tm9kZS5wYXJlbnQgPSB0aGlzLnRpbGVMYXllcjtcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnpJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG5cbiAgICAgICAgICAgICAgICB0bXBsaXN0LnB1c2godGlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RpbGVMaXN0LnB1c2godG1wbGlzdClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fZ3JpZE1hbmFnZXIgPSB0aGlzLnRpbGVMYXllci5hZGRDb21wb25lbnQoR3JpZE1hbmFnZXIpXG4gICAgICAgIHRoaXMuX2dyaWRNYW5hZ2VyLmluaXQodGhpcy5fbGV2ZWxEYXRhLm1pbmNvbCk7XG4gICAgICAgIC8vIHRoaXMuX2xpbmVMYXllciA9IChuZXcgZykuYWRkKHRoaXMuX2dyaWRNYW5hZ2VyKSxcbiAgICAgICAgLy8gdGhpcy5vd25lci5hZGRDaGlsZCh0aGlzLl9saW5lTGF5ZXIpLFxuICAgICAgICB0aGlzLnNldEZpZ3VyZSgpXG5cbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoSW5wdXRTeXN0ZW0pO1xuXG5cbiAgICAgICAgLy8gdGhpcy5fdWlMYXllciA9IG5ldyBnLFxuICAgICAgICAvLyB0aGlzLl91aU1hbmFnZXIgPSBuZXcgbmkodGhpcy5fc3RhZ2VJbmRleCArIDEpLFxuICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKHRoaXMuX3VpTGF5ZXIuYWRkKHRoaXMuX3VpTWFuYWdlcikpXG5cbiAgICAgICAgVXNlckluZm8udGltZVBhc3NlZCA9IDA7XG4gICAgICAgIFVzZXJJbmZvLnN0ZXBVc2VkID0gMDtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShfPT57XG4gICAgICAgICAgICBVc2VySW5mby50aW1lUGFzc2VkICs9IDFcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IFVzZXJJbmZvLnRpbWVQYXNzZWQgKyBcInNcIjtcbiAgICAgICAgICAgIHRoaXMuc3RlcExhYmVsLnN0cmluZyA9IFVzZXJJbmZvLnN0ZXBVc2VkICsgTGFuZ3VhZ2VNYW5hZ2VyLmluc3RhbmNlLmdldFRleHQoXCJzdGVwX2NvdW50XCIpO1xuICAgICAgICB9LDEpXG4gICAgfVxuXG5cbiAgICBvblRvdWNoQmVnYW4oZSlcbiAgICB7XG4gICAgICAgIGxldCB0ID0gdGhpcztcbiAgICAgICAgaWYgKCF0Ll9pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICAvLyB2YXIgbiA9IHQudG91Y2hYdG9TY3JlZW5YKGUudmlld1gpXG4gICAgICAgICAgICAvLyB2YXIgZSA9IHQudG91Y2hZdG9TY3JlZW5ZKGUudmlld1kpXG4gICAgICAgICAgICAvLyB2YXIgaSA9IHQuZmluZFRpbGVCeVBvcyhuLCBlKVxuICAgICAgICAgICAgdmFyIHAgPSBlLmN1cnJlbnRUb3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwKTtcbiAgICAgICAgICAgIHZhciBpOkhleG9uVGlsZSA9IHQuZmluZFRpbGVCeVBvcyhwLngscC55KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKG51bGwgIT0gaSAmJiAwICE9IGkuZ2V0X2FuaW1hbCgpKSB7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChSLmF1ZGlvX2Rvd24sZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIGpuLnBsYXlTb3VuZCgwKVxuICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUgPSBpXG4gICAgICAgICAgICAgICAgdC5yZW1vdmVHcmlkRnJvbVRpbGUodC5fcGlja2VkVGlsZSlcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLmNvbm5lY3QobnVsbClcbiAgICAgICAgICAgICAgICBpZihudWxsICE9IHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHQucmVtb3ZlR3JpZEZyb21UaWxlKHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZSlcbiAgICAgICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS50YXJnZXRUaWxlLmNvbm5lY3QobnVsbClcbiAgICAgICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS50YXJnZXRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUuc2V0X2lzQ29ubmVjdGluZyghMClcbiAgICAgICAgICAgICAgICBpID0gdC5fcGlja2VkVGlsZS5nZXRIZWFkKCk7IFxuICAgICAgICAgICAgICAgIGZvciAoIDtudWxsICE9IGk7KSBpLnNldF9pc0Nvbm5lY3RpbmcoITApLFxuICAgICAgICAgICAgICAgIGkgPSBpLmNvbm5lY3RlZFRpbGU7XG4gICAgICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLnNob3dGb2N1cyh0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSksXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9jdXModC5fcGlja2VkVGlsZS5nZXRfYW5pbWFsKCkpO1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5tb3ZlRm9jdXMobiwgZSlcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVGb2N1cyhwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hlY2tDb21wZWxldGUoKVxuICAgICAgICAgICAgLy8gMSA9PSAgPyAxID09IHQuY2hlY2tGaWxsQWxsKCkgPyB0Ll91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpIDogdC5fdWlNYW5hZ2VyLnNob3dGaWxsQWxsUG9wdXAoKSA6IHQuX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQ29tcGVsZXRlKClcbiAgICB7XG4gICAgICAgIGlmKCB0aGlzLmNoZWNrQ29ubmVjdGVkQWxsKCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tGaWxsQWxsKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8gIHQuX3VpTWFuYWdlci5zaG93RmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyBfdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNUaWxlQ29ubmVjdGVkKHQsIGUpIHtcbiAgICAgICAgdmFyIG4sIGkgPSB0Ll9yb3c7XG4gICAgICAgIG4gPSB0Ll9jb2wgKyAoaSA8PSB0aGlzLl9yb3dDb3VudCAvIDIgPyAwIDogdC5fcm93IC0gKHRoaXMuX3Jvd0NvdW50IC8gMiB8IDApKTtcbiAgICAgICAgdmFyIHMsIGEgPSBlLl9yb3c7XG4gICAgICAgIHJldHVybiBzID0gZS5fY29sICsgKGEgPD0gdGhpcy5fcm93Q291bnQgLyAyID8gMCA6IGUuX3JvdyAtICh0aGlzLl9yb3dDb3VudCAvIDIgfCAwKSksXG4gICAgICAgIGkgLSAxID09IGEgJiYgbiAtIDEgPT0gcyB8fCBpIC0gMSA9PSBhICYmIG4gPT0gcyB8fCBpID09IGEgJiYgbiAtIDEgPT0gcyB8fCBpID09IGEgJiYgbiArIDEgPT0gcyB8fCBpICsgMSA9PSBhICYmIG4gPT0gcyB8fCBpICsgMSA9PSBhICYmIG4gKyAxID09IHMgPyB0cnVlOmZhbHNlXG4gICAgfVxuXG5cbiAgICBvblRvdWNoTW92ZWQoZSlcbiAgICB7XG4gICAgICAgIGxldCB0ID0gdGhpcztcbiAgICAgICAgaWYgKCF0Ll9pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICB2YXIgcCA9IGUuY3VycmVudFRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICBwID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHApO1xuICAgICAgICAgICAgdmFyIGk6SGV4b25UaWxlID0gdC5maW5kVGlsZUJ5UG9zKHAueCxwLnkpO1xuXG4gICAgICAgICAgICBpZiAobnVsbCAhPSB0Ll9waWNrZWRUaWxlICYmIG51bGwgIT0gaSkgaWYgKHQuaXNUaWxlQ29ubmVjdGVkKHQuX3BpY2tlZFRpbGUsIGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKDAgPT0gaS5nZXRfYW5pbWFsKCkpKG51bGwgPT0gdC5fcGlja2VkVGlsZS50YXJnZXRUaWxlIHx8IG51bGwgPT0gdC5fcGlja2VkVGlsZS5yZXZlcnNlQ29ubmVjdGVkVGlsZSkgJiYgKHQuX2dyaWRNYW5hZ2VyLnNldFN0YXRlKHQuX3BpY2tlZFRpbGUuZ2V0X3JvdygpLCB0Ll9waWNrZWRUaWxlLmdldF9jb2woKSwgaS5nZXRfcm93KCksIGkuZ2V0X2NvbCgpLCAhMCksIHQuX3BpY2tlZFRpbGUuY29ubmVjdChpKSwgdC5fcGlja2VkVGlsZSA9IGksIHQuX3BpY2tlZFRpbGUuc2V0X2lzQ29ubmVjdGluZyghMCkpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkuZ2V0X2FuaW1hbCgpID09IHQuX3BpY2tlZFRpbGUuZ2V0X2FuaW1hbCgpKSBpZiAoZmFsc2UgPT0gaS5pc0NoYW5nYWJsZSAmJiAhIGkuZXF1YWxzKHQuX3BpY2tlZFRpbGUuZ2V0SGVhZCgpKSkgbnVsbCA9PSBpLnJldmVyc2VDb25uZWN0ZWRUaWxlICYmICh0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZSh0Ll9waWNrZWRUaWxlLmdldF9yb3coKSwgdC5fcGlja2VkVGlsZS5nZXRfY29sKCksIGkuZ2V0X3JvdygpLCBpLmdldF9jb2woKSwgITApLCB0Ll9waWNrZWRUaWxlLmNvbm5lY3QoaSksIHQuX3BpY2tlZFRpbGUgPSBpKTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0Ll9waWNrZWRUaWxlID0gaSwgaSA9IHQuX3BpY2tlZFRpbGU7IG51bGwgIT0gaSAmJiBudWxsICE9IGkuY29ubmVjdGVkVGlsZTspIHQuX2dyaWRNYW5hZ2VyLnNldFN0YXRlKGkuZ2V0X3JvdygpLCBpLmdldF9jb2woKSwgaS5jb25uZWN0ZWRUaWxlLmdldF9yb3coKSwgaS5jb25uZWN0ZWRUaWxlLmdldF9jb2woKSwgITEpLFxuICAgICAgICAgICAgICAgICAgICBpID0gaS5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLmNvbm5lY3QobnVsbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkuZ2V0X2FuaW1hbCgpID09IHQuX3BpY2tlZFRpbGUuZ2V0X2FuaW1hbCgpICYmICFpLmVxdWFscyh0Ll9waWNrZWRUaWxlKSAmJiBudWxsICE9IGkuY29ubmVjdGVkVGlsZSkge1xuICAgICAgICAgICAgICAgIGZvciAodC5fcGlja2VkVGlsZSA9IGksIGkgPSB0Ll9waWNrZWRUaWxlOyBudWxsICE9IGkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGU7KSB0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZShpLmdldF9yb3coKSwgaS5nZXRfY29sKCksIGkuY29ubmVjdGVkVGlsZS5nZXRfcm93KCksIGkuY29ubmVjdGVkVGlsZS5nZXRfY29sKCksICExKSxcbiAgICAgICAgICAgICAgICBpID0gaS5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUuY29ubmVjdChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMocClcbiAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5tb3ZlRm9jdXMobiwgZSksXG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tDb21wZWxldGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZGVkKClcbiAgICB7XG4gICAgICAgIGxldCB0ID0gdGhpcztcbiAgICAgICAgdmFyIGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0Ll9pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSB0Ll9waWNrZWRUaWxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0Ll9waWNrZWRUaWxlLmdldEhlYWQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKG51bGwgIT0gdC5fcGlja2VkVGlsZS5hbmltYWxTcHJpdGUgJiYgbnVsbCAhPSBuICYmIG51bGwgIT0gbi5hbmltYWxTcHJpdGUgJiYgKGUgPSB0cnVlLCB0Ll9waWNrZWRUaWxlLmFuaW1hbFNwcml0ZS5jb25uZWN0ZWQoKSwgbi5hbmltYWxTcHJpdGUuY29ubmVjdGVkKCkpOyBudWxsICE9IG47KSBuLnNldF9pc0Nvbm5lY3RpbmcoZmFsc2UpLFxuICAgICAgICAgICAgICAgIG4gPSBuLmNvbm5lY3RlZFRpbGU7XG4gICAgICAgICAgICAgICAgdC5fbW92ZUNvdW50KytcbiAgICAgICAgICAgICAgICBVc2VySW5mby5zdGVwVXNlZCArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUgPSBudWxsXG4gICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIuaGlkZUZvY3VzKCksXG4gICAgICAgICAgICB0aGlzLmhpZGVGb2N1cygpO1xuICAgICAgICAgICAgaWYoIHQuY2hlY2tDb25uZWN0ZWRBbGwoKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih0LmNoZWNrRmlsbEFsbCgpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdC5faXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHQuZGFuY2VBbGwoKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBUb2FzdC5tYWtlKFwi5b+F6aG75aGr5ruh5omA5pyJ5qC85a2QXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8gX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGU9PSB0cnVlICYmICF0Ll9pc0dhbWVPdmVyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGpuLnBsYXlTb3VuZCgxKVxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb19saW5rLGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIDEgPT0gZSAmJiAwID09IHQuX2lzR2FtZU92ZXIgJiYgam4ucGxheVNvdW5kKDEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9jdXMoYW5pbWFsKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coYW5pbWFsKTtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLmZvY3VzTm9kZS56SW5kZXggPSAxMDA7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLmNvbG9yID0gUi5jb2xvcnNbYW5pbWFsXS5jbG9uZSgpO1xuICAgIH1cblxuICAgIG1vdmVGb2N1cyhwKVxuICAgIHtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUucG9zaXRpb24gPSBwO1xuICAgIH1cblxuICAgIGhpZGVGb2N1cygpXG4gICAge1xuICAgICAgICB0aGlzLmZvY3VzTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cblxuICAgIGRhbmNlQWxsKCkge1xuICAgICAgICAvLyBqbi5wbGF5U291bmQoMyk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb193aW4sZmFsc2UpO1xuICAgICAgICBmb3IgKHZhciB0ID0gMCxlID0gdGhpcy5fdGlsZUxpc3Q7IHQgPCBlLmxlbmd0aDspIHtcbiAgICAgICAgICAgIHZhciBuID0gZVt0XTsgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5baV07ICsraSxcbiAgICAgICAgICAgICAgICBudWxsICE9IHMuYW5pbWFsU3ByaXRlICYmIHMuYW5pbWFsU3ByaXRlLmxvb3BKdW1wKDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIFxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnNob3dXaW5EaWFsb2csMSlcbiAgICB9XG5cbiAgICBzaG93V2luRGlhbG9nKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1dpbkRpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX3BhdXNlKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1BhdXNlRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfc2hhcmUoKVxuICAgIHtcbiAgICAgICAgUGxhdGZvcm0uc2hhcmUoKTtcbiAgICB9XG5cbiAgICBzZXRGaWd1cmUoKSB7XG4gICAgICAgIC8vIHRoaXMuX2ZpZ3VyZUxheWVyID0gbmV3IGcsXG4gICAgICAgIHRoaXMuX2ZpZ3VyZUxpc3QgPSBbXVxuICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKHRoaXMuX2ZpZ3VyZUxheWVyKTtcbiAgICAgICAgZm9yICh2YXIgdCA9IFtdLCBlID0gMDsgMTAgPiBlOykgZSsrLCB0LnB1c2gobnVsbCk7XG5cbiAgICAgICAgZm9yICh2YXIgZSA9IDAsIG4gPSB0aGlzLl9sZXZlbERhdGEuZmlndXJlOyBlIDwgbi5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgaSA9IG5bZV07XG4gICAgICAgICAgICArK2U7XG4gICAgICAgICAgICB2YXIgczpIZXhvblRpbGUgPSB0aGlzLl90aWxlTGlzdFtpWzBdXVtpWzFdXVxuICAgICAgICAgICAgdmFyIGEgPSBzLmdldF9ib3JkZXJQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBzLmFuaW1hbFNwcml0ZSA9IG5ldyAkbihpWzJdLCBhLmdldF94KCksIGEuZ2V0X3koKSlcbiAgICAgICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQoKG5ldyBnKS5hZGQocy5hbmltYWxTcHJpdGUpKVxuICAgICAgICAgICAgbGV0IHR5cGUgPSBpWzJdO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShSLmFuaW1hbFByZWZhYnNbdHlwZS0xXSlcbiAgICAgICAgICAgIHMuYW5pbWFsU3ByaXRlID0gbm9kZS5nZXRDb21wb25lbnQoQW5pbWFsKTtcbiAgICAgICAgICAgIC8vIHMuYW5pbWFsU3ByaXRlLnR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihhLngsYS55KTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50aWxlTGF5ZXI7XG4gICAgICAgICAgICBub2RlLnpJbmRleCA9IDExMDtcblxuICAgICAgICAgICAgLy8gYW5pbWFsLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgICAgIC8vIGFuaW1hbC50eCA9IGEueCA7IFxuXG4gICAgICAgICAgICBzLnNldF9hbmltYWwoaVsyXSlcbiAgICAgICAgICAgIHMuaXNDaGFuZ2FibGUgPSBmYWxzZSBcbiAgICAgICAgICAgIHRoaXMuX2ZpZ3VyZUxpc3QucHVzaChzKVxuICAgICAgICAgICAgbnVsbCA9PSB0W2lbMl1dID8gdFtpWzJdXSA9IHMgOiAocy50YXJnZXRUaWxlID0gdFtpWzJdXSwgdFtpWzJdXS50YXJnZXRUaWxlID0gcylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlcmZlY3RNb3ZlQ291bnQgPSB0aGlzLl9maWd1cmVMaXN0Lmxlbmd0aCAvIDIgfCAwXG4gICAgfVxuXG4gICAgZmluZFRpbGVCeVBvcyh4LCB5KSB7XG4gICAgICAgIHZhciBuID0gbnVsbFxuICAgICAgICB2YXIgaSA9IDFlNlxuICAgICAgICB2YXIgcyA9IGNjLnYyKHgsIHkpXG4gICAgICAgIHZhciByID0gdGhpcy5fdGlsZUxpc3RcbiAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCByLmxlbmd0aDsrK2EpIHtcbiAgICAgICAgICAgIHZhciBvID0gclthXTtcbiAgICAgICAgICAgIGZvciAodmFyIF8gPSAwOyBfIDwgby5sZW5ndGg7KytfKSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBvW19dXG4gICAgICAgICAgICAgICAgdmFyIHRwID0gb1tfXS5ub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBoID0gcy5zdWIodHApLm1hZygpXG4gICAgICAgICAgICAgICAgaWYgKGggPCA1MCAmJiBoIDwgaSApe1xuICAgICAgICAgICAgICAgICAgICBpID0gaDsgXG4gICAgICAgICAgICAgICAgICAgIG4gPSBsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyA0MCA+IGggJiYgaSA+IGggJiYgKGkgPSBoLCBuID0gbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gblxuICAgIH1cbiAgICByZW1vdmVHcmlkRnJvbVRpbGUodCkge1xuICAgICAgICBmb3IgKDsgbnVsbCAhPSB0ICYmIG51bGwgIT0gdC5jb25uZWN0ZWRUaWxlOykgdGhpcy5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUodC5nZXRfcm93KCksIHQuZ2V0X2NvbCgpLCB0LmNvbm5lY3RlZFRpbGUuZ2V0X3JvdygpLCB0LmNvbm5lY3RlZFRpbGUuZ2V0X2NvbCgpLCAhMSksIHQgPSB0LmNvbm5lY3RlZFRpbGVcbiAgICB9XG4gICAgIF8weDNmOGMoXzB4MWEyYikge1xuICAgICAgICB2YXIgXzB4NGEyYiA9IFsnY3VycmVudExldmVsJywgJ2dldF9hbmltYWwnLCAnbGVuZ3RoJywgJ3RvU3RyaW5nJywgJ2NoYXJBdCcsICdjaGFyQ29kZUF0J107XG5cbiAgICAgICAgXzB4MWEyYiA9IF8weDFhMmIgLSAweDA7XG4gICAgICAgIHZhciBfMHg1ZjJhID0gXzB4NGEyYltfMHgxYTJiIGFzIG51bWJlcl07XG4gICAgICAgIHJldHVybiBfMHg1ZjJhO1xuICAgIH1cbiAgICBjaGVja0ZpbGxBbGwoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgXzB4MmUxZiA9IDB4NTtcbiAgICAgICAgdmFyIF8weDdkNGEgPSBVc2VySW5mb1t0aGlzLl8weDNmOGMoJzB4MCcpXTtcbiAgICAgICAgdmFyIF8weDliM2MgPSBfMHg3ZDRhW3RoaXMuXzB4M2Y4YygnMHgzJyldKCk7XG4gICAgICAgIHZhciBfMHg1ZjJhID0gXzB4OWIzY1t0aGlzLl8weDNmOGMoJzB4NCcpXSgweDApO1xuICAgICAgICB2YXIgXzB4OGU3ZCA9IF8weDVmMmFbdGhpcy5fMHgzZjhjKCcweDUnKV0oMHgwKTtcbiAgICAgICAgdmFyIF8weDFjNGUgPSBfMHg4ZTdkICUgMHhhO1xuICAgICAgICB2YXIgXzB4NmI5ZiA9IChfMHgxYzRlICsgMHgxKSAqIDB4MiAtIDB4MztcbiAgICAgICAgXG4gICAgICAgIC8vIENPTkRJVElPTiBCRUxPVyBCTE9DS1MgTFYgNSBDT01QTEVUSU9OXG4gICAgICAgIC8vIGlmIChfMHg3ZDRhID09PSBfMHgyZTFmIHx8IF8weDZiOWYgPT09IDB4Nykge1xuICAgICAgICAvLyAgICAgcmV0dXJuICEweDE7XG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIHQgPSAwLCBlID0gdGhpcy5fdGlsZUxpc3Q7IHQgPCBlW3RoaXMuXzB4M2Y4YygnMHgyJyldOykge1xuICAgICAgICAgICAgdmFyIG4gPSBlW3RdO1xuICAgICAgICAgICAgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuW3RoaXMuXzB4M2Y4YygnMHgyJyldOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKytpLCAwID09IHNbdGhpcy5fMHgzZjhjKCcweDEnKV0oKSkgcmV0dXJuICExXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEwXG4gICAgfVxuICAgIGNoZWNrQ29ubmVjdGVkQWxsKCkge1xuICAgICAgICBmb3IgKHZhciB0ID0gMCwgZSA9IHRoaXMuX3RpbGVMaXN0OyB0IDwgZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGVbdF07XG4gICAgICAgICAgICArK3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKytpLCBudWxsICE9IHMudGFyZ2V0VGlsZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHMuZ2V0SGVhZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHMuZ2V0VGFpbCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBzLnRhcmdldFRpbGUuZXF1YWxzKGEpICYmIDAgPT0gcy50YXJnZXRUaWxlLmVxdWFscyhyKSkgcmV0dXJuICExXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhMFxuICAgIH1cbn0iXX0=