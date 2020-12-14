var deleteState = 0;
var addState = 0
var nbCapteurs = 0 
var baseURL = 'javascript/fonctionBD.php'
var listCapteurs = '';
var isAdmin = 0;
/**
  * Fonction appelée au chargement de la page confirmant que l'utilisateur est administrateur
  */
function setAdminSession(){
	isAdmin = 1;
	console.log(isAdmin);
}
/**
  * Permet le rechargement et l'affichage de tous les capteurs depuis la base de données
  */
function loadCapteur() {
	if(addState != 2 && deleteState != 1){
		var capteurs = document.getElementById("capteurs");
		console.log(capteurs);
	    var imgs = capteurs.childNodes;
	    while(imgs.length != 0){
	        capteurs.removeChild(imgs[0]);
	    }
		console.log("Parsing info from : " + listCapteurs)
		var tableCapteurs = listCapteurs.split(";");
		for (var i = 0; i+5 < tableCapteurs.length; i+=5) {
			var nomCapteur = tableCapteurs[i+1];
			var posX = tableCapteurs[i+2];
			var posY = tableCapteurs[i+3];
			var state = parseInt(tableCapteurs[i+4]);
			addCapteur(nomCapteur, posX, posY, state);
		}
	}	
}

/**
  * Permet de passer en mode ajout
  */
function changeAddState() {
	var addButton = document.getElementById("addButton");
	var deleteButton = document.getElementById("deleteButton");
	if (addState == 0) {
		addState = 1;
		deleteButton.style.visibility = "hidden";
		addButton.src = "images/addON.png";
	} else {
		addState = 0;
		deleteButton.style.visibility = "visible";
		addButton.src = "images/addOFF.png";
	}
}

/*
 * Permet de passer en mode suppression
 */
function changeDeleteState(){
    var deleteButton = document.getElementById("deleteButton");
    var addButton = document.getElementById("addButton");
    if (deleteState == 0){
        deleteState = 1;
        addButton.style.visibility = "hidden";
        deleteButton.src = "images/deleteOn.png";

    } else {
        deleteState = 0;
        addButton.style.visibility = "visible";
        deleteButton.src = "images/deleteOff.png";
    }
}

/**
 * Fonction appelée au clic sur un capteur, en fonction des modes d'utilisation, l'ation sera différente :
 * Si le mode suppression est activé, cela supprime de la page et de la base de données le capteur
 * Sinon si le mode édition est désactivé, cela met à jour l'état du capteur sur la page et dans la base de données
 */
function actionCapteur(capteur) {
	console.log(deleteState);
	if (isAdmin){
		if (deleteState == 1){
			console.log("Supression....");
			capteur.parentNode.removeChild(capteur);
            deleteCapteur(capteur.id);
            console.log(capteur);
        } else if (addState == 0) {
			if	(capteur.src.endsWith("opened.png")) {
				capteur.src="images/closed.png"
				console.log("Changing state to opened")
				updateCapteur(capteur.id)
			} else {
				capteur.src="images/opened.png"
				console.log("Changing state to closed")
				updateCapteur(capteur.id)
			}
		}
	}
}

/**
 * Fonction ajoutant un capteur sur la page
 */
function addCapteur(nomCapteur,posx,posy,state) {
	console.log("Name : " + nomCapteur + ", Position : (" + posx + ", " + posy + "), State : " + state);
	console.log("Nombre de capteurs : " + nbCapteurs);
	
	var img = document.createElement("img")
	img.setAttribute("id", nomCapteur)
	img.setAttribute("height","20px")
	img.style.marginLeft = posx + "px"
	img.style.marginTop = posy + "px"
	img.setAttribute("onclick", "actionCapteur(" +  nomCapteur + ")")
	if (state == 0) {
		img.setAttribute("src", "images/opened.png")
	} else {
		img.setAttribute("src", "images/closed.png")
	}
	document.getElementById("capteurs").appendChild(img)
}

/**
 * Fonction listener attendant un clic souris. Si le mode ajout est activé. Il ajoute un capteur à la base de données et sur la page
 */
function posMouse(event) {
	if (addState == 2) {
		var tableCapteurs = listCapteurs.split(";");
		for (var i = 0; i < tableCapteurs.length; i+=5) {
		    var id = parseInt(tableCapteurs[i]);
		    nbCapteurs = (nbCapteurs < id ? id : nbCapteurs)
		}
		nbCapteurs = nbCapteurs + 1
		addCapteur("capteur" + nbCapteurs,event.clientX,event.clientY,0)
		createCapteur("capteur" + nbCapteurs,event.clientX,event.clientY)
	} else if (addState == 1) {
		addState = 2
	}
}

/** 
 * Fonction appelée pour mettre à jour un capteur dans la base de données
 */
function updateCapteur(nomCapteur) {
	jQuery.ajax({
		type: "POST",
		url: baseURL,
		data: {functionname: 'updateCapteur', id: nomCapteur},
	});
}

/** 
 * Fonction appelée pour récupérer la liste des capteurs dans la base de données
 */
function getCapteurs() {
	console.log("Récuperation des capteurs");
	jQuery.ajax({
		type: "POST",
		url: baseURL,
		data: {functionname: 'getCapteurs'},

		success: function(capteurs) {
					callback(capteurs);
				}
	});
}

/** 
 * Fonction appelée pour créer un capteur dans la base de données
 */
function createCapteur(nomCapteur, posX, posY) {
	jQuery.ajax({
		type: "POST",
		url: baseURL,
		data: {functionname: 'createCapteur', name: nomCapteur, positionX: posX, positionY: posY},
	}
	);
	console.log(listCapteurs);
}

/** 
 * Fonction appelée pour supprimer un capteur dans la base de données
 */
function deleteCapteur(nomCapteur){
    jQuery.ajax({
        type: "POST",
        url: baseURL,
        data: {functionname: 'deleteCapteur', id: nomCapteur},
    });
}

/** 
 * Fonction de retour de la récupération des capteurs dans la base de données
 */
function callback(capteurs){
	listCapteurs = capteurs;
	loadCapteur();
}

document.addEventListener('click', posMouse)
getCapteurs();

