class Explosion {

    constructor(p5, pos){
        this.position = p5.createVector(pos.x, pos.y);
        this.startTime = Date.now();
        this.lifeTime = 10;
        this.r = p5.random(0, 255);
        this.g = p5.random(0, 255);
        this.b = p5.random(0, 255);
        this.alpha = 255;
    }

    update(){
        this.lifeTime -= (Date.now() - this.startTime)/1000;
        this.alpha -= 6;
        if (this.lifeTime < 0){
            // this = null;
        }
    }

    show(p5){
        if (this.lifeTime > 0){
            p5.push();
            p5.fill(this.r, this.g, this.b, this.alpha);
            p5.noStroke();
            p5.ellipse(this.position.x, this.position.y, (Date.now() - this.startTime)/2);
        }
    }
}
