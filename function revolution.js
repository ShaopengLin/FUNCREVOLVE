/************************************************************************************************************
Project: Function Revolution
Description: functions in this file are responsible for extracting information from the user's input on the
			 website.
History: Michael Zhang & Chris Lin, May 21, 2019
************************************************************************************************************/

//function that returns the lower bound of the interval
function lowerBound(){
	//get the value that is held on the id
	var lowerBound = document.getElementById("lowerBound").value;
	//take away all white spaces
    lowerBound = lowerBound.replace(/\s/g,'');
	return parseFloat(lowerBound, 10); //change the variable to float
}

//function that returns the upper bound of the interval
function upperBound(){
	//get the value that is held on the id
	var upperBound = document.getElementById("upperBound").value;
	//take away all white spaces
    upperBound = upperBound.replace(/\s/g,'');
	return parseFloat(upperBound, 10); //change the variable to float
}

//function that returns the number of subintervals that is chosen by the user
function getSubIntervals(){
	//get the value that is held on the id
	var subintervals = document.getElementById("subintervals").value;
	return parseFloat(subintervals, 10); //change the variable to float
}

//function that returns the axis of rotation
function getAxisOfRotation(){
	var axis;

	//if-else if to check whether the user want to rotate around a vertical or horizontal line
	if(document.getElementById('y').checked) {
		//get the value that is held on the id
		axis = document.getElementById('y-axis').value;
	}

	else if(document.getElementById('x').checked) {
		rotateAxis = "x";
		//get the value that is held on the id
		axis = document.getElementById('y-axis').value;
	}

	return parseFloat(axis, 10); //change the variable to float
}

//function that returns the colour for function 1
function function1color(){
	//get the value that is held on the id
	return document.getElementById("color1").value;
}

//function that returns the colour for function 2
function function2color(){
	//get the value that is held on the id
	return document.getElementById("color2").value;
}

//function that sets all the user input value to default
function resetGraph(){
	//assign values to their corresponding id
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
	getInfo(); //call function to reload these information back to the drawing mechanism
}




	