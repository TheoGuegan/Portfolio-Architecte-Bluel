

export function connexionUser(user) {
  let chargeUtile = JSON.stringify(user);
  let responseLogin = '';

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("error here!");
      if (res.status === 404) {
        alert("L'e-mail est incorrect");
      } else if (res.status === 401) {
        alert("Mot de passe incorrect");
      }
    }
  })
  .then((infoLogin) => {
    responseLogin = infoLogin;
    const myToken = responseLogin.token;
    const myUserId = responseLogin.userId;
    console.log(myToken);
    console.log(myUserId);
    localStorage.setItem('token', myToken);
    localStorage.setItem('userId', myUserId);
    window.location.replace("./index.html");
  });
}
