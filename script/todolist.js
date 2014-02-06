/*GLOBAL VARIABLES*/
//Global variable to make distinct toggle lables for each checkbox.
var togglenum = 0; 

//Used for when user clicks on the add button to add items. 
var addbutton = document.querySelector(".add-button"); 
addbutton.onclick = function(){
	addItems(); 
}

/*
 *Function is used to add Items to the to-do list. 
 */
function addItems(){
	//Increments the toggle num.
	togglenum++; 

	//Gets the element with the class items. 
	var items = document.querySelector(".items");

	//Creates a new div. 
	var section = document.createElement('div');

	//Creates a exit button with a new div element. 
	var xbutton = document.createElement('div');

	//Assigns the div element the class x-button.
	xbutton.className = "x-button";

	//Assigns an onclick event which the parent node items 
	//will remove the section from the items. 
	xbutton.onclick = function(){
		items.removeChild(section); 	
	}   

	//Creates an object of the element input. 
	var textField = document.createElement('input');

	//Sets the input attribute type to text.  
	textField.setAttribute("type","text"); 

	//Sets the class name to list-items. 
	textField.className = "list-items"; 

	//Creates an object of the element input. 
	var checkBox = document.createElement('input');

	//Sets the attributes of the input id to toggle + toggle num. 
	checkBox.setAttribute("id","toggle"+togglenum);

	//Sets the attribute of the input type to checkbox. 
	checkBox.setAttribute("type","checkbox");  

	//Creates a new object of the element type label. 
	var label = document.createElement('label'); 

	//Sets the attribute for the label's for to toggle plus toggle num. 
	label.setAttribute("for", "toggle"+togglenum); 

	//Into the div sections adds the textfield,checkbox, and label.
	section.appendChild(xbutton);  
	section.appendChild(textField); 
	section.appendChild(checkBox); 
	section.appendChild(label); 

	//Into the items content area adds the section of divs. 
	items.appendChild(section); 
}
