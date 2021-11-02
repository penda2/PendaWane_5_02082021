let divPanier = document.createElement('div');
divPanier.id = 'containerPanier'; 
document.body.appendChild(divPanier);

//--------------------Affichage des articles sélectionnés par l'utilisateur----------------
const panier = JSON.parse(localStorage.getItem('panier')) || []
let tableauId = [];
if (panier === null) {

}else {
	let articlesPanier = [];
	for (let i = 0; i < panier.length; i++) {
		tableauId.push(panier[i]._id) 
		articlesPanier = articlesPanier + 
		`<div class="blocArticlePanier">
		<div class="imgPanier">
		<img src="${panier[i].imageUrl}">
		</div>
		<div class="infoArticlePanier">
		<h2>${panier[i].name}</h2>
		<p>Prix : ${panier[i].price/100}€</p>
		<p>Quantité : ${panier[i].quantite}</p>
		<p>Sous-total : ${panier[i].quantite*panier[i].price/100}€</p>
		</div>
		<div class="supprimerArticle"><i class="fas fa-times"></i></div>
		</div>`
		divPanier.innerHTML = articlesPanier;
	}
}
//-----boucle for pour l'affichage du prix total------
let prixTotal = 0;
for (let i = 0; i < panier.length; i++){
	prixTotal += panier[i].price*panier[i].quantite
}
//-----------enregistrement du prix total dans le local storage--------
localStorage.setItem("prixTotal", JSON.stringify(prixTotal/100));

//---insersion du champ affichant le montant total du panier---------
const divTotalPanier = `<div class="totalPanier">
<p>Montant total : ${prixTotal /100}€</p>
</div>`
divPanier.insertAdjacentHTML('beforeend', divTotalPanier);
console.log(divTotalPanier.value);

//------le formulaire dans une fonction fléchée et son insertion pour l'afficher------------------------
const leFormulaire =() => {
	let corpsFormulaire = 
	`<div id="containerformulaire">
	<h2>Mes coordonnées :</h2>
	<form action="" method="POST" id="form4">
	<label for="nom">Nom :</label>
	<input type="text" name="nom" id="nom" required>
	<label for="prenom">Prénom :</label>
	<input type="text" name="prenom" id="prenom" required>
	<label for="adresse">Adresse :</label>
	<textarea name="adresse" id="adresse" required></textarea>
	<label for="ville">Ville :</label>
	<input type="text" name="ville" id="ville" required>
	<label for="email">E-mail :</label>
	<input type="email" name="email" id="email" required>
	<input type="submit" id="validerForm" value="Valider le formulaire">
	</form></div>`;
	divPanier.insertAdjacentHTML('afterend',corpsFormulaire);
}
leFormulaire();

//---------------suppression d'article du panier--------------------
let iconeSupprimer = document.querySelectorAll(".fa-times");
for (let i = 0; i < iconeSupprimer.length; i++){
	let suppression = iconeSupprimer[i]
	suppression.addEventListener('click', (e)=>{
		clickSupprimer = e.target
		clickSupprimer.parentElement.parentElement.remove()
	})
}
//---L'ecoute du btn de validation du formulaire à l'envoi -----
document.getElementById("form4").addEventListener("submit", (e)=>{
	e.preventDefault();
	alert('Le formulaire a bien été envoyé.');
	let contactUser = {
		firstName : document.querySelector("#nom").value,
		lastName : document.querySelector("#prenom").value,
		address : document.querySelector("#adresse").value,
		city : document.querySelector("#ville").value,
		email : document.querySelector("#email").value
	}
//---Controle du formulaire avant envoi dans le local storage------------------
	if (validerNom && validerPrenom && validerAdresse && validerVille && validerEmail) {
		localStorage.setItem("contactUser", JSON.stringify(contactUser));
	}else {
		alert('Les données saisies sont invalides')
	}
//----------- transformation de l'objet à envoyer en json ---------------
let postDuFormulaire = {
	contact : contactUser,
	products : tableauId
}
let promessePost = fetch('http://localhost:3000/api/teddies/order',{
	method : "POST",
	body : JSON.stringify(postDuFormulaire),
	headers : {
		"Content-Type" : "application/json"	}
	})
// -----------------gestion d'erreurs de réponse du serveur------------------
promessePost.then(async(response) => {
	try {
		let laReponse = await response.json();
		localStorage.setItem("laReponseId", laReponse.orderId);
		localStorage.removeItem("panier");
		window.location = "confirmation.html";
	} catch (e){
		console.log(e);
	}
});

});
// -----------------validation du champ nom avec regexp------------------
let nomUser = document.querySelector("#nom");
nomUser.addEventListener('change', function() {
	validerNom(this);
})
let validerNom = function(inputNom){
	let regexNom = new RegExp ('^[a-zA-Z\- ]+$');
	let testNom = regexNom.test(inputNom.value);
	if(testNom = null){
		alert("Le nom est invalide");
		return false;
	}else {
		return true;
	}
};
// -----------------validation du champ prénom avec regexp------------------
let prenomUser = document.querySelector("#prenom");
prenomUser.addEventListener('change', function() {
	validerPrenom(this);
})
let validerPrenom = function(inputPrenom){
	let regexPrenom = new RegExp ('^[a-zA-Z\- ]+$');
	let testPrenom = regexPrenom.test(inputPrenom.value);
	if(testPrenom == null){
		alert("Le prénom est invalide");
		return false;
	}else {
		return true;
	}
};
// -----------------validation du champ adresse avec regexp------------------
let adresseUser = document.querySelector("#adresse");
adresseUser.addEventListener('change', function() {
	validerAdresse(this);
})
let validerAdresse = function(inputAdresse){
	let regexAdresse = new RegExp ('^[0-9a-zA-Z\- ]+$');
	let testAdresse = regexAdresse.test(inputAdresse.value);
	if(testAdresse == null){
		alert("L'Adresse est invalide");
		return false;
	}else {
		return true;
	}
};
// -----------------validation du champ ville avec regexp------------------
let villeUser = document.querySelector("#ville");
villeUser.addEventListener('change', function() {
	validerVille(this);
})
let validerVille = function(inputVille){
	let regexVille = new RegExp ('^[a-zA-Z\- ]+$');
	let testVille = regexVille.test(inputVille.value);
	if(testVille == null){
		alert("La ville est invalide");
		return false;
	}else {
		return true;
	}
};
// -----------------validation du champ ville avec regexp------------------
let emailUser = document.querySelector("#email");
emailUser.addEventListener('change', function() {
	validerEmail(this);
})
let validerEmail = function(inputEmail){
	let regexEmail = new RegExp ('^[a-z0-9.]@[a-z0-9.]\.[a-z]$');
	let testEmail = regexEmail.test(inputEmail.value);
	if(testEmail == null){
		alert("L'adresse email est invalide");
		return false;
	}else {
		return true;
	}
};