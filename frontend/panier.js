/********************* AFFICHER DES PRODUITS DANS LE PANIER *********************/


/* Accéder au Local Storage et parser la valeur de 'productPanel' */
async function getPanelElements() {
    let panel = JSON.parse(localStorage.getItem("productpanel"));
    let panelContainer = document.getElementById("panellist");
    let TotalPanel = document.getElementById("totalpanel");

    let totalProducts = 0;
    for (let i = 0; i < Object.keys(panel).length; i++) {
        let myDetailContainer = document.createElement("tr");
        let productName = document.createElement("td");
        let productQuantity = document.createElement("td");
        let productPrice = document.createElement("td");
        let productTotal = document.createElement("td");

        const productDetail = panel[Object.keys(panel)[i]];

        productName.textContent = productDetail.name;
        productQuantity.textContent = productDetail.quantity;

        // PRICE

        productPrice.textContent = productDetail.price.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        });
        let ProductTotalValue = productDetail.price * productDetail.quantity;
        productTotal.textContent = ProductTotalValue.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        });

        myDetailContainer.appendChild(productName);
        myDetailContainer.appendChild(productQuantity);
        myDetailContainer.appendChild(productPrice);
        myDetailContainer.appendChild(productTotal);
        panelContainer.appendChild(myDetailContainer);
        totalProducts += ProductTotalValue;
    }

    TotalPanel.textContent = totalProducts.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
    });
    window.localStorage.setItem("totalProducts", JSON.stringify(totalProducts));
}

const orderButton = document.getElementById('formulaire');
orderButton.addEventListener('submit', (event) => {
    event.preventDefault();
    validateFormInput();
})


/* Tester les saisies à l'aide de RegExp */

// Création d'expressions régulières
const nameRegExp = /^[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ .'-]*$/
const addressRegExp = /[0-9a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-/]*$/
const cityRegExp = /^[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ'-]*$/
const emailRegExp = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/

function validateFormInput() {
    // Si une saisie incorrecte est trouvée, afficher un message d'alerte
    if (nameRegExp.test(document.getElementById('firstName').value) !== true ||
        nameRegExp.test(document.getElementById('lastName').value) !== true ||
        addressRegExp.test(document.getElementById('address').value) !== true ||
        cityRegExp.test(document.getElementById('city').value) !== true ||
        emailRegExp.test(document.getElementById('email').value) !== true) {
        alert(`Pardon ! Nous n'avons pas pu traiter votre commande en raison d'une saisie incorrecte du formulaire. Veuillez vérifier vos saisies et réessayer !`)
    }
    // Si tout est valide, exécuter la fonction sendOrderToServer
    else {
        sendOrderToServer();
        //window.location.replace("confirmation.html");
    }


}

/* Envoyer la commande au serveur */
function sendOrderToServer() {

    //Créer un objet "contact" 
    let contactInput = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }
    let productPanel = JSON.parse(localStorage.getItem('productpanel'));
    console.log(productPanel);
    console.log(Object.keys(productPanel).length);
    // Créer un array "products" 
    let productId = [];
    for (let i = 0; i < Object.keys(productPanel).length; i++) {
        productId.push(Object.values(productPanel)[i]._id)
    }

    console.log(productId);
    console.log(contactInput);


    // Envoyer "contact" et "products" au serveur 
    fetch(`http://localhost:3000/api/cameras/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                contact: contactInput,
                products: productId
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let idOrder = data.orderId;
            window.localStorage.setItem("orderId", JSON.stringify(idOrder));

            window.location.href = "./confirmation.html";
        })
        .catch((error) => {
            alert(`Il y a eu une erreur : ` + error)
        });
}