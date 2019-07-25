# Geogebreak

add tags in the code that will be replace by their respective variable names. For example, babadook onUpdate script looks like this:

var a = ggbApplet.getValueString('#t');
var len = a.length;
for(var i = 0; i < len; i++) a = a.replace(' ', '');
len = a.length;
for(var i = 0; i < len; i++) a = a.replace('?', '');

try {
var num = parseFloat(a);
  if(isNaN(num)) throw 'ERROR';
  //num = Math.abs(num);
  //num = Math.round(num);
  //if(num > 999) num = 999;
  ggbApplet.setTextValue('#t', ''+num);
} catch(err) {
  ggbApplet.setTextValue('#t', '?');
}
