/*GLOBAL VARIABLES*/
//Global variable to make distinct toggle lables for each checkbox.
var togglenum = 0;
loadList(); 
/*************************************************************/ 
//Function saves the list items in the todo list. 
function saveList(){ 
	//input of list-items and checkBoxes. 
	var taskLists = document.querySelectorAll("input.list-items");
	
	//Splits the nodeList for the list-items into a array. 	
	var tasks = [].slice.call(taskLists); 
	
	//Grabs all the checkList items. 
	var checkLists = document.querySelectorAll("input[type='checkbox']");	
	
	//Splits the nodeList for the check items into an array. 
	var checks = [].slice.call(checkLists);
	
	//Creates a two dimensional array called list. 
	var list = new Array(tasks.length); 

	//Populates each list item with only one check. 
	for(var i = 0; i < list.length; i++){
		list[i] = new Array(1); 
	}
	
	//Populates the tasks and checks for each task. 
	for(var i = 0; i < list.length; i++){
		list[i][0] = tasks[i].value;
		list[i][1] = checks[i].checked; 
	}
	console.log("Being saved in list: " + list); 
	localStorage.setItem('ToDoList', JSON.stringify(list));
}

function removeElement(e){
	console.log(e);
	e.srcElement.parentNode.parentNode.removeChild(e.srcElement.parentNode); 
	saveList();  
}

function loadList(){
	var storage = JSON.parse(localStorage.getItem('ToDoList'));
	console.log(storage);
	var items = document.querySelector(".items");
	var content = ""; 
	
	if(!storage){
		return; 
	}
 
	for(var i = 0; i < storage.length; i++){
			togglenum++;
			
			content += "<div class='section'> <div class='x-button'> </div> <input type='text' class='list-items' value='"+storage[i][0]+"'> <input id='toggle"+togglenum+"' type='checkbox'> <label checked='"+storage[i][1]+"' for='toggle"+togglenum+"'> </label></div>";
			

		if(content != undefined){
			items.innerHTML = content;
			
		}
		else{
			items.innerHtml = ""; 
		}
	}
	
	var checkBoxes = document.querySelectorAll("input[type='checkbox']");
	for (var i = 0; i < checkBoxes.length; i++) {
		checkBoxes[i].checked = storage[i][1];
	}
	
	//Creates an object of the element input. 
	var textField = document.querySelectorAll(".list-items"); 
	
	//Creates a exit button with a new div element. 
	var xbutton = document.querySelectorAll(".x-button");

	//Creates an object of the element input. 
	var checkBox = document.querySelectorAll("input[type='checkbox']");
	
	//Creates a new object of the element type label. 
	var label = document.querySelectorAll("label");

	for(var i = 0; i < checkBox.length; i++){
		textField[i].onkeydown = saveList; 
		xbutton[i].onclick = removeElement;
		checkBox[i].onclick = saveList; 
		label[i].onclick = saveList; 
	}
}

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
	section.className = "section";

	//Creates a exit button with a new div element. 
	var xbutton = document.createElement('div');

	//Assigns the div element the class x-button.
	xbutton.className = "x-button";

	//Assigns an onclick event which the parent node items 
	//will remove the section from the items. 
	xbutton.onclick = removeElement;

	//Creates an object of the element input. 
	var textField = document.createElement('input');

	//Sets the input attribute type to text.  
	textField.setAttribute("type","text"); 
	
	//Makes each input for the textField uniquely identifiable. 	
	textField.setAttribute("id", "" + togglenum); 
	
	//Sets the class name to list-items. 
	textField.className = "list-items";
	
	//When user adds into a textfield call the saveList method to save 
	//into localStorage. 
	textField.onkeydown = saveList; 

	//Creates an object of the element input. 
	var checkBox = document.createElement('input');

	//Sets the attributes of the input id to toggle + toggle num. 
	checkBox.setAttribute("id","toggle"+togglenum);

	//Sets the attribute of the input type to checkbox. 
	checkBox.setAttribute("type","checkbox"); 
	
	//When user clicks on the checkBox calls the saveList method to save into localStorage. 
	checkBox.onclick = saveList;  

	//checkBox.className = "checks"; 

	//Creates a new object of the element type label. 
	var label = document.createElement('label');
	label.onclick = saveList; 	

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
