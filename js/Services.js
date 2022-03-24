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

//check the value of the quantity input field and if it is less than 1 then set it to 1
const checkValue = (input) => {
  if (input.value < 1) {
    return (input.value = 1);
  }
};

//get the quantity of the product and calculate the total price
const getTotal = (element, price) => {
  console.log(element, price);
};

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
              <td><input type="number" value="1" id="quantity" class="quantity" onchange="checkValue(this)"></td>
              <td class="price"><span>₱${price}</span></td>
              <td class="total"><span>₱${getTotal(
                price * Number($('[name="quantity"]'))
              )}</span></td>
              <td><button class="remove_btn" onclick="removeCartItem(${index})">Remove</button></td>
            </tr>
  
            
            `;
  });
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
