class UIBase extends eui.Component{

    /**无视比例，充满屏幕 */
    public static readonly Adapt1 = 1;
    /**保持比例，缩放至显示全部内容 */
    public static readonly Adapt2 = 2;

    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.OnOpen, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.OnClose, this);
    }

    protected Params: any;
    protected content: eui.Group;
    protected AdaptType: number = UIBase.Adapt1;
    protected tap_mask: eui.Rect;
    public isOpened: boolean;

    protected OnOpen() {
        this.AdaptScreen();
        this.isOpened = true;
        this.tap_mask && this.tap_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTapMask, this);
    }

    protected OnClose() {
        this.isOpened = false;
    }


    /**
     * 打开面板
     */
    public Open(layer: egret.DisplayObjectContainer, ...Params) {
        // let stage = layer || App.layer.playLayer;
        let stage = layer
        switch (stage) {
            case this:
                // this.OpenInPlayLayer();
                break;
            default :
                stage.addChild(this);
                break;
        }
    }

    // private OpenInPlayLayer() {
    //     if (App.layer.playLayer.numChildren > 0) App.layer.playLayer.removeChildren();
    //     App.layer.playLayer.addChild(this);
    // }

    /**
     * 关闭面板
     */
    public Close() {
        if (this.parent) this.parent.removeChild(this);
    }

    /**
     * 全面屏适应
     */
    protected AdaptScreen() {
        if (!this.content) return;
		let sw = window.screen.availWidth;
		let sh = window.screen.availHeight;

        if (sh < sw) {
            let idx = sw;
            sw = sh;
            sh = idx;
        }

        let gameW = App.StageSize.width;
        let gameH = App.StageSize.height;

		let scale_s = Math.floor(sw/sh*100);
		let scale_c = Math.floor(gameW/gameH*100);
		
		
		if (scale_s < scale_c) {
            // 竖屏
			let cw = sw / sh * gameH;
			this.content.scaleX = this.content.scaleY = cw/gameW;
            // this.content.scaleX = 1
            if (this.AdaptType == 1) this.content.height = gameW * (sh / sw);
		}

		if (scale_s > scale_c) {
            // 横屏
			let ch = sh / sw * gameW;
			this.content.scaleX = this.content.scaleY = ch/gameH;
            if (this.AdaptType == 1) this.content.width = gameH * (sw / sh);
		}
        this.content.anchorOffsetX = this.content.width/2;
		this.content.anchorOffsetY = this.content.height/2;
	}

    /**点击半透黑 */
    protected OnTapMask() {
        this.Close();
    }
}