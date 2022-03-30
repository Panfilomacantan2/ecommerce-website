//custom selector
const $ = (selector) => {
  if (selector) return document.querySelector(selector);
  throw new Error("Selector does not exist");
};

const registerBtn = $(".register_btn");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const firstName = $(".first_name").value.trim();
  const lastName = $(".last_name").value.trim();
  const phoneNumber = $(".phone_number").value.trim();
  const email = $(".email").value.trim();
  const password = $(".password").value.trim();
  const confirmPassword = $(".confirm_password").value.trim();

  //check if the form is valid
  const isValid = formValidate(
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    confirmPassword
  );

  //if condition is true
  if (isValid) {
    const user = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      isActive: true,
    };
    registerUser(user);
  }
});

//validation form function
const formValidate = (
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
  confirmPassword
) => {
  if (
    firstName === "" ||
    lastName === "" ||
    phoneNumber === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill all the fields");
    return false;
  } else {
    if (firstName.length >= 3 && lastName.length >= 3) {
      if (phoneNumber.length === 11) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          if (password.length >= 6) {
            if (password === confirmPassword) {
              alert("Registration Successful");
              return true;
            } else {
              alert("Password does not match");
              return false;
            }
          } else {
            alert("Password must be at least 6 characters");
            return false;
          }
        } else {
          alert("Please enter a valid email");
          return false;
        }
      } else {
        alert("Please enter a valid phone number");
        return false;
      }
    } else {
      alert("Please enter a valid name");
      return false;
    }
  }
};

const registerUser = (user) => {
  let users;
  if (localStorage.getItem("user_db") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("user_db"));
  }
  users.push(user);
  localStorage.setItem("user_db", JSON.stringify(users));
  window.location.href = "login.html";
};

//check if theres an active user or not
const currentUser = localStorage.getItem("current_user");
const userData = localStorage.getItem("user_db");

if (!currentUser && !userData) {
  window.location.href = "login.html";
}

