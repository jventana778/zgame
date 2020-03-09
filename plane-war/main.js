var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k === 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
    bindAll('.zz-auto-slider', 'input', function (event) {
        var target = event.target
        // bindVar 是 string
        var bindVar = target.dataset.value
        var v = target.value
        eval(bindVar + '=' + v)
        var label = target.closest('label').querySelector('.zz-label')
        label.innerText = v
    })
}

var __main = function() {
    var images = {
        sky: 'img/sky.png',
        player: 'img/me/life.png',
        enemy1: 'img/enemy/enemy.png',
        enemy2: 'img/enemy/enemy2.png',
        bullet_enemy: 'img/me/bullet1.png',
        bullet: 'img/me/bullet2.png',
        fire: 'img/fire.png'
    }
    // game
    var game = zzGame.instance(30, images, function(g){
        var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    // debug 模式
    enableDebugMode(game, true)
}

__main()
