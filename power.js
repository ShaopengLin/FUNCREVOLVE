function calculateXvaluePower(){
    var powerFunction = document.getElementById("function1").value;
    var x = 3;
    console.log(math.eval('x+2'));

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