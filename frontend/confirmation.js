/********************* AFFICHER LE NUMERO D'ORDRE ET LE TOTAL *********************/

/* Appeler les données de l'API du serveur */
// paramètres d'entrée: 
// paramètres de sortie: {liste caméras}
async function getTotalPrice() {
    let totalProductElement = document.getElementById("totalproduct");
    let orderNumberElement = document.getElementById("ordernumber");

    let totalProducts = JSON.parse(localStorage.getItem("totalProducts"));
    let orderNumber = JSON.parse(localStorage.getItem("orderId"));

    totalProductElement.textContent = totalProducts.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
    });;
    orderNumberElement.textContent = orderNumber;

    // suprimer les données dans le local storage
    localStorage.removeItem('productdetails');
    localStorage.removeItem('productpanel');
    localStorage.removeItem('totalProducts');
    localStorage.removeItem('orderId');


}
getTotalPrice();