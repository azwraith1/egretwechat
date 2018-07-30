/**
 *
 * @author 
 *
 */
class UIUtils {
    public static removeFromParent(child: egret.DisplayObject) { 
        if (child && child.parent) { 
            child.parent.removeChild(child);
        }
    }
    public static addButtonScaleEffects(p: egret.DisplayObjectContainer) {
        if (!p) return;

        if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
        } else {
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
                UIUtils.addButtonScaleEffects(ch);
            }
        }
    }
    
    private static onButtonTouchBegan(e: egret.TouchEvent) {
        var btn = e.target;
        egret.Tween.get(btn).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
    }

    static removeButtonScaleEffects(p: egret.DisplayObjectContainer) {
        if (!p) return;

        if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
            p.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
        } else {
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
                UIUtils.removeButtonScaleEffects(ch);
            }
        }
    }
    
    static removeSelf(p: egret.DisplayObject) { 
        UIUtils.removeFromParent(p);   
    }
}
