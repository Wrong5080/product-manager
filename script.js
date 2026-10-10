let productName = document.getElementById("productName");

let productPrice = document.getElementById("productPrice");

let productQuantity = document.getElementById("productQuantity");

let productList = document.getElementById("productList");

let saveBtn = document.getElementById("saveBtn");

let message = document.getElementById("message"); 

let products = [];

let editindex = null;

let savedProducts = localStorage.getItem("products");

if(savedProducts !== null){

    products = JSON.parse(savedProducts);

}

products = products.filter(product =>

    product &&

    typeof product === "object" &&

    product.name !== undefined &&

    product.price !== undefined &&

    product.quantity !== undefined

);

saveProducts();

function saveProducts() {

    localStorage.setItem("products", JSON.stringify(products));

}

function displayProducts() {

    productList.innerHTML = "";

    if (products.length === 0) {

        productList.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:14px; padding:20px;">No products in inventory.</p>`;

        return;

    }

    products.forEach(function(product, index){

        productList.innerHTML += `

        <div class="product-card">

        <div class="product-info">

        <h3>${product.name}</h3>

        <div class="product-tags">

        <span class="tag price">$${Number(product.price).toLocaleString()}</span>

        <span class="tag qty">Qty: ${product.quantity}</span>

        </div>

        </div>

        <div class="product-actions">

        <button class="btn-icon btn-edit" onclick="editProduct(${index})">Edit</button>

        <button class="btn-icon btn-delete" onclick="deleteProduct(${index})">Delete</button>

        </div>

        </div>

        `;

    });

}

function showMessage(text, color) {

    message.textContent = text;

    message.style.color = color;

    setTimeout(() => { message.textContent = ""; }, 3000);

}

saveBtn.addEventListener("click", function(){
    
    if(productName.value.trim() === "" || productPrice.value === "" || productQuantity.value === "") {

        showMessage("Please fill all fields", "var(--danger-color)");

        return;

    }

    let product = {

        name: productName.value,

        price: productPrice.value,

        quantity: productQuantity.value

    };

    if(editindex === null){

        products.push(product);

        showMessage("Product Added Successfully", "var(--success-color)");

    } else {

        products[editindex] = product;

        editindex = null;

        saveBtn.textContent = "Save Product";

        showMessage("Product Updated Successfully", "var(--success-color)");

    }

    saveProducts();

    displayProducts();

    productName.value = "";

    productPrice.value = "";

    productQuantity.value = "";

    productName.focus(); 

});

window.editProduct = function(index) {

    productName.value = products[index].name;

    productPrice.value = products[index].price;

    productQuantity.value = products[index].quantity;

    editindex = index;

    saveBtn.textContent = "Update Product";

    window.scrollTo({ top: 0, behavior: 'smooth' });

}

window.deleteProduct = function(index) {

    products.splice(index, 1);


    saveProducts();

    displayProducts();

    showMessage("Product Deleted Successfully", "var(--danger-color)");

}

displayProducts();