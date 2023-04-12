var db = [
{
	name : "a",
	nachname : "",
	telefon : 1223,
	'e-mail' : "iahzfoiah@."
}]

var wrapper =  document.getElementById("wrapper");
var deleteable = false



function elementeEinlesen(a){
	
		let numOnlyRegex = /^[0-9]+$/;
		let lettOnlyRegex = /^[a-zA-Z]+$/;
		let emailRegex = /^[0-9a-zA-Z-_. ()<>@,;:"[]|ç%&]+$/;
	
		if(document.getElementById("nameInput").value == "" ||
			!lettOnlyRegex.test(document.getElementById("nameInput").value)) {
			clearInputs("nameInput")
			alert("Die Nameneingabe ist ungültig")
			return false;}
			else {var nameInput = document.getElementById("nameInput").value}
		if(document.getElementById("nachnameInput").value == ""||
			!lettOnlyRegex.test(document.getElementById("nameInput").value)) {
			clearInputs("nachnameInput")
			alert("Die Nachnameneingabe ist ungültig")
			return false;}
			else {var nachnameInput = document.getElementById("nachnameInput").value}
		if(!numOnlyRegex.test(document.getElementById("telefonInput").value) ||
			document.getElementById("telefonInput").value == "" || 
			document.getElementById("telefonInput").value.length >15){
			clearInputs("telefonInput")
			alert("Die Telefoneingabe ist ungültig")
			return false;}
			else {var telefonInput = Number(document.getElementById("telefonInput").value)}
		if(document.getElementById("telefonInput").value == ""){
			clearInputs("telefonInput")
			alert("Die Emaileingabe ist ungültig")
			return false;}
			else {var emailInput = document.getElementById("emailInput").value}
		if(!emailRegex.test(document.getElementById("emailInput").value ||
			(document.getElementById("emailInput").value.indexOf('@') === -1 &&
			document.getElementById("emailInput").value.indexOf('.') === -1))){
			clearInputs("emailInput")
			alert("Die Emaileingabe ist ungültig")
			return false;}
	addToDb(nameInput, nachnameInput , telefonInput, emailInput );
	
	if(a === "neuer"){alert("neuer Eintrag hinzugefügt")}
	if(a ==="überarbeitet"){alert("Eintrag wurde überarbeitet")}
	
	
	clearAllInputs()
	
	
}
function clearAllInputs(){for(i=0; i < document.getElementsByClassName("inputFelder").length; i++) document.getElementsByClassName("inputFelder")[i].value = "";}


function clearInputs(a){document.getElementById(a).value = "";}

function addToDb(a,b,c,d){
	if(db.length != 0){
		let stelle = (db.length +1)
		db.push({name  : a, nachname: b, telefon : c, 'e-mail' : d})
	}else{
		db.push({name  : a, nachname : b ,telefon : c, 'e-mail' : d})
	}
}

function inputBuilder(a,b,c,d,z){
	
	test(z)
	
	let input = document.createElement("input");
	Object.entries( { class : a , type : b, id : c, z : d } ).forEach( ( [ key , value ] ) => input.setAttribute( key , value ) );
	return input;
}
function buttonBuilder(a){
	let button = document.createElement("button")
	button.innerText = a
	button.setAttribute("id", a)

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
	
	con.appendChild(inputBuilder("inputFelder","text","nameInput","Name","placeholder"))
	con.appendChild(inputBuilder("inputFelder","text","nachnameInput","Nachname","placeholder"))
	con.appendChild(inputBuilder("inputFelder","text","telefonInput","Telefonnummer","placeholder"))
	con.appendChild(inputBuilder("inputFelder","email","emailInput","E-mail","placeholder"))
	con.appendChild( buttonBuilder("submit"))
	let submit =  document.getElementById("submit");	
	submit.addEventListener("click", () => {
		elementeEinlesen("neuer");}
		)
	
	con.appendChild( buttonBuilder("clear"))
	let clear =  document.getElementById("clear");	
	clear.addEventListener("click", () => {
		clearAllInputs();}
		)
	}

function deleteWrapperChilds(){
	while (wrapper.firstChild) {
	  wrapper.removeChild(wrapper.firstChild);
}}

function arrayEntleeren(){	
		if(deleteable === false){
			let check = window.confirm("Willst du alle Einträge wirklich löschen?")
			if (!check){return }
			else{ deleteable = true }
		}
	if(db.length !== 0){
		db.length = 0 
		alert("Alle Kontakte gelöscht")
	}else{ alert("Du hast keine Kontakte eingetragen") }
	
	deleteable = false
}


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
		if(deleteable === false){
			let check = window.confirm("Willst du den Eintrag wirklich löschen?")
			if (!check){	return }
			else{ deleteable = true }
			
		}
		deleteObj(objChange())
		this.remove()
		deleteable = false
		
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
}}

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
		let obectjO = objChange()
		let obectj = Object.values(obectjO)	
		deleteWrapperChilds()
		
		wrapper.appendChild(returnButtonBuilder())
		let con = document.createElement("div")
		con.setAttribute("class", "container")
		wrapper.appendChild(con)
		
		
		con.appendChild(inputBuilder("inputFelder","text","nameInput",obectj[0],"value"))
		con.appendChild(inputBuilder("inputFelder","text","nachnameInput",obectj[1],"value"))
		con.appendChild(inputBuilder("inputFelder","text","telefonInput",obectj[2],"value"))
		con.appendChild(inputBuilder("inputFelder","email","emailInput",obectj[3],"value"))
		con.appendChild(buttonBuilder("submit"))
		
		let submit =  document.getElementById("submit");	
		submit.addEventListener("click", ()=> {
			if(elementeEinlesen("überarbeitet") == false) {return}
			deleteObj(obectjO)
			deleteWrapperChilds()
			homePageBuilder();
			})
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
	}}

function objChange(){
	let objToChange = {};
	for (let i = 0; i < document.querySelectorAll("p.key").length; i++) {
	  let key = document.querySelectorAll("p.key")[i].textContent;
	  let value = document.querySelectorAll("p.value")[i].textContent;
	  objToChange[key] = value;
	  }
	if("telefon" in objToChange){
		objToChange.telefon = parseInt(objToChange.telefon);
	}
	
	
	return objToChange;
}


function deleteObj(a){
	a.telefon = parseInt(a.telefon);
	let index = db.findIndex(obj => {
	  for (let key in a) {
		if (obj[key] !== a[key]) {
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

