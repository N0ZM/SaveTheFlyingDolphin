var soundBarrier = new Audio();

class Barrier {

    constructor(p5){
        this.startPoint = p5.createVector();
        this.endPoint = p5.createVector();
        this.isMake = false;
        this.startTime = Date.now();
        soundBarrier.src = "assets/barrier.mp3";
    }

    make(p5){
        if (p5.mouseIsPressed && this.isMake){
            this.startPoint = p5.createVector(p5.mouseX, p5.mouseY);
            this.isMake = false;
        }
        if (!p5.mouseIsPressed && !this.isMake){
            this.endPoint = p5.createVector(p5.mouseX, p5.mouseY);
            this.isMake = true;
            soundBarrier.play();
        }
    }

    display(p5){
        if (this.isMake){
            p5.push();
            p5.strokeWeight(10);
            p5.stroke(0, 255, 0, 64);
            p5.line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
            p5.strokeWeight(2);
            p5.stroke(0, 255, 0, 127);
            p5.line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
            p5.pop();
            p5.push();
            p5.translate(this.startPoint.x, this.startPoint.y);
            let vecLaser = p5.createVector(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y);
            let angle = vecLaser.heading();
            let pastTime = Math.floor(Date.now() - this.startTime);
            p5.rotate(angle);
            //レーザーに波形を表示させる。重いので停止。
            //for (let i = 0; i < vecLaser.mag(); i++){
            //    p5.fill(255, 255, 255, 127);
            //    p5.noStroke();
            //    p5.ellipse(i, p5.cos(i/8 + pastTime / 20) * 5, 2, 2);
            //}
            p5.pop();
        }
    }

    detectHit(p5, target){
        let vecSpToTarget = p5.createVector(target.position.x - this.startPoint.x, target.position.y - this.startPoint.y);
        let vecEpToTarget = p5.createVector(target.position.x - this.endPoint.x, target.position.y - this.endPoint.y);
        let vecBarrier = p5.createVector(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y);
        let isInLineSpan = vecSpToTarget.dot(vecBarrier) * vecEpToTarget.dot(vecBarrier);
        if (isInLineSpan < 0){
            let dist = (vecSpToTarget.cross(vecBarrier)).mag() / vecBarrier.mag();
            if (p5.abs(dist) < 10){
                return true;
            }
        }
        return false;
    }
}
