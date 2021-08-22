function getUrlParametre (sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
async function getDetailProduct() {
 
    let idProduct=getUrlParametre("id");
    const requestURL = 'http://localhost:3000/api/cameras';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        let cameras = request.response;
        console.log(cameras);
        showCameras(cameras);
      }

      function showCameras (jsonObj) {
        const elt = document.getElementById("product");
        let listCameras = jsonObj;
        let camera = listCameras.find(x => x._id === idProduct);
        console.log(camera);
        const ajouterPanier = "Ajouter au panier";
      
          let myContainer = document.createElement('div');
          myContainer.setAttribute("class","card col-lg-4");
          let myProductLink = document.createElement('a');
          myProductLink.setAttribute("class","productLink");
          let myCamera = document.createElement('img');
          myCamera.classList.add("w-100");
          let myTitle = document.createElement('h5');
          myTitle.classList.add("card-title");
          let myDescription = document.createElement('p');
          myDescription.classList.add("card-text");
          let myPrice = document.createElement('p');
          myPrice.classList.add("card-price");
          let myLenses = document.createElement('p');
          myLenses.setAttribute("class","card-text lences");
          let myButton= document.createElement('button');
          myButton.setAttribute("class","btn ajouterPanier");
            
          myCamera.setAttribute("src", camera.imageUrl );
          myCamera.setAttribute("id", camera._id );
          myTitle.textContent = camera.name;
          myDescription.textContent = camera.description;
          myPrice.textContent = camera.price;
          myLenses.textContent = camera.lenses;
          myButton.textContent = ajouterPanier;
      

      
        myProductLink.appendChild(myTitle);
        myProductLink.appendChild(myCamera);
        myProductLink.appendChild(myDescription);
        myProductLink.appendChild(myPrice);
        myProductLink.appendChild(myLenses);
        myProductLink.appendChild(myButton);

        myContainer.appendChild(myProductLink);
      
        elt.appendChild(myContainer);
      }
    
} 

getDetailProduct(); 
