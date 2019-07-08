class App {
	public constructor() {
	}
	private static layerManager:LayerManager
	public static layer()
	{
		if(!this.layerManager)
		{
			this.layerManager = new LayerManager()
		}
		return this.layerManager
	}
	public static gameStage:egret.DisplayObjectContainer

	 /**
     * 舞台大小
     */
    public static get StageSize() {
        return {
            width: 640,
            height: 1136
        }
    }
	private static Excs: number[] = [0, 0];
    private static GlobalScale: number = 1;
	public static initLayer(stage){
		this.gameStage =new egret.DisplayObjectContainer()
		stage.addChild(this.gameStage)
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
			// 全面屏
            let x = sw / sh * gameH;
            this.gameStage.x += (x - gameW) / 2;
            console.log("全面",x)
            this.Excs = [(x - gameW) / 2, 0];
            this.GlobalScale = x / gameW;
		}

		if (scale_s > scale_c) {
			// paid屏
            let y = sh / sw * gameW;
            this.gameStage.y += (y - gameH) / 2;
            console.log("ipad",y)
            this.Excs = [0, (y - gameH) / 2];
            this.GlobalScale = y / gameH;
		}
	}
}