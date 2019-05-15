function trigYcoord(){
	var trig = document.getElementById("function1").value;
	trig.replace(/\s/g,'');
	math.eval(trig);
	console.log(math.eval(trig));
}

