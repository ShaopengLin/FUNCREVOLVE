/************************************************************************************************************
Project: Function Revolution
Description: This function draws the grid, the equations, and the revolved volumes on a canvas
History: Michael Zhang & Chris Lin, May 21, 2019
************************************************************************************************************/
//dimension of canvas
var side = 600;
//the start position of 2d in a 3d perspective 
var SCREENSTART3D = (-side/2.0);
//the canvas is divided in to a 20x20 grid
var baseGridValue = side/40.0;
//interval lower bound
var intervalInit;
//interval upperbound
var intervalFinal;
//number of subinterval estimate
var subIntervals;
//rotate value
var mx = 0;
var my = 0;
//canvas bariable
var mainCanvas;
//grid buffer variable
var gridBuffer;
//stores two equations
var equation1;
var equation2;
//determine if draw revolution
var revolve = false;
var rotateAxis = "y";
//determine if draw area enclosed by two functions
var washer = false;
//stores colour of the two functions
var colorFunc1;
var colorFunc2; 
var whiteTexture;
//native function, initializes variables, canvas and textures
function setup() {
    //creates canvas
    mainCanvas = createCanvas(side,side,WEBGL);
    mainCanvas.position(350,250);
    //creates buffers
    gridBuffer = createGraphics(side,side);
    whiteTexture = createGraphics(side,side);
    whiteTexture.background(255);
    //initialization of variables
    getInfo();
    //frame rate to 60
    frameRate(60);
}
//native function, runs repeatedly and does not need to be called
function draw() {
    //get colour of both functions
    colorFunc1 = function1color();
    colorFunc2 = function2color();
    //refresh number of subintervals from slider
    subIntervals = getSubIntervals();
    //set background to white
    background(255);
    //set interpretation of angles as degrees
    angleMode(DEGREES);
    //rotate the canvas based on user mouse displacement
    rotateCanvas();
    //draws volume estimate
    if (revolve == true){
        if (washer == true){
            drawWasherVolume();
        }
        else{
            drawVolumeEstimate(equation1);
        }
    }
    push();
    //draws the grid and function interval on buffer
    drawFunctionGraphics(intervalInit,intervalFinal);
    //set current buffer to grid buffer
    texture(gridBuffer);
    //translate the rectangle
    translate(-width/2,-height/2,0);
    //buffer applied onto the rectangle drawn
    rect(0, 0, side, side);
    pop(); 
}
//NOTE!!//Push and Pop functions works to store and resets the translation and rotation done inbetween them
//refreshes the variables from the information in html
function getInfo(){
    //get lower and upper bound
    intervalInit = lowerBound();
    intervalFinal = upperBound();
    //get both equations
    getEquation();
    //revolve is default false
    revolve = false;  
}
//calculate MRAM
function calculateCylinderRadius(leftYCoord, rightYCoord){
    return (leftYCoord+rightYCoord)/2;
}
//refreshes the grid and function interval on buffer
function drawFunctionGraphics(start , end){
    //clears the buffer
    gridBuffer.clear();
    //no filling colour
    gridBuffer.noFill();
    //ensures the line drawn in buffer is smooth
    gridBuffer.smooth();
    //draws the coordinates around the grid
    drawCoordinates();
    //draws the function intervals
    drawFunctionInterval(start, end, equation1, colorFunc1);
    if (washer == true){
        drawFunctionInterval(start, end, equation2, colorFunc2);
    }
    //draws the 15x15 grid
    drawGrid();
}
//rotate the canvas based on user mouse displacement
function rotateCanvas(){
    //when the user pressed the mouse in the canvas
    if (mouseIsPressed){
        if (mouseX <= side && mouseX >= 0 && mouseY >= 0 && mouseY <=side){
            //set rotate angle
            mx += -(pmouseX-mouseX)*0.7;
            my += (pmouseY-mouseY)*0.7;
        }
    }
    //rotate canvas
    rotateY(mx);
    rotateX(my);
}
//draws the 15x15 grid
function drawGrid(){
    push();
    //set stroke weight and colour
    gridBuffer.strokeWeight(0.5);
    gridBuffer.stroke(0);
    //draws the Y axis grid
    for (var i = 5; i < 35; i++){
        gridBuffer.line(baseGridValue*5, baseGridValue*i, baseGridValue*35, baseGridValue*i);
    }
    //draws the X axis grid
    for (var i = 5; i < 35; i++){
        gridBuffer.line(baseGridValue*i ,baseGridValue*5, baseGridValue*i ,baseGridValue*35);
    }
    pop();
}
//draws the function intervals
function drawFunctionInterval(start, end, equation, colour){
    gridBuffer.push();
    //set stroke weight to 5 pixels
    gridBuffer.strokeWeight(5);
    //get and set the colour of the function that will be drawn
    setInitialColor(colour);
    //draws the function interval
    gridBuffer.beginShape();
    for (var i = start; i <= end; i+=0.1){
        gridBuffer.vertex(i*baseGridValue-SCREENSTART3D, -findYCoordinate(i, equation)*baseGridValue-SCREENSTART3D);
    }
    gridBuffer.endShape();
    gridBuffer.pop();
}
// draws the coordinates around the grid
function drawCoordinates(){
    push();
    //set text and stoke values
    gridBuffer.strokeWeight(3);
    gridBuffer.stroke(0);
    gridBuffer.textSize(16);
    
    //draws the coordinates around Y axis
    //draws the y axis
    gridBuffer.line(gridBuffer.width/2,0,gridBuffer.width/2,gridBuffer.height);
    //label the y axis
    gridBuffer.text("Y",gridBuffer.width/2+16,16);
    //draws Coordinates of Y axis once each five grid value
    for (var i = 5; i <16; i+=5){
        gridBuffer.text(i.toString(),baseGridValue*5-2*baseGridValue,gridBuffer.height/2-baseGridValue*(i) + baseGridValue/2);
    }
    for (var i = -5; i >-16; i-=5){
        gridBuffer.text(i.toString(),baseGridValue*5-2*baseGridValue,gridBuffer.height/2+baseGridValue*(-i) + baseGridValue/2);
    }
    //draws the coordinates around X axis
    //draws the X axis
    gridBuffer.text("X",gridBuffer.width-16,gridBuffer.height/2-16);
    //label the X axis
    gridBuffer.line(0,gridBuffer.height/2,gridBuffer.width,gridBuffer.height/2);
    //draws Coordinates of X axis once each five grid value
    for (var i = -5; i >-16; i-=5){
        gridBuffer.text(i.toString(),gridBuffer.width/2-baseGridValue*(-i+1.5) + baseGridValue/2, baseGridValue*35+2*baseGridValue);
    }
    for (var i = 5; i <16; i+=5){
        gridBuffer.text(i.toString(),gridBuffer.width/2+baseGridValue*(i)-baseGridValue/2, baseGridValue*35+2*baseGridValue);
    }
    pop();
}
//calculate the Y value on the X coordinate
function findYCoordinate(xC, equation){
    var func = equation;
    //remove all space
    func = func.replace(/\s/g,'');
    //change x to (x) to prevent certain bug splat
    func = func.replace(/x/g, "(x)");
    //replace the char x in the string with the value of xC
    func = func.replace(/x/g, xC);
    //calculate the Y value of the string equation
    return math.eval(func);
}

//self made primitive that draws a tube
function drawTube(radius, tubeRadius, length){
    //the torus function require altered values to draw the desired ring
    //if the radius and tubeRadius is 30 and 10, the total radius becomes 40 instead of desire 40. 
    //I used algera to figure out a solution
    var alteredTubeRadius = (radius-tubeRadius)/2;
    var alteredRadius = alteredTubeRadius+tubeRadius;
    //set stroke
    strokeWeight(1);
    stroke(0);
    push();
    push();
    rotateZ(90);
    translate(0,-length/2);
    //draws two cylinders with out top and bottom caps
    cylinder(radius, length, 24,1,false,false);
    cylinder(tubeRadius,length,24,1,false,false);
    pop();
    push();
    rotateY(90);
    //draws the two torus that act like the top and bottom caps of the cylinder
    torus(alteredRadius, alteredTubeRadius, 24, 2);
    translate(0,0,length);
    torus(alteredRadius,alteredTubeRadius, 24, 2);
    pop();
    pop();
}
//draws volume estimate for a single function
function drawVolumeEstimate(equation){
    push();
    //set current 
    texture(whiteTexture);
    //set stroke weight and colour
    strokeWeight(1);
    stroke(0);
    //initial x coordinate
    var xCoord = intervalInit;
    //initial position fixation 
    translate(baseGridValue * (intervalFinal - intervalInit) / subIntervals / 2+intervalInit * baseGridValue , 0);
    //draws the subinterval estimate
    for(var i = 0; i < subIntervals; i++){
         
        push(); 
        //set the draw coordinate to the position of the next cylinder
        translate(i*baseGridValue * (intervalFinal - intervalInit) / subIntervals,0);
        //rotate by 90 degree on the Z axis
        rotateZ(90);
        //draw cylinder
        cylinder(calculateCylinderRadius(findYCoordinate(xCoord,equation)*baseGridValue,findYCoordinate(xCoord+1/subIntervals* (intervalFinal - intervalInit),equation)*baseGridValue) , baseGridValue * (intervalFinal-intervalInit) /subIntervals);
        //increase x coordinate
        xCoord += 1/subIntervals* (intervalFinal - intervalInit);
        pop();
    }
    pop();
}
//draws the volume revolved enclosed between the functions
function drawWasherVolume(){
    push();
    //set current texture to white
    texture(whiteTexture);
    //initial X coordinate
    var xCoord = intervalInit;
    //initial fixation
    translate(baseGridValue * (intervalFinal - intervalInit) / subIntervals / 2+intervalInit * baseGridValue , 0);
    //draws the subinterval estimate
    for(var i = 0; i < subIntervals; i++){
         
        push(); 
        //set the draw coordinate to the position of the next cylinder
        translate(i*baseGridValue * (intervalFinal - intervalInit) / subIntervals,0);
        //draw Tube
        drawTube(calculateCylinderRadius(findYCoordinate(xCoord,equation1)*baseGridValue,findYCoordinate(xCoord+1/subIntervals* (intervalFinal - intervalInit),equation1)*baseGridValue) , calculateCylinderRadius(findYCoordinate(xCoord,equation2)*baseGridValue,findYCoordinate(xCoord+1/subIntervals* (intervalFinal - intervalInit),equation2)*baseGridValue), baseGridValue * (intervalFinal-intervalInit) /subIntervals);
        //increase x coordinate
        xCoord += 1/subIntervals* (intervalFinal - intervalInit);
        pop();
    }
    pop();
}
//reset the angle of the canvas 
function resetView(){
    my = 0;
    mx = 0;
} 