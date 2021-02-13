class Vehicle {

    constructor(p5){
        this.acceleration = p5.createVector(p5.random(-1,1), p5.random(-1,1));
        this.velocity = p5.createVector(p5.random(-10,10), p5.random(-10, 10));
        this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height));
        this.r = 4;
        this.maxspeed = p5.random(4, 8);
        this.maxforce = p5.random(0.2, 0.4);
        this.desired = p5.createVector(p5.random(-1,1), p5.random(-1,1));
    }

    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    loop(p5){
        if (this.position.x < 0){
            this.position.x = p5.windowWidth;
        }
        if (this.position.x > p5.windowWidth){
            this.position.x = 0;
        }
        if (this.position.y < 0){
            this.position.y = p5.windowHeight;
        }
        if (this.position.y > p5.windowHeight){
            this.position.y = 0;
        }
    }

    seek(p5, target){
        this.desired = p5.createVector(target.x - this.position.x, target.y - this.position.y);
        this.desired.normalize();
        this.desired.mult(this.maxspeed);
        let steer = p5.createVector(this.desired.x - this.velocity.x, this.desired.y - this.velocity.y);
        steer.limit(this.maxforce);
        this.acceleration = steer;
    }

    circulate(p5){
        if (this.position.x > p5.width){
            this.position.x = 0;
        }
        if (this.position.x < 0){
            this.position.x = p5.width;
        }
        if (this.position.y > p5.height){
            this.position.y = 0;
        }
        if (this.position.y < 0){
            this.posision.y = p5.height;
        }
    }

    // 以下はサブクラスでオーバーライドしている。
    display(p5){

        p5.push();
        p5.fill(127);
        p5.translate(this.position.x, this.position.y);
        p5.rotate(this.desired.heading() + p5.PI / 2);
        p5.beginShape();
        p5.vertex(0, -this.r * 2);
        p5.vertex(-this.r, this.r * 2);
        p5.vertex(this.r, this.r * 2);
        p5.endShape(p5.CLOSE);
        p5.pop();
    }
}
