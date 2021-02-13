class DolphinOpening {

    constructor(){

    }

    dislpay(p5){
        p5.push();
        p5.translate(p5.width/2, p5.height/3);
        p5.fill(100, 100, 200);
        p5.rotate(-0.5);
        p5.noStroke();
        p5.scale(0.7);
        p5.ellipse(0,0,200,100);
        p5.ellipse(100,10,50,25);
        p5.beginShape();
        p5.vertex(30, 50);
        p5.vertex(-20, 75);
        p5.vertex(-20, 25);
        p5.endShape(p5.CLOSE);
        p5.beginShape();
        p5.vertex(10, -50);
        p5.vertex(-40, -75);
        p5.vertex(-40, -25);
        p5.endShape(p5.CLOSE);
        p5.beginShape();
        p5.vertex(-90, 0);
        p5.vertex(-130, -10);
        p5.vertex(-150, 50);
        p5.endShape(p5.CLOSE);
        p5.pop();
    }
}
