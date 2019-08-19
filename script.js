var mainVar ='InputBox';
var goal = 'create';
var mainTag =  new RegExp("#i", "g");

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/javascript");


var editor2 = ace.edit("editor2");
editor2.setTheme("ace/theme/chrome");
editor2.session.setMode("ace/mode/javascript");

//TYPE AND GOAL
function setMain(){
	mainVar = document.getElementById('mainSelect').value;
	if(mainVar == "text" && goal == "edit"){
		alert("Editing an existing text object's xml crashes geogebra");
	}
	console.log("mainVar: " + mainVar);
}

function setGoal(){
	goal = document.getElementById('action').value;
	if(mainVar == "text" && goal == "edit"){
		alert("Editing an existing text object's xml crashes geogebra");
	}
	console.log("goal: " + goal);
}

function setTag() {
	var tag = document.getElementById('Tag').value;
	if(tag.length == 0){
		switch(mainVar){
			case 'InputBox':
				mainTag =  new RegExp("#i", "g");
				break;
			case 'text':
				mainTag =  new RegExp("#t", "g");
				break;
			case 'num':
				mainTag =  new RegExp("#n", "g");
				break;
			case 'button':
				mainTag =  new RegExp("#b", "g");
				break;
		}
	} else {
		mainTag = new RegExp("#" + tag, "g");

	}
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

var varCount = 1
function setReps(){
	varCount = document.getElementById('reps').value;
	if(varCount.length == 0){
		varCount = 1;
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
			case 'linkedGeo':
				alert("Changing the link of an Inputbox will successfully change the link, but that change will not be displayed in the properties of the InputBox");
				document.getElementById('att8').style.display = 'none';
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
		case 'linkedGeo':
			document.getElementById('att8').style.display = 'inline';
			break;		

	}

	editXML = attribs.length != 0;
	console.log(attribs);
	console.log(editXML);
}


function seeCode(){
	console.log(editor.getValue());
	console.log(editor2.getValue());
	var code;

	for(var i = 0; i < attribNames.length; i++){
		if(attribNames[i] == 'onUpdate'){
			console.log(editor.getValue());
			code = editor.getValue();
			editor.session.setValue(code.replace(/&lt;/g, "<"));
			attribs[i][0] = code;
		} else if(attribNames[i] == 'val') {
			code = editor2.getValue();		
			editor2.session.setValue(code.replace(/&lt;/g, "<"));
			attribs[i][0] = code;
		}
	}
	
}

function updateAtt(element){
	parent = element.parentNode.id;
	console.log(parent);
	var code = "";
	var ind = 0;
	var parInd = attribNames.indexOf(parent);
	var children = document.getElementById(parent).children;
	//console.log(children);
	for(var i = 0; i < children.length; i++){
		if(children[i].id == element.id)
			ind = i-1;
	}
	if(parent == 'onUpdate'){
		console.log(editor.getValue());
		if(document.getElementById(element.id).checked == true){
			code = document.getElementById('babadook2').innerHTML + "\n" + editor.getValue();
		} else {
			code = editor.getValue();
		}
		editor.session.setValue(code.replace(/&lt;/g, "<"));
		attribs[parInd][ind] = document.getElementById(element.id).checked;
		attribs[parInd][0] = code;
	} else if(parent == 'val') {
		if(document.getElementById(element.id).checked == true){
			code = document.getElementById('babadook1').innerHTML + "\n" + editor2.getValue();
		} else {
			code = editor2.getValue();
		}		
		editor2.session.setValue(code.replace(/&lt;/g, "<"));
		attribs[parInd][0] = code;
		attribs[parInd][ind] = document.getElementById(element.id).checked;
	} else {
		attribs[parInd][ind] = document.getElementById(element.id).value;
	}

    console.log(attribs);
	seeCode();
}

function clearScript(element) {
	parName = element.parentNode.id;

	if(parName == 'val') {
		editor.session.setValue("");
	} else {
		editor2.session.setValue("");
	}

}

var vars = [];
var varSettings = [];
var varNum = 0;
var original = document.getElementById('var');
original.style.display = 'none';
// HANDLE EXTRA VARS
function addVars(){
	var type = document.getElementById('vaType').value;

	if(type == 'Array'){
		var valArray = createValArray();
		vars.push(valArray.id);
		var c = valArray.children;
	} else {
		var clone = original.cloneNode(true); // "deep" clone
	    clone.id = "var" + ++varNum;

		var c = clone.children;
		c[0].id = "varTitle" + varNum;
		c[1].id = "varTag" +varNum;
		c[2].id = "Name" + varNum;
		c[3].id = "Value" + varNum;

		c[0].innerHTML = document.getElementById('varAction').value + " " + document.getElementById('vaType').value + ":";

		vars.push(clone.id);
		console.log(vars);

		var varInit = [document.getElementById('varAction').value == 'Create', document.getElementById('vaType').value, '', '', ''];
		varSettings.push(varInit);
		console.log(varSettings);

	    clone.style.display = "block";
	    original.parentNode.appendChild(clone);
	}
	
}

	
function createValArray(){
	var valArray = document.createElement("div");
	valArray.id = "var" + ++varNum;

	var arrTitle = document.createElement('P');
	arrTitle.innerHTML = "Value Array: ";
	arrTitle.setAttribute("style", "display: inline-block;")
	valArray.appendChild(arrTitle);

	var tag = document.createElement('INPUT');
	tag.setAttribute("id", "varTag");
	tag.setAttribute("placeholder", "Tag");
	tag.setAttribute("class", "varTag");
	tag.setAttribute("onchange", "updateVar(this)");
	valArray.appendChild(tag);

	for(var i = 0; i < varCount; i++){
		var row = document.createElement("div");
		row.setAttribute("id", "arrInd" + i);

		var arrName = document.createElement('P');
		arrName.innerHTML = "Value " + i + " ";
		row.appendChild(arrName);

		var arrVal = document.createElement('INPUT');
		arrVal.setAttribute("type", "text");
		arrVal.setAttribute("placeholder", "Value");
		arrVal.setAttribute("onchange", "updateArr(this)");
		arrName.appendChild(arrVal);

		valArray.appendChild(row);

	}

	var remove = document.createElement('BUTTON');
	remove.setAttribute("class", "buttons");
	remove.innerHTML = "Remove";
	remove.setAttribute("onclick", "removeVars(this)");
	valArray.appendChild(remove);

	document.getElementById('allVars').appendChild(valArray);
	var init = [false, 'Array', 'n'];
	for(var i = 0; i < varCount; i++){
		init.push('');
	}
	varSettings.push(init);

	console.log(varSettings);
	return valArray;

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

function updateArr(element){
	var gParent = element.parentNode.parentNode.parentNode;
	console.log(gParent);
	var ind = 0;
	var parInd = vars.indexOf(gParent.id);
	var children = gParent.children;

	console.log(children);
	for(var i = 1; i < children.length; i++){
		console.log(children[i].id + ":" + element.id)
		if(children[i].id == element.parentNode.parentNode.id){
			ind = i + 1;
		}

	}
	varSettings[parInd][ind] = element.value;


	console.log(varSettings);

}

function updateVar(element){
	parent = element.parentNode.id;
	console.log(element);
	var ind = 0;
	var parInd = vars.indexOf(parent);
	var children = document.getElementById(parent).children;
	console.log(children);
	for(var i = 1; i < children.length; i++){
		console.log(children[i].id + ":" + element.id)
		if(children[i].id == element.id){
			ind = i + 1;
		}

	}
	varSettings[parInd][ind] = element.value;

	console.log(varSettings);

}

var currCode = "";

function constructCode(){
	seeCode();
	console.log(attribs);
	var outputCode = "";
	var xmlAdj = "";
	var varAdj = "";
	var createNewVars = "";
	//update code with attribute data
	if(attribs.length > 0){
		outputCode += document.getElementById('insertXML').innerHTML;
		for(var i = 0; i < attribNames.length; i++){
			varName = attribNames[i];
			console.log(varName);
			var code = attribs[i][0];
			switch(varName){
				case 'val':
				case 'onUpdate':
					console.log(code);
				    code = code.replace(/\"/g, '\'');
				    code = code.replace(/\r?\n|\r/g, '\" + \"\\n\" + \"');
					xmlAdj += "\t" + "var newXML" + i + " = insertXML(mainVar, " + "'&lt;" + attribs[i][1] + " " + varName + "=', " + "'\\n', \"" + code + "\");" + "\n";
					xmlAdj += "\t" + "ggbApplet.evalXML(newXML" + i + ");" + "\n";
					break;
				case 'length':
				case 'caption':
				    console.log(attribs[i]);
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
				case 'linkedGeo':
					xmlAdj += "\t" + "var newXML" + i + " = insertXML(mainVar, " + "'&lt;" + varName + " exp=', " + "'\\n', \'" + attribs[i][0] + "\' + j);" + "\n";
					xmlAdj += "\t" + "ggbApplet.evalXML(newXML" + i + ");" + "\n";
					break;

			}
		}
		console.log(xmlAdj);
	}


	outputCode += "for(var i = 0; i < " + varCount + "; i++){ \n";
	outputCode += "\tvar j = i + " + startInd + "; \n";
	outputCode += "\tvar mainVar = '" + mainName + "' + j; \n";

	//update code with additional vars
	if(vars.length > 0){
		for(var i = 0; i < vars.length; i++){
			varName = varSettings[i];
			console.log(varSettings);
			var varTag = new RegExp("#" + varName[2], "g")
			console.log(varName[i]);
			switch(varName[1]){
				case 'InputBox':
					outputCode += "\tvar box = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, varName[3] + "\" + j + \"");
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(box + \" = InputBox(\" + text + \")\");\n";
					break;
				case 'Text':
					outputCode += "\tvar text = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, varName[3] + "\" + j + \"");
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(text + \' = \"" + varName[4] + "\"\');\n";
					break;
				case 'Slider':
					outputCode += "\tvar num = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, varName[3] + "\" + j + \"");
					break;
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(num + \" = " + varName[4] + " \");\n";
					break;
				case 'l':
					outputCode += "\tvar list = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, varName[3] + "\" + j + \"");
					break;
				case 'Button':
					outputCode += "\tvar butt = '" + varName[3] + "' + j; \n";
					xmlAdj = xmlAdj.replace(varTag, varName[3] + "\" + j + \"");
					if(varName[0] == true)
						createNewVars += "\tggbApplet.evalCommand(butt + \" = Button(\"" + varName[4] + "\")\");\n";
					break;
				case 'Array':
					var vals = [];
					console.log(varName);
					for(var k = 0; k < varCount; k++){
						var ind = k + 3;
						vals.push('"'+ varName[ind] + '"');
					}

					outputCode = "var vals" + i + " = [" + vals + "];\n" + outputCode;
					outputCode += "\tvar val" + i + " = vals" + i + "[i];\n";
					console.log(varTag);
					xmlAdj = xmlAdj.replace(varTag, "\" + val" + i +" + \"");

			}
		}

		outputCode += createNewVars;

	}

	console.log(mainVal);
	xmlAdj = xmlAdj.replace(mainTag, "\" + mainVar + \"");

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
	currCode = outputCode;
	console.log(outputCode);
	Prism.highlightAll();

}

function copyText() {
	var element = document.createElement('TEXTAREA');
	document.getElementById('codeSection').appendChild(element);
	element.setAttribute("id", "copyCode");
	element = document.getElementById('copyCode');
	console.log(outputCode);
	element.value = currCode;
	element.select();
	document.execCommand("copy");
	element.parentNode.removeChild(element);
}



 
