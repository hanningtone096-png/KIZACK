import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ADD PRODUCT
async function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    await addDoc(collection(db, "products"), {
        name,
        price,
        image
    });

    loadProducts();
}

// LOAD PRODUCTS
async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = document.getElementById("product-list");

    list.innerHTML = "";

    querySnapshot.forEach((docItem) => {
        const p = docItem.data();

        list.innerHTML += `
            <div>
                <img src="${p.image}" width="100">
                <h4>${p.name}</h4>
                <p>KSh ${p.price}</p>
                <button onclick="deleteProduct('${docItem.id}')">Delete</button>
            </div>
        `;
    });
}

// DELETE PRODUCT
async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
}

// Make functions usable in HTML
window.addProduct = addProduct;
window.deleteProduct = deleteProduct;

// Load on start
loadProducts();