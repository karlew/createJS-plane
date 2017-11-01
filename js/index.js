var stage, loader;
var sky, ship, virus, fire;
var C_W, C_H;
var virusArr = [], fireArr = [];
var myCanvas = document.getElementById("myCanvas");
var isTouch = false,rX,rY;
var live = 3,mark = 0,initTime,time = 60,canPlay = true;
var voiceBoom = document.getElementById("voice_boom");
var voiceShot = document.getElementById("voice_shot");

function init(){
    stage = new createjs.Stage("myCanvas");
    stage.canvas.width = document.body.clientWidth;
    stage.canvas.height = document.body.clientHeight;
    C_W = stage.canvas.width;
    C_H = stage.canvas.height;

    var manifest = [
        {src:"img/ship.png" , id:"ship"},
        {src:"img/virus1.png" , id:"virus1"},
        {src:"img/virus2.png" , id:"virus2"},
        {src:"img/virus3.png" , id:"virus3"},
        {src:"img/virus4.png" , id:"virus4"},
        {src:"img/fire.png" , id:"fire"}
    ]

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete" , handleComplete);
    loader.loadManifest(manifest);
}

function handleComplete() {  

    var shipImage = loader.getResult("ship");
    var virusImage1 = loader.getResult("virus1");
    var virusImage2 = loader.getResult("virus2");
    var virusImage3 = loader.getResult("virus3");
    var virusImage4 = loader.getResult("virus4");
    var fireImage = loader.getResult("fire");

    // sky = new createjs.Shape();
    // sky.graphics.bf(bgImage).drawRect(0,0,C_W,C_H);
    // stage.addChild(sky);

    ship = createShip(shipImage);
    virus1 = createVirus(2.6,15,virusImage1);
    virus2 = createVirus(2.3,10,virusImage2);
    virus3 = createVirus(2,5,virusImage3);
    virus4 = createVirus(1.7,3,virusImage4);
    fire = createFire(ship.sprite.x,ship.sprite.y,ship.picsize().w,fireImage);
    
    virusArr.push(virus1,virus2,virus3,virus4)

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

    //拖动事件
    myCanvas.addEventListener('touchstart',touchstartFun, false);  
    myCanvas.addEventListener('touchmove',touchmoveFun, false);  
    myCanvas.addEventListener('touchend',touchendFun, false);  

    initTime = setInterval(countDown,1000); 
}

function handleTick() {
    if(canPlay){
        var smpX = ship.sprite.x+ship.picsize().w/2;
        var smpY = ship.sprite.y+ship.picsize().h/2;
        virusArr.forEach(function(i){
            // virusMidPoint,shipMidPoint,fireMidPoint 中心点
            var vmpX = i.sprite.x+i.picsize().w/2;
            var vmpY = i.sprite.y+i.picsize().h/2;
            var fmpX = fire.shape.x+fire.picsize().w/2;
            var fmpY = fire.shape.y+fire.picsize().h/2;
            if(Math.abs(vmpX-smpX)<=(ship.picsize().w*0.6+i.picsize().w)/2&&Math.abs(vmpY-smpY)<=(ship.picsize().h+i.picsize().h)/2&&i.sprite.currentAnimation=="normal"){
                //飞机碰到病毒
                live--;
                $(".plane-text").text("x"+live);
                if(live<=0){
                    endFun();
                }
                i.sprite.gotoAndPlay("boom");
                //声音
                playMusic(voiceBoom)
            }else if(Math.abs(vmpX-fmpX)<=(fire.picsize().w+i.picsize().w)/2&&Math.abs(vmpY-fmpY)<=(fire.picsize().h+i.picsize().h)/2&&i.sprite.currentAnimation=="normal"){
                //子弹碰到病毒
                mark += i.mark;
                $(".star-text").text(mark);
                resetFire();
                i.sprite.gotoAndPlay("boom");
                //声音
                playMusic(voiceBoom)
            }else if(i.sprite.y>=C_H){
                //病毒到达底部
                live--;
                $(".plane-text").text("x"+live);
                if(live<=0){
                    endFun();
                }
                i.reset();
            }else{
                i.update();
            }
            
        });
        fire.update();
        if(fire.shape.y<=0){
            //子弹到达顶部
            resetFire()
        }

        stage.update();
    }
}

function resetFire() {
    fire.shape.x = ship.sprite.x + (ship.picsize().w-fire.picsize().w)/2;
    fire.shape.y = ship.sprite.y - fire.picsize().h;
    //声音
    playMusic(voiceShot)
}

function touchstartFun(e) {
    //relativeX, relativeY 
    rX = e.touches[0].clientX - ship.sprite.x;
    rY = e.touches[0].clientY - ship.sprite.y;
    if(rX>0&&rX<ship.picsize().w&&rY>0&&rY<ship.picsize().h){
        isTouch = true
    }
}

function touchmoveFun(e) {
    if(isTouch){
        ship.sprite.x = e.touches[0].clientX - rX;
        ship.sprite.y = e.touches[0].clientY - rY;
    }
}

function touchendFun(e) {
    if(isTouch){
        isTouch = false
    }
}

function countDown(){
    time--;
    $(".clock-text").text(time+"s");
    if(time<=0){
        endFun();
    }
}

//结束游戏
function endFun() {
    clearInterval(initTime);
    // createjs.Ticker.reset();
    canPlay = false;
    $(".playAgain").show();
}

$(".playAgain").click(function(){
    $(".playAgain").hide();
    playAgain();
})

//再玩一次
function playAgain() {
    live = 3;
    mark = 0;
    time = 60;
    $(".plane-text").text("*3");
    $(".star-text").text("0");
    $(".clock-text").text("60s");
    initTime = setInterval(countDown,1000); 

    virusArr.forEach(function(i){
        i.reset();
    })

    ship.reset();

    resetFire()

    // createjs.Ticker.init();
    canPlay = true;
}

//播放音乐
function playMusic(ele) {
    if (!ele.paused) {
        ele.currentTime = 0;
    } else {
        ele.play();
    }
}

init()

