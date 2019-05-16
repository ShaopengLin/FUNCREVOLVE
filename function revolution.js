function lowerBound() {
	var lowerBound = document.getElementById("lowerBound").value;
    lowerBound = lowerBound.replace(/\s/g,'');
	return parseFloat(lowerBound, 10);
}

function upperBound() {
	var upperBound = document.getElementById("upperBound").value;
    upperBound = upperBound.replace(/\s/g,'');
	return parseFloat(upperBound, 10);
}

function getSubIntervals(){
	var subintervals = document.getElementById("subintervals").value;
    subintervals = subintervals.replace(/\s/g,'');
	return parseFloat(subintervals, 10);
}

function getAxisOfRotation(){
	var axis;
	if(document.getElementById('y').checked) {
		axis = document.getElementById('y-axis').value;
	}

	else if(document.getElementById('x').checked) {
		rotateAxis = "x";
		axis = document.getElementById('y-axis').value;
	}
	return parseFloat(axis, 10);
}

function function1color(){
	return document.getElementById("color1").value;
}

function function2color(){
	return document.getElementById("color2").value;
}

function resetGraph(){
	document.getElementById("function1").value = "x";
	document.getElementById("function2").value = "NA";
	document.getElementById("lowerBound").value = "-5.0";
	document.getElementById("upperBound").value = "5.0";
	document.getElementById("y-axis").value = "0";
	document.getElementById("x-axis").value = "0";
	document.getElementById("y").checked = "true";
	document.getElementById("y").checked = "false";
	document.getElementById("subintervals").value = "0";
	document.getElementById("color1").value = "red";
	document.getElementById("color2").value = "blue";
	getInfo();
}




	