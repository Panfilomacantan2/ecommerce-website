export const setCurrentUser = (user) => {
  let currentUsers;

  if (localStorage.getItem("current_user") === null) {
    currentUsers = [];
  } else {
    currentUsers = JSON.parse(localStorage.getItem("current_user"));
  }

  currentUsers.push(user);
  localStorage.setItem("current_user", JSON.stringify(user));

  return currentUsers[0];
};
