class CollisionDetector {

    constructor(){

    }

    detectCollision(p5, targetA, targetB){
        let dist = targetA.position.dist(targetB.position);
        if (dist < 20){
            return true;
        } else {
            return false;
        }
    }
}
