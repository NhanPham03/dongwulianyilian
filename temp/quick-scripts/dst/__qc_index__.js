
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Game/Scripts/Info');
require('./assets/Game/Scripts/Main');
require('./assets/Game/Scripts/hex-lines-game/Animal');
require('./assets/Game/Scripts/hex-lines-game/Consts');
require('./assets/Game/Scripts/hex-lines-game/Game');
require('./assets/Game/Scripts/hex-lines-game/GridManager');
require('./assets/Game/Scripts/hex-lines-game/HexonTile');
require('./assets/Game/Scripts/hex-lines-game/Res');
require('./assets/Game/Scripts/hex-lines-game/base/com');
require('./assets/Game/Scripts/hex-lines-game/ds/IntMap');
require('./assets/Game/Scripts/ui/DCBackground');
require('./assets/Game/Scripts/ui/DCParticleSystem');
require('./assets/Game/Scripts/ui/DailyGetDialog');
require('./assets/Game/Scripts/ui/GetDialog');
require('./assets/Game/Scripts/ui/HbDialog');
require('./assets/Game/Scripts/ui/LevelDialog');
require('./assets/Game/Scripts/ui/LevelupDialog');
require('./assets/Game/Scripts/ui/LocalizedLabel');
require('./assets/Game/Scripts/ui/LuckyDialog');
require('./assets/Game/Scripts/ui/PauseDialog');
require('./assets/Game/Scripts/ui/RankingTemplate');
require('./assets/Game/Scripts/ui/ShopDialog');
require('./assets/Game/Scripts/ui/ShopItemTemplate');
require('./assets/Game/Scripts/ui/TimeUpDialog');
require('./assets/Game/Scripts/ui/WinDialog');
require('./assets/framework/Platform');
require('./assets/framework/network/ConnectManager');
require('./assets/framework/network/Message');
require('./assets/framework/network/MessageBase');
require('./assets/framework/network/MessageDispatch');
require('./assets/framework/network/MessageHandler');
require('./assets/framework/network/MessageType');
require('./assets/framework/network/Socket');
require('./assets/framework/plugin_boosts/gamesys/Device');
require('./assets/framework/plugin_boosts/gamesys/FSM');
require('./assets/framework/plugin_boosts/gamesys/InfiniteBackground');
require('./assets/framework/plugin_boosts/gamesys/LocalLifeSystem');
require('./assets/framework/plugin_boosts/gamesys/LocalTimeSystem');
require('./assets/framework/plugin_boosts/gamesys/PoolManager');
require('./assets/framework/plugin_boosts/gamesys/PsFx');
require('./assets/framework/plugin_boosts/gamesys/PsFxPlayer');
require('./assets/framework/plugin_boosts/gamesys/PsSpawner');
require('./assets/framework/plugin_boosts/libs/easing');
require('./assets/framework/plugin_boosts/misc/BoostsAction');
require('./assets/framework/plugin_boosts/misc/ClickAudio');
require('./assets/framework/plugin_boosts/misc/ClickAudioManager');
require('./assets/framework/plugin_boosts/misc/DataCenter');
require('./assets/framework/plugin_boosts/misc/FrameSwitch');
require('./assets/framework/plugin_boosts/misc/InputSystem');
require('./assets/framework/plugin_boosts/misc/JoyStick');
require('./assets/framework/plugin_boosts/misc/Net');
require('./assets/framework/plugin_boosts/misc/Signal');
require('./assets/framework/plugin_boosts/misc/SpriteFrameCache');
require('./assets/framework/plugin_boosts/ui/DCLabel');
require('./assets/framework/plugin_boosts/ui/DCPandoraPoint');
require('./assets/framework/plugin_boosts/ui/DCSprite');
require('./assets/framework/plugin_boosts/ui/DCToggle');
require('./assets/framework/plugin_boosts/ui/DCUI');
require('./assets/framework/plugin_boosts/ui/LanguageManager');
require('./assets/framework/plugin_boosts/ui/LoadingManager');
require('./assets/framework/plugin_boosts/ui/MessageBoxComponent');
require('./assets/framework/plugin_boosts/ui/MessageBoxManager');
require('./assets/framework/plugin_boosts/ui/PandoraPoint');
require('./assets/framework/plugin_boosts/ui/ToastComponent');
require('./assets/framework/plugin_boosts/ui/ToastManager');
require('./assets/framework/plugin_boosts/ui/UIComponent');
require('./assets/framework/plugin_boosts/ui/UIFunctions');
require('./assets/framework/plugin_boosts/ui/View');
require('./assets/framework/plugin_boosts/ui/ViewManager');
require('./assets/framework/plugin_boosts/ui/game/LanguageSelector');
require('./assets/framework/plugin_boosts/ui/game/LevelSelector');
require('./assets/framework/plugin_boosts/utils/Common');
require('./assets/framework/plugin_boosts/utils/EventManager');
require('./assets/framework/plugin_boosts/utils/Intersection');
require('./assets/framework/qqsdk/BKTool');
require('./assets/framework/qqsdk/SoundHelper');
require('./assets/framework/wxsdk/AddToMyFav');
require('./assets/framework/wxsdk/GameConfigs');
require('./assets/framework/wxsdk/MoreGameComponent');
require('./assets/framework/wxsdk/MoreGameDialog');
require('./assets/framework/wxsdk/MoreGameItem');
require('./assets/framework/wxsdk/MoreGameManager');
require('./assets/framework/wxsdk/MoreGameStyle');
require('./assets/framework/wxsdk/WxRankDialog');
require('./assets/framework/wxsdk/sdk');
require('./assets/migration/use_v2.0.x_cc.Toggle_event');

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