//---------------création de la structure html de la page---------------
let divConfirmation = document.createElement('div');
divConfirmation.id = 'containerConfirmation'; 
document.body.appendChild(divConfirmation);

//---------------récupération l'id renvoyé par le serveur enregistré dans le local storage ---------
const laReponseId = localStorage.getItem("laReponseId");

//---------------récupération du prix total enregistré dans le local storage ---------
const prixTotal = localStorage.getItem("prixTotal");

//------------création et insertion du contenu html dans le container principal-----
const textConfirm =() => {
	let corpsConfirm = 
	`<div id="containerTextConfirm">
	<h3>Commande confirmée !</h3>
	<p>Nous vous remercions de votre commande.</p>
	<p>Votre numéro de commande : <strong>${laReponseId}</strong></p>
	<p>Montant total de votre commande : <strong>${prixTotal}€</strong></p>
	<a href="index.html"><button class="btn_accueil">Retour à l'accueil</button></a>
	</div>`;
divConfirmation.insertAdjacentHTML('afterbegin',corpsConfirm);
}
textConfirm();