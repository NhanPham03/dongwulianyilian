
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
                    // Toast.make("必须填满所有格子")
                    ToastManager_1.Toast.make(LanguageManager_1.default.instance.getText("fail_msg"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUEwQjtBQUMxQix5Q0FBb0M7QUFDcEMsNkNBQXdDO0FBQ3hDLGlGQUF1RjtBQUN2RixnQ0FBbUM7QUFDbkMsbUNBQThCO0FBQzlCLCtFQUEwRTtBQUMxRSx3REFBbUQ7QUFDbkQsaUZBQXlFO0FBQ3pFLHVGQUFrRjtBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQW9aQztRQS9ZRyxpQkFBVyxHQUFXLEtBQUssQ0FBQztRQUM1QixnQkFBVSxHQUFVLENBQUMsQ0FBQztRQUV0QixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFFZCxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUs3QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGlCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRWhCLHNCQUFnQixHQUFHLENBQUMsQ0FBQzs7SUFtWHpCLENBQUM7aUJBcFpvQixRQUFRO0lBcUN6QixpQ0FBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7SUFDRCw2QkFBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsZ0NBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUMxQixDQUFDO0lB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QyxFQUFFO29CQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO3dCQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNsUyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRTt3QkFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUFFLElBQUksSUFBSSxDQUFDLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcs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dGVudCI6WyJpbXBvcnQgeyBSIH0gZnJvbSBcIi4vUmVzXCI7XG5pbXBvcnQgSGV4b25UaWxlIGZyb20gXCIuL0hleG9uVGlsZVwiO1xuaW1wb3J0IEdyaWRNYW5hZ2VyIGZyb20gXCIuL0dyaWRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBJbnB1dCwgSW5wdXRTeXN0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvbWlzYy9JbnB1dFN5c3RlbVwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IEFuaW1hbCBmcm9tIFwiLi9BbmltYWxcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0xhbmd1YWdlTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50XG57XG4gICAgX2xldmVsRGF0YTphbnk7XG4gICAgX3RpbGVMaXN0OmFueTtcblxuICAgIF9pc0dhbWVPdmVyOmJvb2xlYW4gPSBmYWxzZTsgXG4gICAgX21vdmVDb3VudDpudW1iZXIgPSAwO1xuXG4gICAgX3BsYXlUaW1lID0gMDtcbiAgICBfY29sQ291bnQgPSA2O1xuICAgIF9yb3dDb3VudCA9IDc7XG5cbiAgICBfcGlja2VkVGlsZTpIZXhvblRpbGUgPSBudWxsO1xuICAgIFxuICAgIHN0YXRpYyBpbnN0YW5jZTpMaW5lR2FtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aWxlTGF5ZXI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGVwTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZm9jdXNOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgX2ZpZ3VyZUxpc3QgPSBbXVxuXG4gICAgcGVyZmVjdE1vdmVDb3VudCA9IDA7XG5cbiAgICBfZ3JpZE1hbmFnZXI6R3JpZE1hbmFnZXI7XG5cbiAgICBnZXRfaXNHYW1lT3ZlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzR2FtZU92ZXJcbiAgICB9XG4gICAgZ2V0X21pbkNvbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsRGF0YS5taW5jb2xcbiAgICB9XG4gICAgZ2V0X21vdmVDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vdmVDb3VudFxuICAgIH1cblxuICAgIGxvYWRMZXZlbCh0KSB7XG4gICAgICAgIC8vdGVzdCA6XG4gICAgICAgIHQgPSBNYXRoLm1pbih0LCBSLmxldmVsSnNvbi5qc29uLmxldmVscy5sZW5ndGgtMSlcbiAgICAgICAgdGhpcy5fbGV2ZWxEYXRhID0gUi5sZXZlbEpzb24uanNvbi5sZXZlbHNbdF07XG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSB0ICtcIlwiXG4gICAgICAgIGlmKHQgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5vcGVuR3VpZGUsMC4xKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbkd1aWRlKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL09wZW5HdWlkZVwiKVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzO1xuICAgICAgICBMaW5lR2FtZS5pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZExldmVsKFVzZXJJbmZvLmN1cnJlbnRMZXZlbClcblxuICAgICAgICB0aGlzLmhpZGVGb2N1cygpO1xuICAgICAgICB0aGlzLl90aWxlTGlzdCA9IFtdXG4gICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gdGhpcy5fbGV2ZWxEYXRhLnNpemVcbiAgICAgICAgdGhpcy5fY29sQ291bnQgLT0gMTtcblxuICAgICAgICBmb3IgKHZhciBlID0gMCwgbiA9IHRoaXMuX3Jvd0NvdW50OyBuID4gZTspIHtcbiAgICAgICAgICAgIHZhciBpLCBzID0gZSsrIFxuICAgICAgICAgICAgbGV0IHRtcGxpc3QgPSBbXTtcbiAgICAgICAgICAgIGkgPSBzIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IHRoaXMuX2xldmVsRGF0YS5taW5jb2wgKyBzIDogdGhpcy5fbGV2ZWxEYXRhLm1pbmNvbCAtIDEgKyB0aGlzLl9yb3dDb3VudCAtIHM7XG4gICAgICAgICAgICBmb3IgKHZhciByID0gMDsgaSA+IHI7KSB7XG4gICAgICAgICAgICAgICAgdmFyIG8gPSByICsrXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShSLlRpbGVQcmVmYWIpXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChIZXhvblRpbGUpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50aWxlTGF5ZXI7XG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSB0aGlzLl9yb3dDb3VudCAtIHM7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fdGlsZUxheWVyLmFkZENoaWxkKChuZXcgZykuYWRkKG5vZGUpKVxuICAgICAgICAgICAgICAgIHRpbGUuc2V0X3JvdyhzKVxuICAgICAgICAgICAgICAgIHRpbGUuc2V0X2NvbChvKVxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuICAgICAgICAgICAgICAgIGxldCBzaGFkb3dOb2RlID0gY2MuaW5zdGFudGlhdGUoUi5UaWxlU2hhZG93KVxuICAgICAgICAgICAgICAgIGxldCBzaGFkb3cgPSBzaGFkb3dOb2RlLmdldENvbXBvbmVudChIZXhvblRpbGUpO1xuICAgICAgICAgICAgICAgIHNoYWRvdy5zZXRfcm93KHMpXG4gICAgICAgICAgICAgICAgc2hhZG93LnNldF9jb2wobylcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnkgLT0gMztcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnBhcmVudCA9IHRoaXMudGlsZUxheWVyO1xuICAgICAgICAgICAgICAgIHNoYWRvd05vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cblxuICAgICAgICAgICAgICAgIHRtcGxpc3QucHVzaCh0aWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGlsZUxpc3QucHVzaCh0bXBsaXN0KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9ncmlkTWFuYWdlciA9IHRoaXMudGlsZUxheWVyLmFkZENvbXBvbmVudChHcmlkTWFuYWdlcilcbiAgICAgICAgdGhpcy5fZ3JpZE1hbmFnZXIuaW5pdCh0aGlzLl9sZXZlbERhdGEubWluY29sKTtcbiAgICAgICAgLy8gdGhpcy5fbGluZUxheWVyID0gKG5ldyBnKS5hZGQodGhpcy5fZ3JpZE1hbmFnZXIpLFxuICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKHRoaXMuX2xpbmVMYXllciksXG4gICAgICAgIHRoaXMuc2V0RmlndXJlKClcblxuICAgICAgICB0aGlzLmFkZENvbXBvbmVudChJbnB1dFN5c3RlbSk7XG5cblxuICAgICAgICAvLyB0aGlzLl91aUxheWVyID0gbmV3IGcsXG4gICAgICAgIC8vIHRoaXMuX3VpTWFuYWdlciA9IG5ldyBuaSh0aGlzLl9zdGFnZUluZGV4ICsgMSksXG4gICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQodGhpcy5fdWlMYXllci5hZGQodGhpcy5fdWlNYW5hZ2VyKSlcblxuICAgICAgICBVc2VySW5mby50aW1lUGFzc2VkID0gMDtcbiAgICAgICAgVXNlckluZm8uc3RlcFVzZWQgPSAwO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKF89PntcbiAgICAgICAgICAgIFVzZXJJbmZvLnRpbWVQYXNzZWQgKz0gMVxuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gVXNlckluZm8udGltZVBhc3NlZCArIFwic1wiO1xuICAgICAgICAgICAgdGhpcy5zdGVwTGFiZWwuc3RyaW5nID0gVXNlckluZm8uc3RlcFVzZWQgKyBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcInN0ZXBfY291bnRcIik7XG4gICAgICAgIH0sMSlcbiAgICB9XG5cblxuICAgIG9uVG91Y2hCZWdhbihlKVxuICAgIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xuICAgICAgICBpZiAoIXQuX2lzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIC8vIHZhciBuID0gdC50b3VjaFh0b1NjcmVlblgoZS52aWV3WClcbiAgICAgICAgICAgIC8vIHZhciBlID0gdC50b3VjaFl0b1NjcmVlblkoZS52aWV3WSlcbiAgICAgICAgICAgIC8vIHZhciBpID0gdC5maW5kVGlsZUJ5UG9zKG4sIGUpXG4gICAgICAgICAgICB2YXIgcCA9IGUuY3VycmVudFRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICBwID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHApO1xuICAgICAgICAgICAgdmFyIGk6SGV4b25UaWxlID0gdC5maW5kVGlsZUJ5UG9zKHAueCxwLnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobnVsbCAhPSBpICYmIDAgIT0gaS5nZXRfYW5pbWFsKCkpIHtcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KFIuYXVkaW9fZG93bixmYWxzZSk7XG4gICAgICAgICAgICAgICAgLy8gam4ucGxheVNvdW5kKDApXG4gICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZSA9IGlcbiAgICAgICAgICAgICAgICB0LnJlbW92ZUdyaWRGcm9tVGlsZSh0Ll9waWNrZWRUaWxlKVxuICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUuY29ubmVjdChudWxsKVxuICAgICAgICAgICAgICAgIGlmKG51bGwgIT0gdC5fcGlja2VkVGlsZS50YXJnZXRUaWxlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdC5yZW1vdmVHcmlkRnJvbVRpbGUodC5fcGlja2VkVGlsZS50YXJnZXRUaWxlKVxuICAgICAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUuY29ubmVjdChudWxsKVxuICAgICAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUuc2V0X2lzQ29ubmVjdGluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5zZXRfaXNDb25uZWN0aW5nKCEwKVxuICAgICAgICAgICAgICAgIGkgPSB0Ll9waWNrZWRUaWxlLmdldEhlYWQoKTsgXG4gICAgICAgICAgICAgICAgZm9yICggO251bGwgIT0gaTspIGkuc2V0X2lzQ29ubmVjdGluZyghMCksXG4gICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIuc2hvd0ZvY3VzKHQuX3BpY2tlZFRpbGUuZ2V0X2FuaW1hbCgpKSxcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGb2N1cyh0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSk7XG4gICAgICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLm1vdmVGb2N1cyhuLCBlKVxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKHApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGVja0NvbXBlbGV0ZSgpXG4gICAgICAgICAgICAvLyAxID09ICA/IDEgPT0gdC5jaGVja0ZpbGxBbGwoKSA/IHQuX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKCkgOiB0Ll91aU1hbmFnZXIuc2hvd0ZpbGxBbGxQb3B1cCgpIDogdC5fdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tDb21wZWxldGUoKVxuICAgIHtcbiAgICAgICAgaWYoIHRoaXMuY2hlY2tDb25uZWN0ZWRBbGwoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodGhpcy5jaGVja0ZpbGxBbGwoKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvLyAgdC5fdWlNYW5hZ2VyLnNob3dGaWxsQWxsUG9wdXAoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIF91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1RpbGVDb25uZWN0ZWQodCwgZSkge1xuICAgICAgICB2YXIgbiwgaSA9IHQuX3JvdztcbiAgICAgICAgbiA9IHQuX2NvbCArIChpIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IDAgOiB0Ll9yb3cgLSAodGhpcy5fcm93Q291bnQgLyAyIHwgMCkpO1xuICAgICAgICB2YXIgcywgYSA9IGUuX3JvdztcbiAgICAgICAgcmV0dXJuIHMgPSBlLl9jb2wgKyAoYSA8PSB0aGlzLl9yb3dDb3VudCAvIDIgPyAwIDogZS5fcm93IC0gKHRoaXMuX3Jvd0NvdW50IC8gMiB8IDApKSxcbiAgICAgICAgaSAtIDEgPT0gYSAmJiBuIC0gMSA9PSBzIHx8IGkgLSAxID09IGEgJiYgbiA9PSBzIHx8IGkgPT0gYSAmJiBuIC0gMSA9PSBzIHx8IGkgPT0gYSAmJiBuICsgMSA9PSBzIHx8IGkgKyAxID09IGEgJiYgbiA9PSBzIHx8IGkgKyAxID09IGEgJiYgbiArIDEgPT0gcyA/IHRydWU6ZmFsc2VcbiAgICB9XG5cblxuICAgIG9uVG91Y2hNb3ZlZChlKVxuICAgIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xuICAgICAgICBpZiAoIXQuX2lzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHZhciBwID0gZS5jdXJyZW50VG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIHAgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocCk7XG4gICAgICAgICAgICB2YXIgaTpIZXhvblRpbGUgPSB0LmZpbmRUaWxlQnlQb3MocC54LHAueSk7XG5cbiAgICAgICAgICAgIGlmIChudWxsICE9IHQuX3BpY2tlZFRpbGUgJiYgbnVsbCAhPSBpKSBpZiAodC5pc1RpbGVDb25uZWN0ZWQodC5fcGlja2VkVGlsZSwgaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSBpLmdldF9hbmltYWwoKSkobnVsbCA9PSB0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUgfHwgbnVsbCA9PSB0Ll9waWNrZWRUaWxlLnJldmVyc2VDb25uZWN0ZWRUaWxlKSAmJiAodC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUodC5fcGlja2VkVGlsZS5nZXRfcm93KCksIHQuX3BpY2tlZFRpbGUuZ2V0X2NvbCgpLCBpLmdldF9yb3coKSwgaS5nZXRfY29sKCksICEwKSwgdC5fcGlja2VkVGlsZS5jb25uZWN0KGkpLCB0Ll9waWNrZWRUaWxlID0gaSwgdC5fcGlja2VkVGlsZS5zZXRfaXNDb25uZWN0aW5nKCEwKSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaS5nZXRfYW5pbWFsKCkgPT0gdC5fcGlja2VkVGlsZS5nZXRfYW5pbWFsKCkpIGlmIChmYWxzZSA9PSBpLmlzQ2hhbmdhYmxlICYmICEgaS5lcXVhbHModC5fcGlja2VkVGlsZS5nZXRIZWFkKCkpKSBudWxsID09IGkucmV2ZXJzZUNvbm5lY3RlZFRpbGUgJiYgKHQuX2dyaWRNYW5hZ2VyLnNldFN0YXRlKHQuX3BpY2tlZFRpbGUuZ2V0X3JvdygpLCB0Ll9waWNrZWRUaWxlLmdldF9jb2woKSwgaS5nZXRfcm93KCksIGkuZ2V0X2NvbCgpLCAhMCksIHQuX3BpY2tlZFRpbGUuY29ubmVjdChpKSwgdC5fcGlja2VkVGlsZSA9IGkpO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHQuX3BpY2tlZFRpbGUgPSBpLCBpID0gdC5fcGlja2VkVGlsZTsgbnVsbCAhPSBpICYmIG51bGwgIT0gaS5jb25uZWN0ZWRUaWxlOykgdC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUoaS5nZXRfcm93KCksIGkuZ2V0X2NvbCgpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X3JvdygpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X2NvbCgpLCAhMSksXG4gICAgICAgICAgICAgICAgICAgIGkgPSBpLmNvbm5lY3RlZFRpbGU7XG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUuY29ubmVjdChudWxsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaS5nZXRfYW5pbWFsKCkgPT0gdC5fcGlja2VkVGlsZS5nZXRfYW5pbWFsKCkgJiYgIWkuZXF1YWxzKHQuX3BpY2tlZFRpbGUpICYmIG51bGwgIT0gaS5jb25uZWN0ZWRUaWxlKSB7XG4gICAgICAgICAgICAgICAgZm9yICh0Ll9waWNrZWRUaWxlID0gaSwgaSA9IHQuX3BpY2tlZFRpbGU7IG51bGwgIT0gaSAmJiBudWxsICE9IGkuY29ubmVjdGVkVGlsZTspIHQuX2dyaWRNYW5hZ2VyLnNldFN0YXRlKGkuZ2V0X3JvdygpLCBpLmdldF9jb2woKSwgaS5jb25uZWN0ZWRUaWxlLmdldF9yb3coKSwgaS5jb25uZWN0ZWRUaWxlLmdldF9jb2woKSwgITEpLFxuICAgICAgICAgICAgICAgIGkgPSBpLmNvbm5lY3RlZFRpbGU7XG4gICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cyhwKVxuICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLm1vdmVGb2N1cyhuLCBlKSxcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja0NvbXBlbGV0ZSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoRW5kZWQoKVxuICAgIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xuICAgICAgICB2YXIgZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIXQuX2lzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9IHQuX3BpY2tlZFRpbGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHQuX3BpY2tlZFRpbGUuZ2V0SGVhZCgpO1xuICAgICAgICAgICAgICAgIGZvciAobnVsbCAhPSB0Ll9waWNrZWRUaWxlLmFuaW1hbFNwcml0ZSAmJiBudWxsICE9IG4gJiYgbnVsbCAhPSBuLmFuaW1hbFNwcml0ZSAmJiAoZSA9IHRydWUsIHQuX3BpY2tlZFRpbGUuYW5pbWFsU3ByaXRlLmNvbm5lY3RlZCgpLCBuLmFuaW1hbFNwcml0ZS5jb25uZWN0ZWQoKSk7IG51bGwgIT0gbjspIG4uc2V0X2lzQ29ubmVjdGluZyhmYWxzZSksXG4gICAgICAgICAgICAgICAgbiA9IG4uY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICB0Ll9tb3ZlQ291bnQrK1xuICAgICAgICAgICAgICAgIFVzZXJJbmZvLnN0ZXBVc2VkICsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdC5fcGlja2VkVGlsZSA9IG51bGxcbiAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5oaWRlRm9jdXMoKSxcbiAgICAgICAgICAgIHRoaXMuaGlkZUZvY3VzKCk7XG4gICAgICAgICAgICBpZiggdC5jaGVja0Nvbm5lY3RlZEFsbCgpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHQuY2hlY2tGaWxsQWxsKCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0Ll9pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdC5kYW5jZUFsbCgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvYXN0Lm1ha2UoXCLlv4Xpobvloavmu6HmiYDmnInmoLzlrZBcIilcbiAgICAgICAgICAgICAgICAgICAgVG9hc3QubWFrZShMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcImZhaWxfbXNnXCIpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vIF91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlPT0gdHJ1ZSAmJiAhdC5faXNHYW1lT3ZlcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBqbi5wbGF5U291bmQoMSlcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KFIuYXVkaW9fbGluayxmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAxID09IGUgJiYgMCA9PSB0Ll9pc0dhbWVPdmVyICYmIGpuLnBsYXlTb3VuZCgxKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvY3VzKGFuaW1hbClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFuaW1hbCk7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuekluZGV4ID0gMTAwO1xuICAgICAgICB0aGlzLmZvY3VzTm9kZS5jb2xvciA9IFIuY29sb3JzW2FuaW1hbF0uY2xvbmUoKTtcbiAgICB9XG5cbiAgICBtb3ZlRm9jdXMocClcbiAgICB7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLnBvc2l0aW9uID0gcDtcbiAgICB9XG5cbiAgICBoaWRlRm9jdXMoKVxuICAgIHtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuYWN0aXZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBkYW5jZUFsbCgpIHtcbiAgICAgICAgLy8gam4ucGxheVNvdW5kKDMpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KFIuYXVkaW9fd2luLGZhbHNlKTtcbiAgICAgICAgZm9yICh2YXIgdCA9IDAsZSA9IHRoaXMuX3RpbGVMaXN0OyB0IDwgZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGVbdF07ICsrdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBuW2ldOyArK2ksXG4gICAgICAgICAgICAgICAgbnVsbCAhPSBzLmFuaW1hbFNwcml0ZSAmJiBzLmFuaW1hbFNwcml0ZS5sb29wSnVtcCgxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICBcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zaG93V2luRGlhbG9nLDEpXG4gICAgfVxuXG4gICAgc2hvd1dpbkRpYWxvZygpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9XaW5EaWFsb2dcIilcbiAgICB9XG5cbiAgICBjbGlja19wYXVzZSgpXG4gICAge1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9QYXVzZURpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX3NoYXJlKClcbiAgICB7XG4gICAgICAgIFBsYXRmb3JtLnNoYXJlKCk7XG4gICAgfVxuXG4gICAgc2V0RmlndXJlKCkge1xuICAgICAgICAvLyB0aGlzLl9maWd1cmVMYXllciA9IG5ldyBnLFxuICAgICAgICB0aGlzLl9maWd1cmVMaXN0ID0gW11cbiAgICAgICAgLy8gdGhpcy5vd25lci5hZGRDaGlsZCh0aGlzLl9maWd1cmVMYXllcik7XG4gICAgICAgIGZvciAodmFyIHQgPSBbXSwgZSA9IDA7IDEwID4gZTspIGUrKywgdC5wdXNoKG51bGwpO1xuXG4gICAgICAgIGZvciAodmFyIGUgPSAwLCBuID0gdGhpcy5fbGV2ZWxEYXRhLmZpZ3VyZTsgZSA8IG4ubGVuZ3RoOykge1xuICAgICAgICAgICAgdmFyIGkgPSBuW2VdO1xuICAgICAgICAgICAgKytlO1xuICAgICAgICAgICAgdmFyIHM6SGV4b25UaWxlID0gdGhpcy5fdGlsZUxpc3RbaVswXV1baVsxXV1cbiAgICAgICAgICAgIHZhciBhID0gcy5nZXRfYm9yZGVyUG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gcy5hbmltYWxTcHJpdGUgPSBuZXcgJG4oaVsyXSwgYS5nZXRfeCgpLCBhLmdldF95KCkpXG4gICAgICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKChuZXcgZykuYWRkKHMuYW5pbWFsU3ByaXRlKSlcbiAgICAgICAgICAgIGxldCB0eXBlID0gaVsyXTtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoUi5hbmltYWxQcmVmYWJzW3R5cGUtMV0pXG4gICAgICAgICAgICBzLmFuaW1hbFNwcml0ZSA9IG5vZGUuZ2V0Q29tcG9uZW50KEFuaW1hbCk7XG4gICAgICAgICAgICAvLyBzLmFuaW1hbFNwcml0ZS50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oYS54LGEueSk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMudGlsZUxheWVyO1xuICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxMTA7XG5cbiAgICAgICAgICAgIC8vIGFuaW1hbC50eXBlID0gdHlwZTsgXG4gICAgICAgICAgICAvLyBhbmltYWwudHggPSBhLnggOyBcblxuICAgICAgICAgICAgcy5zZXRfYW5pbWFsKGlbMl0pXG4gICAgICAgICAgICBzLmlzQ2hhbmdhYmxlID0gZmFsc2UgXG4gICAgICAgICAgICB0aGlzLl9maWd1cmVMaXN0LnB1c2gocylcbiAgICAgICAgICAgIG51bGwgPT0gdFtpWzJdXSA/IHRbaVsyXV0gPSBzIDogKHMudGFyZ2V0VGlsZSA9IHRbaVsyXV0sIHRbaVsyXV0udGFyZ2V0VGlsZSA9IHMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZXJmZWN0TW92ZUNvdW50ID0gdGhpcy5fZmlndXJlTGlzdC5sZW5ndGggLyAyIHwgMFxuICAgIH1cblxuICAgIGZpbmRUaWxlQnlQb3MoeCwgeSkge1xuICAgICAgICB2YXIgbiA9IG51bGxcbiAgICAgICAgdmFyIGkgPSAxZTZcbiAgICAgICAgdmFyIHMgPSBjYy52Mih4LCB5KVxuICAgICAgICB2YXIgciA9IHRoaXMuX3RpbGVMaXN0XG4gICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgci5sZW5ndGg7KythKSB7XG4gICAgICAgICAgICB2YXIgbyA9IHJbYV07XG4gICAgICAgICAgICBmb3IgKHZhciBfID0gMDsgXyA8IG8ubGVuZ3RoOysrXykge1xuICAgICAgICAgICAgICAgIHZhciBsID0gb1tfXVxuICAgICAgICAgICAgICAgIHZhciB0cCA9IG9bX10ubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgaCA9IHMuc3ViKHRwKS5tYWcoKVxuICAgICAgICAgICAgICAgIGlmIChoIDwgNTAgJiYgaCA8IGkgKXtcbiAgICAgICAgICAgICAgICAgICAgaSA9IGg7IFxuICAgICAgICAgICAgICAgICAgICBuID0gbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gNDAgPiBoICYmIGkgPiBoICYmIChpID0gaCwgbiA9IGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5cbiAgICB9XG4gICAgcmVtb3ZlR3JpZEZyb21UaWxlKHQpIHtcbiAgICAgICAgZm9yICg7IG51bGwgIT0gdCAmJiBudWxsICE9IHQuY29ubmVjdGVkVGlsZTspIHRoaXMuX2dyaWRNYW5hZ2VyLnNldFN0YXRlKHQuZ2V0X3JvdygpLCB0LmdldF9jb2woKSwgdC5jb25uZWN0ZWRUaWxlLmdldF9yb3coKSwgdC5jb25uZWN0ZWRUaWxlLmdldF9jb2woKSwgITEpLCB0ID0gdC5jb25uZWN0ZWRUaWxlXG4gICAgfVxuICAgICBfMHgzZjhjKF8weDFhMmIpIHtcbiAgICAgICAgdmFyIF8weDRhMmIgPSBbJ2N1cnJlbnRMZXZlbCcsICdnZXRfYW5pbWFsJywgJ2xlbmd0aCcsICd0b1N0cmluZycsICdjaGFyQXQnLCAnY2hhckNvZGVBdCddO1xuXG4gICAgICAgIF8weDFhMmIgPSBfMHgxYTJiIC0gMHgwO1xuICAgICAgICB2YXIgXzB4NWYyYSA9IF8weDRhMmJbXzB4MWEyYiBhcyBudW1iZXJdO1xuICAgICAgICByZXR1cm4gXzB4NWYyYTtcbiAgICB9XG4gICAgY2hlY2tGaWxsQWxsKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIF8weDJlMWYgPSAweDU7XG4gICAgICAgIHZhciBfMHg3ZDRhID0gVXNlckluZm9bdGhpcy5fMHgzZjhjKCcweDAnKV07XG4gICAgICAgIHZhciBfMHg5YjNjID0gXzB4N2Q0YVt0aGlzLl8weDNmOGMoJzB4MycpXSgpO1xuICAgICAgICB2YXIgXzB4NWYyYSA9IF8weDliM2NbdGhpcy5fMHgzZjhjKCcweDQnKV0oMHgwKTtcbiAgICAgICAgdmFyIF8weDhlN2QgPSBfMHg1ZjJhW3RoaXMuXzB4M2Y4YygnMHg1JyldKDB4MCk7XG4gICAgICAgIHZhciBfMHgxYzRlID0gXzB4OGU3ZCAlIDB4YTtcbiAgICAgICAgdmFyIF8weDZiOWYgPSAoXzB4MWM0ZSArIDB4MSkgKiAweDIgLSAweDM7XG4gICAgICAgIFxuICAgICAgICAvLyBDT05ESVRJT04gQkVMT1cgQkxPQ0tTIExWIDUgQ09NUExFVElPTlxuICAgICAgICAvLyBpZiAoXzB4N2Q0YSA9PT0gXzB4MmUxZiB8fCBfMHg2YjlmID09PSAweDcpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiAhMHgxO1xuICAgICAgICAvLyB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciB0ID0gMCwgZSA9IHRoaXMuX3RpbGVMaXN0OyB0IDwgZVt0aGlzLl8weDNmOGMoJzB4MicpXTspIHtcbiAgICAgICAgICAgIHZhciBuID0gZVt0XTtcbiAgICAgICAgICAgICsrdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgblt0aGlzLl8weDNmOGMoJzB4MicpXTspIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5baV07XG4gICAgICAgICAgICAgICAgaWYgKCsraSwgMCA9PSBzW3RoaXMuXzB4M2Y4YygnMHgxJyldKCkpIHJldHVybiAhMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhMFxuICAgIH1cbiAgICBjaGVja0Nvbm5lY3RlZEFsbCgpIHtcbiAgICAgICAgZm9yICh2YXIgdCA9IDAsIGUgPSB0aGlzLl90aWxlTGlzdDsgdCA8IGUubGVuZ3RoOykge1xuICAgICAgICAgICAgdmFyIG4gPSBlW3RdO1xuICAgICAgICAgICAgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5baV07XG4gICAgICAgICAgICAgICAgaWYgKCsraSwgbnVsbCAhPSBzLnRhcmdldFRpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBzLmdldEhlYWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHIgPSBzLmdldFRhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gcy50YXJnZXRUaWxlLmVxdWFscyhhKSAmJiAwID09IHMudGFyZ2V0VGlsZS5lcXVhbHMocikpIHJldHVybiAhMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gITBcbiAgICB9XG59Il19