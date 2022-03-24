const createHeader = () => {
  const header = document.querySelector(".header_wrapper");
  header.innerHTML += `
            <header class="header">
                <a href="index.html" class="logo">
                     <img src="./styles/shopify.jpg" alt="logo" class="header_logo" />
                </a>
                 <div class="header_search">
                    <input type="search" placeholder="Search" class="search_input" />
                </div>
                <div class="header_cart">
                    <ion-icon size="large" name="cart"></ion-icon>
                     <a href="cart.html"><span class="cart_count">0</span></a>
                </div>
            </header> 

            <div class="category_container">
                
            </div>
`;
};

createHeader();
