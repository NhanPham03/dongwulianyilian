
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/UIFunctions.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10205trRZVOELcrvc3TW2mW', 'UIFunctions');
// framework/plugin_boosts/ui/UIFunctions.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunctions = /** @class */ (function () {
    function UIFunctions() {
    }
    UIFunctions.getChildrenAnimations = function (node) {
        var animations = [];
        var anim = node.getComponent(cc.Animation);
        if (anim)
            animations.push(anim);
        for (var i = 0; i < node.childrenCount; i++) {
            var child = node.children[i];
            var anim = child.getComponent(cc.Animation);
            if (anim)
                animations.push(anim);
        }
        return animations;
    };
    UIFunctions.stopAnimations = function (animations) {
        animations.forEach(function (anim) {
            anim.stop();
        });
    };
    UIFunctions.doShowAnimations = function (animations, finishCallback, target) {
        var maxDuration = 0;
        var maxDurationAnimation;
        animations.forEach(function (anim) {
            var clips = anim.getClips();
            if (clips.length > 0) {
                var clip = clips[0];
                var animState = anim.play(clip.name);
                animState.wrapMode = cc.WrapMode.Normal;
                if (clip.duration > maxDuration) {
                    maxDuration = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
        });
        if (finishCallback) {
            var func_1 = function () {
                // console.log("finish animations")
                if (maxDurationAnimation)
                    maxDurationAnimation.off("finished", func_1);
                finishCallback.call(target);
            };
            if (maxDurationAnimation)
                maxDurationAnimation.on("finished", func_1);
            else
                finishCallback.call(target);
        }
    };
    // static getLongestAnimation(animations)
    // {
    //     animations.forEach((anim:cc.Animation)=>{
    //         let clips = anim.getClips()
    //         for (clips)
    //         //以最长的为准
    //     }
    // }
    //TODO:还未实现
    UIFunctions.isAnimationRunning = function (animations) {
        return false;
    };
    UIFunctions.doHideAnimations = function (animations, finishCallback, target) {
        var hasHideAnimation = false;
        var maxDuration = 0;
        var maxDurationAnimation;
        animations.forEach(function (anim) {
            var clips = anim.getClips();
            if (clips.length == 2) {
                var clip = clips[clips.length - 1];
                // anim.on("finished",onHideAnimationFinished)
                hasHideAnimation = true;
                anim.play(clip.name);
                if (clip.duration > maxDuration) {
                    maxDuration = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
            else if (clips.length == 1) {
                var clip = clips[0];
                // clip.wrapMode = cc.WrapMode.Reverse;
                hasHideAnimation = true;
                var animState = anim.play(clip.name);
                animState.wrapMode = cc.WrapMode.Reverse;
                if (clip.duration > maxDuration) {
                    maxDuration = clip.duration;
                    maxDurationAnimation = anim;
                }
            }
        });
        if (maxDurationAnimation && finishCallback) {
            var func_2 = function () {
                // console.log("finish animations")
                maxDurationAnimation.off("finished", func_2);
                finishCallback.call(target);
            };
            maxDurationAnimation.on("finished", func_2);
        }
        return hasHideAnimation;
    };
    UIFunctions.getToggleIndex = function (toggle) {
        var container = toggle.node.getParent();
        for (var i = 0; i < container.childrenCount; i++) {
            var child = container.children[i];
            if (toggle.node == child) {
                return i;
            }
        }
        return -1;
    };
    UIFunctions.selectToggleIndex = function (toggleContainer, index) {
        if (toggleContainer == null) {
            console.warn("[UIFunction.selectToggleIndex] : invalid toggleContainer :");
            return;
        }
        var toggleNode = toggleContainer.children[index];
        if (toggleNode) {
            var toggle = toggleNode.getComponent(cc.Toggle);
            if (toggle) {
                console.log("[UIFunction.selectToggleIndex] :" + index);
                toggle.check();
            }
        }
        else {
            console.warn("[UIFunction.selectToggleIndex] :cannot find toggle with index:" + index);
        }
    };
    // set btn 
    UIFunctions.setTouchEnabled = function (node, b) {
        g.foreachNode(node, function (child) {
            var btn = child.getComponent(cc.Button);
            if (btn) {
                console.log("[UIFunction] " + child.name + " touch : " + b);
                btn.interactable = b;
            }
        });
    };
    UIFunctions.setButtonEnabled = function (btn, b) {
        btn.node.opacity = b ? 255 : 125;
        btn.interactable = b;
    };
    return UIFunctions;
}());
exports.default = UIFunctions;

cc._RF.pop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcVUlGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUE2S0EsQ0FBQztJQTFLVSxpQ0FBcUIsR0FBNUIsVUFBNkIsSUFBSTtRQUM3QixJQUFJLFVBQVUsR0FBa0IsRUFBRSxDQUFBO1FBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzFDLElBQUcsSUFBSTtZQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQzFDO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMzQyxJQUFHLElBQUk7Z0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUM1QjtRQUNELE9BQU8sVUFBVSxDQUFBO0lBQ3JCLENBQUM7SUFFTSwwQkFBYyxHQUFyQixVQUFzQixVQUFVO1FBRTVCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFpQjtZQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sNEJBQWdCLEdBQXZCLFVBQXdCLFVBQVUsRUFBQyxjQUF3QixFQUFDLE1BQU87UUFFL0QsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFFO1FBQ3JCLElBQUksb0JBQWlDLENBQUM7UUFDdEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWlCO1lBQ2pDLElBQUks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QUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEdBQUcsS0FBSyxDQUFDLENBQUE7Z0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNqQjtTQUNKO2FBQUk7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxHQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ3hGO0lBQ0wsQ0FBQztJQUVELFdBQVc7SUFDSiwyQkFBZSxHQUF0QixVQUF1QixJQUFJLEVBQUMsQ0FBQztRQUV6QixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBQyxVQUFBLEtBQUs7WUFDcEIsSUFBSSxHQUFHLEdBQWEsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDakQsSUFBRyxHQUFHLEVBQ047Z0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzNELEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sNEJBQWdCLEdBQXZCLFVBQXdCLEdBQUcsRUFBQyxDQUFDO1FBRXpCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsR0FBRyxDQUFBLENBQUMsQ0FBQSxHQUFHLENBQUM7UUFDN0IsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0E3S0EsQUE2S0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRnVuY3Rpb25zXG57XG4gICAgXG4gICAgc3RhdGljIGdldENoaWxkcmVuQW5pbWF0aW9ucyhub2RlKTogY2MuQW5pbWF0aW9uW10ge1xuICAgICAgICBsZXQgYW5pbWF0aW9uczpjYy5BbmltYXRpb25bXSA9IFtdXG4gICAgICAgIHZhciBhbmltID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKVxuICAgICAgICBpZihhbmltKVxuICAgICAgICAgICAgYW5pbWF0aW9ucy5wdXNoKGFuaW0pXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPCBub2RlLmNoaWxkcmVuQ291bnQ7IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIHZhciBhbmltID0gY2hpbGQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbilcbiAgICAgICAgICAgIGlmKGFuaW0pXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9ucy5wdXNoKGFuaW0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RvcEFuaW1hdGlvbnMoYW5pbWF0aW9ucylcbiAgICB7XG4gICAgICAgIGFuaW1hdGlvbnMuZm9yRWFjaCgoYW5pbTpjYy5BbmltYXRpb24pPT57XG4gICAgICAgICAgICBhbmltLnN0b3AoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZG9TaG93QW5pbWF0aW9ucyhhbmltYXRpb25zLGZpbmlzaENhbGxiYWNrPzpGdW5jdGlvbix0YXJnZXQ/KVxuICAgIHtcbiAgICAgICAgbGV0IG1heER1cmF0aW9uID0gMCA7XG4gICAgICAgIGxldCBtYXhEdXJhdGlvbkFuaW1hdGlvbjpjYy5BbmltYXRpb247XG4gICAgICAgIGFuaW1hdGlvbnMuZm9yRWFjaCgoYW5pbTpjYy5BbmltYXRpb24pPT57XG4gICAgICAgICAgICBsZXQgY2xpcHMgPSBhbmltLmdldENsaXBzKClcbiAgICAgICAgICAgIGlmKGNsaXBzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBjbGlwc1swXVxuICAgICAgICAgICAgICAgIGxldCBhbmltU3RhdGUgPSBhbmltLnBsYXkoY2xpcC5uYW1lKVxuICAgICAgICAgICAgICAgIGFuaW1TdGF0ZS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLk5vcm1hbFxuICAgICAgICAgICAgICAgIGlmIChjbGlwLmR1cmF0aW9uID4gbWF4RHVyYXRpb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbiAgPSBjbGlwLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbkFuaW1hdGlvbiA9IGFuaW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAoZmluaXNoQ2FsbGJhY2spXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gZnVuY3Rpb24oKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmluaXNoIGFuaW1hdGlvbnNcIilcbiAgICAgICAgICAgICAgICBpZihtYXhEdXJhdGlvbkFuaW1hdGlvbilcbiAgICAgICAgICAgICAgICAgICAgbWF4RHVyYXRpb25BbmltYXRpb24ub2ZmKFwiZmluaXNoZWRcIixmdW5jKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hDYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtYXhEdXJhdGlvbkFuaW1hdGlvbilcbiAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbkFuaW1hdGlvbi5vbihcImZpbmlzaGVkXCIsZnVuYyk7XG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICAgIGZpbmlzaENhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3RhdGljIGdldExvbmdlc3RBbmltYXRpb24oYW5pbWF0aW9ucylcbiAgICAvLyB7XG4gICAgLy8gICAgIGFuaW1hdGlvbnMuZm9yRWFjaCgoYW5pbTpjYy5BbmltYXRpb24pPT57XG4gICAgLy8gICAgICAgICBsZXQgY2xpcHMgPSBhbmltLmdldENsaXBzKClcbiAgICAvLyAgICAgICAgIGZvciAoY2xpcHMpXG4gICAgICAgICAgICBcbiAgICAvLyAgICAgICAgIC8v5Lul5pyA6ZW/55qE5Li65YeGXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvL1RPRE866L+Y5pyq5a6e546wXG4gICAgc3RhdGljIGlzQW5pbWF0aW9uUnVubmluZyhhbmltYXRpb25zOiBjYy5BbmltYXRpb25bXSk6IGFueSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZG9IaWRlQW5pbWF0aW9ucyhhbmltYXRpb25zLGZpbmlzaENhbGxiYWNrPzpGdW5jdGlvbix0YXJnZXQ/KVxuICAgIHtcbiAgICAgICAgbGV0IGhhc0hpZGVBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICAgbGV0IG1heER1cmF0aW9uID0gMCA7XG4gICAgICAgIGxldCBtYXhEdXJhdGlvbkFuaW1hdGlvbjpjYy5BbmltYXRpb247XG4gICAgICAgIGFuaW1hdGlvbnMuZm9yRWFjaCgoYW5pbTpjYy5BbmltYXRpb24pPT57XG4gICAgICAgICAgICBsZXQgY2xpcHMgPSBhbmltLmdldENsaXBzKClcbiAgICAgICAgICAgIGlmKGNsaXBzLmxlbmd0aCA9PSAyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBjbGlwID0gY2xpcHNbY2xpcHMubGVuZ3RoLTFdXG4gICAgICAgICAgICAgICAgLy8gYW5pbS5vbihcImZpbmlzaGVkXCIsb25IaWRlQW5pbWF0aW9uRmluaXNoZWQpXG4gICAgICAgICAgICAgICAgaGFzSGlkZUFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGNsaXAubmFtZSlcbiAgICAgICAgICAgICAgICBpZiAoY2xpcC5kdXJhdGlvbiA+IG1heER1cmF0aW9uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4RHVyYXRpb24gID0gY2xpcC5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbWF4RHVyYXRpb25BbmltYXRpb24gPSBhbmltO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKGNsaXBzLmxlbmd0aCA9PSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBjbGlwID0gY2xpcHNbMF07XG4gICAgICAgICAgICAgICAgLy8gY2xpcC53cmFwTW9kZSA9IGNjLldyYXBNb2RlLlJldmVyc2U7XG4gICAgICAgICAgICAgICAgaGFzSGlkZUFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGFuaW1TdGF0ZSA9IGFuaW0ucGxheShjbGlwLm5hbWUpXG4gICAgICAgICAgICAgICAgYW5pbVN0YXRlLndyYXBNb2RlID0gY2MuV3JhcE1vZGUuUmV2ZXJzZVxuICAgICAgICAgICAgICAgIGlmIChjbGlwLmR1cmF0aW9uID4gbWF4RHVyYXRpb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbiAgPSBjbGlwLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbkFuaW1hdGlvbiA9IGFuaW07XG4gICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAobWF4RHVyYXRpb25BbmltYXRpb24gJiYgZmluaXNoQ2FsbGJhY2spXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gZnVuY3Rpb24oKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmluaXNoIGFuaW1hdGlvbnNcIilcbiAgICAgICAgICAgICAgICBtYXhEdXJhdGlvbkFuaW1hdGlvbi5vZmYoXCJmaW5pc2hlZFwiLGZ1bmMpO1xuICAgICAgICAgICAgICAgIGZpbmlzaENhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1heER1cmF0aW9uQW5pbWF0aW9uLm9uKFwiZmluaXNoZWRcIixmdW5jKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzSGlkZUFuaW1hdGlvbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VG9nZ2xlSW5kZXgodG9nZ2xlOmNjLlRvZ2dsZSlcbiAgICB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0b2dnbGUubm9kZS5nZXRQYXJlbnQoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgO2kgPCBjb250YWluZXIuY2hpbGRyZW5Db3VudDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNvbnRhaW5lci5jaGlsZHJlbltpXVxuICAgICAgICAgICAgaWYodG9nZ2xlLm5vZGUgPT0gY2hpbGQgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0VG9nZ2xlSW5kZXgodG9nZ2xlQ29udGFpbmVyOmNjLk5vZGUsaW5kZXgpXG4gICAge1xuICAgICAgICBpZih0b2dnbGVDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW1VJRnVuY3Rpb24uc2VsZWN0VG9nZ2xlSW5kZXhdIDogaW52YWxpZCB0b2dnbGVDb250YWluZXIgOlwiIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG9nZ2xlTm9kZSA9IHRvZ2dsZUNvbnRhaW5lci5jaGlsZHJlbltpbmRleF1cbiAgICAgICAgaWYodG9nZ2xlTm9kZSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IHRvZ2dsZU5vZGUuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSlcbiAgICAgICAgICAgIGlmKHRvZ2dsZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltVSUZ1bmN0aW9uLnNlbGVjdFRvZ2dsZUluZGV4XSA6XCIgKyBpbmRleClcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2hlY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltVSUZ1bmN0aW9uLnNlbGVjdFRvZ2dsZUluZGV4XSA6Y2Fubm90IGZpbmQgdG9nZ2xlIHdpdGggaW5kZXg6XCIrIGluZGV4KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IGJ0biBcbiAgICBzdGF0aWMgc2V0VG91Y2hFbmFibGVkKG5vZGUsYilcbiAgICB7XG4gICAgICAgIGcuZm9yZWFjaE5vZGUobm9kZSxjaGlsZD0+e1xuICAgICAgICAgICAgbGV0IGJ0bjpjYy5CdXR0b24gPSBjaGlsZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKVxuICAgICAgICAgICAgaWYoYnRuKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1VJRnVuY3Rpb25dIFwiICsgY2hpbGQubmFtZSArIFwiIHRvdWNoIDogXCIgKyBiKVxuICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGUgPSBiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBzZXRCdXR0b25FbmFibGVkKGJ0bixiKVxuICAgIHtcbiAgICAgICAgYnRuLm5vZGUub3BhY2l0eSA9IGI/MjU1OjEyNTtcbiAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IGJcbiAgICB9XG5cbn0iXX0=