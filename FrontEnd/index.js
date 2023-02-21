import { connexionUser } from "./connect.js";

const gallery = document.querySelector(".gallery");
const galleryModal = document.querySelector(".gallerymodal");
let modal1 = document.getElementById("modal1");
let cards = [];
let categories = [];

function createCard(works, view) {
  for (const work of works) {
    const figureCard = document.createElement("figure");
    figureCard.id = work.categoryId;
    const imageCard = document.createElement("img");
    imageCard.setAttribute("crossorigin", "anonymous");
    imageCard.setAttribute("src", work.imageUrl);
    imageCard.setAttribute("alt", work.title);
    const figCaptionCard = document.createElement("figcaption");
    figCaptionCard.innerText = view.closest("#modal1") ? "Éditer" : work.title;
    const iconCardContainer = document.createElement("div");
    iconCardContainer.classList = view.closest("#modal1")
      ? "icontrashenable"
      : "icontrashdisable";
    iconCardContainer.id = work.id;
    const iconCard = document.createElement("p");
    iconCard.innerHTML = '<i class="fa-sharp fa-solid fa-trash-can"></i>';
    view.appendChild(figureCard);
    view.appendChild(iconCardContainer);
    iconCardContainer.appendChild(iconCard);
    figureCard.appendChild(imageCard);
    figureCard.appendChild(figCaptionCard);
  }
}

if (gallery) {
  fetch("http://localhost:5678/api/works")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("error here !");
      }
    })
    .then((works) => {
      cards = works;
      createCard(works, gallery);
      createCard(works, galleryModal);
    });
}

const boutonTous = document.querySelector("#btn-all");

if (boutonTous) {
  boutonTous.addEventListener("click", function () {
    const cardsAll = cards.filter(function (work) {
      // console.log(work.category.id);
      return work.category.id == 1 || 2 || 3;
    });
    gallery.innerHTML = "";
    createCard(cardsAll, gallery);
  });
}

function createButton(categoriesData) {
  for (const category of categoriesData) {
    const buttonFilter = document.createElement("button");
    buttonFilter.id = category.id;
    buttonFilter.innerText = category.name;
    filter.appendChild(buttonFilter);
    buttonFilter.addEventListener("click", function () {
      const cardsFiltered = cards.filter(function (work) {
        return work.category.id == buttonFilter.id;
      });
      gallery.innerHTML = "";
      createCard(cardsFiltered, gallery);
      buttonFilter.classList = "active";
    })
  }
  const tousLesBoutons = document.querySelectorAll("#filter button");
  tousLesBoutons.forEach((button) => {
    button.addEventListener("click", () => {
      tousLesBoutons.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
}

// createButton();

function createSelectBar(categoriesData) {
  const categoriesList = document.createElement("select");
  categoriesList.setAttribute("name", "select");
  for (const category of categoriesData) {
    const categoriesItem = document.createElement("option");
    categoriesList.appendChild(categoriesItem);
    categoriesItem.setAttribute("value", category.id);
    categoriesItem.innerText = category.name;
  }
  return categoriesList;
}
// function testFetch() {
if (gallery) {
  fetch("http://localhost:5678/api/categories")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("error here !");
      }
    })
    .then((categoriesData) => {
      categories = categoriesData;
      createButton(categoriesData);
      createSelectBar(categoriesData);
      // return categories;
    });
}

let loginForm = document.getElementById("loginform");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const user = {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#password").value,
    };
    connexionUser(user);
  });
}

const adminConnected = localStorage.getItem("userId");
const figCaptionModif = document.getElementById("figcapmodif");
const divTopModif = document.getElementById("divtopmodif");
const mesProjetsModif = document.getElementById("mesprojetsmodif");
const btnLogout = document.getElementById("js-admin-connected");
const btnLogin = document.getElementById("js-admin-deco");

if (adminConnected) {
  const divTopModale = document.getElementById("topmodale");
  btnLogin.style.display = "none";
  btnLogout.style.display = "block";
  divTopModale.classList = "connected";
  figCaptionModif.innerHTML =
    "<i class='fa-regular fa-pen-to-square'></i> Modifier";
  divTopModif.innerHTML =
    "<i class='fa-regular fa-pen-to-square'></i> Modifier";
  mesProjetsModif.innerHTML =
    "Mes Projets <span id='spanmodiftitre'><i class='fa-regular fa-pen-to-square'></i> Modifier</span>";
  btnLogout.addEventListener("click", function () {
    window.location.replace("./index.html");
    localStorage.clear();
    btnLogout.style.display = "none";
    btnLogin.style.display = "block";
  });
}

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal.removeEventListener("click", closeModal);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

const buttonAddPhoto = document.getElementById("addphotobutton");
const titreModal = document.getElementById("titlemodal");
const modalSuppr = document.getElementById("modal-suppr");
const turnbackModal = document.querySelector(".js-modal-turnback");
let pageOne = document.getElementById

function changePageModal() {
  buttonAddPhoto.addEventListener("click", function () {
    turnbackModal.style.display = "block";
    galleryModal.innerHTML = "";
    galleryModal.innerHTML +=
      '<div id="selectfilebuttoncontainer"><form method="get" action""><input type="file" id="selectfilebutton" name="imageUrl" accept="image/png, image/jpeg">';
    galleryModal.innerHTML += "<p>jpg, png : 4mo max</p> <br>";
    galleryModal.innerHTML +=
      '<label>Titre</label> <input type="text" name="title"> <br>';
    // let categoriesTest = testFetch ();
    galleryModal.appendChild(createSelectBar(categories));
    // galleryModal.innerHTML +=
    titreModal.innerText = "Ajout photo";
    modalSuppr.style.display = "none";
    buttonAddPhoto.innerText = "Valider";
  });
}

turnbackModal.addEventListener('click', function(e) {
  openModal(e)
});

if (buttonAddPhoto) {
  changePageModal();
}
