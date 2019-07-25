var mainVar ='InputBox';
var goal = 'create';
var mainTag =  new RegExp("#i", "g");



//TYPE AND GOAL
function setMain(){
	mainVar = document.getElementById('mainSelect').value;
	console.log("mainVar: " + mainVar);
}

function setGoal(){
	goal = document.getElementById('action').value;
	console.log("goal: " + goal);
}

function setTag() {
	var tag = document.getElementById('Tag').value;
	mainTag = new RegExp("#" + tag, "g");
	console.log("mainTag:" + mainTag);
}

function reset(){
	window.location.reload(true);
}
//Required Attributes
var mainName = mainVar;
function changeName(newName){
	mainName = newName.value;
	if(mainName.length == 0){
		mainName = mainVar;
	}
	console.log("mainName: " + mainName);
}

var mainVal = '';
//should add some handling for different types of vars i.e. sliders can only have numbers
function setVal(){
	mainVal = document.getElementById('Value').value;
	console.log("mainVal: " + mainVal);
}

var startInd = 0;
function setInd(){
	startInd = document.getElementById('start').value;
	if(startInd.length == 0){
		startInd = 0;
	}
	console.log("startInd: " + startInd);
}

var varCount = "1";
function setReps(){
	varCount = document.getElementById('reps').value;
	if(varCount.length == 0){
		varCount = "1";
	}
	console.log("varCount: " + varCount);
}


//DEAL WITH ATTRIBUTES
var attribNames = [];
var attribs = [];
var editXML = false;

//does not address values yet only display
function addAttrib(){
	var attType = document.getElementById('attribSelect').value;
	if(attribNames.indexOf(attType) == -1){
		document.getElementById(attType).style.display = 'inline';
		attribNames.push(attType);
		switch(attType){
			case 'onUpdate':
				document.getElementById('att6').style.display = 'none';
				var u = ["", "javascript", false];
				attribs.push(u);
				break;
			case 'val':
				document.getElementById('att5').style.display = 'none';
				var u = ["", "javascript", false];
				attribs.push(u);
				break;
			case 'length':
				document.getElementById('att4').style.display = 'none';
				var u = ["20"];
				attribs.push(u);
				break;
			case 'show':
				document.getElementById('att7').style.display = 'none';
				var u = [false, false];
				attribs.push(u);
				break;
			case 'objColor':
				document.getElementById('att3').style.display = 'none';
				var u = ["0", "0", "0"];
				attribs.push(u);
				break;
			case 'bgColor':
				document.getElementById('att1').style.display = 'none';
				var u = ["0", "0", "0"];
				attribs.push(u);
				break;
			case 'caption':
				document.getElementById('att2').style.display = 'none';
				var u = [""];
				attribs.push(u);
				break;

		}
	}

	
	console.log(attribNames);
	console.log(attribs);
}

//does not address values yet only display
function removeAtt(element){
	element.parentNode.style.display = 'none';
	var ind = attribs.indexOf(element.parentNode.id);
	attribs.splice(ind, 1);
	attribNames.splice(ind, 1);
	switch(element.parentNode.id){
		case 'onUpdate':
			document.getElementById('att6').style.display = 'inline';
			break;
		case 'val':
			document.getElementById('att5').style.display = 'inline';
			break;
		case 'length':
			document.getElementById('att4').style.display = 'inline';
			break;
		case 'show':
			document.getElementById('att7').style.display = 'inline';
			break;
		case 'objColor':
			document.getElementById('att3').style.display = 'inline';
			break;
		case 'bgColor':
			document.getElementById('att1').style.display = 'inline';
			break;
		case 'caption':
			document.getElementById('att2').style.display = 'inline';
			break;

	}

	editXML = attribs.length != 0;
	console.log(attribs);
	console.log(editXML);
}


function updateAtt(element){
	parent = element.parentNode.id;
	console.log(parent);
	var ind = 0;
	var parInd = attribNames.indexOf(parent);
	var children = document.getElementById(parent).children;
	//console.log(children);
	for(var i = 0; i < children.length; i++){
		if(children[i].id == element.id)
			ind = i-1;
	}
	if(parent == 'show' || (parent == 'onUpdate' || parent == 'val') && ind == 2)
		attribs[parInd][ind] = document.getElementById(element.id).checked;
	else
		attribs[parInd][ind] = document.getElementById(element.id).value;
}

var vars = [];
var varSettings = [];
var varNum = 0;
var original = document.getElementById('var');
original.style.display = 'none';
// HANDLE EXTRA VARS
function addVars(){
	var clone = original.cloneNode(true); // "deep" clone
    clone.id = "var" + ++varNum;

	var c = clone.children;
	c[0].id = "newVar" + varNum;
	c[1].id = "vaType" + varNum;
	c[2].id = "tag" +varNum;
	c[3].id = "Name" + varNum;
	c[4].id = "Value" + varNum;

	vars.push(clone.id);
	console.log(vars);

	var varInit = [false, 'InputBox', 'i', 'InputBox', ''];
	varSettings.push(varInit);
	console.log(varSettings);

    clone.style.display = "block";
    original.parentNode.appendChild(clone);
	
}

function removeVars(element){
	var parent = element.parentNode;
	var element = document.getElementById(parent.id);
    parent.parentNode.removeChild(element);
    
    var num = vars.indexOf(parent.id);
    console.log(num);
    vars.splice(num, 1);
    varSettings.splice(num, 1);
    console.log(varSettings);
}

function updateVar(element){
	parent = element.parentNode.id;
	console.log(parent);
	var ind = 0;
	var parInd = vars.indexOf(parent);
	var children = document.getElementById(parent).children;
	console.log(children[1].children[3]);
	for(var i = 0; i < children.length; i++){
		if(children[i].id == element.id)
			ind = i;
	}
	if(ind == 0){
		varSettings[parInd][ind] = document.getElementById(element.id).checked;
		if(varSettings[parInd][ind])
			children[4].style.display = 'inline';
		else
			children[4].style.display = 'none';

	} else{ 
		varSettings[parInd][ind] = document.getElementById(element.id).value;
	}
	console.log(varSettings);
}

function constructCode(){
	console.log(attribs);
	var outputCode = "";
	var xmlAdj = "";
	var varAdj = "";
	var createNewVars = "";
	if(attribs.length > 0){
		outputCode += document.getElementById('insertXML').innerHTML;
		for(var i = 0; i < attribNames.length; i++){
			varName = attribNames[i];
			console.log(varName);
			var code = attribs[i][0];
			switch(varName){
				case 'val':
					if(attribs[i][2]){
						code = document.getElementById('babadook1').innerHTML + "\n" + code;
					}
				case 'onUpdate':
					if(attribs[i][2] && varName != 'val'){
						code = document.getElementById('babadook2').innerHTML + "\n" + code;
					}
					console.log(code);
				    code = code.replace(/\"/g, '\'');
				    code = code.replace(/\r?\n|\r/g, '\" + \"\\n\" + \"');
					xmlAdj += "\t" + "var newXML" + i + " = insertXML(mainVar, " + "'&lt;" + attribs[i][1] + " " + varName + "=', " + "'\\n', \"" + code + "\");" + "\n";
					xmlAdj += "\t" + "ggbApplet.evalXML(newXML" + i + ");" + "\n";
					break;
				case 'length':
				case 'caption':
					xmlAdj += "\t" + "var newXML" + i + " = insertXML(mainVar, " + "'&lt;" + varName + " val=', " + "'\\n', \'" + attribs[i][0] + "\');" + "\n";
					xmlAdj += "\t" + "ggbApplet.evalXML(newXML" + i + ");" + "\n";
					break;
				case 'show':
					xmlAdj += "\t" + "var newXML" + i + " = insertXML(mainVar, " + "'&lt;" + varName +  " ', '\\n', \'" + " object=\"" + attribs[i][0] + "\" label=\"" + attribs[i][1] + "\"\');" + "\n";
					xmlAdj += "\t" + "ggbApplet.evalXML(newXML" + i + ");" + "\n";
					break;
				case 'objColor':
				case 'bgColor':
					xmlAdj += "\t" + "var newXML" + i + " = insertXML(mainVar, " + "'&lt;" + varName +  " ', '\\n', \'" + " r=\"" + attribs[i][0] + "\" g=\"" + attribs[i][1] + "\" r=\"" + attribs[i][2] + "\" alpha=\"255\"\');" + "\n";
					xmlAdj += "\t" + "ggbApplet.evalXML(newXML" + i + ");" + "\n";
					break;
			}
		}
		console.log(xmlAdj);
	}


	outputCode += "for(var i = 0; i < " + varCount + "; i++){ \n";
	outputCode += "\tvar j = i + " + startInd + "; \n";
	outputCode += "\tvar mainVar = '" + mainName + "' + j; \n";

	if(vars.length > 0){
		for(var i = 0; i < vars.length; i++){
			varName = varSettings[i];
			var varTag = new RegExp("#" + varName[2], "g")
			console.log(varName[1]);
			switch(varName[1]){
				case 'InputBox':
					outputCode += "\tvar box = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, "'box \" + j + '\"");
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(box + \" = InputBox(\" + text + \")\");\n";
					break;
				case 'text':
					outputCode += "\tvar text = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, "'text\" + j + \"'");
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(text + \' = \"" + varName[4] + "\"\');\n";
					break;
				case 'num':
					outputCode += "\tvar num = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, "'num\" + j + \"'");
					break;
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(num + \" = " + varName[4] + " \");\n";
					break;
				case 'l':
					outputCode += "\tvar list = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, "'list\" + j + \"'");
					break;
				case 'button':
					outputCode += "\tvar butt = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, "'butt\" + j + \"'");
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(butt + \" = Button(\"" + varName[4] + "\")\");\n";
					break;
			}
		}

		outputCode += createNewVars;

	}

	console.log(mainVal);
	xmlAdj = xmlAdj.replace(mainTag, "'mainVar\" + j + \"'");

	if(goal == 'create'){
		switch(mainVar){
			case 'InputBox':
					outputCode += "\tggbApplet.evalCommand(mainVar + \"= InputBox(\" + text + \")\");\n";
					break;
				case 'text':
					outputCode += "\tggbApplet.evalCommand(mainVar + \' = \"" + mainVal + "\"\');\n";
					break;
				case 'num':
					outputCode += "\tggbApplet.evalCommand(mainVar + \" = " + mainVal + " \");\n";
					break;
				case 'l':
					outputCode += "\tggbApplet.evalCommand(mainVar + \" = InputBox(\" + text + \")\");\n";
					break;
				case 'button':
					outputCode += "\tggbApplet.evalCommand(mainVar + \" = Button(\"" + mainVal + "\")\");\n";
					break;
		}
		
	
	}

	

	console.log(xmlAdj);
	outputCode += xmlAdj;
	
	outputCode += "}";
	document.getElementById('outputCode').innerHTML = outputCode;
	Prism.highlightAll();

}



 

