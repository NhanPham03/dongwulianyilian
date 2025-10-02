
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
            if (_this._isGameOver)
                return;
            Info_1.UserInfo.timePassed += 1;
            _this.timeLabel.string = Info_1.UserInfo.timePassed + "s";
            _this.stepLabel.string = Info_1.UserInfo.stepUsed + LanguageManager_1.default.instance.getText("step_count");
            if (Info_1.UserInfo.timePassed >= (10 * Info_1.UserInfo.currentLevel)) {
                _this._isGameOver = true;
                _this.onTimeUp();
            }
        }, 1);
    };
    LineGame.prototype.onTimeUp = function () {
        cc.audioEngine.playEffect(Res_1.R.audio_invalid, false);
        ViewManager_1.default.instance.show("Game/TimeUpDialog");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUEwQjtBQUMxQix5Q0FBb0M7QUFDcEMsNkNBQXdDO0FBQ3hDLGlGQUF1RjtBQUN2RixnQ0FBbUM7QUFDbkMsbUNBQThCO0FBQzlCLCtFQUEwRTtBQUMxRSx3REFBbUQ7QUFDbkQsaUZBQXlFO0FBQ3pFLHVGQUFrRjtBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWthQztRQTdaRyxpQkFBVyxHQUFXLEtBQUssQ0FBQztRQUM1QixnQkFBVSxHQUFVLENBQUMsQ0FBQztRQUV0QixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFFZCxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUs3QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGlCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRWhCLHNCQUFnQixHQUFHLENBQUMsQ0FBQzs7SUFpWXpCLENBQUM7aUJBbGFvQixRQUFRO0lBcUN6QixpQ0FBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7SUFDRCw2QkFBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsZ0NBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUMxQixDQUFDO0lB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RyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFBO0lBQ3JLLENBQUM7SUFHRCwrQkFBWSxHQUFaLFVBQWEsQ0FBQztRQUVWLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLENB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Q087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTztJQTdCUixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBa2E1QjtJQUFELGVBQUM7Q0FsYUQsQUFrYUMsQ0FsYXFDLEVBQUUsQ0FBQyxTQUFTLEdBa2FqRDtrQkFsYW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSIH0gZnJvbSBcIi4vUmVzXCI7XG5pbXBvcnQgSGV4b25UaWxlIGZyb20gXCIuL0hleG9uVGlsZVwiO1xuaW1wb3J0IEdyaWRNYW5hZ2VyIGZyb20gXCIuL0dyaWRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBJbnB1dCwgSW5wdXRTeXN0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvbWlzYy9JbnB1dFN5c3RlbVwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vSW5mb1wiO1xuaW1wb3J0IEFuaW1hbCBmcm9tIFwiLi9BbmltYWxcIjtcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3BsdWdpbl9ib29zdHMvdWkvVmlld01hbmFnZXJcIjtcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL1BsYXRmb3JtXCI7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGx1Z2luX2Jvb3N0cy91aS9Ub2FzdE1hbmFnZXJcIjtcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wbHVnaW5fYm9vc3RzL3VpL0xhbmd1YWdlTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50XG57XG4gICAgX2xldmVsRGF0YTphbnk7XG4gICAgX3RpbGVMaXN0OmFueTtcblxuICAgIF9pc0dhbWVPdmVyOmJvb2xlYW4gPSBmYWxzZTsgXG4gICAgX21vdmVDb3VudDpudW1iZXIgPSAwO1xuXG4gICAgX3BsYXlUaW1lID0gMDtcbiAgICBfY29sQ291bnQgPSA2O1xuICAgIF9yb3dDb3VudCA9IDc7XG5cbiAgICBfcGlja2VkVGlsZTpIZXhvblRpbGUgPSBudWxsO1xuICAgIFxuICAgIHN0YXRpYyBpbnN0YW5jZTpMaW5lR2FtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aWxlTGF5ZXI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGVwTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZm9jdXNOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgX2ZpZ3VyZUxpc3QgPSBbXVxuXG4gICAgcGVyZmVjdE1vdmVDb3VudCA9IDA7XG5cbiAgICBfZ3JpZE1hbmFnZXI6R3JpZE1hbmFnZXI7XG5cbiAgICBnZXRfaXNHYW1lT3ZlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzR2FtZU92ZXJcbiAgICB9XG4gICAgZ2V0X21pbkNvbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsRGF0YS5taW5jb2xcbiAgICB9XG4gICAgZ2V0X21vdmVDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vdmVDb3VudFxuICAgIH1cblxuICAgIGxvYWRMZXZlbCh0KSB7XG4gICAgICAgIC8vdGVzdCA6XG4gICAgICAgIHQgPSBNYXRoLm1pbih0LCBSLmxldmVsSnNvbi5qc29uLmxldmVscy5sZW5ndGgtMSlcbiAgICAgICAgdGhpcy5fbGV2ZWxEYXRhID0gUi5sZXZlbEpzb24uanNvbi5sZXZlbHNbdF07XG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSB0ICtcIlwiXG4gICAgICAgIGlmKHQgPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5vcGVuR3VpZGUsMC4xKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbkd1aWRlKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL09wZW5HdWlkZVwiKVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzO1xuICAgICAgICBMaW5lR2FtZS5pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZExldmVsKFVzZXJJbmZvLmN1cnJlbnRMZXZlbClcblxuICAgICAgICB0aGlzLmhpZGVGb2N1cygpO1xuICAgICAgICB0aGlzLl90aWxlTGlzdCA9IFtdXG4gICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gdGhpcy5fbGV2ZWxEYXRhLnNpemVcbiAgICAgICAgdGhpcy5fY29sQ291bnQgLT0gMTtcblxuICAgICAgICBmb3IgKHZhciBlID0gMCwgbiA9IHRoaXMuX3Jvd0NvdW50OyBuID4gZTspIHtcbiAgICAgICAgICAgIHZhciBpLCBzID0gZSsrIFxuICAgICAgICAgICAgbGV0IHRtcGxpc3QgPSBbXTtcbiAgICAgICAgICAgIGkgPSBzIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IHRoaXMuX2xldmVsRGF0YS5taW5jb2wgKyBzIDogdGhpcy5fbGV2ZWxEYXRhLm1pbmNvbCAtIDEgKyB0aGlzLl9yb3dDb3VudCAtIHM7XG4gICAgICAgICAgICBmb3IgKHZhciByID0gMDsgaSA+IHI7KSB7XG4gICAgICAgICAgICAgICAgdmFyIG8gPSByICsrXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShSLlRpbGVQcmVmYWIpXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChIZXhvblRpbGUpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50aWxlTGF5ZXI7XG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSB0aGlzLl9yb3dDb3VudCAtIHM7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fdGlsZUxheWVyLmFkZENoaWxkKChuZXcgZykuYWRkKG5vZGUpKVxuICAgICAgICAgICAgICAgIHRpbGUuc2V0X3JvdyhzKVxuICAgICAgICAgICAgICAgIHRpbGUuc2V0X2NvbChvKVxuXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuICAgICAgICAgICAgICAgIGxldCBzaGFkb3dOb2RlID0gY2MuaW5zdGFudGlhdGUoUi5UaWxlU2hhZG93KVxuICAgICAgICAgICAgICAgIGxldCBzaGFkb3cgPSBzaGFkb3dOb2RlLmdldENvbXBvbmVudChIZXhvblRpbGUpO1xuICAgICAgICAgICAgICAgIHNoYWRvdy5zZXRfcm93KHMpXG4gICAgICAgICAgICAgICAgc2hhZG93LnNldF9jb2wobylcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnkgLT0gMztcbiAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLnBhcmVudCA9IHRoaXMudGlsZUxheWVyO1xuICAgICAgICAgICAgICAgIHNoYWRvd05vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cblxuICAgICAgICAgICAgICAgIHRtcGxpc3QucHVzaCh0aWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGlsZUxpc3QucHVzaCh0bXBsaXN0KVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2dyaWRNYW5hZ2VyID0gdGhpcy50aWxlTGF5ZXIuYWRkQ29tcG9uZW50KEdyaWRNYW5hZ2VyKVxuICAgICAgICB0aGlzLl9ncmlkTWFuYWdlci5pbml0KHRoaXMuX2xldmVsRGF0YS5taW5jb2wpO1xuICAgICAgICAvLyB0aGlzLl9saW5lTGF5ZXIgPSAobmV3IGcpLmFkZCh0aGlzLl9ncmlkTWFuYWdlciksXG4gICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQodGhpcy5fbGluZUxheWVyKSxcbiAgICAgICAgdGhpcy5zZXRGaWd1cmUoKVxuXG4gICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KElucHV0U3lzdGVtKTtcblxuICAgICAgICBcblxuICAgICAgICAvLyB0aGlzLl91aUxheWVyID0gbmV3IGcsXG4gICAgICAgIC8vIHRoaXMuX3VpTWFuYWdlciA9IG5ldyBuaSh0aGlzLl9zdGFnZUluZGV4ICsgMSksXG4gICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQodGhpcy5fdWlMYXllci5hZGQodGhpcy5fdWlNYW5hZ2VyKSlcblxuICAgICAgICBVc2VySW5mby50aW1lUGFzc2VkID0gMDtcbiAgICAgICAgVXNlckluZm8uc3RlcFVzZWQgPSAwO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKF89PntcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0dhbWVPdmVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIFVzZXJJbmZvLnRpbWVQYXNzZWQgKz0gMVxuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gVXNlckluZm8udGltZVBhc3NlZCArIFwic1wiO1xuICAgICAgICAgICAgdGhpcy5zdGVwTGFiZWwuc3RyaW5nID0gVXNlckluZm8uc3RlcFVzZWQgKyBMYW5ndWFnZU1hbmFnZXIuaW5zdGFuY2UuZ2V0VGV4dChcInN0ZXBfY291bnRcIik7XG5cbiAgICAgICAgICAgIGlmIChVc2VySW5mby50aW1lUGFzc2VkID49ICgxMCAqIFVzZXJJbmZvLmN1cnJlbnRMZXZlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGltZVVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMSlcbiAgICB9XG5cbiAgICBvblRpbWVVcCgpXG4gICAge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KFIuYXVkaW9faW52YWxpZCwgZmFsc2UpO1xuICAgICAgICBWaWV3TWFuYWdlci5pbnN0YW5jZS5zaG93KFwiR2FtZS9UaW1lVXBEaWFsb2dcIik7XG4gICAgfVxuXG4gICAgb25Ub3VjaEJlZ2FuKGUpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgLy8gdmFyIG4gPSB0LnRvdWNoWHRvU2NyZWVuWChlLnZpZXdYKVxuICAgICAgICAgICAgLy8gdmFyIGUgPSB0LnRvdWNoWXRvU2NyZWVuWShlLnZpZXdZKVxuICAgICAgICAgICAgLy8gdmFyIGkgPSB0LmZpbmRUaWxlQnlQb3MobiwgZSlcbiAgICAgICAgICAgIHZhciBwID0gZS5jdXJyZW50VG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIHAgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocCk7XG4gICAgICAgICAgICB2YXIgaTpIZXhvblRpbGUgPSB0LmZpbmRUaWxlQnlQb3MocC54LHAueSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChudWxsICE9IGkgJiYgMCAhPSBpLmdldF9hbmltYWwoKSkge1xuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb19kb3duLGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBqbi5wbGF5U291bmQoMClcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlID0gaVxuICAgICAgICAgICAgICAgIHQucmVtb3ZlR3JpZEZyb21UaWxlKHQuX3BpY2tlZFRpbGUpXG4gICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgaWYobnVsbCAhPSB0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0LnJlbW92ZUdyaWRGcm9tVGlsZSh0Ll9waWNrZWRUaWxlLnRhcmdldFRpbGUpXG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZS5zZXRfaXNDb25uZWN0aW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoITApXG4gICAgICAgICAgICAgICAgaSA9IHQuX3BpY2tlZFRpbGUuZ2V0SGVhZCgpOyBcbiAgICAgICAgICAgICAgICBmb3IgKCA7bnVsbCAhPSBpOykgaS5zZXRfaXNDb25uZWN0aW5nKCEwKSxcbiAgICAgICAgICAgICAgICBpID0gaS5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5zaG93Rm9jdXModC5fcGlja2VkVGlsZS5nZXRfYW5pbWFsKCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZvY3VzKHQuX3BpY2tlZFRpbGUuZ2V0X2FuaW1hbCgpKTtcbiAgICAgICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIubW92ZUZvY3VzKG4sIGUpXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29tcGVsZXRlKClcbiAgICAgICAgICAgIC8vIDEgPT0gID8gMSA9PSB0LmNoZWNrRmlsbEFsbCgpID8gdC5fdWlNYW5hZ2VyLmhpZGVGaWxsQWxsUG9wdXAoKSA6IHQuX3VpTWFuYWdlci5zaG93RmlsbEFsbFBvcHVwKCkgOiB0Ll91aU1hbmFnZXIuaGlkZUZpbGxBbGxQb3B1cCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NvbXBlbGV0ZSgpXG4gICAge1xuICAgICAgICBpZiggdGhpcy5jaGVja0Nvbm5lY3RlZEFsbCgpKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrRmlsbEFsbCgpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHQuX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vICB0Ll91aU1hbmFnZXIuc2hvd0ZpbGxBbGxQb3B1cCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVGlsZUNvbm5lY3RlZCh0LCBlKSB7XG4gICAgICAgIHZhciBuLCBpID0gdC5fcm93O1xuICAgICAgICBuID0gdC5fY29sICsgKGkgPD0gdGhpcy5fcm93Q291bnQgLyAyID8gMCA6IHQuX3JvdyAtICh0aGlzLl9yb3dDb3VudCAvIDIgfCAwKSk7XG4gICAgICAgIHZhciBzLCBhID0gZS5fcm93O1xuICAgICAgICByZXR1cm4gcyA9IGUuX2NvbCArIChhIDw9IHRoaXMuX3Jvd0NvdW50IC8gMiA/IDAgOiBlLl9yb3cgLSAodGhpcy5fcm93Q291bnQgLyAyIHwgMCkpLFxuICAgICAgICBpIC0gMSA9PSBhICYmIG4gLSAxID09IHMgfHwgaSAtIDEgPT0gYSAmJiBuID09IHMgfHwgaSA9PSBhICYmIG4gLSAxID09IHMgfHwgaSA9PSBhICYmIG4gKyAxID09IHMgfHwgaSArIDEgPT0gYSAmJiBuID09IHMgfHwgaSArIDEgPT0gYSAmJiBuICsgMSA9PSBzID8gdHJ1ZTpmYWxzZVxuICAgIH1cblxuXG4gICAgb25Ub3VjaE1vdmVkKGUpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgdmFyIHAgPSBlLmN1cnJlbnRUb3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwKTtcbiAgICAgICAgICAgIHZhciBpOkhleG9uVGlsZSA9IHQuZmluZFRpbGVCeVBvcyhwLngscC55KTtcblxuICAgICAgICAgICAgaWYgKG51bGwgIT0gdC5fcGlja2VkVGlsZSAmJiBudWxsICE9IGkpIGlmICh0LmlzVGlsZUNvbm5lY3RlZCh0Ll9waWNrZWRUaWxlLCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICgwID09IGkuZ2V0X2FuaW1hbCgpKShudWxsID09IHQuX3BpY2tlZFRpbGUudGFyZ2V0VGlsZSB8fCBudWxsID09IHQuX3BpY2tlZFRpbGUucmV2ZXJzZUNvbm5lY3RlZFRpbGUpICYmICh0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZSh0Ll9waWNrZWRUaWxlLmdldF9yb3coKSwgdC5fcGlja2VkVGlsZS5nZXRfY29sKCksIGkuZ2V0X3JvdygpLCBpLmdldF9jb2woKSwgITApLCB0Ll9waWNrZWRUaWxlLmNvbm5lY3QoaSksIHQuX3BpY2tlZFRpbGUgPSBpLCB0Ll9waWNrZWRUaWxlLnNldF9pc0Nvbm5lY3RpbmcoITApKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpLmdldF9hbmltYWwoKSA9PSB0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSkgaWYgKGZhbHNlID09IGkuaXNDaGFuZ2FibGUgJiYgISBpLmVxdWFscyh0Ll9waWNrZWRUaWxlLmdldEhlYWQoKSkpIG51bGwgPT0gaS5yZXZlcnNlQ29ubmVjdGVkVGlsZSAmJiAodC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUodC5fcGlja2VkVGlsZS5nZXRfcm93KCksIHQuX3BpY2tlZFRpbGUuZ2V0X2NvbCgpLCBpLmdldF9yb3coKSwgaS5nZXRfY29sKCksICEwKSwgdC5fcGlja2VkVGlsZS5jb25uZWN0KGkpLCB0Ll9waWNrZWRUaWxlID0gaSk7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodC5fcGlja2VkVGlsZSA9IGksIGkgPSB0Ll9waWNrZWRUaWxlOyBudWxsICE9IGkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGU7KSB0Ll9ncmlkTWFuYWdlci5zZXRTdGF0ZShpLmdldF9yb3coKSwgaS5nZXRfY29sKCksIGkuY29ubmVjdGVkVGlsZS5nZXRfcm93KCksIGkuY29ubmVjdGVkVGlsZS5nZXRfY29sKCksICExKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICAgICAgdC5fcGlja2VkVGlsZS5jb25uZWN0KG51bGwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpLmdldF9hbmltYWwoKSA9PSB0Ll9waWNrZWRUaWxlLmdldF9hbmltYWwoKSAmJiAhaS5lcXVhbHModC5fcGlja2VkVGlsZSkgJiYgbnVsbCAhPSBpLmNvbm5lY3RlZFRpbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHQuX3BpY2tlZFRpbGUgPSBpLCBpID0gdC5fcGlja2VkVGlsZTsgbnVsbCAhPSBpICYmIG51bGwgIT0gaS5jb25uZWN0ZWRUaWxlOykgdC5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUoaS5nZXRfcm93KCksIGkuZ2V0X2NvbCgpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X3JvdygpLCBpLmNvbm5lY3RlZFRpbGUuZ2V0X2NvbCgpLCAhMSksXG4gICAgICAgICAgICAgICAgaSA9IGkuY29ubmVjdGVkVGlsZTtcbiAgICAgICAgICAgICAgICB0Ll9waWNrZWRUaWxlLmNvbm5lY3QobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzKHApXG4gICAgICAgICAgICAvLyB0Ll91aU1hbmFnZXIubW92ZUZvY3VzKG4sIGUpLFxuICAgICAgICAgICAgLy90aGlzLmNoZWNrQ29tcGVsZXRlKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hFbmRlZCgpXG4gICAge1xuICAgICAgICBsZXQgdCA9IHRoaXM7XG4gICAgICAgIHZhciBlID0gZmFsc2U7XG4gICAgICAgIGlmICghdC5faXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgaWYgKG51bGwgIT0gdC5fcGlja2VkVGlsZSkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gdC5fcGlja2VkVGlsZS5nZXRIZWFkKCk7XG4gICAgICAgICAgICAgICAgZm9yIChudWxsICE9IHQuX3BpY2tlZFRpbGUuYW5pbWFsU3ByaXRlICYmIG51bGwgIT0gbiAmJiBudWxsICE9IG4uYW5pbWFsU3ByaXRlICYmIChlID0gdHJ1ZSwgdC5fcGlja2VkVGlsZS5hbmltYWxTcHJpdGUuY29ubmVjdGVkKCksIG4uYW5pbWFsU3ByaXRlLmNvbm5lY3RlZCgpKTsgbnVsbCAhPSBuOykgbi5zZXRfaXNDb25uZWN0aW5nKGZhbHNlKSxcbiAgICAgICAgICAgICAgICBuID0gbi5jb25uZWN0ZWRUaWxlO1xuICAgICAgICAgICAgICAgIHQuX21vdmVDb3VudCsrXG4gICAgICAgICAgICAgICAgVXNlckluZm8uc3RlcFVzZWQgKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0Ll9waWNrZWRUaWxlID0gbnVsbFxuICAgICAgICAgICAgLy8gdC5fdWlNYW5hZ2VyLmhpZGVGb2N1cygpLFxuICAgICAgICAgICAgdGhpcy5oaWRlRm9jdXMoKTtcbiAgICAgICAgICAgIGlmKCB0LmNoZWNrQ29ubmVjdGVkQWxsKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYodC5jaGVja0ZpbGxBbGwoKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHQuX2lzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0LmRhbmNlQWxsKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9hc3QubWFrZShcIuW/hemhu+Whq+a7oeaJgOacieagvOWtkFwiKVxuICAgICAgICAgICAgICAgICAgICBUb2FzdC5tYWtlKExhbmd1YWdlTWFuYWdlci5pbnN0YW5jZS5nZXRUZXh0KFwiZmFpbF9tc2dcIikpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy8gX3VpTWFuYWdlci5oaWRlRmlsbEFsbFBvcHVwKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGU9PSB0cnVlICYmICF0Ll9pc0dhbWVPdmVyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGpuLnBsYXlTb3VuZCgxKVxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb19saW5rLGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIDEgPT0gZSAmJiAwID09IHQuX2lzR2FtZU92ZXIgJiYgam4ucGxheVNvdW5kKDEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9jdXMoYW5pbWFsKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coYW5pbWFsKTtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLmZvY3VzTm9kZS56SW5kZXggPSAxMDA7XG4gICAgICAgIHRoaXMuZm9jdXNOb2RlLmNvbG9yID0gUi5jb2xvcnNbYW5pbWFsXS5jbG9uZSgpO1xuICAgIH1cblxuICAgIG1vdmVGb2N1cyhwKVxuICAgIHtcbiAgICAgICAgdGhpcy5mb2N1c05vZGUucG9zaXRpb24gPSBwO1xuICAgIH1cblxuICAgIGhpZGVGb2N1cygpXG4gICAge1xuICAgICAgICB0aGlzLmZvY3VzTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cblxuICAgIGRhbmNlQWxsKCkge1xuICAgICAgICAvLyBqbi5wbGF5U291bmQoMyk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoUi5hdWRpb193aW4sZmFsc2UpO1xuICAgICAgICBmb3IgKHZhciB0ID0gMCxlID0gdGhpcy5fdGlsZUxpc3Q7IHQgPCBlLmxlbmd0aDspIHtcbiAgICAgICAgICAgIHZhciBuID0gZVt0XTsgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5baV07ICsraSxcbiAgICAgICAgICAgICAgICBudWxsICE9IHMuYW5pbWFsU3ByaXRlICYmIHMuYW5pbWFsU3ByaXRlLmxvb3BKdW1wKDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIFxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnNob3dXaW5EaWFsb2csMSlcbiAgICB9XG5cbiAgICBzaG93V2luRGlhbG9nKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1dpbkRpYWxvZ1wiKVxuICAgIH1cblxuICAgIGNsaWNrX3BhdXNlKClcbiAgICB7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmluc3RhbmNlLnNob3coXCJHYW1lL1BhdXNlRGlhbG9nXCIpXG4gICAgfVxuXG4gICAgY2xpY2tfc2hhcmUoKVxuICAgIHtcbiAgICAgICAgUGxhdGZvcm0uc2hhcmUoKTtcbiAgICB9XG5cbiAgICBzZXRGaWd1cmUoKSB7XG4gICAgICAgIC8vIHRoaXMuX2ZpZ3VyZUxheWVyID0gbmV3IGcsXG4gICAgICAgIHRoaXMuX2ZpZ3VyZUxpc3QgPSBbXVxuICAgICAgICAvLyB0aGlzLm93bmVyLmFkZENoaWxkKHRoaXMuX2ZpZ3VyZUxheWVyKTtcbiAgICAgICAgZm9yICh2YXIgdCA9IFtdLCBlID0gMDsgMTAgPiBlOykgZSsrLCB0LnB1c2gobnVsbCk7XG5cbiAgICAgICAgZm9yICh2YXIgZSA9IDAsIG4gPSB0aGlzLl9sZXZlbERhdGEuZmlndXJlOyBlIDwgbi5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgaSA9IG5bZV07XG4gICAgICAgICAgICArK2U7XG4gICAgICAgICAgICB2YXIgczpIZXhvblRpbGUgPSB0aGlzLl90aWxlTGlzdFtpWzBdXVtpWzFdXVxuICAgICAgICAgICAgdmFyIGEgPSBzLmdldF9ib3JkZXJQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBzLmFuaW1hbFNwcml0ZSA9IG5ldyAkbihpWzJdLCBhLmdldF94KCksIGEuZ2V0X3koKSlcbiAgICAgICAgICAgIC8vIHRoaXMub3duZXIuYWRkQ2hpbGQoKG5ldyBnKS5hZGQocy5hbmltYWxTcHJpdGUpKVxuICAgICAgICAgICAgbGV0IHR5cGUgPSBpWzJdO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShSLmFuaW1hbFByZWZhYnNbdHlwZS0xXSlcbiAgICAgICAgICAgIHMuYW5pbWFsU3ByaXRlID0gbm9kZS5nZXRDb21wb25lbnQoQW5pbWFsKTtcbiAgICAgICAgICAgIC8vIHMuYW5pbWFsU3ByaXRlLnR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihhLngsYS55KTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50aWxlTGF5ZXI7XG4gICAgICAgICAgICBub2RlLnpJbmRleCA9IDExMDtcblxuICAgICAgICAgICAgLy8gYW5pbWFsLnR5cGUgPSB0eXBlOyBcbiAgICAgICAgICAgIC8vIGFuaW1hbC50eCA9IGEueCA7IFxuXG4gICAgICAgICAgICBzLnNldF9hbmltYWwoaVsyXSlcbiAgICAgICAgICAgIHMuaXNDaGFuZ2FibGUgPSBmYWxzZSBcbiAgICAgICAgICAgIHRoaXMuX2ZpZ3VyZUxpc3QucHVzaChzKVxuICAgICAgICAgICAgbnVsbCA9PSB0W2lbMl1dID8gdFtpWzJdXSA9IHMgOiAocy50YXJnZXRUaWxlID0gdFtpWzJdXSwgdFtpWzJdXS50YXJnZXRUaWxlID0gcylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlcmZlY3RNb3ZlQ291bnQgPSB0aGlzLl9maWd1cmVMaXN0Lmxlbmd0aCAvIDIgfCAwXG4gICAgfVxuXG4gICAgZmluZFRpbGVCeVBvcyh4LCB5KSB7XG4gICAgICAgIHZhciBuID0gbnVsbFxuICAgICAgICB2YXIgaSA9IDFlNlxuICAgICAgICB2YXIgcyA9IGNjLnYyKHgsIHkpXG4gICAgICAgIHZhciByID0gdGhpcy5fdGlsZUxpc3RcbiAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCByLmxlbmd0aDsrK2EpIHtcbiAgICAgICAgICAgIHZhciBvID0gclthXTtcbiAgICAgICAgICAgIGZvciAodmFyIF8gPSAwOyBfIDwgby5sZW5ndGg7KytfKSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBvW19dXG4gICAgICAgICAgICAgICAgdmFyIHRwID0gb1tfXS5ub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBoID0gcy5zdWIodHApLm1hZygpXG4gICAgICAgICAgICAgICAgaWYgKGggPCA1MCAmJiBoIDwgaSApe1xuICAgICAgICAgICAgICAgICAgICBpID0gaDsgXG4gICAgICAgICAgICAgICAgICAgIG4gPSBsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyA0MCA+IGggJiYgaSA+IGggJiYgKGkgPSBoLCBuID0gbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gblxuICAgIH1cbiAgICByZW1vdmVHcmlkRnJvbVRpbGUodCkge1xuICAgICAgICBmb3IgKDsgbnVsbCAhPSB0ICYmIG51bGwgIT0gdC5jb25uZWN0ZWRUaWxlOykgdGhpcy5fZ3JpZE1hbmFnZXIuc2V0U3RhdGUodC5nZXRfcm93KCksIHQuZ2V0X2NvbCgpLCB0LmNvbm5lY3RlZFRpbGUuZ2V0X3JvdygpLCB0LmNvbm5lY3RlZFRpbGUuZ2V0X2NvbCgpLCAhMSksIHQgPSB0LmNvbm5lY3RlZFRpbGVcbiAgICB9XG4gICAgIF8weDNmOGMoXzB4MWEyYikge1xuICAgICAgICB2YXIgXzB4NGEyYiA9IFsnY3VycmVudExldmVsJywgJ2dldF9hbmltYWwnLCAnbGVuZ3RoJywgJ3RvU3RyaW5nJywgJ2NoYXJBdCcsICdjaGFyQ29kZUF0J107XG5cbiAgICAgICAgXzB4MWEyYiA9IF8weDFhMmIgLSAweDA7XG4gICAgICAgIHZhciBfMHg1ZjJhID0gXzB4NGEyYltfMHgxYTJiIGFzIG51bWJlcl07XG4gICAgICAgIHJldHVybiBfMHg1ZjJhO1xuICAgIH1cbiAgICBjaGVja0ZpbGxBbGwoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgXzB4MmUxZiA9IDB4NTtcbiAgICAgICAgdmFyIF8weDdkNGEgPSBVc2VySW5mb1t0aGlzLl8weDNmOGMoJzB4MCcpXTtcbiAgICAgICAgdmFyIF8weDliM2MgPSBfMHg3ZDRhW3RoaXMuXzB4M2Y4YygnMHgzJyldKCk7XG4gICAgICAgIHZhciBfMHg1ZjJhID0gXzB4OWIzY1t0aGlzLl8weDNmOGMoJzB4NCcpXSgweDApO1xuICAgICAgICB2YXIgXzB4OGU3ZCA9IF8weDVmMmFbdGhpcy5fMHgzZjhjKCcweDUnKV0oMHgwKTtcbiAgICAgICAgdmFyIF8weDFjNGUgPSBfMHg4ZTdkICUgMHhhO1xuICAgICAgICB2YXIgXzB4NmI5ZiA9IChfMHgxYzRlICsgMHgxKSAqIDB4MiAtIDB4MztcbiAgICAgICAgXG4gICAgICAgIC8vIENPTkRJVElPTiBCRUxPVyBCTE9DS1MgTFYgNSBDT01QTEVUSU9OXG4gICAgICAgIC8vIGlmIChfMHg3ZDRhID09PSBfMHgyZTFmIHx8IF8weDZiOWYgPT09IDB4Nykge1xuICAgICAgICAvLyAgICAgcmV0dXJuICEweDE7XG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIHQgPSAwLCBlID0gdGhpcy5fdGlsZUxpc3Q7IHQgPCBlW3RoaXMuXzB4M2Y4YygnMHgyJyldOykge1xuICAgICAgICAgICAgdmFyIG4gPSBlW3RdO1xuICAgICAgICAgICAgKyt0O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuW3RoaXMuXzB4M2Y4YygnMHgyJyldOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKytpLCAwID09IHNbdGhpcy5fMHgzZjhjKCcweDEnKV0oKSkgcmV0dXJuICExXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEwXG4gICAgfVxuICAgIGNoZWNrQ29ubmVjdGVkQWxsKCkge1xuICAgICAgICBmb3IgKHZhciB0ID0gMCwgZSA9IHRoaXMuX3RpbGVMaXN0OyB0IDwgZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGVbdF07XG4gICAgICAgICAgICArK3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoKytpLCBudWxsICE9IHMudGFyZ2V0VGlsZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHMuZ2V0SGVhZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHMuZ2V0VGFpbCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBzLnRhcmdldFRpbGUuZXF1YWxzKGEpICYmIDAgPT0gcy50YXJnZXRUaWxlLmVxdWFscyhyKSkgcmV0dXJuICExXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhMFxuICAgIH1cbn0iXX0=