class Bird extends zzAnimation{
    constructor(game) {
        super(game, 'idle')
        this.setup()
    }

    static new(game) {
        return new this(game)
    }
    setup() {
        this.addAnimation('run')
        // log('bird w h', this.w, this.h)
        // this.w = 34
        // this.h = 24
        this.flipX = false
        this.jumpHeight = config.bird_jumpHeight.value
        this.cooldown = 0
        this.gy = 10
        this.vy = 0
        this.rotation = 0
        this.alpha = 1
    }
    update() {
        super.update()
        if (this.cooldown > 0) {
            this.cooldown --
        }
        this.jumpHeight = config.bird_jumpHeight.value
        // log('jumpHeight', this.jumpHeight)
        this.y += this.vy
        this.vy += this.gy * 0.05
        // 自动坠地死亡
        this.fallOver()
        // 鸟的动画
        this.setAnimation()
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        // log('this.textrue', this, this.texture)
        context.drawImage(this.texture, 0, 0)
        context.restore()
        // super.draw()
    }
    move(speed, keyStatus) {
        let s = speed
        let ks = keyStatus
        this.x += s
        let x = this.x
        if (x < 0) {
            log('can not move')
            this.x = 0
        }
        // canvas width = 280
        if (x > 280 - this.w) {
            this.x = 280 - this.w
        }
        this.flipX = s < 0
        var animationName = {
            down: 'run',
            up: 'idle',
        }
        var name = animationName[ks]
        this.changeAnimation(name)
    }
    // changeAnimation(name) {
    //     this.animationName = name
    // }
    jump() {
        if (this.cooldown === 0) {
            this.cooldown = config.bird_jumpCoolDown.value
            this.y -= this.jumpHeight
            this.vy = 0
            this.rotation = -60
            this.alpha = 1
            log('bird jump')
            if (this.y < 0) {
                this.y = 0
            }
        }
        log('bird can not jump')
    }
    // 判断撞杆子
    collide(pipes) {
        var o = this
        var ps = pipes.pipes
        for (let p of ps) {
            let c = (rectIntersects(o, p) || rectIntersects(p, o))
            if (c) {
                log('碰撞到杆子了')
                return c
            }
        }
        return false
    }
    // 死亡
    over() {
        // var ps = zzParticleSystem.new(this.game)
        // ps.x = this.x
        // ps.y = this.y
        log('bird over')
        // this.scene.addElement(ps)
        // log('this.scene', this.scene)
        this.scene.deleteElement(this)
    }
    fallOver() {
        var h = 400
        if (this.y > h) {
            log('fall over')
            this.y = h
            this.over()
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
        }
    }
    setAnimation() {
        // 鸟头下掉
        this.rotation += 5
        if (this.rotation > 60) {
            this.rotation = 60
        }
        // 透明度 this.alpha -= 0.02
        if (this.alpha < 0) {
            this.alpha = 0
        }
    }
}