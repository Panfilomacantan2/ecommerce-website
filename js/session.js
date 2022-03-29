//check if there is a user if not then redirect to login page

export const checkUser = () => {
  if (localStorage.getItem("user_db") === null) {
    console.log("user not logged in");
    window.location.href = "login.html";
  }

  
};
checkUser();
