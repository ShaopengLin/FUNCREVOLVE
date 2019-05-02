var side = 600;
var SCREENSTARTX2D = 0;
var SCREENSARTY2D = 0;
var SCREENSTARTX3D = (-side/2);
var SCREENSTARTY3D = (-side/2);
var x=0;
var y=0;
var c = 0;
var w = 0;
var h = 0;
var angle = 0;
var pg;
function setup() {
    createCanvas(side,side,WEBGL);
    pg = createGraphics(side,side);
    b = createGraphics(side,side);
    b.background(255);
    pg.strokeWeight(3);
    pg.noFill();
    pg.stroke(0);
    pg.smooth();
    pg.line(pg.width/2,0,pg.width/2,pg.height);
    pg.line(0,pg.height/2,pg.width,pg.height/2);
    pg.beginShape();
    
    /*for (var i = -pg.width/2; i < pg.width/2; i++){
        pg.vertex(i+pg.width/2,-pow(1/4*i,2)+pg.width/2);
    }*/
    for (var i = SCREENSTARTX3D; i < -SCREENSTARTX3D; i++){
        pg.vertex(i-SCREENSTARTX3D,-SCREENSTARTX3D-i);
    }
    pg.endShape();
    
    frameRate(60);
}
function draw() {
    background(175);
    angleMode(RADIANS);
    push();
    rotateX(angle);
    texture(b);
    strokeWeight(1);
    stroke(0);
    angleMode(DEGREES);
    for(var i = 0; i < 5; i++){
        push();
        translate(25+i*50,0);
        rotateZ(90);
        cylinder((i+1)*10,50);
        pop();     
    }
    texture(pg);
    translate(-width/2,-height/2,0);
    rect(0, 0, side, side);
    pop();
    /*background(175);
   rotateY(w);
    w = cos(h);
    h += 0.01;
    pg.strokeWeight(3);
    pg.stroke(0);
    pg.noFill();
    pg.smooth();
    pg.box();
    
    beginShape();
    
    for (var i = -width; i < width; i++){
        pg.vertex(i,-pow(i,2));
    }
    endShape();
    image(pg, 0,0);
    */
    
}
function mouseDragged(){
    angle = pmouseY;
}
/*function rotatet(){
    
     
    if (mouseIsPressed){
    if (mouseButton === LEFT){
    rotatedX = pmouseX;
    rotatedY = -mouseY*0.0;
    rotateX(rotatedX);
    rotateY(rotatedY);
    }
    }
    
}*/

function outputname(){
    var input;
    input = document.getElementById("xCoord");
    x = input.elements["xC"].value;
    input = document.getElementById("yCoord");
    y = input.elements["yC"].value;
}
