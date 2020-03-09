class SceneEnd extends zzScene {
    constructor(game) {
        super(game)
        // log('sceneend')
        this.init()
    }

    draw() {
        super.draw()
    }
    init() {
        var self = this
        self.game.registerAction('r', function(keyStatus){
            if (keyStatus === 'down') {
                var s = SceneTitle.new(self.game)
                self.game.replaceScene(s)
            }
        })
        // add background
        var bg = zzImage.new(this.game, 'bg')
        this.addElement(bg)
        // add label
        var context = self.game.context
        context.font='20px Arial'
        context.fillStyle = 'red'
        // add label end
        var endText = zzLabel.new(this.game, '游戏结束', 100, 180)
        this.addElement(endText)
        // add label again
        var again = zzLabel.new(this.game, '按 k 再来一次', 100, 220)
        this.addElement(again)
    }
}
