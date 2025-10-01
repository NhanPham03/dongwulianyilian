
(function () {
var scripts = [{"deps":{"./assets/framework/network/Message":47,"./assets/framework/network/MessageBase":52,"./assets/framework/network/MessageDispatch":55,"./assets/framework/network/MessageHandler":53,"./assets/framework/network/MessageType":51,"./assets/framework/network/Socket":54,"./assets/framework/network/ConnectManager":56,"./assets/framework/qqsdk/SoundHelper":48,"./assets/framework/qqsdk/BKTool":65,"./assets/framework/wxsdk/GameConfigs":60,"./assets/framework/wxsdk/MoreGameComponent":58,"./assets/framework/wxsdk/MoreGameDialog":62,"./assets/framework/wxsdk/MoreGameItem":57,"./assets/framework/wxsdk/MoreGameManager":61,"./assets/framework/wxsdk/MoreGameStyle":66,"./assets/framework/wxsdk/WxRankDialog":64,"./assets/framework/wxsdk/sdk":1,"./assets/framework/wxsdk/AddToMyFav":72,"./assets/migration/use_v2.0.x_cc.Toggle_event":2,"./assets/Game/Scripts/Info":68,"./assets/Game/Scripts/hex-lines-game/Consts":63,"./assets/Game/Scripts/hex-lines-game/Game":69,"./assets/Game/Scripts/hex-lines-game/GridManager":67,"./assets/Game/Scripts/hex-lines-game/HexonTile":59,"./assets/Game/Scripts/hex-lines-game/Res":73,"./assets/Game/Scripts/hex-lines-game/Animal":70,"./assets/Game/Scripts/hex-lines-game/base/com":9,"./assets/Game/Scripts/hex-lines-game/ds/IntMap":50,"./assets/Game/Scripts/ui/DCParticleSystem":49,"./assets/Game/Scripts/ui/DailyGetDialog":71,"./assets/Game/Scripts/ui/GetDialog":74,"./assets/Game/Scripts/ui/HbDialog":78,"./assets/Game/Scripts/ui/LevelDialog":75,"./assets/Game/Scripts/ui/LevelupDialog":76,"./assets/Game/Scripts/ui/LocalizedLabel":79,"./assets/Game/Scripts/ui/LuckyDialog":82,"./assets/Game/Scripts/ui/PauseDialog":77,"./assets/Game/Scripts/ui/ShopDialog":80,"./assets/Game/Scripts/ui/ShopItemTemplate":81,"./assets/Game/Scripts/ui/WinDialog":84,"./assets/Game/Scripts/ui/DCBackground":83,"./assets/Game/Scripts/Main":5,"./assets/framework/Platform":10,"./assets/framework/plugin_boosts/gamesys/InfiniteBackground":3,"./assets/framework/plugin_boosts/gamesys/LocalLifeSystem":12,"./assets/framework/plugin_boosts/gamesys/LocalTimeSystem":11,"./assets/framework/plugin_boosts/gamesys/PoolManager":16,"./assets/framework/plugin_boosts/gamesys/PsFx":14,"./assets/framework/plugin_boosts/gamesys/PsFxPlayer":17,"./assets/framework/plugin_boosts/gamesys/PsSpawner":13,"./assets/framework/plugin_boosts/gamesys/Device":15,"./assets/framework/plugin_boosts/libs/easing":7,"./assets/framework/plugin_boosts/misc/ClickAudio":6,"./assets/framework/plugin_boosts/misc/ClickAudioManager":18,"./assets/framework/plugin_boosts/misc/DataCenter":19,"./assets/framework/plugin_boosts/misc/FrameSwitch":20,"./assets/framework/plugin_boosts/misc/InputSystem":21,"./assets/framework/plugin_boosts/misc/JoyStick":22,"./assets/framework/plugin_boosts/misc/Net":23,"./assets/framework/plugin_boosts/misc/Signal":24,"./assets/framework/plugin_boosts/misc/SpriteFrameCache":26,"./assets/framework/plugin_boosts/misc/BoostsAction":25,"./assets/framework/plugin_boosts/ui/DCPandoraPoint":40,"./assets/framework/plugin_boosts/ui/DCSprite":28,"./assets/framework/plugin_boosts/ui/DCToggle":39,"./assets/framework/plugin_boosts/ui/DCUI":27,"./assets/framework/plugin_boosts/ui/LanguageManager":31,"./assets/framework/plugin_boosts/ui/LoadingManager":30,"./assets/framework/plugin_boosts/ui/MessageBoxComponent":29,"./assets/framework/plugin_boosts/ui/MessageBoxManager":33,"./assets/framework/plugin_boosts/ui/PandoraPoint":35,"./assets/framework/plugin_boosts/ui/ToastComponent":32,"./assets/framework/plugin_boosts/ui/ToastManager":36,"./assets/framework/plugin_boosts/ui/UIComponent":38,"./assets/framework/plugin_boosts/ui/UIFunctions":34,"./assets/framework/plugin_boosts/ui/View":37,"./assets/framework/plugin_boosts/ui/ViewManager":44,"./assets/framework/plugin_boosts/ui/DCLabel":41,"./assets/framework/plugin_boosts/ui/game/LevelSelector":4,"./assets/framework/plugin_boosts/ui/game/LanguageSelector":43,"./assets/framework/plugin_boosts/utils/EventManager":8,"./assets/framework/plugin_boosts/utils/Intersection":42,"./assets/framework/plugin_boosts/utils/Common":45,"./assets/framework/plugin_boosts/gamesys/FSM":46},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../plugin_boosts/utils/EventManager":8,"./GameConfigs":60},"path":"preview-scripts/assets/framework/wxsdk/sdk.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/InfiniteBackground.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/game/LevelSelector.js"},{"deps":{"../../framework/plugin_boosts/ui/ViewManager":44,"./Info":68,"../../framework/Platform":10,"../../framework/plugin_boosts/gamesys/Device":15,"./hex-lines-game/Res":73,"../../framework/plugin_boosts/ui/ToastManager":36},"path":"preview-scripts/assets/Game/Scripts/Main.js"},{"deps":{"../gamesys/Device":15},"path":"preview-scripts/assets/framework/plugin_boosts/misc/ClickAudio.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/libs/easing.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/utils/EventManager.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/base/com.js"},{"deps":{"./wxsdk/sdk":1,"./plugin_boosts/ui/ToastManager":36,"./qqsdk/BKTool":65,"./plugin_boosts/misc/SpriteFrameCache":26,"./plugin_boosts/misc/Signal":24,"./plugin_boosts/utils/EventManager":8},"path":"preview-scripts/assets/framework/Platform.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/LocalTimeSystem.js"},{"deps":{"../utils/EventManager":8,"../misc/Signal":24},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/LocalLifeSystem.js"},{"deps":{"./PsFx":14,"./PoolManager":16},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsSpawner.js"},{"deps":{"./Device":15},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsFx.js"},{"deps":{"../../qqsdk/SoundHelper":48},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/Device.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PoolManager.js"},{"deps":{"./PsFx":14,"./Device":15},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsFxPlayer.js"},{"deps":{"./ClickAudio":6},"path":"preview-scripts/assets/framework/plugin_boosts/misc/ClickAudioManager.js"},{"deps":{"../utils/EventManager":8},"path":"preview-scripts/assets/framework/plugin_boosts/misc/DataCenter.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/FrameSwitch.js"},{"deps":{"./JoyStick":22},"path":"preview-scripts/assets/framework/plugin_boosts/misc/InputSystem.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/JoyStick.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/Net.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/Signal.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/BoostsAction.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/SpriteFrameCache.js"},{"deps":{"../misc/DataCenter":19},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCUI.js"},{"deps":{"./DCUI":27,"../misc/SpriteFrameCache":26},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCSprite.js"},{"deps":{"./View":37,"./MessageBoxManager":33},"path":"preview-scripts/assets/framework/plugin_boosts/ui/MessageBoxComponent.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/LoadingManager.js"},{"deps":{"../../../Game/Scripts/hex-lines-game/Res":73},"path":"preview-scripts/assets/framework/plugin_boosts/ui/LanguageManager.js"},{"deps":{"./UIFunctions":34},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ToastComponent.js"},{"deps":{"./ViewManager":44},"path":"preview-scripts/assets/framework/plugin_boosts/ui/MessageBoxManager.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/UIFunctions.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/PandoraPoint.js"},{"deps":{"./ToastComponent":32},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ToastManager.js"},{"deps":{"./UIComponent":38,"./ViewManager":44,"./UIFunctions":34},"path":"preview-scripts/assets/framework/plugin_boosts/ui/View.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/UIComponent.js"},{"deps":{"./DCUI":27},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCToggle.js"},{"deps":{"./DCUI":27,"./PandoraPoint":35},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCPandoraPoint.js"},{"deps":{"./DCUI":27},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCLabel.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/utils/Intersection.js"},{"deps":{"../LanguageManager":31},"path":"preview-scripts/assets/framework/plugin_boosts/ui/game/LanguageSelector.js"},{"deps":{"./View":37},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ViewManager.js"},{"deps":{"../misc/SpriteFrameCache":26},"path":"preview-scripts/assets/framework/plugin_boosts/utils/Common.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/FSM.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/Message.js"},{"deps":{},"path":"preview-scripts/assets/framework/qqsdk/SoundHelper.js"},{"deps":{"../../../framework/plugin_boosts/ui/DCUI":27,"../Info":68},"path":"preview-scripts/assets/Game/Scripts/ui/DCParticleSystem.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/ds/IntMap.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/MessageType.js"},{"deps":{"./MessageType":51,"./Message":47,"./ConnectManager":56},"path":"preview-scripts/assets/framework/network/MessageBase.js"},{"deps":{"./Message":47,"./MessageType":51,"./MessageDispatch":55},"path":"preview-scripts/assets/framework/network/MessageHandler.js"},{"deps":{"./MessageHandler":53,"./MessageType":51},"path":"preview-scripts/assets/framework/network/Socket.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/MessageDispatch.js"},{"deps":{"./Socket":54},"path":"preview-scripts/assets/framework/network/ConnectManager.js"},{"deps":{},"path":"preview-scripts/assets/framework/wxsdk/MoreGameItem.js"},{"deps":{"./MoreGameManager":61},"path":"preview-scripts/assets/framework/wxsdk/MoreGameComponent.js"},{"deps":{"./Consts":63,"./Game":69,"./Res":73},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/HexonTile.js"},{"deps":{},"path":"preview-scripts/assets/framework/wxsdk/GameConfigs.js"},{"deps":{"./MoreGameComponent":58,"./GameConfigs":60},"path":"preview-scripts/assets/framework/wxsdk/MoreGameManager.js"},{"deps":{"./MoreGameManager":61,"./MoreGameItem":57},"path":"preview-scripts/assets/framework/wxsdk/MoreGameDialog.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Consts.js"},{"deps":{"../Platform":10,"../plugin_boosts/ui/View":37,"../plugin_boosts/ui/ViewManager":44,"../plugin_boosts/misc/Signal":24},"path":"preview-scripts/assets/framework/wxsdk/WxRankDialog.js"},{"deps":{},"path":"preview-scripts/assets/framework/qqsdk/BKTool.js"},{"deps":{"./MoreGameComponent":58},"path":"preview-scripts/assets/framework/wxsdk/MoreGameStyle.js"},{"deps":{"./ds/IntMap":50,"./Game":69,"./Res":73},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/GridManager.js"},{"deps":{"../../framework/plugin_boosts/misc/DataCenter":19,"./hex-lines-game/Res":73,"../../framework/plugin_boosts/ui/ToastManager":36,"../../framework/plugin_boosts/gamesys/Device":15,"../../framework/Platform":10,"../../framework/wxsdk/MoreGameManager":61},"path":"preview-scripts/assets/Game/Scripts/Info.js"},{"deps":{"./Res":73,"./HexonTile":59,"./GridManager":67,"../Info":68,"./Animal":70,"../../../framework/Platform":10,"../../../framework/plugin_boosts/ui/ToastManager":36,"../../../framework/plugin_boosts/ui/LanguageManager":31,"../../../framework/plugin_boosts/ui/ViewManager":44,"../../../framework/plugin_boosts/misc/InputSystem":21},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Game.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Animal.js"},{"deps":{"../Info":68,"../../../framework/plugin_boosts/ui/View":37,"../../../framework/Platform":10},"path":"preview-scripts/assets/Game/Scripts/ui/DailyGetDialog.js"},{"deps":{"../Platform":10},"path":"preview-scripts/assets/framework/wxsdk/AddToMyFav.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Res.js"},{"deps":{"../../../framework/plugin_boosts/ui/View":37,"../Info":68,"../../../framework/plugin_boosts/ui/ViewManager":44,"../../../framework/Platform":10},"path":"preview-scripts/assets/Game/Scripts/ui/GetDialog.js"},{"deps":{"../Info":68,"../../../framework/plugin_boosts/ui/game/LevelSelector":4},"path":"preview-scripts/assets/Game/Scripts/ui/LevelDialog.js"},{"deps":{"../Info":68,"../../../framework/plugin_boosts/ui/View":37,"../../../framework/Platform":10},"path":"preview-scripts/assets/Game/Scripts/ui/LevelupDialog.js"},{"deps":{"../../../framework/Platform":10},"path":"preview-scripts/assets/Game/Scripts/ui/PauseDialog.js"},{"deps":{"../../../framework/Platform":10,"../../../framework/plugin_boosts/ui/ViewManager":44,"../../../framework/plugin_boosts/ui/ToastManager":36,"../hex-lines-game/Res":73,"../Info":68,"../../../framework/plugin_boosts/gamesys/Device":15,"../../../framework/plugin_boosts/ui/View":37},"path":"preview-scripts/assets/Game/Scripts/ui/HbDialog.js"},{"deps":{"../../../framework/plugin_boosts/ui/LanguageManager":31},"path":"preview-scripts/assets/Game/Scripts/ui/LocalizedLabel.js"},{"deps":{"./ShopItemTemplate":81,"../../../framework/plugin_boosts/misc/SpriteFrameCache":26,"../hex-lines-game/Res":73,"../../../framework/Platform":10,"../Info":68,"../../../framework/plugin_boosts/ui/ToastManager":36,"../../../framework/plugin_boosts/ui/UIFunctions":34,"../../../framework/plugin_boosts/gamesys/Device":15,"../Main":5},"path":"preview-scripts/assets/Game/Scripts/ui/ShopDialog.js"},{"deps":{"../../../framework/plugin_boosts/misc/Signal":24},"path":"preview-scripts/assets/Game/Scripts/ui/ShopItemTemplate.js"},{"deps":{"../../../framework/plugin_boosts/ui/ToastManager":36,"../../../framework/plugin_boosts/ui/ViewManager":44,"../../../framework/plugin_boosts/ui/View":37,"../Info":68,"../../../framework/Platform":10,"../../../framework/plugin_boosts/gamesys/Device":15,"../hex-lines-game/Res":73,"../../../framework/plugin_boosts/ui/UIFunctions":34,"../Main":5},"path":"preview-scripts/assets/Game/Scripts/ui/LuckyDialog.js"},{"deps":{"../../../framework/plugin_boosts/ui/DCUI":27,"../../../framework/plugin_boosts/misc/SpriteFrameCache":26,"../Info":68},"path":"preview-scripts/assets/Game/Scripts/ui/DCBackground.js"},{"deps":{"../Info":68,"../../../framework/Platform":10,"../../../framework/plugin_boosts/ui/ViewManager":44,"../hex-lines-game/Consts":63},"path":"preview-scripts/assets/Game/Scripts/ui/WinDialog.js"}];
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
    