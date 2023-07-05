const socket = io();

const button = document.getElementById('prod-button')

socket.on("products-list", data => {
  const ul = document.getElementById("product-list");

  let products = "";
  data.forEach((product) => {
    products += `<li>
            <h2>${product.title}</h2>
            <img src="${product.thumbnails}" alt="${product.title}">
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        </li>`;
  });
  ul.innerHTML = products;
});

const title = document.getElementById('title')

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', async (evt) => {
    window.location.replace('/logout')
})

