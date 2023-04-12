var db = [
{
	name : "a",
	telefon : 1223,
	email : "iahzfoiah@."
}]

var nameinput;
var telefonInput;
var emailInput;


var wrapper =  document.getElementById("wrapper");




function elementeEinlesen(a){
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
	
	if(a === "neuer"){alert("neuer Eintrag hinzugefügt")}
	if(a ==="überarbeitet"){alert("Eintrag wurde überarbeitet")}
	
	
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

	return button;
	
}
function returnButtonBuilder(){
	let button = document.createElement("button")
	Object.entries({id : "return" , class : "button-style1"} ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
	button.innerText = "Zurück zum 'Hauptmenü";
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
	con.appendChild( buttonBuilder())
	let submit =  document.getElementById("submit");	
	submit.addEventListener("click", () => {
		elementeEinlesen("neuer");}
		)
	}


function deleteWrapperChilds(){
	while (wrapper.firstChild) {
	  wrapper.removeChild(wrapper.firstChild);
}}

function arrayEntleeren(){	db.length = 0 }


function homePageBuilder(){
	wrapper.appendChild(homeButtonsBuilder("wrapperBuilder()","Neuen Kontakt hinzufügen"))
	wrapper.appendChild(homeButtonsBuilder("ausgebenAllerKontakte()","Alle Kontakte anzeigen lassen"))
	wrapper.appendChild(homeButtonsBuilder("uberarbeiten()","Kontakte bearbeiten"))
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
		
		let objToRemove = {};

		for (let i = 0; i < document.querySelectorAll("p.key").length; i++) {
		  let key = document.querySelectorAll("p.key")[i].textContent;
		  let value = document.querySelectorAll("p.value")[i].textContent;
		  objToRemove[key] = value;
		}
		
		objToRemove.telefon = parseInt(objToRemove.telefon);
			
		let index = db.findIndex(obj => {
		  for (let key in objToRemove) {
			if (obj[key] !== objToRemove[key]) {
			  return false;
			}
		  }
		  return true;
		});

		if (index !== -1) {
		db.splice(index, 1);}
		this.remove()
		
		})
		wrapper.appendChild(conw)
		for (let [key, value] of Object.entries(obj)) {
			let con = document.createElement("div")
			con.setAttribute("class", "container")
			
			con.appendChild(textAusgabenBuilder(key, "key"));
			con.appendChild(textAusgabenBuilder(value, "value"));
			
			
			conw.appendChild(con)

	}
		let spacer = document.createElement("span")
		conw.appendChild(spacer)
		spacer.innerText = "-----------------------"
		
		
}
}


function textAusgabenBuilder(a,b){
	let p = document.createElement("p")
	p.innerText = a;
	p.setAttribute("class" , b)
	return p
}


function uberarbeiten(){
	
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
			
		let objToChange = {};

		for (let i = 0; i < document.querySelectorAll("p.key").length; i++) {
		  let key = document.querySelectorAll("p.key")[i].textContent;
		  let value = document.querySelectorAll("p.value")[i].textContent;
		  objToChange[key] = value;
		}
		
		let obectj = Object.values(objToChange)	
		

		objToChange.telefon = parseInt(objToChange.telefon);
		
	
			deleteWrapperChilds()
	
			wrapper.appendChild(returnButtonBuilder())
			let con = document.createElement("div")
			con.setAttribute("class", "container")
			wrapper.appendChild(con)
			
			
			con.appendChild(inputBuilder("inputFelder","text","nameInput",obectj[0]))

			con.appendChild(inputBuilder("inputFelder","number","telefonInput",obectj[1]))
			con.appendChild(inputBuilder("inputFelder","email","emailInput",obectj[2]))
			con.appendChild(buttonBuilder())
			
			let submit =  document.getElementById("submit");	
			submit.addEventListener("click", (objToChange) => {
				deleteObj(objToChange)
				elementeEinlesen("überarbeitet");
				deleteWrapperChilds()
				homePageBuilder();
				}
			)
})
	
	wrapper.appendChild(conw)
	for (let [key, value] of Object.entries(obj)) {
			let con = document.createElement("div")
			con.setAttribute("class", "container")
			
			con.appendChild(textAusgabenBuilder(key, "key"));
			con.appendChild(textAusgabenBuilder(value, "value"));
			
			conw.appendChild(con)

	}
		let spacer = document.createElement("span")
		conw.appendChild(spacer)
		spacer.innerText = "-----------------------"

	}

}

function deleteObj(a){
		let objToRemove = a
		
	
		objToRemove.telefon = parseInt(objToRemove.telefon);
			
		let index = db.findIndex(obj => {
		  for (let key in objToRemove) {
			if (obj[key] !== objToRemove[key]) {
			  return false;
			}
		  }
		  return true;
		});

		if (index !== -1) {
		db.splice(index, 1);}		
}

window.addEventListener("load",() => {
	homePageBuilder()
})

