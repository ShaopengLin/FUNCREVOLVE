var side = 600;
var SCREENSTARTX2D = 0;
var SCREENSARTY2D = 0;
var SCREENSTARTX3D = (-side/2.0);
var SCREENSTARTY3D = (-side/2.0);
var baseGridXValue = side/40.0;
var baseGridYValue = side/40.0;
var intervalInit;
var intervalFinal;
var subIntervals;
var mx = 0;
var my = 0;
var angle = 0;
var mainCanvas;
var pg;
var yes = 0;
var transp;
var equation1;
var equation2;
var revolve = false;
var rotateAxis = "y";
var washer = false;
var colorFunc1;
var colorFunc2;
function setup() {
    mainCanvas = createCanvas(side,side,WEBGL);
    mainCanvas.position(350,250);
    pg = createGraphics(side,side);
    b = createGraphics(side,side);
    transp = createGraphics(side,side);
    b.background(255);
    getInfo();
    frameRate(60);
}
//how to rotate a shape but not clear the previous p5.js
function draw() {
    colorFunc1 = function1color();
    colorFunc2 = function2color();
    subIntervals = getSubIntervals();
    background(255);
    angleMode(DEGREES);
    drawFunctionGraphics(intervalInit,intervalFinal);
    rotateCanvas();
    if (revolve == true){
        drawVolumnEstimate(equation1);
        if (washer == true){
            drawVolumnEstimate(equation2);
        }
    }
    //interval 1-5
    push();
    texture(pg);
    translate(-width/2,-height/2,0);
    rect(0, 0, side, side);
    pop();
    
}
function getInfo(){
        intervalInit = lowerBound();
        intervalFinal = upperBound();
        getEquation();
        revolve = false;  
}

//need input later interval 0-5
function calculateCylinderRadius(leftXcoord, rightXcoord){
    return (leftXcoord+rightXcoord)/2;
}

function drawVolumnEstimate(equation){
    push();
    texture(b);
    strokeWeight(1);
    stroke(0);
    var xCoord = intervalInit;
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

        cylinder(calculateCylinderRadius(findYCoordinate(xCoord,equation)*baseGridXValue,findYCoordinate(xCoord+1/subIntervals* (intervalFinal - intervalInit),equation)*baseGridXValue) , baseGridXValue * (intervalFinal-intervalInit) /subIntervals,24,1,false,false);
        xCoord += 1/subIntervals* (intervalFinal - intervalInit);
        pop();     
        
    }
    pop();
}

function drawFunctionGraphics(start , end){
    pg.clear();
    pg.noFill();
    pg.smooth();
    drawCoordinates();
    drawFunctionInterval(start, end, equation1, colorFunc1);
    if (washer == true){
        drawFunctionInterval(start, end, equation2, colorFunc2);
    }
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
function drawFunctionInterval(start, end, equation, colour){
    pg.push();
    pg.strokeWeight(3);
    setInitialColor(colour);
    
    //pg.translate(0,-translationY);
    pg.beginShape();
    for (var i = start; i <= end; i+=0.1){
        pg.vertex(i*baseGridXValue-SCREENSTARTX3D, -findYCoordinate(i, equation)*baseGridXValue-SCREENSTARTY3D);

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

function findYCoordinate(xC, equation){
    var func = equation;
    func = func.replace(/\s/g,'');
    func = func.replace(/x/g, "(x)");
    func = func.replace(/x/g, xC);
    return math.eval(func);
}

function getEquation(){
    equation1 = document.getElementById("function1").value;
    equation2 = document.getElementById("function2").value;
    if(equation2 == "NA" || equation2 == ""){
        washer = false;
    }
    else{
        washer = true;
    }
}

function setInitialColor(colorFunc){
    if(colorFunc == "red"){
        pg.stroke(255, 0, 0);
    }
    else if(colorFunc == "blue"){
        pg.stroke(0, 0, 255);
    }
    else if(colorFunc == "green"){
        pg.stroke(0, 255, 0);
    }
}
