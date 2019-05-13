var side = 450;
var SCREENSTARTX2D = 0;
var SCREENSARTY2D = 0;
var SCREENSTARTX3D = (-side/2);
var SCREENSTARTY3D = (-side/2);
var baseGridXValue = side/40;
var baseGridYValue = side/40;
var intervalInit = 0;
var intervalFinal =5;
var translationY = 0*baseGridYValue;
var slope = 1;
var subIntervals = 0;
var mx = 0;
var my = 0;
var angle = 0;
var mainCanvas;
var pg;
var yes = 0;
function setup() {
    mainCanvas = createCanvas(side,side,WEBGL);
    mainCanvas.position(450,250);
    pg = createGraphics(side,side);
    b = createGraphics(side,side);
    b.background(255);
    drawIntervalLinear(SCREENSTARTX3D,-SCREENSTARTX3D);
    frameRate(60);

}
//how to rotate a shape but not clear the previous p5.js
function draw() {
    background(175);
    getInfo();
    drawIntervalLinear(intervalInit*baseGridXValue,intervalFinal*baseGridXValue);
    rotateCanvas();
    drawLinearVolumnEstimate();
    //interval 1-5
    push();
    texture(pg);
    translate(-width/2,-height/2,0);
    rect(0, 0, side, side);

    pop();
    
}
function getInfo(){
    if(setFunction()){
        intervalInit = lowerBound();
        intervalFinal =upperBound();
        translationY = linearVerticalShift()*baseGridYValue;
        slope = linearSlope();
        subIntervals = getSubIntervals();
    }
}
//need input later interval 0-5
function getLinearLeftX(i){
    return slope*((i / subIntervals) * baseGridXValue*(intervalFinal-intervalInit) + intervalInit*baseGridXValue) + translationY;
}
function getLinearRightX(i){
    return slope*(i + 1) / subIntervals * baseGridXValue*(intervalFinal-intervalInit) + slope*intervalInit*baseGridXValue+ translationY;
}
function calculateCylinderRadiusLinear(leftXcoord, rightXcoord){
    return (leftXcoord+rightXcoord)/2;
}
function drawLinearVolumnEstimate(){
    push();
    texture(b);
    strokeWeight(1);
    stroke(0);
    //initial fixation
    translate(baseGridXValue * (intervalFinal - intervalInit) / subIntervals / 2+intervalInit * baseGridXValue , 0);
    //vertical translation
    for(var i = 0; i < subIntervals; i++){
        push(); 
        //translate length of each cylinder
        translate(i*baseGridXValue * (intervalFinal - intervalInit) / subIntervals,0);
        //rotate by 90 degree
        rotateZ(90);
        //draw cylinder
        
        cylinder(calculateCylinderRadiusLinear(getLinearLeftX(i),getLinearRightX(i)) , baseGridXValue * (intervalFinal-intervalInit) /subIntervals);
        pop();      
    }
    pop();
}
function drawIntervalLinear(start , end){
    pg.clear();
    pg.noFill();
    pg.smooth();
    drawCoordinates();
    drawLinearFunction(start, end);
    drawGrid();
}
function rotateCanvas(){
        angleMode(DEGREES);
    if (mouseIsPressed){
    if (mouseX <= side && mouseX >= 0 && mouseY >= 0 && mouseY <=side){

        mx += -(pmouseX-mouseX)*0.7;
        my += (pmouseY-mouseY)*0.7;
    }
    }
    rotateY(mx);
    rotateX(my);
}
function drawGrid(){
    push();
    pg.strokeWeight(0.5);
    pg.stroke(0);
    //Y axis grid
    for (var i = 5; i < 35; i++){
        pg.line(baseGridXValue*5, baseGridXValue*i, baseGridXValue*35, baseGridXValue*i);
    }
    //X axis grid
    for (var i = 5; i < 35; i++){
        pg.line(baseGridYValue*i ,baseGridYValue*5, baseGridYValue*i ,baseGridYValue*35);
    }
    pop();
}
function drawLinearFunction(start, end){
    pg.push();
    pg.strokeWeight(6);
    pg.stroke(255,0,0);
    pg.translate(0,-translationY);
    pg.beginShape();
    for (var i = start; i < end; i++){
        pg.vertex(i-SCREENSTARTX3D , slope*(-i)-SCREENSTARTY3D);
    }
    pg.endShape();
    pg.pop();
}
function drawPowerFunction(){
    pg.push();
    pg.strokeWeight(6);
    pg.stroke(255,0,0);
    pg.translate(0,-translationY);
    pg.beginShape();
    for (var i = start; i < end; i++){
        pg.vertex(i-SCREENSTARTX3D , slope*(-i)-SCREENSTARTY3D);
    }
    pg.endShape();
    pg.pop();
}
function drawCoordinates(){
    push();
    pg.strokeWeight(3);
    pg.stroke(0);
    pg.textSize(16);
    
    //y axis
    pg.line(pg.width/2,0,pg.width/2,pg.height);
    pg.text("Y",pg.width/2+16,16);
    //Coordinates Y
    for (var i = 5; i <16; i+=5){

        pg.text(i.toString(),baseGridXValue*5-2*baseGridXValue,pg.height/2-baseGridYValue*(i) + baseGridYValue/2);
    }
    for (var i = -5; i >-16; i-=5){
        pg.text(i.toString(),baseGridXValue*5-2*baseGridXValue,pg.height/2+baseGridYValue*(-i) + baseGridYValue/2);
    }

    //x axis
    pg.text("X",pg.width-16,pg.height/2-16);
    pg.line(0,pg.height/2,pg.width,pg.height/2);
        //Coordinates X
    for (var i = -5; i >-16; i-=5){
        pg.text(i.toString(),pg.width/2-baseGridYValue*(-i+1.5) + baseGridYValue/2, baseGridXValue*35+2*baseGridXValue);
    }
    for (var i = 5; i <16; i+=5){

        pg.text(i.toString(),pg.width/2+baseGridXValue*(i)-baseGridXValue/2, baseGridXValue*35+2*baseGridXValue);
    }
    pop();
}

/*function calculateIntegralLinear(){
    var upperBound = (pow(slope*intervalFinal,3)/slope)+pow(2*slope*intervalFinal*(translationY/baseGridYValue))+
    var lowerBound = 
    document.getElementById("res").innerHTML = abs(upperBound-lowerBound);
}*/

