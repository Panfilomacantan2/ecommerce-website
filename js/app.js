///custom selector
const $ = (selector) => {
  if (selector) return document.querySelector(selector);
  throw new Error("Selector does not exist");
};

//fetching the data from the api
const storeData = async () => {
  const productDetails = await axios.get("https://fakestoreapi.com/products");
  const productData = await productDetails.data;

  productData.forEach(async (product, index) => {
    const {
      id,
      description,
      image,
      category,
      price,
      rating: { count, rate },
      title,
    } = productData[index];

    // console.log(productData[index]);

    const productContainer = $(".product_container");
    productContainer.innerHTML += `
                    <div class="product_item">
                        <div class="product_image">
                            <img src="${image}" alt="${title}"/>
                        </div>
                            <div class="product_info">
                                 <h2>${title}</h2>
                                 <div class="product_rate">
                                 
                                 <span class="rating"> ${rate}<img src="https://www.pinclipart.com/picdir/big/72-727540_bubble-world-black-sugar-pearl-latte-3-5-stars.png"></span>
                                 <span class="sold">Sold:${count}</span>
                                 </div>
                                 <p><span class="product_actual_price">$100</span>
                                  <span class="product_original_price"><span>$200</span></p>
                                 <button class="product_btn" onclick="addToCart(${
                                   index + 1
                                 })">Add to Cart</button>
                           </div>
                     </div>`;
  });
};
storeData(); //invoke the function

const searchProduct = async (productId = 3) => {
  const productDetails = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );
  const productData = await productDetails.data;
  const {
    id,
    description,
    image,
    category,
    price,
    rating: { count, rate },
    title,
  } = productData;
};
searchProduct();


//count the number of products in the cart
const countCart = () => {
  let cartContainer;
  if (localStorage.getItem("cart") === null) {
    cartContainer = [];
  } else {
    cartContainer = JSON.parse(localStorage.getItem("cart"));
  }
  const cartCount = cartContainer.length;
  $(".cart_count").innerHTML = cartCount;
};

document.addEventListener("DOMContentLoaded", countCart);

const addToCart = async (itemId) => {
  const productDetails = await axios.get(
    `https://fakestoreapi.com/products/${itemId}`
  );
  const productData = await productDetails.data;

  let cartContainer;
  if (localStorage.getItem("cart") === null) {
    cartContainer = [];
  } else {
    cartContainer = JSON.parse(localStorage.getItem("cart"));
  }

  cartContainer.push(productData);
  localStorage.setItem("cart", JSON.stringify(cartContainer));

  console.log(productData);
  console.log(cartContainer);

  countCart(); //invoke the function cart count
};


const getAllCategory = async () => {
  const categoryDetails = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  const categoryData = await categoryDetails.data;

  const categoryContainer = $(".category_container");
  categoryData.forEach((category, index) => {
    categoryContainer.innerHTML += `
                <div class="category_item">
                    <ul>
                          <li><a href="#">${category}</a></li>
                          
                        </ul>
                    </div>
    `;
  });
};
getAllCategory();