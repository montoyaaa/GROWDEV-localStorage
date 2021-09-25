const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#pass");

const buttonLogin = document.querySelector("#login-button");
const buttonRegister = document.querySelector("#register-button");

// document.addEventListener("DOMContentLoaded", function (event) {
//   event.path[0].URL.includes("signOn")
//     ? buttonRegister.addEventListener("click", () => register())
//     : buttonLogin.addEventListener("click", () => login());
// });

buttonLogin?.addEventListener("click", function () {
  return login();
});

buttonRegister?.addEventListener("click", function () {
  return register();
});

function login() {
  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  if (
    hasUserLogged() ||
    verifyEmptyFields(user.email, user.password) ||
    userMatch(user)
  ) {
    return;
  }

  return localStorage.setItem("user", JSON.stringify(user));
}

function register() {
  const users = getAccountsLocalStorage();
  const newUser = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  if (
    verifyEmptyFields(newUser.email, newUser.password) ||
    !canAddEmail(newUser.email)
  ) {
    return;
  }

  window.location.assign("/index.html");
  return localStorage.setItem("accounts", JSON.stringify([...users, newUser]));
}

function canAddEmail(email) {
  const users = getAccountsLocalStorage();

  if (
    users.findIndex(function (user) {
      return user.email === email;
    }) != "-1"
  ) {
    alert("Email já cadastrado");
    return false;
  }
  return true;
}

function verifyEmptyFields(email, password) {
  if (!!email && !!password) {
    console.log("entrou");
    return false;
  }
  alert("Precisa preencher os campos");
  return true;
}

function hasUserLogged() {
  if (!!localStorage.getItem("user")) {
    alert("Você já está logado");
    return true;
  }
  return false;
}

function userMatch(userToLogin) {
  const users = getAccountsLocalStorage();

  if (
    users.find(function (user) {
      return (
        user.email === userToLogin.email &&
        user.password === userToLogin.password
      );
    })
  ) {
    return false;
  }

  alert("Email ou senha incorretos");
  return true;
}

function getAccountsLocalStorage() {
  const users = localStorage.getItem("accounts");
  return JSON.parse(users) ?? [];
}
