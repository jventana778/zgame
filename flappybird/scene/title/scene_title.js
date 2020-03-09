class SceneTitle extends zzScene {
    constructor(game) {
        super(game)
        this.init()
    }

    draw() {
        super.draw()
    }
    init() {
        var self = this
        self.game.registerAction('k', function(){
            var s = Scene.new(self.game)
            self.game.replaceScene(s)
        })
        // add background
        var bg = zzImage.new(this.game, 'bg')
        this.addElement(bg)
        // add label start
        var context = self.game.context
        context.font='20px Arial'
        context.fillStyle = 'blue'
        var text = zzLabel.new(this.game, '按 k 开始游戏', 100, 200)
        this.addElement(text)
    }
}
