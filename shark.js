class Shark extends Vehicle {

    constructor(p5){
        super(p5);
        this.isEating = false;
        this.startEating;
    }

    checkEating(){
        if (this.isEating){
            let time = (Date.now() - this.startEating) / 1000;
            if (time > 0.2){
                this.isEating = false;
            }
        }
    }

    // オーバーライド
    display(p5){
        p5.push();
        p5.translate(this.position.x, this.position.y);
        p5.rotate(this.desired.heading() + p5.PI / 2);
        p5.fill(255, 100, 100);
        p5.scale(2);

        p5.beginShape();
        // 口先
        p5.vertex(-1, -10);
        p5.vertex(1, -10);

        p5.vertex(2, -9);
        p5.vertex(3, -7);
        p5.vertex(3, -4);
        // ひれの先端右 ↓
        p5.vertex(6, -1);
        p5.vertex(3, -1);
        p5.vertex(3, 2);
        p5.vertex(2, 5);
        p5.vertex(1, 8);

        p5.vertex(0, 9);
        p5.vertex(0.5, 10);
        p5.vertex(0, 11);
        p5.vertex(-0.5, 10);
        p5.vertex(0, 9);

        p5.vertex(-1, 8);
        p5.vertex(-2, 5);
        p5.vertex(-3, 2);
        p5.vertex(-3, -1);
        p5.vertex(-6, -1);
        //ひれの先端左 ↑
        p5.vertex(-3, -4);
        p5.vertex(-3, -7);
        p5.vertex(-2, -9);

        p5.endShape(p5.CLOSE);
        p5.pop();
    }
}
