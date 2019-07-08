class LayerManager {
	public constructor() {
	}
	private welcomelayer:WelcomePanel
	public get Welcomelayer():WelcomePanel{
		if(!this.welcomelayer)
		this.welcomelayer = new WelcomePanel()
		return this.welcomelayer
	}

	private gameMainlayer:GameMainPanel
	public get GameMainlayer():GameMainPanel{
		if(!this.gameMainlayer)
		this.gameMainlayer = new GameMainPanel()
		return this.gameMainlayer
	}
}