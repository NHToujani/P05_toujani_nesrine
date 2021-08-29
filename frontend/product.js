function getUrlParametre(sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
async function getDetailProduct() {

  let idProduct = getUrlParametre("id");
  const requestURL = 'http://localhost:3000/api/cameras';
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    let cameras = request.response;

    console.log(cameras);
    showCameras(cameras);
  }

  function showCameras(jsonObj) {
    const elt = document.getElementById("product");
    let listCameras = jsonObj;
    let camera = listCameras.find(x => x._id === idProduct);
    console.log(camera);

    window.localStorage.setItem("productdetails", JSON.stringify(camera));

    const ajouterPanier = "Ajouter au panier";

    let myContainer = document.createElement('article');
    myContainer.setAttribute("class", "row col-12");

    let myImageContainer = document.createElement('div');
    myImageContainer.setAttribute("class", "cover col-lg-6");
    let myCamera = document.createElement('img');
    myCamera.classList.add("w-100");


    let myDetailContainer = document.createElement('div');
    myDetailContainer.setAttribute("class", "col-lg-6");
    let myTitle = document.createElement('h5');
    myTitle.classList.add("card-title");
    let myDescription = document.createElement('p');
    myDescription.classList.add("card-text");
    let myPrice = document.createElement('p');
    myPrice.classList.add("card-price");
    let myLensesContainer = document.createElement('p');
    let myLenses = document.createElement('select');
    myLenses.setAttribute("id", "selectlense");
    myLenses.setAttribute("class", "form-select lenses");
    myLenses.setAttribute("aria-label", "Default select");
    let listlenses = camera.lenses;
    for (let i = 0; i < listlenses.length; i++) {
      if (i == 0) {

        let firstlense = document.createElement('option');
        firstlense.setAttribute("selected", "selected");
        firstlense.textContent = 'Open this select menu';
        myLenses.appendChild(firstlense)

      }

      let lense = document.createElement('option');
      lense.textContent = listlenses[i];
      console.log(lense);
      myLenses.appendChild(lense);
    }
    myLensesContainer.appendChild(myLenses);

    let myButton = document.createElement('button');
    myButton.setAttribute("class", "btn ajouterPanier");
    myButton.setAttribute("onclick", "addtopanel()");

    myCamera.setAttribute("src", camera.imageUrl);
    myCamera.setAttribute("id", camera._id);
    myTitle.textContent = camera.name;
    myDescription.textContent = camera.description;
    myPrice.textContent = camera.price;
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
  }

}


getDetailProduct();

function addlenses() {

  console.log("here i am ")
  let product = JSON.parse(window.localStorage.getItem("productdetails"));
  product.lenses = [];
  let selectedlenses= document.getElementById("selectlense"); 
  let selectedlense =selectedlenses.options[selectedlenses.selectedIndex].value;
  console.log(selectedlense);
  product.lenses[0] = selectedlense;
  product.quantity= 1;
  let panelproduct=[];
  if(JSON.parse(window.localStorage.getItem("productpanel") !== null))
  {
    console.log(JSON.parse(window.localStorage.getItem("productpanel")));
    panelproduct= JSON.parse(window.localStorage.getItem("productpanel"));
  };
  panelproduct.push(product);

  window.localStorage.setItem("productpanel", JSON.stringify(panelproduct));

}
async function addtopanel() {
  addlenses();

}
