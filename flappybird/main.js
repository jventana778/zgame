var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    // 暂停
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
    // 绑定所有 slider 的事件
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
        fire: 'img/fire.png',
        idle1: 'img/w1.png',
        idle2: 'img/w2.png',
        idle3: 'img/w3.png',
        run1: 'img/run1.png',
        run2: 'img/run2.png',
        run3: 'img/run3.png',
        bg: 'img/background-day.png',
        ground: 'img/ground.png',
        b1: 'img/w1.png',
        b2: 'img/w2.png',
        b3: 'img/w3.png',
        pipe: 'img/pipe.png',
    }
    // game
    var game = zzGame.instance(30, images, function(g){
        // var s = Scene_title.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    // debug mode
    enableDebugMode(game, true)
}

__main()
