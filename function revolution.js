
console.log();

function lowerBound() {
	var lowerBound = document.getElementById("lowerBound").value;
	return parseFloat(lowerBound, 10);
}

function upperBound() {
	var upperBound = document.getElementById("upperBound").value;
	return parseFloat(upperBound, 10);
}

function getSubIntervals(){
	var subintervals = document.getElementById("subintervals").value;
	return parseFloat(subintervals, 10);
}

function linearSlope(){
	var linearFunction = document.getElementById("function1").value;
	if(linearFunction.search("x") == -1){
		return 0;
	}
	else if(linearFunction.search("x") == 0){
		return 1;
	}
	else{
		var slope = linearFunction.substr(0, linearFunction.search("x"));
		return parseFloat(slope, 10);
	}
}

function linearVerticalShift(){
	var linearFunction = document.getElementById("function1").value;
	if(linearFunction.search("x") == -1){
		return linearFunction;
	}
    else if(linearFunction.search("x") == 0){
		return 0;
	}
	else{
		var verticalShift = linearFunction.substr(linearFunction.search("x") + 1, linearFunction.length);
		return parseFloat(verticalShift, 10);
	}
}

function setFunction(){
	if (document.getElementById("setFunction").click == true) {
		return true;
	}
	return false;
}



//function linear

//var x;
//var output = document.getElementById("demo");
//output.innerHTML = slider.value; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
//slider.oninput = function() {
  //output.innerHTML = this.value;
//}




	