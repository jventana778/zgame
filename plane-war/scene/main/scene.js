var config = {
    player_speed: 10,
    player_life: 10,
    enemyMaxSpeed: 5,
}

class Scene extends zzScene{
    constructor(game) {
        super(game)
        this.__init()
        this.setup()
    }

    static new(game) {
        var i = new this(game)
        return i
    }
    __init() {
        var s = this
        this.numberOfEnemies = 5
        this.score = 0
        this.bg = zzImage.new(this.game, 'sky')
        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 150
        this.label = zzLabel.new(this.game, '分数' + this.score,20, 580)
        // add elements
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.label)
        // add enemies
        this.addEnemies()
    }
    setup() {
        var s = this
        this.game.registerAction('a', function(){
            s.player.moveLeft()
        })
        this.game.registerAction('d', function(){
            s.player.moveRight()
        })
        this.game.registerAction('w', function(){
            s.player.moveUp()
        })
        this.game.registerAction('s', function(){
            s.player.moveDown()
        })
        this.game.registerAction('j', function(){
            s.player.fire()
        })
    }
    // draw() {
    // }
    update() {
        if (window.paused) {
            return
        }
        super.update()
        // 击中敌人
        this.hitEnemy()
        // 消灭子弹
        this.killBullet()
        // player 被攻击
        this.inWar()
        // update label
        this.label.text = '分数' + this.score
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    hitEnemyBullet(bullet, enemy) {
        var b = bullet
        var e = enemy
        for (let be of e.bullets) {
            if (b.collide(be)) {
                this.score += 50
            }
        }
    }
    hitEnemy() {
        for (var e of this.enemies) {
            if (this.player.hit(e)) {
                this.score += 100
            }
        }
    }
    killBullet() {
        for (var b of this.player.bullets) {
            for (let e of this.enemies) {
                this.hitEnemyBullet(b, e)
            }
        }
    }
    inWar() {
        for (let e of this.enemies) {
            // 被撞机
            this.player.hittedByEnemy(e)
            for (var be of e.bullets) {
                // 被子弹击中
                this.player.hittedByBullet(be)
            }
        }
    }
}
