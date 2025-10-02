import Platform from "../Platform";
import View from "../plugin_boosts/ui/View";
import ViewManager from "../plugin_boosts/ui/ViewManager";
import Common from "../plugin_boosts/utils/Common";
import Signal from "../plugin_boosts/misc/Signal";
import { UserInfo } from "../../Game/Scripts/Info";
import RankingTemplate from "../../Game/Scripts/ui/RankingTemplate";


const {ccclass, property} = cc._decorator;

@ccclass
export default class WxRankDialog extends cc.Component {
    
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    first:boolean = true;

    closeSignal = new Signal();

    loadRankData(): Promise<any> {
        return new Promise((resolve, reject) => {
            const API_URL = "https://5d820f171c8ff70014ef438d.mockapi.io/1/ranking-list";

            const xhr = new XMLHttpRequest();
            xhr.open("GET", API_URL, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        let rankList = JSON.parse(xhr.responseText);

                        rankList.sort((a, b) => b.level - a.level);

                        const currentUser = {
                            rank: 0,
                            name: Platform.getNick() || "YOU",
                            level: UserInfo.level,
                            isCurrentUser: true
                        };

                        for (let i = 0; i < rankList.length; i++) {
                            if (UserInfo.level >= rankList[i].level) {
                                currentUser.rank = i + 1;
                                rankList.splice(i, 0, currentUser);
                                break;
                            }
                        }
                        
                        rankList = rankList.slice(0, 10);
                        rankList.forEach((r, i) => r.rank = i + 1);
                        console.log(rankList);
                        resolve(rankList);
                    } 
                    catch (e) {
                        console.error("Error parsing ranks: " + e);
                        reject(e);
                    }
                }
                else if (xhr.readyState === 4) {
                    console.error("Error fetching ranks: " + xhr.status);
                    reject(xhr.status);
                }
            }
            xhr.send();
        });
    }

    async showRanks() {
        const rankList = await this.loadRankData();

        this.scrollView.showlist((node: cc.Node, data: any, i: number) => {
            let rank = node.getComponent(RankingTemplate);
            rank.data = data;
            rank.rankLabel.string = data.rank;
            rank.levelLabel.string = data.level;
            rank.nameLabel.string = data.name;

            if (data.isCurrentUser) {
                rank.rankLabel.node.color = cc.Color.MAGENTA;
                rank.levelLabel.node.color = cc.Color.MAGENTA;
                rank.nameLabel.node.color = cc.Color.MAGENTA;
            }
        }, rankList);
    }

    async onShown(callback,target) {
        this.closeSignal.on(callback,target)
        if(this.first)
        {
            this.scheduleOnce(this.reOpen,0.1)
        }else{
            Platform.showRank();
            await this.showRanks();
        }
        
    }

    reOpen()
    {
        Platform.showRank();
        this.first = false;
        this.getComponent(View).hide();
        // setTimeout(() => {
            ViewManager.instance.show("wechat/WxRankDialog")
        // }, 100);
        
    }

    click_close()
    {
        Platform.hideRank();
        this.getComponent(View).hide();
        this.closeSignal.fire();
    }
}
