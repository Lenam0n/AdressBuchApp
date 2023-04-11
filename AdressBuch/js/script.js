var db = []

var nameinput;
var telefonInput;
var emailInput;

var button =  document.getElementById("submit");
var wrapper =  document.getElementById("wrapper");




function elementeEinlesen(){
		if(document.getElementById("nameInput").value == "") {
			clearInputs()
			alert("Die Nameneingabe ist ungültig")
			return;}
			else {nameInput = document.getElementById("nameInput").value}
		if(document.getElementById("telefonInput").value == "" || 
			document.getElementById("telefonInput").value.length >15){
			clearInputs()
			alert("Die Telefoneingabe ist ungültig")
			return;}
			else {telefonInput = Number(document.getElementById("telefonInput").value)}
		if(document.getElementById("emailInput").value == ""){
			clearInputs()
			alert("Die Emaileingabe ist ungültig")
			return;}
			else {emailInput = document.getElementById("emailInput").value}
		if(	document.getElementById("emailInput").value.indexOf('@') === -1 &&
			document.getElementById("emailInput").value.indexOf('.') === -1){
			clearInputs()
			alert("Die Emaileingabe ist ungültig")
			return;}
	addToDb(nameInput , telefonInput, emailInput );
	alert("neuer Eintrag Hinzugefügt")
	clearInputs()
	
	
}
function clearInputs(){for(i=0; i < document.getElementsByClassName("inputFelder").length; i++) document.getElementsByClassName("inputFelder")[i].value = "";}

function addToDb(a,b,c){
	if(db.length != 0){
		let stelle = (db.length +1)
		db.push({name  : a, telefon : b, email : c})
	}else{
		db.push({name  : a, telefon : b, email : c})
	}
}

function inputBuilder(a,b,c,d){
	let input = document.createElement("input");
	Object.entries( { class : a , type : b, id : c, placeholder : d } ).forEach( ( [ key , value ] ) => input.setAttribute( key , value ) );
	return input;
}
function buttonBuilder(){
	let button = document.createElement("button")
	button.setAttribute("id", "submit")
	button.addEventListener("click", ()=>{
		elementeEinlesen();
	})
	return button;
	
}
function returnButtonBuilder(){
	let button = document.createElement("button")
	Object.entries({id : "return" , class : "button-style1"} ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
	button.innerText = "return to menue";
	button.addEventListener("click", ()=>{
		deleteWrapperChilds()
		homePageBuilder()
	})
	return button
}

function homeButtonsBuilder (a,b){
	let button = document.createElement("button")
	Object.entries({onclick : a , class : "button-style1"} ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
	button.innerText = b
	return button
}


function wrapperBuilder(){
	deleteWrapperChilds()
	
	wrapper.appendChild(returnButtonBuilder())
	let con = document.createElement("div")
	con.setAttribute("class", "container")
	wrapper.appendChild(con)
	
	con.appendChild(inputBuilder("inputFelder","text","nameInput","Name"))
	con.appendChild(inputBuilder("inputFelder","number","telefonInput","Telefonnummer"))
	con.appendChild(inputBuilder("inputFelder","email","emailInput","Email"))
	con.appendChild(buttonBuilder())
}

function deleteWrapperChilds(){
	while (wrapper.firstChild) {
	  wrapper.removeChild(wrapper.firstChild);
}}

function arrayEntleeren(){	db.length = 0 }


function homePageBuilder(){
	wrapper.appendChild(homeButtonsBuilder("wrapperBuilder()","Neuen Kontakt Hinzufügen"))
	wrapper.appendChild(homeButtonsBuilder("ausgebenAllerKontakte()","Alle Kontakte anzeigen lassen"))
	wrapper.appendChild(homeButtonsBuilder("test()","Kontakte Bearbeiten"))
	wrapper.appendChild(homeButtonsBuilder("arrayEntleeren()","Alle Kontakte löschen"))
}

function ausgebenAllerKontakte(){
	deleteWrapperChilds()
	if(db.length==0){
		alert("Du hast keine Kontakte eingetragen")
		homePageBuilder()
		return
	}
	wrapper.appendChild(returnButtonBuilder())
	
	for (let obj of db) {
		let conw = document.createElement("div")
		conw.setAttribute("class", "container-wrapper")
		conw.addEventListener("click" , function(){
			this.remove();
		})
		wrapper.appendChild(conw)
		for (let [key, value] of Object.entries(obj)) {
			let con = document.createElement("div")
			con.setAttribute("class", "container")
			
			con.appendChild(textAusgabenBuilder(key, "key"));
			con.appendChild(textAusgabenBuilder(value, "value"));
			
			
			conw.appendChild(con)

	}
		let spacer = document.createElement("p")
		wrapper.appendChild(spacer)
		spacer.innerText = "-----------------------"
}


function textAusgabenBuilder(a,b){
	let p = document.createElement("p")
	p.innerText = a;
	p.setAttribute("class" , b)
	return p
	


}}




window.addEventListener("load",() => {
	homePageBuilder()
})

