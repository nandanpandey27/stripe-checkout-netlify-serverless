export async function loadProducts() {
  const data = await fetch("/.netlify/functions/products")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });

  const products = document.querySelector(".products");

  data.forEach((item) => {
    const product = createProductFromTemplate(item);
    products.appendChild(product);
  });
}

function createProductFromTemplate(item) {
  const template = document.querySelector("#product");
  const product = template.content.cloneNode(true);

  product.querySelector("h2").innerText = item.name;
  product.querySelector(".description").innerText = item.description;
  product.querySelector("[name='sku']").innerText = item.sku;
  product.querySelector(".price").innerText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.currency,
  }).format((item.amount / 100).toFixed(2));

  const img = product.querySelector("img");
  img.src = item.image;
  img.alt = item.name;

  return product;
}
