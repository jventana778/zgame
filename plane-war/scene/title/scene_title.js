class SceneTitle extends zzScene {
    constructor(game) {
        super(game)
        this.setup()
    }

    draw() {
        super.draw()
    }
    setup() {
        var t = this
        // 按 k 开始游戏
        this.game.registerAction('k', function(){
            var s = Scene.new(t.game, 1)
            t.game.replaceScene(s)
        })
        this.addBackground()
        this.addParticleSystem()
        this.addLabel()
    }
    addBackground() {
        this.bg = zzImage.new(this.game, 'sky')
        this.addElement(this.bg)
    }
    addParticleSystem() {
        var ps = zzParticleSystem.new(this.game)
        this.addElement(ps)
    }
    addLabel() {
        var ctx = this.game.context
        // log('end scene')
        ctx.font='20px Arial'
        log('addLabel', ctx)
        var text = zzLabel.new(this.game, '按 k 开始游戏', 150, 100)
        this.addElement(text)
        // ctx.font='10px Arial'
    }
}
