"use strict";
cc._RF.push(module, 'b7431S0vqlPiqNKDpwvWLTc', 'AddToMyFav');
// framework/wxsdk/AddToMyFav.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Platform_1 = require("../Platform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PositionType;
(function (PositionType) {
    PositionType[PositionType["left"] = 0] = "left";
    PositionType[PositionType["bottom"] = 1] = "bottom";
    PositionType[PositionType["auto"] = 2] = "auto";
})(PositionType || (PositionType = {}));
var AddToMyFav = /** @class */ (function (_super) {
    __extends(AddToMyFav, _super);
    function AddToMyFav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointer = null;
        _this.posType = PositionType.auto;
        _this.hideAfterSec = 30;
        _this.widget = null;
        return _this;
    }
    AddToMyFav.prototype.onLoad = function () {
        this.widget = this.getComponent(cc.Widget);
    };
    AddToMyFav.prototype.start = function () {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            var options = Platform_1.default.getLaunchOptions();
            console.log("场景值 :", options);
            if (options.scene == 1001 || options.scene == 1089) {
                this.node.active = false;
                return;
            }
        }
        // if(g.isNextDay(UserInfo.showAddFavTime) )
        // {
        //     UserInfo.showAddFavTime = new Date().getTime();
        // }else{
        //     this.node.active = false;
        //     return;
        // }
        if (this.posType == PositionType.auto) {
            var ratio = cc.winSize.height / cc.winSize.width;
            if (ratio > 1.98) {
                this.showStyle2();
            }
            else {
                this.showStyle1();
            }
        }
        else if (this.posType == PositionType.bottom) {
            this.showStyle1();
        }
        else if (this.posType == PositionType.left) {
            this.showStyle2();
        }
        this.scheduleOnce(this.click_hide, this.hideAfterSec);
    };
    AddToMyFav.prototype.click_hide = function () {
        this.node.active = false;
    };
    AddToMyFav.prototype.showStyle1 = function () {
        this.pointer.rotation = 0;
        this.widget.top = 128;
        this.widget.right = 140;
        this.widget.updateAlignment();
    };
    AddToMyFav.prototype.showStyle2 = function () {
        this.pointer.rotation = 90;
        this.widget.top = 40;
        this.widget.right = 300;
        this.widget.updateAlignment();
    };
    __decorate([
        property(cc.Node)
    ], AddToMyFav.prototype, "pointer", void 0);
    __decorate([
        property({ type: cc.Enum(PositionType) })
    ], AddToMyFav.prototype, "posType", void 0);
    __decorate([
        property()
    ], AddToMyFav.prototype, "hideAfterSec", void 0);
    AddToMyFav = __decorate([
        ccclass
    ], AddToMyFav);
    return AddToMyFav;
}(cc.Component));
exports.default = AddToMyFav;

cc._RF.pop();