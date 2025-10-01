
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/Animal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba634us93lPYrBZpOaL4ofo', 'Animal');
// Game/Scripts/hex-lines-game/Animal.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.animation = null;
        return _this;
    }
    Animal.prototype.onLoad = function () {
        this.animation = this.getComponentInChildren(cc.Animation);
        this.animation.on("finished", this.onFinish, this);
    };
    Animal.prototype.onFinish = function (s, a) {
        if (a.clip.name == "animal_jump") {
            this.animation.play("animal_idle");
        }
    };
    Animal.prototype.start = function () {
        this.animation.play("animal_idle");
    };
    Animal.prototype.connected = function () {
        var state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Normal;
    };
    Animal.prototype._loopJump = function () {
        var state = this.animation.play("animal_jump");
        state.wrapMode = cc.WrapMode.Loop;
    };
    Animal.prototype.loopJump = function (d) {
        this.scheduleOnce(this._loopJump, g.randomFloat(0, d));
    };
    __decorate([
        property(cc.Sprite)
    ], Animal.prototype, "sprite", void 0);
    Animal = __decorate([
        ccclass
    ], Animal);
    return Animal;
}(cc.Component));
exports.default = Animal;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXEFuaW1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUF3Q0M7UUFyQ0csWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixlQUFTLEdBQWdCLElBQUksQ0FBQzs7SUFrQ2xDLENBQUM7SUFoQ0csdUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQseUJBQVEsR0FBUixVQUFTLENBQUMsRUFBQyxDQUFtQjtRQUUxQixJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLGFBQWEsRUFDL0I7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUNyQztJQUNMLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBRUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDOUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQseUJBQVEsR0FBUixVQUFTLENBQUM7UUFFTixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBcENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MENBQ0k7SUFIUCxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBd0MxQjtJQUFELGFBQUM7Q0F4Q0QsQUF3Q0MsQ0F4Q21DLEVBQUUsQ0FBQyxTQUFTLEdBd0MvQztrQkF4Q29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSIH0gZnJvbSBcIi4vUmVzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWFsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgc3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XG5cblxuICAgIGFuaW1hdGlvbjpjYy5BbmltYXRpb24gPSBudWxsO1xuICAgIFxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLm9uKFwiZmluaXNoZWRcIiwgdGhpcy5vbkZpbmlzaCx0aGlzKVxuICAgIH1cblxuICAgIG9uRmluaXNoKHMsYTpjYy5BbmltYXRpb25TdGF0ZSlcbiAgICB7XG4gICAgICAgIGlmKGEuY2xpcC5uYW1lID09IFwiYW5pbWFsX2p1bXBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShcImFuaW1hbF9pZGxlXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJhbmltYWxfaWRsZVwiKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWQoKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJhbmltYWxfanVtcFwiKTtcbiAgICAgICAgc3RhdGUud3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Ob3JtYWw7XG4gICAgfVxuXG4gICAgX2xvb3BKdW1wKClcbiAgICB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJhbmltYWxfanVtcFwiKVxuICAgICAgICBzdGF0ZS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XG4gICAgfVxuXG4gICAgbG9vcEp1bXAoZClcbiAgICB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuX2xvb3BKdW1wLCBnLnJhbmRvbUZsb2F0KDAsZCkpXG4gICAgfVxufSJdfQ==