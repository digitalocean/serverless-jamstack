//start of get request to retrieve available coffees

const getInventory = async () => {
  let results = await axios.get('/api/cloud/getCoffee');
results.data.forEach(item => {
  let pic = item.pic;
  let name = item.name;
  let description = item.description;
  let price = item.price;

  let table = document.getElementById("product-table");
  let newRow = table.insertRow(-1);
  let picCell = newRow.insertCell();
  let nameCell = newRow.insertCell();
  let priceCell = newRow.insertCell();
  
  let picLink = document.createElement("img");
  picLink.src = pic; 
  picLink.classList.add("product-image");

  let nameText = document.createElement("h2");
  nameText.innerHTML = name;

  let descriptionText = document.createTextNode(description);
  let priceText = document.createElement("h3");
  priceText.innerHTML = "$" + price;

  let addToCart = document.createElement("button");
  addToCart.classList.add("addToCart");
  addToCart.innerHTML = "Add to cart"
  addToCart.name = name;
  addToCart.value = price;

  picCell.appendChild(picLink);
  nameCell.appendChild(nameText);
  nameCell.appendChild(descriptionText);
  nameCell.appendChild(priceText);
  priceCell.appendChild(addToCart);

  let cartButtons = document.querySelectorAll(".addToCart");

  cartButtons.forEach(item => {
  item.addEventListener('click', cartHandler)
  })

})
}
getInventory();

// start of shopping cart handler
let order = [];
const cartHandler = function() {
  let addItem = {"name" : this.name, "price" : this.value};
  let currentQuantity = parseInt(document.getElementById("order-quantity").innerHTML);
  let updatedQuantity = currentQuantity + 1;
  document.getElementById("order-quantity").innerHTML = updatedQuantity;
  console.log(updatedQuantity);
  order.push(addItem);
  let stringOrder = JSON.stringify(order);
  localStorage.setItem("order", stringOrder);

  let total = Number(localStorage.getItem("total"));
  if (total) {
    let itemValue = Number(this.value)
    let newTotal = itemValue + total;
    localStorage.setItem("total", newTotal);
  } else {
    localStorage.setItem("total", this.value);
  }
}

// start of email subscription handler
let subscribeButton = document.getElementById("subscribe");
const subscribeHandler = async function() {
  let email = document.getElementById("email").value
  let emailUrl = "/api/cloud/postEmail" + "?email=" + email;
  await axios.post(emailUrl);
  localStorage.setItem("subscribe", email);
  document.getElementById("email").value = '';

  let emailForm = document.getElementById("email-form");
  const message = "You have been successfully added to our email list."
  const successMessage = document.createTextNode(message);
  emailForm.appendChild(successMessage);
}
subscribeButton.addEventListener('click', subscribeHandler);

// start of shopping cart modal handler 

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

const container = document.getElementById("testModal");
const modal = new bootstrap.Modal(container);

document.getElementById("btnShow").addEventListener("click", function () {
  modal.show();
  $('#modal-table tr:not(:first)').remove();
  let orderData = JSON.parse(localStorage.getItem("order"));
  let table = document.getElementById("modal-table");

  orderData.forEach(item => {
  let name = item.name;
  let price = item.price;

  let newRow = table.insertRow(-1);
  let nameCell = newRow.insertCell();
  let priceCell = newRow.insertCell();

  let nameText = document.createElement("p");
  nameText.innerHTML = name;

  let priceText = document.createElement("p");
  priceText.innerHTML = "$" + price;

  nameCell.appendChild(nameText);
  priceCell.appendChild(priceText);
  })
  
  let grandTotal = localStorage.getItem("total");
  let newRow = table.insertRow(-1);
  let totalCell = newRow.insertCell();
  let grandTotalCell = newRow.insertCell();

  let totalText = document.createElement("h3");
  console.log(totalText); 
  totalText.innerHTML = "Grand total: "
  let grandTotalText = document.createElement("h3");
  grandTotalText.innerHTML = "$" + grandTotal;

  totalCell.appendChild(totalText);
  grandTotalCell.appendChild(grandTotalText);

});