function calculateXvaluePower(){
    var powerFunction = document.getElementById("function1").value;
    var powerSignPos = powerFunction.indexOf("^");
    var powerOf;
    var x = 3;
    for (var i = 1; !isNaN(powerFunction[powerSignPos+i]); i++){

        powerOf = powerFunction.substr(powerSignPos+1,i);
    }
    var powerNum = "x^" + powerOf;
    powerFunction = powerFunction.replace(/\s/g,'');
    powerNum = powerNum.replace(powerNum,"Math.pow(x,"+powerOf+')');
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