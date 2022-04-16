// import { checkUser } from "./session.js";

const $ = (selector) => {
  if (selector) return document.querySelector(selector);
  throw new Error("Selector does not exist");
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
                            <li><a href="category.html">${category}</a></li>
                            
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

//check the value of the quantity input field and if it is less than 1 then set it to 1
const checkValue = (input, index) => {
  const shoppingCartBody = $(".shopping_cart_body");
  if (input.value < 1) {
    input.value = 1;
  }

  //get the quantity of the product and calculate the total price
  let totalPrice =
    shoppingCartBody.children[index].children[3].innerText.replace("₱", "") *
    input.value;
  shoppingCartBody.children[
    index
  ].children[4].innerText = `₱${totalPrice.toFixed(2)}`;

  getTotalPrice(); //refresh and get the total price of the cart items
};

//get the quantity of the product and calculate the total price
const getTotal = (price) => {
  return price;
};

const getQuantity = (input) => {
  return input.value;
};

//display the cart items

const displayCart = () => {
  let cartContainer;
  if (localStorage.getItem("cart") === null) {
    cartContainer = [];
  } else {
    cartContainer = JSON.parse(localStorage.getItem("cart"));
  }

  if (cartContainer.length === 0) {
    const shoppingCart = $(".shopping_cart");
    shoppingCart.innerHTML = `
        <div class="shopping_cart_empty">
           <div class="shopping_cart_empty_img">
                <img src="./styles/empty_cart.png">
              </div>
            <h2>Your cart is empty</h2>
            <p>
                You have no items in your cart.
            </p>
        </div>
        `;
  } else {
    const shoppingCartBody = $(".shopping_cart_body");
    cartContainer.forEach((cartItem, index) => {
      const { id, image, category, price, title } = cartItem;

      shoppingCartBody.innerHTML += `
           <tr >    
              <td class="img"><img src="${image}" alt="${title}" /></td>
              <td class="item">${title}</td>
              <td><input type="number" value="1" id="quantity" class="quantity" onchange="checkValue(this, ${index})"></td>
              <td><span class="price">₱${price}</span></td>
              <td><span class="total">₱${getTotal(price)}</span></td>
              <td><button class="remove_btn" onclick="removeCartItem(${index})">Remove</button></td>
            </tr> `;
    });
  }
};

displayCart(); //invoke the function

//remove the cart item from the cart and display the cart again after removing the item from the cart
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

const getTotalPrice = () => {
  let totalPrice = 0;
  const shoppingCartBody = $(".shopping_cart_body");
  const totalHandler = $(".total_handler");

  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart.length === 0) {
    totalHandler.innerHTML = `
        <div class="total_handler_empty">
            <h2>Your cart is empty</h2>
            <p>
                You have no items in your cart.
            </p>
            `;
  } else {
    for (let i = 0; i < shoppingCartBody.children.length; i++) {
      totalPrice += Number(
        shoppingCartBody.children[i].children[4].innerText.replace("₱", "")
      );
    }

    totalHandler.innerHTML = ` ₱${totalPrice.toFixed(2)}`;
  }
};

//check if the user is logged in or not
// checkUser();

//check if theres an active user or not
const currentUser = localStorage.getItem("current_user");

if (!currentUser) {
  window.location.href = "login.html";
}
