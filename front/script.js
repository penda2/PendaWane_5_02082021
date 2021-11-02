//---------------création de la structure html de la page---------------
let div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

//----structure html dans le container principal contenant les éléments récupérés via fetch -----
function listeTableau (data){
	let blocPrincipal = document.getElementById('container')
	for (let i = 0; i < data.length; i++) {
		let blocFigure = 
				`<a href="produit.html?id=${data[i]._id}">
					<figure>
						<img src="${data[i].imageUrl}">
						<figcaption>
							<p>Nom: ${data[i].name}</p>
							<span>Prix: ${data[i].price/100}€<span>
						</figcaption>
					</figure>
				</a>`
		blocPrincipal.innerHTML += blocFigure
	}
}
//------------appel à l'API avec fetch -----
function siteOurs (){
	fetch('http://localhost:3000/api/teddies/')
	.then(function(res){
		if (res.ok) {
			return res.json();
		}
	})
	.then(function(teddies){
		listeTableau(teddies)
	})
}
siteOurs();
