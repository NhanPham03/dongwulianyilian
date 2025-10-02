
(function () {
var scripts = [{"deps":{"./assets/framework/network/Message":7,"./assets/framework/network/MessageBase":14,"./assets/framework/network/MessageDispatch":16,"./assets/framework/network/MessageHandler":17,"./assets/framework/network/MessageType":18,"./assets/framework/network/Socket":19,"./assets/framework/network/ConnectManager":21,"./assets/framework/qqsdk/SoundHelper":8,"./assets/framework/qqsdk/BKTool":23,"./assets/framework/wxsdk/GameConfigs":35,"./assets/framework/wxsdk/MoreGameComponent":9,"./assets/framework/wxsdk/MoreGameDialog":28,"./assets/framework/wxsdk/MoreGameItem":24,"./assets/framework/wxsdk/MoreGameManager":36,"./assets/framework/wxsdk/MoreGameStyle":27,"./assets/framework/wxsdk/WxRankDialog":32,"./assets/framework/wxsdk/sdk":34,"./assets/framework/wxsdk/AddToMyFav":30,"./assets/migration/use_v2.0.x_cc.Toggle_event":1,"./assets/Game/Scripts/Info":20,"./assets/Game/Scripts/hex-lines-game/Consts":22,"./assets/Game/Scripts/hex-lines-game/Game":25,"./assets/Game/Scripts/hex-lines-game/GridManager":33,"./assets/Game/Scripts/hex-lines-game/HexonTile":31,"./assets/Game/Scripts/hex-lines-game/Res":26,"./assets/Game/Scripts/hex-lines-game/Animal":29,"./assets/Game/Scripts/hex-lines-game/base/com":4,"./assets/Game/Scripts/hex-lines-game/ds/IntMap":10,"./assets/Game/Scripts/ui/DCParticleSystem":39,"./assets/Game/Scripts/ui/DailyGetDialog":11,"./assets/Game/Scripts/ui/GetDialog":38,"./assets/Game/Scripts/ui/HbDialog":40,"./assets/Game/Scripts/ui/LevelDialog":37,"./assets/Game/Scripts/ui/LevelupDialog":44,"./assets/Game/Scripts/ui/LocalizedLabel":42,"./assets/Game/Scripts/ui/LuckyDialog":43,"./assets/Game/Scripts/ui/PauseDialog":46,"./assets/Game/Scripts/ui/ShopDialog":49,"./assets/Game/Scripts/ui/ShopItemTemplate":45,"./assets/Game/Scripts/ui/TimeUpDialog":85,"./assets/Game/Scripts/ui/WinDialog":51,"./assets/Game/Scripts/ui/DCBackground":48,"./assets/Game/Scripts/Main":2,"./assets/framework/Platform":3,"./assets/framework/plugin_boosts/gamesys/InfiniteBackground":47,"./assets/framework/plugin_boosts/gamesys/LocalLifeSystem":6,"./assets/framework/plugin_boosts/gamesys/LocalTimeSystem":52,"./assets/framework/plugin_boosts/gamesys/PoolManager":41,"./assets/framework/plugin_boosts/gamesys/PsFx":54,"./assets/framework/plugin_boosts/gamesys/PsFxPlayer":53,"./assets/framework/plugin_boosts/gamesys/PsSpawner":50,"./assets/framework/plugin_boosts/gamesys/Device":56,"./assets/framework/plugin_boosts/libs/easing":13,"./assets/framework/plugin_boosts/misc/ClickAudio":12,"./assets/framework/plugin_boosts/misc/ClickAudioManager":55,"./assets/framework/plugin_boosts/misc/DataCenter":62,"./assets/framework/plugin_boosts/misc/FrameSwitch":61,"./assets/framework/plugin_boosts/misc/InputSystem":57,"./assets/framework/plugin_boosts/misc/JoyStick":65,"./assets/framework/plugin_boosts/misc/Net":73,"./assets/framework/plugin_boosts/misc/Signal":70,"./assets/framework/plugin_boosts/misc/SpriteFrameCache":63,"./assets/framework/plugin_boosts/misc/BoostsAction":75,"./assets/framework/plugin_boosts/ui/DCPandoraPoint":58,"./assets/framework/plugin_boosts/ui/DCSprite":60,"./assets/framework/plugin_boosts/ui/DCToggle":59,"./assets/framework/plugin_boosts/ui/DCUI":66,"./assets/framework/plugin_boosts/ui/LanguageManager":64,"./assets/framework/plugin_boosts/ui/LoadingManager":67,"./assets/framework/plugin_boosts/ui/MessageBoxComponent":69,"./assets/framework/plugin_boosts/ui/MessageBoxManager":68,"./assets/framework/plugin_boosts/ui/PandoraPoint":74,"./assets/framework/plugin_boosts/ui/ToastComponent":71,"./assets/framework/plugin_boosts/ui/ToastManager":76,"./assets/framework/plugin_boosts/ui/UIComponent":72,"./assets/framework/plugin_boosts/ui/UIFunctions":77,"./assets/framework/plugin_boosts/ui/View":81,"./assets/framework/plugin_boosts/ui/ViewManager":84,"./assets/framework/plugin_boosts/ui/DCLabel":80,"./assets/framework/plugin_boosts/ui/game/LevelSelector":5,"./assets/framework/plugin_boosts/ui/game/LanguageSelector":78,"./assets/framework/plugin_boosts/utils/EventManager":79,"./assets/framework/plugin_boosts/utils/Intersection":15,"./assets/framework/plugin_boosts/utils/Common":83,"./assets/framework/plugin_boosts/gamesys/FSM":82},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{"./Info":20,"../../framework/Platform":3,"./hex-lines-game/Res":26,"../../framework/plugin_boosts/ui/LanguageManager":64,"../../framework/plugin_boosts/ui/ViewManager":84,"../../framework/plugin_boosts/gamesys/Device":56,"../../framework/plugin_boosts/ui/ToastManager":76},"path":"preview-scripts/assets/Game/Scripts/Main.js"},{"deps":{"./wxsdk/sdk":34,"./qqsdk/BKTool":23,"./plugin_boosts/ui/ToastManager":76,"./plugin_boosts/misc/Signal":70,"./plugin_boosts/misc/SpriteFrameCache":63,"./plugin_boosts/utils/EventManager":79,"./plugin_boosts/ui/LanguageManager":64},"path":"preview-scripts/assets/framework/Platform.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/base/com.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/game/LevelSelector.js"},{"deps":{"../utils/EventManager":79,"../misc/Signal":70},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/LocalLifeSystem.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/Message.js"},{"deps":{},"path":"preview-scripts/assets/framework/qqsdk/SoundHelper.js"},{"deps":{"./MoreGameManager":36},"path":"preview-scripts/assets/framework/wxsdk/MoreGameComponent.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/ds/IntMap.js"},{"deps":{"../Info":20,"../../../framework/Platform":3,"../../../framework/plugin_boosts/ui/View":81,"../../../framework/plugin_boosts/ui/LanguageManager":64},"path":"preview-scripts/assets/Game/Scripts/ui/DailyGetDialog.js"},{"deps":{"../gamesys/Device":56},"path":"preview-scripts/assets/framework/plugin_boosts/misc/ClickAudio.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/libs/easing.js"},{"deps":{"./MessageType":18,"./Message":7,"./ConnectManager":21},"path":"preview-scripts/assets/framework/network/MessageBase.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/utils/Intersection.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/MessageDispatch.js"},{"deps":{"./Message":7,"./MessageType":18,"./MessageDispatch":16},"path":"preview-scripts/assets/framework/network/MessageHandler.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/MessageType.js"},{"deps":{"./MessageHandler":17,"./MessageType":18},"path":"preview-scripts/assets/framework/network/Socket.js"},{"deps":{"./hex-lines-game/Res":26,"../../framework/Platform":3,"../../framework/wxsdk/MoreGameManager":36,"../../framework/plugin_boosts/ui/LanguageManager":64,"../../framework/plugin_boosts/ui/ToastManager":76,"../../framework/plugin_boosts/gamesys/Device":56,"../../framework/plugin_boosts/misc/DataCenter":62},"path":"preview-scripts/assets/Game/Scripts/Info.js"},{"deps":{"./Socket":19},"path":"preview-scripts/assets/framework/network/ConnectManager.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Consts.js"},{"deps":{},"path":"preview-scripts/assets/framework/qqsdk/BKTool.js"},{"deps":{},"path":"preview-scripts/assets/framework/wxsdk/MoreGameItem.js"},{"deps":{"./Res":26,"./HexonTile":31,"./GridManager":33,"../Info":20,"./Animal":29,"../../../framework/Platform":3,"../../../framework/plugin_boosts/ui/ToastManager":76,"../../../framework/plugin_boosts/ui/LanguageManager":64,"../../../framework/plugin_boosts/ui/ViewManager":84,"../../../framework/plugin_boosts/misc/InputSystem":57},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Game.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Res.js"},{"deps":{"./MoreGameComponent":9},"path":"preview-scripts/assets/framework/wxsdk/MoreGameStyle.js"},{"deps":{"./MoreGameManager":36,"./MoreGameItem":24},"path":"preview-scripts/assets/framework/wxsdk/MoreGameDialog.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Animal.js"},{"deps":{"../Platform":3},"path":"preview-scripts/assets/framework/wxsdk/AddToMyFav.js"},{"deps":{"./Consts":22,"./Game":25,"./Res":26},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/HexonTile.js"},{"deps":{"../Platform":3,"../plugin_boosts/ui/View":81,"../plugin_boosts/ui/ViewManager":84,"../plugin_boosts/misc/Signal":70},"path":"preview-scripts/assets/framework/wxsdk/WxRankDialog.js"},{"deps":{"./ds/IntMap":10,"./Game":25,"./Res":26},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/GridManager.js"},{"deps":{"../plugin_boosts/utils/EventManager":79,"./GameConfigs":35},"path":"preview-scripts/assets/framework/wxsdk/sdk.js"},{"deps":{},"path":"preview-scripts/assets/framework/wxsdk/GameConfigs.js"},{"deps":{"./MoreGameComponent":9,"./GameConfigs":35},"path":"preview-scripts/assets/framework/wxsdk/MoreGameManager.js"},{"deps":{"../Info":20,"../../../framework/plugin_boosts/ui/game/LevelSelector":5},"path":"preview-scripts/assets/Game/Scripts/ui/LevelDialog.js"},{"deps":{"../../../framework/plugin_boosts/ui/View":81,"../Info":20,"../../../framework/plugin_boosts/ui/ViewManager":84,"../../../framework/Platform":3},"path":"preview-scripts/assets/Game/Scripts/ui/GetDialog.js"},{"deps":{"../../../framework/plugin_boosts/ui/DCUI":66,"../Info":20},"path":"preview-scripts/assets/Game/Scripts/ui/DCParticleSystem.js"},{"deps":{"../Info":20,"../../../framework/Platform":3,"../hex-lines-game/Res":26,"../../../framework/plugin_boosts/ui/View":81,"../../../framework/plugin_boosts/ui/LanguageManager":64,"../../../framework/plugin_boosts/ui/ViewManager":84,"../../../framework/plugin_boosts/gamesys/Device":56,"../../../framework/plugin_boosts/ui/ToastManager":76},"path":"preview-scripts/assets/Game/Scripts/ui/HbDialog.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PoolManager.js"},{"deps":{"../../../framework/plugin_boosts/ui/LanguageManager":64},"path":"preview-scripts/assets/Game/Scripts/ui/LocalizedLabel.js"},{"deps":{"../Info":20,"../Main":2,"../../../framework/Platform":3,"../hex-lines-game/Res":26,"../../../framework/plugin_boosts/ui/View":81,"../../../framework/plugin_boosts/ui/UIFunctions":77,"../../../framework/plugin_boosts/ui/LanguageManager":64,"../../../framework/plugin_boosts/ui/ToastManager":76,"../../../framework/plugin_boosts/gamesys/Device":56,"../../../framework/plugin_boosts/ui/ViewManager":84},"path":"preview-scripts/assets/Game/Scripts/ui/LuckyDialog.js"},{"deps":{"../Info":20,"../../../framework/plugin_boosts/ui/View":81,"../../../framework/Platform":3},"path":"preview-scripts/assets/Game/Scripts/ui/LevelupDialog.js"},{"deps":{"../../../framework/plugin_boosts/misc/Signal":70},"path":"preview-scripts/assets/Game/Scripts/ui/ShopItemTemplate.js"},{"deps":{"../../../framework/Platform":3},"path":"preview-scripts/assets/Game/Scripts/ui/PauseDialog.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/InfiniteBackground.js"},{"deps":{"../../../framework/plugin_boosts/ui/DCUI":66,"../../../framework/plugin_boosts/misc/SpriteFrameCache":63,"../Info":20},"path":"preview-scripts/assets/Game/Scripts/ui/DCBackground.js"},{"deps":{"./ShopItemTemplate":45,"../Info":20,"../Main":2,"../hex-lines-game/Res":26,"../../../framework/Platform":3,"../../../framework/plugin_boosts/ui/UIFunctions":77,"../../../framework/plugin_boosts/ui/LanguageManager":64,"../../../framework/plugin_boosts/ui/ToastManager":76,"../../../framework/plugin_boosts/gamesys/Device":56,"../../../framework/plugin_boosts/misc/SpriteFrameCache":63},"path":"preview-scripts/assets/Game/Scripts/ui/ShopDialog.js"},{"deps":{"./PsFx":54,"./PoolManager":41},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsSpawner.js"},{"deps":{"../Info":20,"../../../framework/Platform":3,"../hex-lines-game/Consts":22,"../../../framework/plugin_boosts/ui/ViewManager":84,"../../../framework/plugin_boosts/ui/LanguageManager":64},"path":"preview-scripts/assets/Game/Scripts/ui/WinDialog.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/LocalTimeSystem.js"},{"deps":{"./PsFx":54,"./Device":56},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsFxPlayer.js"},{"deps":{"./Device":56},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsFx.js"},{"deps":{"./ClickAudio":12},"path":"preview-scripts/assets/framework/plugin_boosts/misc/ClickAudioManager.js"},{"deps":{"../../qqsdk/SoundHelper":8},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/Device.js"},{"deps":{"./JoyStick":65},"path":"preview-scripts/assets/framework/plugin_boosts/misc/InputSystem.js"},{"deps":{"./DCUI":66,"./PandoraPoint":74},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCPandoraPoint.js"},{"deps":{"./DCUI":66},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCToggle.js"},{"deps":{"./DCUI":66,"../misc/SpriteFrameCache":63},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCSprite.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/FrameSwitch.js"},{"deps":{"../utils/EventManager":79},"path":"preview-scripts/assets/framework/plugin_boosts/misc/DataCenter.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/SpriteFrameCache.js"},{"deps":{"../../../Game/Scripts/hex-lines-game/Res":26},"path":"preview-scripts/assets/framework/plugin_boosts/ui/LanguageManager.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/JoyStick.js"},{"deps":{"../misc/DataCenter":62},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCUI.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/LoadingManager.js"},{"deps":{"./ViewManager":84},"path":"preview-scripts/assets/framework/plugin_boosts/ui/MessageBoxManager.js"},{"deps":{"./View":81,"./MessageBoxManager":68},"path":"preview-scripts/assets/framework/plugin_boosts/ui/MessageBoxComponent.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/Signal.js"},{"deps":{"./UIFunctions":77},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ToastComponent.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/UIComponent.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/Net.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/PandoraPoint.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/BoostsAction.js"},{"deps":{"./ToastComponent":71},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ToastManager.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/UIFunctions.js"},{"deps":{"../LanguageManager":64},"path":"preview-scripts/assets/framework/plugin_boosts/ui/game/LanguageSelector.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/utils/EventManager.js"},{"deps":{"./DCUI":66},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCLabel.js"},{"deps":{"./UIComponent":72,"./ViewManager":84,"./UIFunctions":77},"path":"preview-scripts/assets/framework/plugin_boosts/ui/View.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/FSM.js"},{"deps":{"../misc/SpriteFrameCache":63},"path":"preview-scripts/assets/framework/plugin_boosts/utils/Common.js"},{"deps":{"./View":81},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ViewManager.js"},{"deps":{"../Info":20,"../../../framework/plugin_boosts/ui/LanguageManager":64},"path":"preview-scripts/assets/Game/Scripts/ui/TimeUpDialog.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    