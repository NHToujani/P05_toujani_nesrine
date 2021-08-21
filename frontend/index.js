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
getcameras();