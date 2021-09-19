/********************* AFFICHER DES PRODUITS DANS LE PANIER *********************/


/* Accéder au Local Storage et parser la valeur de 'productPanel' */
async function getPanelElements() {
    let panel = JSON.parse(localStorage.getItem("productpanel"));
    let panelContainer = document.getElementById("panellist");
    let TotalPanel = document.getElementById("totalpanel");
    if (panel != null) {


        let totalProducts = 0;
        for (let i = 0; i < Object.keys(panel).length; i++) {
            let myDetailContainer = document.createElement("tr");
            let productImage = document.createElement("td");
            let productImageUrl = document.createElement("img");
            productImageUrl.classList.add("picture-100");
            let productName = document.createElement("td");
            let productQuantity = document.createElement("td");
            let productPrice = document.createElement("td");
            let productTotal = document.createElement("td");
            let deleteProduct = document.createElement("td");

            const productDetail = panel[Object.keys(panel)[i]];
            const deleteElementMethod = "deletePanelElement('" + productDetail._id + "')";

            let deleteButton = '<a href="" onclick=' + deleteElementMethod + '><i class="fas fa-trash-alt"></i>';


            productImageUrl.setAttribute("src", productDetail.imageUrl);
            productImageUrl.setAttribute("id", productDetail._id);
            productImage.appendChild(productImageUrl);
            productName.textContent = productDetail.name;
            productQuantity.textContent = productDetail.quantity;
            deleteProduct.innerHTML = deleteButton;

            // PRICE

            productPrice.textContent = (productDetail.price / 100).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
            });
            let ProductTotalValue = productDetail.price * productDetail.quantity;
            productTotal.textContent = (ProductTotalValue / 100).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
            });
            myDetailContainer.appendChild(productImage);
            myDetailContainer.appendChild(productName);
            myDetailContainer.appendChild(productQuantity);
            myDetailContainer.appendChild(productPrice);
            myDetailContainer.appendChild(productTotal);
            myDetailContainer.appendChild(deleteProduct);
            panelContainer.appendChild(myDetailContainer);
            totalProducts += ProductTotalValue;
        }

        TotalPanel.textContent = (totalProducts / 100).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        });
        window.localStorage.setItem("totalProducts", JSON.stringify(totalProducts));
    } else {
        panelContainer.innerHTML = '';
        TotalPanel.textContent = '';
    }
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

// supprimer un element dans le panier
async function deletePanelElement(idElement) {
    let panel = JSON.parse(localStorage.getItem("productpanel"));
    delete panel[idElement];
    window.localStorage.setItem("productpanel", JSON.stringify(panel));

    // vider le local storage aprés la suppresion du dernier element dans le panier
    if (Object.values(panel).length == 0) {
        window.localStorage.removeItem("productpanel");
        window.localStorage.removeItem("totalProducts");
    }
    document.location.reload();

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
    let productsId = [];
    for (let i = 0; i < Object.keys(productPanel).length; i++) {
        productsId.push(Object.values(productPanel)[i]._id)
    }

    console.log(productsId);
    console.log(contactInput);


    // Envoyer "contact" et "products" au serveur 
    fetch(`http://localhost:3000/api/cameras/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                contact: contactInput,
                products: productsId
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let idOrder = data.orderId;
            // Ajouter les données dans le localStorage
            window.localStorage.setItem("orderId", JSON.stringify(idOrder));

            window.location.href = "../html/confirmation.html";
        })
        .catch((error) => {
            alert(`Il y a eu une erreur : ` + error)
        });
}