//custom selector
const $ = (selector) => {
  if (selector) return document.querySelector(selector);
  throw new Error("Selector does not exist");
};

//add to cart
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

//count the number of items in the cart
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

let categoriesList = []
const fetchCurrentCategory = async () => {
  const container = $(".product_category_container");
  let setFirstCategory = "women's clothing";
  const products = await axios.get(
    `https://fakestoreapi.com/products/category/${setFirstCategory}`
  );

  const categories = await products.data;

  categoriesList = [...categories];
  let categoryHolder = "";
  categoriesList.forEach((item, index) => {
    const {
      id,
      description,
      image,
      category,
      price,
      rating: { count, rate },
      title,
    } = categories[index];

    categoryHolder += `
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
 </div>

    `;
  });

  container.innerHTML = categoryHolder;
};
fetchCurrentCategory();

console.log(categoriesList);

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
                            <li><a href="#" onclick="setCategory(this.innerText)">${category}</a></li>
                            
                          </ul>
                      </div>
      `;
  });
};

const setCategory = async (category) => {
  let categoryHolder = "";
  const container = $(".product_category_container");
  let setFirstCategory = category;
  const products = await axios.get(
    `https://fakestoreapi.com/products/category/${setFirstCategory.toLowerCase()}`
  );

  const categories = await products.data;
  categoriesList = [...categories];
  console.log(categories);

  categoriesList.forEach((item, index) => {
    const {
      id,
      description,
      image,
      category,
      price,
      rating: { count, rate },
      title,
    } = categories[index];

    categoryHolder += `
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
   </div>
  
      `;
  });

  container.innerHTML = categoryHolder;
  
};

getAllCategory();

