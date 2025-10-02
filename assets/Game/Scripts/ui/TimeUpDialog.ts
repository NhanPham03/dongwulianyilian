import LanguageManager from "../../../framework/plugin_boosts/ui/LanguageManager";
import { UserInfo } from "../Info";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimeUpDialog extends cc.Component {

    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.Label)
    stepLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    onLoad() {}

    start() {}

    onShown() {
        if (LanguageManager.instance.region == "zh-CN") {
            this.levelLabel.string = cc.js.formatStr("- 第 %s 关 -", UserInfo.currentLevel);
        }
        else {
            const text = LanguageManager.instance.getText("level");
            this.levelLabel.string = `- ${text} ${UserInfo.currentLevel} -`;
        }

        this.stepLabel.string = UserInfo.stepUsed.toString();
        this.timeLabel.string = UserInfo.timePassed.toString() + "s";
    }

    click_home() {
        cc.director.loadScene("Main");
    }

    click_restart() {
        cc.director.loadScene("Game");
    }
}
