export const logout = () => {
  if (localStorage.getItem("current_user") !== null) {
    window.location.href = "index.html";
  }
  localStorage.removeItem("current_user");
  localStorage.removeItem("current_user");
  window.location.href = "login.html";
  console.log("logout");
};
