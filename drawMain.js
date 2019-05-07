var side = 600;
var SCREENSTARTX2D = 0;
var SCREENSARTY2D = 0;
var SCREENSTARTX3D = (-side/2);
var SCREENSTARTY3D = (-side/2);
var baseGridXValue = side/40;
var baseGridYValue = side/40;
var intervalInit = 0;
var intervalFinal =5;
var translationX = 0*baseGridXValue;
var translationY = 1*baseGridYValue;
var slope = 1;
var mx = 0;
var my = 0;
var angle = 0;
var mainCanvas;
var pg;
function setup() {
    mainCanvas = createCanvas(side,side,WEBGL);
    mainCanvas.position(0,0);
    pg = createGraphics(side,side);
    b = createGraphics(side,side);
    numberOfCylSlider = createSlider(5, 50, 5);
    numberOfCylSlider.position(600,0);
    b.background(255);
    pg.strokeWeight(3);
    pg.stroke(0);
    pg.noFill();
    pg.smooth();
    pg.line(pg.width/2,0,pg.width/2,pg.height);
    pg.line(0,pg.height/2,pg.width,pg.height/2);
    pg.beginShape();
    pg.translate(translationX,-translationY);
    for (var i = SCREENSTARTX3D; i < -SCREENSTARTX3D; i++){
        pg.vertex(i-SCREENSTARTX3D , slope*(-i)-SCREENSTARTY3D);
    }
    pg.endShape();

    frameRate(60);

}
//how to rotate a shape but not clear the previous p5.js
function draw() {
    background(175);
    angleMode(DEGREES);
    if (mouseIsPressed){
    if (mouseX < 600 && mouseY < 600){
        mx += -(pmouseX-mouseX)*0.7;
        my += (pmouseY-mouseY)*0.7;
        }
    }
    rotateY(mx);
    rotateX(my);
    push();
    texture(b);
    strokeWeight(1);
    stroke(0);
    //interval 1-5
    push();
    //initial fixation
    translate(baseGridXValue * (intervalFinal - intervalInit) / numberOfCylSlider.value() / 2+intervalInit * baseGridXValue , 0);
    //vertical and horizontal translation
    translate(translationX,-translationY);
    for(var i = 0; i < numberOfCylSlider.value(); i++){
        push(); 
        //translate length of each cylinder
        translate(i*baseGridXValue * (intervalFinal - intervalInit) / numberOfCylSlider.value(),0);
        //rotate by 90 degree
        rotateZ(90);
        //draw cylinder
        
        cylinder(calculateCylinderRadiusLinear(slope*(i / numberOfCylSlider.value()) * baseGridXValue*(intervalFinal-intervalInit) + slope*intervalInit*baseGridXValue, slope*(i + 1) / numberOfCylSlider.value() * baseGridXValue*(intervalFinal-intervalInit) + slope*intervalInit*baseGridXValue), baseGridXValue * (intervalFinal-intervalInit) / numberOfCylSlider.value());
        pop();      
    }
    
    pop();
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
//need input later interval 0-5
function getLinearLeftX(){
    return slope*((i / numberOfCylSlider.value()) * baseGridXValue*(intervalFinal-intervalInit) +intervalInit*baseGridXValue+translationY);
}
function getLinearRightX(){
    return slope*((i + 1) / numberOfCylSlider.value() * baseGridXValue*(intervalFinal-intervalInit) + intervalInit*baseGridXValue+translationY);
}
function calculateCylinderRadiusLinear(leftXcoord, rightXcoord){
    return (leftXcoord+rightXcoord)/2;
}
function outputname(){
    var input;
    input = document.getElementById("xCoord");
    x = input.elements["xC"].value;
    input = document.getElementById("yCoord");
    y = input.elements["yC"].value;
}
