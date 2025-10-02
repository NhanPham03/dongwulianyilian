const {ccclass, property} = cc._decorator;

@ccclass
export default class RankingTemplate extends cc.Component {

    onLoad () {}
    start () {}


    @property(cc.Label)
    rankLabel:cc.Label = null;

    @property(cc.Label)
    nameLabel:cc.Label = null;

    @property(cc.Label)
    levelLabel:cc.Label = null;

    @property(cc.Boolean)
    highlightNode:boolean = false;

    data:any = null;
}