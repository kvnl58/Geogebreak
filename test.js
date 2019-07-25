function insertXML (objectName, startStr, endStr, code ){
	var xml = ggbApplet.getXML(objectName);
	var found = false;
	var startAtt = xml.indexOf(startStr);

	if(startAtt != -1){
		var endAtt = xml.indexOf(endStr, startAtt);
		var line = xml.substring(startAtt, endAtt);
		console.log("line");
		found = true;
	}
	
	if(found){
		xml = xml.replace(line, startStr + code + endStr);
	} else {
		xml = xml.replace(/<\/element>/, startStr + "\"" + code + '\"/>\n</element>');
	}

	return xml;
}

for(var i = 0; i < 1; i++){ 
	var j = i + 0; 
	var mainVar = 'InputBox' + j; 
	var text = 'text' + j; 
	ggbApplet.evalCommand(text + ' = "?"');
	ggbApplet.evalCommand(mainVar + "= InputBox(" + text + ")");
	var newXML0 = insertXML(mainVar, '<javascript val=', '\n', "if(ggbApplet.getTextValue('" + text + "'" + j + ") != 10){ " + "\n" + "  ggbApplet.setColor('" + mainVar + "'" + j + ", 250, 34, 51);}" + "\n" + "else {" + "\n" + "  ggbApplet.setVisible('mainVar'" + j + ", false);" + "\n" + "  ggbApplet.setVisible('" + text + "'" + j + ", true);" + "\n" + "}" + "\n" + "" + "\n" + "" + "\n" + "");
	ggbApplet.evalXML(newXML0);
}