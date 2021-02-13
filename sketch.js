var sketch = function(p){

    var sceneOpening;

    let pDeveiceOrientation;
    let player;
    let enemy;
    let enemies;
    let countEnemy;
    let food;
    let barrier;
    let score;
    let collsionDetector;
    let isEnemyHit;
    let isEnd;
    let highScore;
    let explosion;
    let explosions;
    let soundExplosion;
    let soundBarrier;
    let startTime;
    let pastTime;
    let endTime;
    let isRegisterEndTime;
    let buttonContinue;
    let isCreateContinueButton;
    let buttonReturn;
    let buttonPause;
    let isPause;
    let pastTimeRegister;
    let canvas;

    p.setup = () => {
        window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
        window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
        pDeviceOrientation = p.deviceOrientation;
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        player = new Dolphin(p);
        player.maxspeed = 6;
        player.maxforce = 0.2;
        // enemy = new Shark(p);
        enemies = [];
        enemies.push(new Shark(p));
        countEnemy = 1;
        explosions = [];
        barrier = new Barrier(p);
        collisionDetector = new CollisionDetector(p);
        food = p.createVector(p.random(p.width), p.random(p.height));
        score = 0;
        isEnd = false;
        isRegisterHighscore = false;
        soundExplosion = new Audio();
        soundExplosion.src = "assets/explosion.mp3";
        soundBarrier = new Audio();
        soundBarrier.src = "assets/barrier.mp3";
        startTime = Date.now();
        pastTime = 0;
        isRegisterEndTime = false;
        isCreateButtonContinue = false;
        isPause = false;
        pastTimeRegister = 0;

        if (localStorage.highScore){
            highScore = localStorage.highScore;
        } else {
            highScore = 0;
        }

        createButtonReturn();
        createButtonPause();
    }

    p.draw = () => {
        if (player.life > 0){
            drawOnPlay();
        } else {
            if (pDeviceOrientation !== undefined && pDeviceOrientation !== p.deviceORientation){
            // 向きが変わったとき
                buttonContinue.remove();
                drawOnPlay();
            }
        }
    }

    function drawOnPlay() {

        checkOrientation();
        // pDeviceOrientation = p.deviceOrientation;

        p.background(0);

        // if (p.deviceOrientation !== undefined){
        //     window.orientation = 0;
        //     p.push();
        //     p.fill(255);
        //     p.strokeWeight(32);
        //     p.text(p.deviceOrientation, 200, 200);
        //     p.text(window.orientation, 300, 300);
        //     p.pop();
        // }

        player.seek(p, food);
        if (!isEnd){
            player.update();
            player.loop(p);
        }
        player.display(p);
        // enemy.seek(p, player.position);
        if (!isEnd){
            // enemy.update();
        }
        p.push();
        p.stroke(255);
        p.pop();
        //enemy.display(p);
        if (!isEnd){
            barrier.make(p);
        }
        barrier.display(p);
        // isEnemyHit = barrier.detectHit(p, enemy);
        countEnemy = Math.floor(pastTime / 10);
        if (enemies.length <= countEnemy){
            enemies.push(new Shark(p));
        }
        for (let i = 0; i < enemies.length; i++){
            if (!isEnd){
                if (typeof(enemies[i]) == "number"){
                    if (Date.now() - enemies[i] > 1000){
                        enemies[i] = new Shark(p);
                    }
                    continue;
                }
                enemies[i].seek(p, player.position);
                enemies[i].update();
                enemies[i].loop(p);
                enemies[i].checkEating();
            }

            if (typeof(enemies[i]) == "number"){
                continue;
            } else {
                enemies[i].display(p);
            }

            if (collisionDetector.detectCollision(p, player, enemies[i])){
                if (!enemies[i].isEating){
                    player.life--;
                }
                if (!enemies[i].isEating){
                    enemies[i].isEating = true;
                    enemies[i].startEating = Date.now();
                }
                if (player.life <= 0){
                    isEnd = true;
                    p.push();
                    p.fill(255);
                    p.stroke(255);
                    p.textFont("arial");
                    p.textSize(32);
                    p.text("☠️", p.width/2 - 16, p.height/3);
                    p.pop();
                    if (!isCreateContinueButton){
                        createButtonContinue();
                        isCreateButtonContinue = true;
                    }
                    // p.noLoop();
                }
            }
            if (barrier.detectHit(p, enemies[i])){
                // explosion = new Explosion(p, p.createVector(enemies[i].position.x, enemies[i].position.y));
                explosions.push(new Explosion(p, p.createVector(enemies[i].position.x, enemies[i].position.y)));
                soundExplosion = new Audio();
                soundExplosion.src = "assets/explosion.mp3";
                soundExplosion.play();
                score++;
                enemies.splice(i, 1);
                enemies[i] = Date.now();
            }
        }
        p.push();
        p.fill(255);
        p.ellipse(food.x, food.y, 10);
        if (player.eat(p, food)){
            food = p.createVector(p.random(p.width-50), p.random(p.height));
            score++;
        }
        p.textFont("arial");
        p.textSize(16);
        p.text("☆: " + highScore, p.width/20*5, p.height/20);
        p.text("★: " + score, p.width/20*10, p.height/20);
        if (!isEnd){
            if (!isPause){
                pastTime = (parseFloat(pastTimeRegister) + (Date.now() - startTime)/1000).toFixed(1);
                p.text("♫: " + pastTime, p.width/20, p.height/20);
            } else {
                p.text("♫: " + pastTimeRegister, p.width/20, p.height/20);
            }

        } else {
            if (!isRegisterEndTime){
                endTime = pastTime;
                isRegisterEndTime = true;
            }
            p.text("♫: " + endTime, p.width/20, p.height/20);
        }
        p.pop();

        if (!isRegisterHighscore){
            if (!localStorage.highScore){
                localStorage.highScore = score;
            } else {
                if (score > localStorage.highScore){
                    localStorage.highScore = score;
                }
            }
        }

        if (explosions.length != 0){
            for (let i = 0; i < explosions.length; i++){
                explosions[i].update();
                explosions[i].show(p);
                if (explosions[i].lifeTime < 0){
                    explosions.splice(i, 1);
                }
            }
        }
        var spanW = p.windowWidth / 20;
        var spanH = p.windowHeight / 50;
        for (let i = 0; i < player.life; i++){
            p.push();
            p.fill(0, 255, 0);
            p.rect((spanW * 2) + spanW * i, spanH * 4 , spanW, 10);
            p.pop();
        }
    }

    function createButtonReturn(){

        buttonReturn = p.createButton("↪︎");
        buttonReturn.position(p.width - p.width/10, p.height/30-4);
        buttonReturn.style("font-family", "monospace");
        buttonReturn.style("font-size", "24pt");
        buttonReturn.style("background-color", "#000000");
        buttonReturn.style("color", "#FFFFFF");
        buttonReturn.style("border", "none");
        buttonReturn.mousePressed(buttonReturnPressed);
        function buttonReturnPressed(){
            mainScene.remove();
            window.sceneOpening = new p5(opening, "sketch");
        }
    }

    function createButtonPause(){

        buttonPause = p.createButton("■");
        buttonPause.position(p.width - p.width/5, p.height/30);
        buttonPause.style("font-family", "monospace");
        buttonPause.style("font-size", "16pt");
        buttonPause.style("background-color", "#000000");
        buttonPause.style("color", "#FFFFFF");
        buttonPause.style("border", "none");
        buttonPause.style("outline", "0");
        buttonPause.mousePressed(buttonPausePressed);
        function buttonPausePressed(){
            if (!isPause){
                isPause = true;
                pastTimeRegister = pastTime;
                p.noLoop();
            } else {
                isPause = false;
                startTime = Date.now();
                p.loop();
            }
        }
    }

    function createButtonContinue(){

        buttonContinue = p.createButton("▶︎");
        buttonContinue.style("color", "white");
        buttonContinue.style("border", "none");
        buttonContinue.style("font-size", "32pt");
        buttonContinue.style("font-family", "arial")
        buttonContinue.position(p.width/2 - 16, p.height/2 - 16);
        buttonContinue.mousePressed(mp);
        function mp(){
            mainScene.remove();
            mainScene = new p5(sketch, "sketch");
        }
    }

    p.mousePressed = () => {

    }

    p.mouseReleased = () => {

    }

    function checkOrientation(){
        if (pDeviceOrientation !== undefined && pDeviceOrientation !== p.deviceOrientation){
            // 向きが変わったとき
            if (canvas != null){
                p.noCanvas();
            }
            canvas = p.createCanvas(window.innerWidth, p.windowHeight);
            if (buttonReturn != null){
                buttonReturn.remove();
            }
            if (buttonPause != null){
                buttonPause.remove();
            }
            if (buttonContinue != null){
                buttonContinue.remove();
            }
            food = p.createVector(p.random(p.width), p.random(p.height));
            createButtonReturn();
            createButtonPause();
        }
        pDeviceOrientation = p.deviceOrientation;
    }

    // window.addEventListener("orientationchange", ()=>{
    //     pDeviceOrientation = p.deviceOrientation;
    //     // if ((isEnd && canvas) || (isPause && canvas)){
    //         if (canvas != null){
    //             p.noCanvas();
    //         }
    //         canvas = p.createCanvas(window.innerWidth, p.windowHeight);
    //         if (buttonReturn != null){
    //             buttonReturn.remove();
    //         }
    //         if (buttonPause != null){
    //             buttonPause.remove();
    //         }
    //         if (buttonContinue != null){
    //             buttonContinue.remove();
    //         }
    //         if (isEnd || isPause){
    //             p.draw();
    //         }
    //         createButtonReturn();
    //         createButtonPause();
    //     // }
    // });
}

sceneOpening = new p5(opening, "sketch");
//buttonStart = new p5(startButton);
