/********************* AFFICHER TOUS LES PRODUITS *********************/

/* Appeler les données de l'API du serveur */
// paramètres d'entrée: 
// paramètres de sortie: {liste caméras}
async function getTotalPrice() {
  let totalProductElement = document.getElementById("totalproduct");
  let orderNumberElement = document.getElementById("ordernumber");

    let totalProducts= JSON.parse(localStorage.getItem("totalProducts"));
    let orderNumber =Math.floor(Math.random()*1000000);

    totalProductElement.textContent = totalProducts;
    orderNumberElement.textContent = orderNumber;

    // suprimer les données dans le local storage
    localStorage.removeItem('productdetails');
    localStorage.removeItem('productpanel'); 
    localStorage.removeItem('totalProducts');


} 
getTotalPrice(); 
  
