# Geogebreak
Open html in a browser to open app.

__----------------CHOOSE VAR TYPE AND GOAL----------------__

Select the type of element you want and whether you want to create a new element(s) or edit already existing one(s).

__-------------------SPECIFY ATTRIBUTES-------------------__

TAG-
Add tags in the code that will be replaced by their respective variable names. 

For example, a javascript script to get the value of a text object with the tag 't' would look like this:

var a = ggbApplet.getValueString('#t');

NAME-
Put the core name of the object that you want to create.

VALUE-
Put the value for the object you want to create. This can be a string or a number.

If you want to create an InputBox you will need to specify to what object the inputbox is linked to by putting the name of the object as the value of the inputbox.

For example an inputbox linked to a text object with the core name myText would have the value myText.

START-
A number will be added to the end of the core name specified in the NAME category to differentiate between the multiple objects of the same type. the START number is the first number to be added to the end of the core name. 

For example, a text object named myText will have the name myText0 if start is 0.

REPS-
This is the number of objects that will be created in geogebra. The number added to the end of the core name starts at START and increments for each object REPS times. 

For example, a text object named myText with a START of 5 and a REPS of 5 will have the values:

myText5, myText6, myText7, myText8, myText9

__ATTRIBUTES__


__----------SPECIFY ADDITIONAL VARIABLES NEEDED FOR SCRIPT-----------__

Similar to choosing the var type and goal.

