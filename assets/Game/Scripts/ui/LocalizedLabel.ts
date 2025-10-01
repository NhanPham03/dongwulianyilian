// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LanguageManager from "../../../framework/plugin_boosts/ui/LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LocalizedLabel extends cc.Component {

    @property
    textKey: string = "";

    private _label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    updateLabel() {
        if (!this._label || !this.textKey) {
            return;
        } 

        const localizedText = LanguageManager.instance.getText(this.textKey);
        this._label.string = localizedText;
    }

    onLoad () {
        this._label = this.getComponent(cc.Label);
        this.updateLabel();

        LanguageManager.instance.node.on("lang-changed", this.updateLabel, this)
    }

    start () {}

    // update (dt) {}
}
