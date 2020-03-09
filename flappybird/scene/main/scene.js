class Scene extends zzScene {
    constructor(game) {
        super(game)
        this.init()
        this.setupInputs()
    }

    draw() {
        super.draw()
    }
    update() {
        super.update()
        // update label
        this.score += 1
        this.label.text = 'Score:' + this.score
        // update grounds
        this.groundsMoving()
        // 鸟撞杆子
        if (this.bird.collide(this.pipes)) {
            // log('bird collide', this.pipes)
            this.bird.over()
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
        }
    }
    init() {
        this.score = 0
        // var t = this
        this.skipCount = 8
        var bg = zzImage.new(this.game, 'bg')
        this.addElement(bg)
        this.addBird()
        this.addPipes()
        this.addGrounds()
        // add label
        this.label = zzLabel.new(this.game, 'Score:' + this.score, 20, 480)
        this.addElement(this.label)
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-5, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(5, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            // log('jump')
            b.jump(5, keyStatus)
        })

    }
    addPipes() {
        this.pipes = Pipes.new(this.game)
        // log('add pipes', this.pipes.pipes, typeof this.pipes.pipes)
        this.addElement(this.pipes)
    }
    addGrounds() {
        this.grounds = []
        for (let i = 0; i < 10; i++) {
            let g = zzImage.new(this.game, 'ground')
            g.x = i * 41
            g.y = 420
            this.addElement(g)
            this.grounds.push(g)
        }
    }
    addBird() {
        // add bird
        var b = Bird.new(this.game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(this.bird)
    }
    groundsMoving() {
        this.skipCount--
        var offset = -5
        // 向左走了 7 次 5，向右走一次 35
        // log('offset', this.skipCount)
        if (this.skipCount <= 0) {
            this.skipCount = 8
            offset = 35
            // log('offset', offset)
        }
        for (var i = 0; i < 10; i++) {
            var g = this.grounds[i]
            g.x += offset
        }

    }
}
