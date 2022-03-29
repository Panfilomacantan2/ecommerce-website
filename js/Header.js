import { logout } from "./logout.js";

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
                 <span class="logout_btn"><ion-icon class="logout_icon" name="log-out"></ion-icon>LOGOUT</span>
                
            </header> 

            <div class="category_container">
                
            </div>
`;
};

createHeader();
const logoutBtn = document.querySelector(".logout_btn");
logoutBtn.addEventListener("click", (e) => {
  //get Current user Active session
  const getCurrentUser = localStorage.getItem("user_db");
  const currentUser = JSON.parse(getCurrentUser);
  currentUser.forEach((user) => {
    if (user.active === true) {
      user.active = false;
      localStorage.setItem("user_db", JSON.stringify(currentUser));
      logout();
    }
  });

  const userId = currentUser.id;
  //logout the user

  e.preventDefault(userId);
  logout();
});
