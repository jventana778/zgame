class Player extends zzImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.name = 'player'
        this.alive = config.player_life
        this.speed = config.player_speed
        this.cooldown = 5
        this.bullets = []
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown --
        }
        if (this.alive <= 0) {
            this.destroy()
            var end = SceneEnd.new(this.game)
            this.game.replaceScene(end)
        }
        this.speed = config.player_speed
    }
    move(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.w) {
            x = 400 - this.w
        }
        this.x = x
    }
    moveLeft() {
        // log('moveleft')
        this.move(this.x - this.speed)
    }
    moveRight() {
        this.move(this.x + this.speed)
    }
    moveUp() {
        this.y -= this.speed
        if (this.y <= 0) {
            this.y = 0
        }
    }
    moveDown() {
        this.y += this.speed
        if (this.y >= 600 - this.h) {
            this.y = 600 - this.h
        }
    }
    addBullet(bullet) {
        let b = bullet
        this.scene.addElement(b)
        this.bullets.push(b)
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = 5
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, 'bullet')
            // log('fire a bullet', b, x, y)
            b.x = x
            b.y = y
            b.user = this
            this.addBullet(b)
        }
    }
    deleteBullet(bullet) {
        let b = bullet
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i] === b) {
                this.bullets.splice(i, 1)
            }
        }
    }
    hit(enemy) {
        var e = enemy
        for (var b of this.bullets) {
            // log('b.user.name', b.user.name)
            if (e.collide(b) && b.user.name === 'player') {
                // 可以增加子弹的 attack 属性来设定不同子弹
                e.alive--
                b.alive--
                log('击中敌人')
                return true
            }
        }
    }
    hittedByBullet(bulletEnemy) {
        var o = this
        var b = bulletEnemy

        var c = rectIntersects(o, b) || rectIntersects(b, o)
        if (c) {
            this.alive--
            b.alive = 0
            log('被子弹击中，剩余生命值：', this.alive)
        }
    }
    hittedByEnemy(enemy) {
        var o = this
        var e = enemy

        var c = rectIntersects(o, e) || rectIntersects(e, o)
        if (c) {
            this.alive = this.alive - e.alive
            e.alive = 0
            log('被敌人撞机，剩余生命值：', this.alive)
        }
    }
    destroy() {
        // 机毁人亡
        log('Game Over')
        this.scene.deleteElement(this)
        // 爆炸粒子效果
        var ps = zzParticleSystem.new(this.game)
        ps.x = this.x
        ps.y = this.y
        this.scene.addElement(ps)
        // window.paused = true
    }
}
