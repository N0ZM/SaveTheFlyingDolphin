class Dolphin extends Vehicle {

    constructor(p5){
        super(p5);
        this.life = 10;
    }

    eat(p5, food){
        if (p5.dist(this.position.x, this.position.y, food.x, food.y) < 10){
            // this.life++;
            return true;
        }
    }

    display(p5){
        p5.push();
        p5.translate(this.position.x, this.position.y);
        p5.rotate(this.desired.heading() + p5.PI / 2);
        p5.fill(150, 150, 255);
        p5.scale(1.5);

        p5.beginShape();
        // 口先
        p5.vertex(-0.5, -10);
        p5.vertex(0.5, -10);

        p5.vertex(1, -8);
        p5.vertex(2.5, -7);
        p5.vertex(2.5, -4);
        // ひれの先端右 ↓
        p5.vertex(5, -1);
        p5.vertex(2.5, -1);
        p5.vertex(2.5, 2);
        p5.vertex(1, 3);
        p5.vertex(3, 5);

        p5.vertex(-3, 5);
        p5.vertex(-1, 3);
        p5.vertex(-2.5, 2);
        p5.vertex(-2.5, -1);
        //ひれの先端左
        p5.vertex(-5, -1);
        p5.vertex(-2.5, -4);
        p5.vertex(-2.5, -7);
        p5.vertex(-1, -8);

        p5.endShape(p5.CLOSE);
        p5.pop();
    }
}
