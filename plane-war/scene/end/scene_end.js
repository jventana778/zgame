class SceneEnd extends zzScene {
    constructor(game) {
        super(game)
        log('sceneend')

        // 注册 r 返回 title
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })

        this.bg = zzImage.new(this.game, 'sky')
        this.addElement(this.bg)
    }

    draw() {
        super.draw()
        // draw labels
        var ctx = this.game.context
        // log('end scene')
        ctx.font='15px Arial'
        ctx.fillText('游戏结束, 按 r 返回标题界面', 100, 100)
        ctx.font='10px Arial'

    }
}
