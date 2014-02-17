//Global variable to make distinct toggle lables for each checkbox.
var togglenum = 0;

//One load of the page call loadList which will load the content of the todolist app from localStorage. 
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

	//Saves the list array into localStorage with the key ToDoList. 
	localStorage.setItem('ToDoList', JSON.stringify(list));
}


/*
 * Remove element function that removes the element i.e section from the todolist. 
 */
function removeElement(e){
	//Calls the element parentnode's parentnode, and removes the child node of the parent node
	//The top parent node is the .items div with the children of sections. 
	e.srcElement.parentNode.parentNode.removeChild(e.srcElement.parentNode);

	//Calls saveList on the app. 
	saveList();  
}


/*
 * Loads the content of the todolist from localStorage. 
 */
function loadList(){
	//stores the ToDoList array into a variable called Storage. 
	var storage = JSON.parse(localStorage.getItem('ToDoList'));
	
	//Grabs the div with the class items. 
	var items = document.querySelector(".items");

	//Used to add the content loaded from localStorage into the todolist. 
	var content = ""; 
	
	//If the storage has nothing return from the loadlist function. 
	if(!storage){
		return; 
	}
	
	//Iterates through each of the content in the localStorage which is stored into the storage via multidimensional array. 
	for(var i = 0; i < storage.length; i++){
			//Increments togglenum to make each label unique to its checkbox. 
			togglenum++;	

			//Adds the content within the items div. 
			content += "<div class='section' id ='"+togglenum+"'  draggable='true'> <div class='x-button'> </div> <input type='text' class='list-items' value='"+storage[i][0]+"'> <input id='toggle"+togglenum+"' type='checkbox'> <label checked='"+storage[i][1]+"' for='toggle"+togglenum+"'> </label></div>";
	
		//If content does not equal undefined add into the items innerHtml. 
		if(content != undefined){
			items.innerHTML = content;
		}
		
		//Otherwise set the innerHtml to null. 
		else{
			items.innerHTML = ""; 
		}
	}
	
	//Creates a nodelist of all the checkbox inputs. 
	var checkBoxes = document.querySelectorAll("input[type='checkbox']");

	//Iterates through and sets the checkBoxes checked attribute. 
	for (var i = 0; i < checkBoxes.length; i++) {
		checkBoxes[i].checked = storage[i][1];
	}
	//Creates an object of the div element section.
	var section = document.querySelectorAll(".section");

	//Creates an object of the element input. 
	var textField = document.querySelectorAll(".list-items"); 
	
	//Creates a exit button with a new div element. 
	var xbutton = document.querySelectorAll(".x-button");

	//Creates an object of the element input. 
	var checkBox = document.querySelectorAll("input[type='checkbox']");
	
	//Creates a new object of the element type label. 
	var label = document.querySelectorAll("label");
	
	//Iterates through each of the elements and sets the methods and their functionality. 
	for(var i = 0; i < checkBox.length; i++){
		section[i].ondragstart= drag; 
		section[i].ondrop = drop; 
		section[i].ondragover = allowDrop; 

		//For each textfield on keydown invoke the method saveList. 
		textField[i].onkeydown = saveList; 

		//For each xbutton on onclick invoke the method removeElement. 
		xbutton[i].onclick = removeElement;

		//For each checkBox on onclick invoke the method saveList. 
		checkBox[i].onclick = saveList; 

		//For each label on onclick invoke the method saveList. 
		label[i].onclick = saveList; 
	}
}

//Used for when user clicks on the add button to add items. 
var addbutton = document.querySelector(".add-button");

//on the addButton on onclick invoke the method addItem. 
addbutton.onclick = addItems; 


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
	section.setAttribute("draggable", "true");
	section.setAttribute("id", togglenum); 
	section.ondrop = drop;
	section.ondragover = allowDrop;
	section.ondragstart = drag; 


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

/*
 * Function allows the element to have the event allow to drop. 
 */
function allowDrop(ev){
	ev.preventDefault(); 
}

//Function is used to drag a element and sets its data into the Section string.
function drag(ev){
	//Grabs the data or section and places into the set data. 
	ev.dataTransfer.setData("Section", ev.srcElement.id); 
}

//Function is used to drop the dragged element.
function drop(ev){
	//Overrides the default drop action. 
	ev.preventDefault();
	
	//Gets the data of the dragged element. 
	var data = ev.dataTransfer.getData("Section");

	//Gets the data of the section by its id.
	data = document.getElementById(data); 

	//Gets a query of all the sections currently in the todolist. 
	var sections = document.querySelectorAll(".section");

	//Makes an array of section elements.
	sections = [].slice.call(sections); 

	//Used for the swapId of the section we want to move. 
	var swapId = 0;

	//Iterates through the sections. 
	for(var i = 0; i < sections.length; i++){

		//When we find the section id that has our target for dropping.
		if(sections[i].id === ev.target.id){
			//Set the swapId as I which is the target we want to drop. 
			swapId = i;

			//Then set the dragged section to be inserted before the targeted element. 
			data.parentNode.insertBefore(data,sections[swapId]);
		}
	}
	//Then call saveList.
	saveList();
}
