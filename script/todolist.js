/*
 *Function is used to add Items to the to-do list. 
 */
function addItems(){
	//Gets the ul list 
	var listUl = document.getElementById("list");
	//Creates a list item 
	var entry = document.createElement('li');
	//Assigns the class list-items to the ul.
	listUl.className = 'list-items'; 	
	//Appends the list items into the ul.  
	listUl.appendChild(entry); 	
	//Creates the box ul object. 
	var boxUl = document.getElementById("box"); 
	//Adds the box-section class. 
	boxUl.className = 'box-section'; 
	//Creates a list item. 
	var entry2 = document.createElement('li');
	//Adds the onclick DOM event method which makes the 
	//li inherit the class check-box. 	    
	entry2.onclick = function(){
		entry2.className ='check-box'; 	
	};
	//Appends the li into the ul. 
	boxUl.appendChild(entry2); 	
}
