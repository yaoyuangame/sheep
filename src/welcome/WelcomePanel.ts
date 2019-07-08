class WelcomePanel extends UIBase {
	private gamestart_btn: eui.Button
	public constructor() {
		super();
		this.init();
	}
	private init() {
		this.skinName = WelcomeSkin
		this.gamestart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this)
	}
	protected OnOpen() {
		super.OnOpen();
	}
	private gameStart() {
		App.layer().GameMainlayer.Open(App.gameStage);
	}
}