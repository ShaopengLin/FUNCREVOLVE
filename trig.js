function trigYcoord(){
	getAmplitude();
	console.log(getVerticalShift());
}


function getAmplitude(){
	var trig = document.getElementById("function1").value;
	trig = trig.replace(/\s/g,'');
	var amplitude;
	if(trig.search("sin") != -1){
		amplitude = trig.substr(0, trig.search("sin"));
		
	}
	else if(trig.search("cos") != -1){
		amplitude = trig.substr(0, trig.search("cos"));
	}
	return parseFloat(amplitude, 10);
}


function getVerticalShift(){
	var trig = document.getElementById("function1").value;
	trig = trig.replace(/\s/g,'');
	var closeBracket = trig.indexOf("^");
		var verticalShift = trig.substr(trig.search("x") + 1, trig.length);
		return parseFloat(verticalShift, 10);
	return 0;
}

console.log(getVerticalShift());

function getHorizontalShift(){

}

function getStretchFactor(){

}

