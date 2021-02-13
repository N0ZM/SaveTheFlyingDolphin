var makeIcon = function(p){

    p.setup = () => {
        let canvas = p.createCanvas(100, 100);
        p.background(0);
        let dolphin = new DolphinOpening(p);
        p.scale(0.5);
        p.translate(p.width/2, p.height/2-10);
        dolphin.display(p);
        p.save(canvas, "icon.png");
    }

    p.draw = () => {

    }
}
