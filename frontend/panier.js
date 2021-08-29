async function getpanelelements() {

  let panel = JSON.parse(localStorage.getItem("productpanel"));
  let panelcontainer = document.getElementById("panellist");
  let TotalPanel = document.getElementById("totalpanel");

  let totalproducts = 0;
  for (let i = 0; i < panel.length; i++) {

    let myDetailContainer = document.createElement('tr');
    let productName = document.createElement('td');
    let productQuantity = document.createElement('td');
    let productnPrice = document.createElement('td');
    let productTotal = document.createElement('td');
    

    productName.textContent = panel[i].name;
    productQuantity.textContent = panel[i].quantity;
    productnPrice.textContent = panel[i].price;
    let ProductTotalValue = (panel[i].price) * (panel[i].quantity);
    productTotal.textContent = ProductTotalValue;

    myDetailContainer.appendChild(productName);
    myDetailContainer.appendChild(productQuantity);
    myDetailContainer.appendChild(productnPrice);
    myDetailContainer.appendChild(productTotal);
    panelcontainer.appendChild(myDetailContainer);
    totalproducts +=ProductTotalValue;
    
  }

  TotalPanel.textContent = totalproducts;








}