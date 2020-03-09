class Bullet extends zzImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }

    setup() {
        // log('x, y', x, y)
        this.speed = 10
        this.alive = 1
        // this.x = x
        // this.y = y
    }
    update() {
        if (this.user.name === 'player') {
            this.y -= this.speed
        } else {
            this.y += this.speed
            // log('enemy bullet speed')
        }
        // 子弹毁灭条件
        var c = this.alive === 0 || this.y < 0 || this.y > 600
        if (c) {
            this.destroy()
        }
    }
    // 判断敌我子弹抵消
    collide(bullet) {
        let b = bullet
        var o = this
        var c = rectIntersects(o, b) || rectIntersects(b, o)
        if (this.user.name !== b.user.name && c) {
            this.alive--
            b.alive--
            log('子弹抵消', this, b)
            return true
        }
    }
    // 子弹毁灭
    destroy() {
        var r = this.scene.deleteElement(this)
        this.user.deleteBullet(this)
        // log('bullet destroy')
    }
}
