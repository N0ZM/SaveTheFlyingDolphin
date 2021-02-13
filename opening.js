var mainScene;

var opening = function(p){

    let pDeveiceOrientation;
    let position;
    let buttonStart;
    let dolphin;
    let canvas;

    p.setup = function(){
        window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
        window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
        pDeviceOrientation = p.deviceOrientation;
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        position = p.createVector(0, p.height / 2);

        dolphin = new DolphinOpening();

        //buttonStart = p.createGraphics(100, 100);
        //buttonStart.background(255);
        //buttonStart.mousePressed(clickOrTouch);
        buttonStart = p.createButton("▶︎");
        buttonStart.style("color", "white");
        buttonStart.style("border", "none");
        buttonStart.style("font-size", "32pt");
        buttonStart.mousePressed(clickOrTouch);
    }

    p.draw = function(){
        if (pDeviceOrientation !== p.deviceORientation){
            // 向きが変わったとき
            if (canvas != null){
                p.noCanvas();
            }
            canvas = p.createCanvas(window.innerWidth, p.windowHeight);
        }
        pDeviceOrientation = p.deviceOrientation;
        p.background(0);
        p.stroke(255);
        p.line(position.x, position.y, position.x+100, position.y);
        position.x += 40;
        if (position.x > p.width/2){
            dolphin.dislpay(p);
            p.fill(255);
            p.textSize(32);
            p.textAlign(p.CENTER, p.CENTER);
            p.strokeWeight(1);
            p.rectMode(p.CENTER);
            p.textFont("arial", 20);
            // p.text("Save The Flying Dolphin", p.width/2, p.height/2);
            // p.text("空飛ぶイルカを救え！", p.width/2, p.height/2);
            buttonStart.position(p.width/2-buttonStart.width, p.height/3*2);
        }
        //p.image(buttonStart, 100, 100);
    }
}

function clickOrTouch(){
    sceneOpening.remove();
    //buttonStart.remove();
    mainScene = new p5(sketch, "sketch");
}

// var startButton = function(p){
//
//     p.setup = () => {
//         cvs = p.createCanvas(100, 100);
//         p.background(255);
//         cvs.position(100, 100);
//         cvs.mousePressed(clickOrTouch);
//     }
// }
