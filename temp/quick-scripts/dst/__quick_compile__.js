
(function () {
var scripts = [{"deps":{"./assets/migration/use_v2.0.x_cc.Toggle_event":1,"./assets/framework/plugin_boosts/gamesys/Device":2,"./assets/framework/wxsdk/MoreGameItem":3,"./assets/Game/Scripts/Main":4,"./assets/Game/Scripts/hex-lines-game/base/com":5,"./assets/framework/Platform":6,"./assets/framework/plugin_boosts/ui/game/LevelSelector":7,"./assets/framework/network/Message":8,"./assets/framework/qqsdk/SoundHelper":9,"./assets/Game/Scripts/ui/DailyGetDialog":10,"./assets/Game/Scripts/hex-lines-game/ds/IntMap":11,"./assets/framework/plugin_boosts/gamesys/LocalTimeSystem":12,"./assets/framework/plugin_boosts/misc/ClickAudio":13,"./assets/framework/plugin_boosts/libs/easing":14,"./assets/framework/plugin_boosts/utils/Intersection":15,"./assets/framework/network/MessageBase":16,"./assets/framework/network/MessageType":17,"./assets/framework/network/MessageHandler":18,"./assets/framework/network/MessageDispatch":19,"./assets/framework/network/ConnectManager":20,"./assets/framework/network/Socket":21,"./assets/framework/wxsdk/MoreGameComponent":22,"./assets/Game/Scripts/hex-lines-game/Game":23,"./assets/framework/qqsdk/BKTool":24,"./assets/Game/Scripts/hex-lines-game/Consts":25,"./assets/framework/wxsdk/GameConfigs":26,"./assets/Game/Scripts/Info":27,"./assets/framework/wxsdk/MoreGameDialog":28,"./assets/framework/wxsdk/MoreGameManager":29,"./assets/framework/wxsdk/MoreGameStyle":30,"./assets/framework/wxsdk/WxRankDialog":31,"./assets/Game/Scripts/hex-lines-game/HexonTile":32,"./assets/Game/Scripts/hex-lines-game/Animal":33,"./assets/framework/wxsdk/sdk":34,"./assets/framework/wxsdk/AddToMyFav":35,"./assets/Game/Scripts/hex-lines-game/Res":36,"./assets/Game/Scripts/hex-lines-game/GridManager":37,"./assets/Game/Scripts/ui/DCParticleSystem":38,"./assets/Game/Scripts/ui/LevelupDialog":39,"./assets/Game/Scripts/ui/LevelDialog":40,"./assets/Game/Scripts/ui/HbDialog":41,"./assets/Game/Scripts/ui/GetDialog":42,"./assets/Game/Scripts/ui/LuckyDialog":43,"./assets/framework/plugin_boosts/gamesys/LocalLifeSystem":44,"./assets/framework/plugin_boosts/gamesys/PoolManager":45,"./assets/Game/Scripts/ui/PauseDialog":46,"./assets/Game/Scripts/ui/WinDialog":47,"./assets/framework/plugin_boosts/gamesys/PsFxPlayer":48,"./assets/framework/plugin_boosts/gamesys/InfiniteBackground":49,"./assets/framework/plugin_boosts/gamesys/PsFx":50,"./assets/framework/plugin_boosts/gamesys/PsSpawner":51,"./assets/framework/plugin_boosts/misc/FrameSwitch":52,"./assets/framework/plugin_boosts/misc/ClickAudioManager":53,"./assets/framework/plugin_boosts/misc/InputSystem":54,"./assets/framework/plugin_boosts/ui/DCPandoraPoint":55,"./assets/framework/plugin_boosts/misc/DataCenter":56,"./assets/framework/plugin_boosts/misc/Net":57,"./assets/framework/plugin_boosts/misc/JoyStick":58,"./assets/framework/plugin_boosts/misc/Signal":59,"./assets/framework/plugin_boosts/ui/DCSprite":60,"./assets/framework/plugin_boosts/ui/DCToggle":61,"./assets/framework/plugin_boosts/misc/SpriteFrameCache":62,"./assets/framework/plugin_boosts/misc/BoostsAction":63,"./assets/framework/plugin_boosts/ui/DCUI":64,"./assets/framework/plugin_boosts/ui/MessageBoxComponent":65,"./assets/framework/plugin_boosts/ui/LoadingManager":66,"./assets/framework/plugin_boosts/ui/MessageBoxManager":67,"./assets/framework/plugin_boosts/ui/PandoraPoint":68,"./assets/framework/plugin_boosts/ui/UIFunctions":69,"./assets/Game/Scripts/ui/ShopItemTemplate":70,"./assets/framework/plugin_boosts/ui/ToastComponent":71,"./assets/framework/plugin_boosts/ui/UIComponent":72,"./assets/framework/plugin_boosts/ui/ToastManager":73,"./assets/framework/plugin_boosts/ui/ViewManager":74,"./assets/framework/plugin_boosts/ui/DCLabel":75,"./assets/framework/plugin_boosts/ui/View":76,"./assets/framework/plugin_boosts/utils/EventManager":77,"./assets/Game/Scripts/ui/DCBackground":78,"./assets/Game/Scripts/ui/ShopDialog":79,"./assets/framework/plugin_boosts/utils/Common":80,"./assets/framework/plugin_boosts/gamesys/FSM":81},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{"../../qqsdk/SoundHelper":9},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/Device.js"},{"deps":{},"path":"preview-scripts/assets/framework/wxsdk/MoreGameItem.js"},{"deps":{"../../framework/plugin_boosts/ui/ViewManager":74,"./Info":27,"../../framework/Platform":6,"../../framework/plugin_boosts/gamesys/Device":2,"./hex-lines-game/Res":36,"../../framework/plugin_boosts/ui/ToastManager":73},"path":"preview-scripts/assets/Game/Scripts/Main.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/base/com.js"},{"deps":{"./wxsdk/sdk":34,"./plugin_boosts/ui/ToastManager":73,"./qqsdk/BKTool":24,"./plugin_boosts/misc/SpriteFrameCache":62,"./plugin_boosts/misc/Signal":59,"./plugin_boosts/utils/EventManager":77},"path":"preview-scripts/assets/framework/Platform.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/game/LevelSelector.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/Message.js"},{"deps":{},"path":"preview-scripts/assets/framework/qqsdk/SoundHelper.js"},{"deps":{"../Info":27,"../../../framework/plugin_boosts/ui/View":76,"../../../framework/Platform":6},"path":"preview-scripts/assets/Game/Scripts/ui/DailyGetDialog.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/ds/IntMap.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/LocalTimeSystem.js"},{"deps":{"../gamesys/Device":2},"path":"preview-scripts/assets/framework/plugin_boosts/misc/ClickAudio.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/libs/easing.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/utils/Intersection.js"},{"deps":{"./MessageType":17,"./Message":8,"./ConnectManager":20},"path":"preview-scripts/assets/framework/network/MessageBase.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/MessageType.js"},{"deps":{"./Message":8,"./MessageType":17,"./MessageDispatch":19},"path":"preview-scripts/assets/framework/network/MessageHandler.js"},{"deps":{},"path":"preview-scripts/assets/framework/network/MessageDispatch.js"},{"deps":{"./Socket":21},"path":"preview-scripts/assets/framework/network/ConnectManager.js"},{"deps":{"./MessageHandler":18,"./MessageType":17},"path":"preview-scripts/assets/framework/network/Socket.js"},{"deps":{"./MoreGameManager":29},"path":"preview-scripts/assets/framework/wxsdk/MoreGameComponent.js"},{"deps":{"./Res":36,"./HexonTile":32,"./GridManager":37,"../../../framework/plugin_boosts/misc/InputSystem":54,"../Info":27,"./Animal":33,"../../../framework/plugin_boosts/ui/ViewManager":74,"../../../framework/Platform":6,"../../../framework/plugin_boosts/ui/ToastManager":73},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Game.js"},{"deps":{},"path":"preview-scripts/assets/framework/qqsdk/BKTool.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Consts.js"},{"deps":{},"path":"preview-scripts/assets/framework/wxsdk/GameConfigs.js"},{"deps":{"../../framework/plugin_boosts/misc/DataCenter":56,"./hex-lines-game/Res":36,"../../framework/plugin_boosts/ui/ToastManager":73,"../../framework/plugin_boosts/gamesys/Device":2,"../../framework/Platform":6,"../../framework/wxsdk/MoreGameManager":29},"path":"preview-scripts/assets/Game/Scripts/Info.js"},{"deps":{"./MoreGameManager":29,"./MoreGameItem":3},"path":"preview-scripts/assets/framework/wxsdk/MoreGameDialog.js"},{"deps":{"./MoreGameComponent":22,"./GameConfigs":26},"path":"preview-scripts/assets/framework/wxsdk/MoreGameManager.js"},{"deps":{"./MoreGameComponent":22},"path":"preview-scripts/assets/framework/wxsdk/MoreGameStyle.js"},{"deps":{"../Platform":6,"../plugin_boosts/ui/View":76,"../plugin_boosts/ui/ViewManager":74,"../plugin_boosts/misc/Signal":59},"path":"preview-scripts/assets/framework/wxsdk/WxRankDialog.js"},{"deps":{"./Consts":25,"./Game":23,"./Res":36},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/HexonTile.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Animal.js"},{"deps":{"../plugin_boosts/utils/EventManager":77,"./GameConfigs":26},"path":"preview-scripts/assets/framework/wxsdk/sdk.js"},{"deps":{"../Platform":6},"path":"preview-scripts/assets/framework/wxsdk/AddToMyFav.js"},{"deps":{},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/Res.js"},{"deps":{"./ds/IntMap":11,"./Game":23,"./Res":36},"path":"preview-scripts/assets/Game/Scripts/hex-lines-game/GridManager.js"},{"deps":{"../../../framework/plugin_boosts/ui/DCUI":64,"../Info":27},"path":"preview-scripts/assets/Game/Scripts/ui/DCParticleSystem.js"},{"deps":{"../Info":27,"../../../framework/plugin_boosts/ui/View":76,"../../../framework/Platform":6},"path":"preview-scripts/assets/Game/Scripts/ui/LevelupDialog.js"},{"deps":{"../Info":27,"../../../framework/plugin_boosts/ui/game/LevelSelector":7},"path":"preview-scripts/assets/Game/Scripts/ui/LevelDialog.js"},{"deps":{"../../../framework/Platform":6,"../../../framework/plugin_boosts/ui/ViewManager":74,"../../../framework/plugin_boosts/ui/ToastManager":73,"../hex-lines-game/Res":36,"../Info":27,"../../../framework/plugin_boosts/gamesys/Device":2,"../../../framework/plugin_boosts/ui/View":76},"path":"preview-scripts/assets/Game/Scripts/ui/HbDialog.js"},{"deps":{"../../../framework/plugin_boosts/ui/View":76,"../Info":27,"../../../framework/plugin_boosts/ui/ViewManager":74,"../../../framework/Platform":6},"path":"preview-scripts/assets/Game/Scripts/ui/GetDialog.js"},{"deps":{"../../../framework/plugin_boosts/ui/ToastManager":73,"../../../framework/plugin_boosts/ui/ViewManager":74,"../../../framework/plugin_boosts/ui/View":76,"../Info":27,"../../../framework/Platform":6,"../../../framework/plugin_boosts/gamesys/Device":2,"../hex-lines-game/Res":36,"../../../framework/plugin_boosts/ui/UIFunctions":69,"../Main":4},"path":"preview-scripts/assets/Game/Scripts/ui/LuckyDialog.js"},{"deps":{"../utils/EventManager":77,"../misc/Signal":59},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/LocalLifeSystem.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PoolManager.js"},{"deps":{"../../../framework/Platform":6},"path":"preview-scripts/assets/Game/Scripts/ui/PauseDialog.js"},{"deps":{"../Info":27,"../../../framework/Platform":6,"../../../framework/plugin_boosts/ui/ViewManager":74,"../hex-lines-game/Consts":25},"path":"preview-scripts/assets/Game/Scripts/ui/WinDialog.js"},{"deps":{"./PsFx":50,"./Device":2},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsFxPlayer.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/InfiniteBackground.js"},{"deps":{"./Device":2},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsFx.js"},{"deps":{"./PsFx":50,"./PoolManager":45},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/PsSpawner.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/FrameSwitch.js"},{"deps":{"./ClickAudio":13},"path":"preview-scripts/assets/framework/plugin_boosts/misc/ClickAudioManager.js"},{"deps":{"./JoyStick":58},"path":"preview-scripts/assets/framework/plugin_boosts/misc/InputSystem.js"},{"deps":{"./DCUI":64,"./PandoraPoint":68},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCPandoraPoint.js"},{"deps":{"../utils/EventManager":77},"path":"preview-scripts/assets/framework/plugin_boosts/misc/DataCenter.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/Net.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/JoyStick.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/Signal.js"},{"deps":{"./DCUI":64,"../misc/SpriteFrameCache":62},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCSprite.js"},{"deps":{"./DCUI":64},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCToggle.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/SpriteFrameCache.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/misc/BoostsAction.js"},{"deps":{"../misc/DataCenter":56},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCUI.js"},{"deps":{"./View":76,"./MessageBoxManager":67},"path":"preview-scripts/assets/framework/plugin_boosts/ui/MessageBoxComponent.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/LoadingManager.js"},{"deps":{"./ViewManager":74},"path":"preview-scripts/assets/framework/plugin_boosts/ui/MessageBoxManager.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/PandoraPoint.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/UIFunctions.js"},{"deps":{"../../../framework/plugin_boosts/misc/Signal":59},"path":"preview-scripts/assets/Game/Scripts/ui/ShopItemTemplate.js"},{"deps":{"./UIFunctions":69},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ToastComponent.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/ui/UIComponent.js"},{"deps":{"./ToastComponent":71},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ToastManager.js"},{"deps":{"./View":76},"path":"preview-scripts/assets/framework/plugin_boosts/ui/ViewManager.js"},{"deps":{"./DCUI":64},"path":"preview-scripts/assets/framework/plugin_boosts/ui/DCLabel.js"},{"deps":{"./UIComponent":72,"./ViewManager":74,"./UIFunctions":69},"path":"preview-scripts/assets/framework/plugin_boosts/ui/View.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/utils/EventManager.js"},{"deps":{"../../../framework/plugin_boosts/ui/DCUI":64,"../../../framework/plugin_boosts/misc/SpriteFrameCache":62,"../Info":27},"path":"preview-scripts/assets/Game/Scripts/ui/DCBackground.js"},{"deps":{"./ShopItemTemplate":70,"../../../framework/plugin_boosts/misc/SpriteFrameCache":62,"../hex-lines-game/Res":36,"../../../framework/Platform":6,"../Info":27,"../../../framework/plugin_boosts/ui/ToastManager":73,"../../../framework/plugin_boosts/ui/UIFunctions":69,"../../../framework/plugin_boosts/gamesys/Device":2,"../Main":4},"path":"preview-scripts/assets/Game/Scripts/ui/ShopDialog.js"},{"deps":{"../misc/SpriteFrameCache":62},"path":"preview-scripts/assets/framework/plugin_boosts/utils/Common.js"},{"deps":{},"path":"preview-scripts/assets/framework/plugin_boosts/gamesys/FSM.js"}];
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
    