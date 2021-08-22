async function getcameras() {
  console.log("enter function");
  const url = new URL("http://localhost:3000/api/cameras");
  let data = fetch(url)
      .then((response) => response.json())
      .then((data) => {
          const cameras = data;
          console.log(data);
          const elt = document.getElementById("list-cameras");
          cameras.forEach((camera) => {
              elt.innerHTML +=
                  "<div class='card col-lg-4'>" +
                  "<div class='card-body'>" +
                  "<img src='"+ 
                      camera.imageUrl+
                  "' class='w-100'>"+                      
                  "<h5 class='card-title'>" +
                      camera.name +
                  "</h5>" +
                  "<i >" +
                  "</i>" +
                  "<p class='card-price price'>" +
                      camera.price +
                  "</p>"+
                  "<p class='card-text description'>" +
                      camera.description +
                  "</p>"+
                  "<p class='card-text lenses'>" +
                      camera.lenses +
                  "</p>"+
                  
                  "</div></div>";


          });
      });
}
// getcameras();

async function getListCameras() {
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
        const elt = document.getElementById("list-cameras");
        let listCameras = jsonObj;
      
        for (let i = 0; i < listCameras.length; i++) {
          let myContainer = document.createElement('div');
          myContainer.setAttribute("class","card col-lg-4");
          let myProductLink = document.createElement('a');
          myProductLink.setAttribute("class","productLink");
          myProductLink.setAttribute("href","product.html?id="+listCameras[i]._id );
          let myCamera = document.createElement('img');
          myCamera.classList.add("w-100");
          let myTitle = document.createElement('h5');
          myTitle.classList.add("card-title");
          let myDescription = document.createElement('p');
          myDescription.classList.add("card-text");
          let myPrice = document.createElement('p');
          myPrice.classList.add("card-price");
            
          myCamera.setAttribute("src", listCameras[i].imageUrl );
          myCamera.setAttribute("id", listCameras[i]._id );
          myTitle.textContent = listCameras[i].name;
          myDescription.textContent = listCameras[i].description;
          myPrice.textContent = listCameras[i].price;

      
        myProductLink.appendChild(myTitle);
        myProductLink.appendChild(myCamera);
        myProductLink.appendChild(myDescription);
        myProductLink.appendChild(myPrice);

        myContainer.appendChild(myProductLink);
      
        elt.appendChild(myContainer);
        }
      }
    
} 
getListCameras(); 