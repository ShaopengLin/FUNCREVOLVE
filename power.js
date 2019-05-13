function calculateXvaluePower(){
    var equation = document.getElementById("function1").value;
    if (){
        
    }
}
function partialCalculation(){
        
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