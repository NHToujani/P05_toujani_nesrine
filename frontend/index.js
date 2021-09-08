/********************* AFFICHER TOUS LES PRODUITS *********************/

/* Appeler les données de l'API du serveur */
// paramètres d'entrée: 
// paramètres de sortie: {liste caméras}
async function getListCameras() {

  const requestURL = 'http://localhost:3000/api/cameras';

  fetch(requestURL, {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {

      let cameras = data;
      showCameras(cameras)
    })
    .catch((error) => {
      alert(`Il y a eu une erreur : ` + error)
    });

  function showCameras(jsonObj) {
    const elt = document.getElementById("list-cameras");
    let listCameras = jsonObj;

    /* Créer des cartes produits */
    for (let i = 0; i < listCameras.length; i++) {
      let myContainer = document.createElement('div');
      myContainer.setAttribute("class", "card shadow p-0 mb-3 col-lg-4");
      let myProductLink = document.createElement('a');
      myProductLink.setAttribute("class", "productLink");
      myProductLink.setAttribute("href", "product.html?id=" + listCameras[i]._id);
      let myCamera = document.createElement('img');
      myCamera.classList.add("w-100");
      let myCardBody = document.createElement('div');
      myCardBody.classList.add("card-body")
      let myTitle = document.createElement('h5');
      myTitle.classList.add("card-title");
      let myPrice = document.createElement('p');
      myPrice.classList.add("card-price");

      myCamera.setAttribute("src", listCameras[i].imageUrl);
      myCamera.setAttribute("id", listCameras[i]._id);
      myTitle.textContent = listCameras[i].name;
      myPrice.textContent = listCameras[i].price.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });
      myCardBody.appendChild(myTitle);
      myCardBody.appendChild(myPrice);
      myProductLink.appendChild(myCamera);
      myProductLink.appendChild(myCardBody);



      myContainer.appendChild(myProductLink);

      elt.appendChild(myContainer);
    }
  }

}
getListCameras();