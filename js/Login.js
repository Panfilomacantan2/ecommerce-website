//custom selector
const $ = (selector) => {
  if (selector) return document.querySelector(selector);
  throw new Error("Selector does not exist");
};

const loginBtn = $(".login_btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = $(".email").value.trim();
  const password = $(".password").value.trim();

  //check if the form is valid
  const isValid = formValidate(email, password);

  //if condition is true
  if (isValid) {
    const user = {
      email,
      password,
    };
    loginUser(user);
  }

  console.log(isValid);
});

const formValidate = (email, password) => {
  if (email === "" || password === "") {
    alert("Please fill all the fields");
    return false;
  } else {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (password.length >= 6) {
        return true;
      } else {
        alert("Password must be at least 6 characters");
        return false;
      }
    } else {
      alert("Please enter a valid email");
      return false;
    }
  }
};

const loginUser = (userData) => {
  let users;
  if (localStorage.getItem("user_db") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("user_db"));
  }
  const isUser = users.find((user) => {
    if (user.email === userData.email && user.password === userData.password) {
      return true;
    }
  });

  if (isUser) {
    alert("Login Successful");
    window.location.href = "index.html";
  } else if (isUser === undefined) {
    //if user is not found
    alert("User is not found");
  } else {
    alert("Login Failed");
  }

  console.log(isUser);
};
