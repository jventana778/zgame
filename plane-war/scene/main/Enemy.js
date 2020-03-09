class Enemy extends zzImage {
    constructor(game) {
        var type = randomBetween(1, 2)
        var name = 'enemy' + type
        // log('enemy name', name)
        super(game, name)
        this.bullets = []
        this.setup()
    }

    setup() {
        this.name = 'enemy'
        var maxSpeed = config.enemyMaxSpeed
        this.speed = randomBetween(2, maxSpeed)
        this.bulletSpeed = randomBetween(maxSpeed, 12)
        this.x = randomBetween(50, 350)
        this.y = -randomBetween(50, 200)
        this.alive = randomBetween(1, 3)
        this.cooldown = randomBetween(20, 30)
        // log('enemy speed', this.speed)
    }
    update() {
        this.y += this.speed
        this.cooldown--
        // 敌人更新
        if (this.y > 600) {
            this.setup()
        }
        if (this.alive <= 0) {
            this.destroy()
        }
        // 敌人自动开火
        this.fire()
    }
    collide(bullet) {
        let b = bullet
        var o = this
        // log('collide', o.alive, b)
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    destroy() {
        log('敌人损毁')
        var ps = zzParticleSystem.new(this.game)
        ps.x = this.x
        ps.y = this.y
        this.scene.addElement(ps)
        this.setup()
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = 50
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = Bullet.new(this.game, 'bullet_enemy')
            b.speed = this.bulletSpeed
            log('enemy bullet speed', b.speed)
            b.x = x
            b.y = y
            b.user = this
            this.addBullet(b)
        }
    }
    addBullet(bullet) {
        let b = bullet
        this.scene.addElement(b)
        this.bullets.push(b)
    }
    deleteBullet(bullet) {
        let b = bullet
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i] === b) {
                this.bullets.splice(i, 1)
            }
        }
    }
}
