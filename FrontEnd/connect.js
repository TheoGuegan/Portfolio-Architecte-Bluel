export function connexionUser(user) {
  let chargeUtile = JSON.stringify(user);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  }).then((res) => {
    if (res.ok) {
      console.log("ok");
    } else {
      console.log("error here!");
      if (res.status === 404) {
        alert("L'e-mail est incorrect");
      } else if (res.status === 401) {
        alert("Mot de passe incorrect");
      }
    }
  });
}
