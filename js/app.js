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
                                 <span class="liked">&hearts;</span>
                                 <span class="rating"><img src="https://www.pinclipart.com/picdir/big/72-727540_bubble-world-black-sugar-pearl-latte-3-5-stars.png"> ${rate}</span>
                                 <span class="sold">Sold: ${count}</span>
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
  console.log(categoryData);

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

//display the cart items

const displayCart = () => {
  let cartContainer;
  if (localStorage.getItem("cart") === null) {
    cartContainer = [];
  } else {
    cartContainer = JSON.parse(localStorage.getItem("cart"));
  }
  const shoppingCartBody = $(".shopping_cart_body");
  cartContainer.forEach((cartItem, index) => {
    const { id, image, category, price, title } = cartItem;
    shoppingCartBody.innerHTML += `
         <tr>
            
            <td class="img"><img src="${image}" alt="${title}" /></td>
            <td class="item">${title}</td>
            <td><input type="number" value="1" class="quantity" onchange="checkValue(this)"></td>
            <td class="price"><span>$${price}</span></td>
            <td class="total"><span>$${price}</span></td>
            <td><button class="remove_btn" onclick="removeCartItem(${index})">Remove</button></td>
          </tr>
    `;
  });
};

displayCart(); //invoke the function

const removeCartItem = (index) => {
  let cartContainer;
  if (localStorage.getItem("cart") === null) {
    cartContainer = [];
  } else {
    cartContainer = JSON.parse(localStorage.getItem("cart"));
  }
  cartContainer.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartContainer));
  countCart();
  // displayCart();
  location.reload();
};

const checkValue = (input) => {
  if (input.value < 1) {
    input.value = 1;
  }

  console.log(input.value);
};
