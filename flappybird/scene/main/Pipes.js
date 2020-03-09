class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.Space = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = zzImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 300 + i * this.Space
            // log('pipes', p1.w, p1.h)
            var p2 = zzImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-240, -100)
        // p1.y = randomBetween(400, 500)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (var p of this.pipes) {
            p.x -= 5
            if (p.x < - 100) {
                p.x += this.Space * this.columsOfPipe
            }
        }
    }
    draw() {
        for (var p of this.pipes){
            var context = this.game.context
            context.save()
            //
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}
