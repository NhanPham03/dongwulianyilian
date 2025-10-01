// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { R } from "../../../Game/Scripts/hex-lines-game/Res";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LanguageManager extends cc.Component {

    _locale: any;

    // LIFE-CYCLE CALLBACKS:
    static instance: LanguageManager;

    @property
    region: "zh-CN" | "vn" | "en" = "vn";

    loadLocale(r) {
        for (const locale of R.localeJson.json.locale) {
            if (locale.region == r) {
                this._locale = locale;
                
                this.node.emit("lang-changed");

                break;
            }
        }
    }

    getText(key) {
        return this._locale[key] || key;
    }

    onLoad() {
        LanguageManager.instance = this;
        g.setGlobalInstance(this);
        this.loadLocale(this.region);
        cc.game.addPersistRootNode(this.node);
    }

    start() {
        console.log(`Current locale: ${this.region}`);
    }

    // update (dt) {}
}
