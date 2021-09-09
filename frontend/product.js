/*  */
function getUrlParametre(sVar) {
  return unescape(
    window.location.search.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
        escape(sVar).replace(/[\.\+\*]/g, "\\$&") +
        "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
}
/* Récupérer les détails d'un produit */
/* paramètre d'entrée: id produit*/
/* paramètre sortie: détail produit: caméras*/

let idProduct = getUrlParametre("id");
const requestURL = `http://localhost:3000/api/cameras/${idProduct}`;
fetch(requestURL, {
  method: 'GET'
})
  .then((response) => response.json())
  .then((data) => {

    let cameras = data;
    console.log(cameras);
    showCameras(cameras)
  })
  .catch((error) => {
    alert(`Il y a eu une erreur : ` + error)
  });

function showCameras(camera) {
  const elt = document.getElementById("product");

  window.localStorage.setItem("productdetails", JSON.stringify(camera));

  const ajouterPanier = "Ajouter au panier";

  let myContainer = document.createElement("article");
  myContainer.setAttribute("class", "row pl-5 col-12");

  let myImageContainer = document.createElement("div");
  myImageContainer.setAttribute("class", "cover col-lg-6");
  let myCamera = document.createElement("img");
  myCamera.classList.add("w-100");

  let myDetailContainer = document.createElement("div");
  myDetailContainer.setAttribute("class", "col-lg-6");
  let myTitle = document.createElement("h5");
  myTitle.classList.add("card-title");
  let myDescription = document.createElement("p");
  myDescription.classList.add("card-text");
  let myPrice = document.createElement("p");
  myPrice.classList.add("card-price");
  let myLensesContainer = document.createElement("p");
  let myLenses = document.createElement("select");
  myLenses.setAttribute("id", "selectlense");
  myLenses.setAttribute("class", "form-select lenses");
  myLenses.setAttribute("aria-label", "Default select");
  let listlenses = camera.lenses;
  for (let i = 0; i < listlenses.length; i++) {
    if (i == 0) {
      let firstlense = document.createElement("option");
      firstlense.setAttribute("selected", "selected");
      firstlense.textContent = "Choose lenses";
      myLenses.appendChild(firstlense);
    };

    let lense = document.createElement("option");
    lense.textContent = listlenses[i];
    console.log(lense);
    myLenses.appendChild(lense);
  };
  myLensesContainer.appendChild(myLenses);

  let myButton = document.createElement("button");
  myButton.setAttribute("class", "btn ajouterPanier");
  myButton.setAttribute("onclick", "addtopanel()");

  myCamera.setAttribute("src", camera.imageUrl);
  myCamera.setAttribute("id", camera._id);
  myTitle.textContent = camera.name;
  myDescription.textContent = camera.description;
  myPrice.textContent = camera.price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  myButton.textContent = ajouterPanier;

  myImageContainer.appendChild(myCamera);

  myDetailContainer.appendChild(myTitle);
  myDetailContainer.appendChild(myDescription);
  myDetailContainer.appendChild(myPrice);

  myDetailContainer.appendChild(myLensesContainer);
  myDetailContainer.appendChild(myButton);

  myContainer.appendChild(myImageContainer);
  myContainer.appendChild(myDetailContainer);

  elt.appendChild(myContainer);
};


getDetailProduct();

function addlenses() {
  let product = JSON.parse(window.localStorage.getItem("productdetails"));
  product.lenses = [];
  let selectedlenses = document.getElementById("selectlense");
  let selectedlense =
    selectedlenses.options[selectedlenses.selectedIndex].value;
  console.log(selectedlense);
  // product.lenses[0] = selectedlense;
  product.quantity = 1;
  let panelProduct = {};
  if (JSON.parse(window.localStorage.getItem("productpanel") !== null)) {
    console.log(JSON.parse(window.localStorage.getItem("productpanel")));
    panelProduct = JSON.parse(window.localStorage.getItem("productpanel"));
  }

  if (typeof panelProduct[product._id] !== "undefined") {
    panelProduct[product._id].quantity += 1;
  } else {
    panelProduct[product._id] = product;
  }

  window.localStorage.setItem("productpanel", JSON.stringify(panelProduct));
}
async function addtopanel() {
  addlenses();
  alert("Votre produit est ajouté dans le panier");
}
