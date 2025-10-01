// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LanguageManager from "../LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LanguageSelector extends cc.Component {

    manager: LanguageManager;

    onLoad() {
        this.manager = LanguageManager.instance;
    }

    start() {}

    setRegion(event, msg) {
        if (!this.manager) {
            console.warn("LanguageSelector: manager is null");
            return;
        }

        this.manager.loadLocale(event.target.name);
        this.manager.region = event.target.name;
        console.log(`LanguageSelector: Switching to ${event.target.name}`);
    }
}
