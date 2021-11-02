	//---recherche de l'id dans la réponse de la requête -----------
	const urlSearch = window.location.search
	const searchParams = new URLSearchParams (urlSearch)
	const id = searchParams.get("id")
//-------------ciblage de l'id sélectionné et son contenu et affichage sur la page produit----
	let url = `http://localhost:3000/api/teddies/${id}`;
	fetch(url)
	.then((response) =>	response.json().then((data) => {
		document.getElementById('container2').innerHTML = `<div id="produit"><img src="${data.imageUrl}"></div>`;
		document.getElementById('produit').insertAdjacentHTML('afterend',`<div id="details"><form id= form></form></div>`);
		document.getElementById('form').insertAdjacentHTML('afterbegin',`<h2 id="nom">${data.name}</h2>`);
		document.getElementById('nom').insertAdjacentHTML('afterend',`<p class= "description">Description: ${data.description}</p>`)
		document.getElementById('form').insertAdjacentHTML('beforeend',`<p class= "prix">Prix: ${data.price/100}€</p>`);
		document.getElementById('form').insertAdjacentHTML('beforeend',`<label for="articles"> Nombre d'articles:</label>
			<input type="number" name="articles" value=" " id="quantite" placeholder="0">
			<input type="submit" value="Ajouter au panier" class="btn_ajouter">`);
		document.querySelector('.prix').insertAdjacentHTML('afterend',`<label for="couleur">Couleur: </label>
			<select name="couleur" id="couleur"></select>`);
//---------Choix et sélection des couleurs dans une boucle for-----------------------------------------
		let selectCouleur = document.getElementById('couleur');
		const couleurs = data.colors;
		let lesCouleurs = [];
		for (let i = 0; i < couleurs.length; i++) {
			lesCouleurs+=`<option value="${i}">${couleurs[i]}</option>`
			selectCouleur.innerHTML = lesCouleurs;
		}
//----------ajout du produit au panier-----------------------------------------------------------
		const btnAjouter = document.querySelector('.btn_ajouter');
		btnAjouter.addEventListener("click", (e) => {
			e.preventDefault();
			let produit = data;
			const panier = JSON.parse(localStorage.getItem('panier')) || []
			const articleTrouve = panier.find(e => e._id === produit._id)

			if (articleTrouve) {
				articleTrouve.quantite += parseInt(document.getElementById('quantite').value)
			} else {
				produit.quantite = parseInt(document.getElementById('quantite').value)
				panier.push(produit)
			}
			localStorage.setItem('panier', JSON.stringify(panier))
		}) 
	})
	);



