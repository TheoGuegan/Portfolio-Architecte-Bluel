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
    const iconCardContainer = document.createElement("button");
    iconCardContainer.classList = view.closest("#modal1")
      ? "icontrashenable"
      : "icontrashdisable";
    iconCardContainer.id = work.id;
    iconCardContainer.innerHTML =
      '<i class="fa-sharp fa-solid fa-trash-can"></i>';
    view.appendChild(figureCard);
    view.appendChild(iconCardContainer);
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
    });
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

function createSelectBar(categoriesData) {
  const categoriesList = document.createElement("select");
  categoriesList.setAttribute("name", "category");
  categoriesList.id = "selectbarnewwork";
  for (const category of categoriesData) {
    const categoriesItem = document.createElement("option");
    categoriesList.appendChild(categoriesItem);
    categoriesItem.setAttribute("value", category.id);
    categoriesItem.innerText = category.name;
  }
  return categoriesList;
}

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
    .querySelector(".js-modal-close-p2")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  document.querySelector("#wrapper-pageonetest").style.display = "block";
  document.querySelector("#wrapper-pagetwotest").style.display = "none";
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
  document.querySelector("#selectbarplace").innerHTML = "";
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
const turnbackModal = document.querySelector(".js-modal-turnback");
const buttonValiderModal = document.querySelector("#btnvalidermodale");

const inputImg = document.getElementById("selectfilebutton");
const inputImgtwo = document.getElementById("inputplace");
const imgPreview = document.getElementById("imgaddwork");

if (inputImg) {
  inputImg.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      imgPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
    inputImgtwo.style.display = "none";
    buttonValiderModal.style.backgroundColor = "#1D6154";
  });
}

function changePageModal() {
  buttonAddPhoto.addEventListener("click", function () {
    document.getElementById("wrapper-pageonetest").style.display = "none";
    document.getElementById("wrapper-pagetwotest").style.display = "block";
    document
      .querySelector("#selectbarplace")
      .appendChild(createSelectBar(categories));
    inputImgtwo.style.display = "block";
    buttonValiderModal.style.backgroundColor = "#A7A7A7";
  });
}

function returnPageOne() {
  turnbackModal.addEventListener("click", function () {
    document.getElementById("wrapper-pageonetest").style.display = "block";
    document.getElementById("wrapper-pagetwotest").style.display = "none";
    document.querySelector("#selectbarplace").innerHTML = "";
    imgPreview.remove();
  });
}

if (buttonAddPhoto) {
  changePageModal();
}

if (buttonValiderModal) {
  returnPageOne();
}

const form = document.getElementById("newworkform");

if (buttonAddPhoto) {form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = e.target.querySelector("#selectfilebutton");
  const file = fileInput.files[0];
  const newFileName = "@" + file.name;
  const newFile = new File([file], newFileName, { type: file.type });

  const dataToSend = new FormData();
  dataToSend.append("image", newFile);
  dataToSend.append("title", e.target.querySelector("#titlenewwork").value);
  dataToSend.append(
    "category",
    e.target.querySelector("#selectbarnewwork").value
  );

  console.log([...dataToSend]);

  let userToken = localStorage.getItem("token");

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: dataToSend,
  }).then((res) => {
    if (res.ok) {
      console.log(res.status);
      return res.json();
    } else {
      console.log("error here!");
      console.log(res.status);
    }
  });
});};

async function deleteWork() {
  const buttonsDelete = document.querySelectorAll(".icontrashenable");

  buttonsDelete.forEach((buttonDel) => {
    buttonDel.addEventListener("click", async () => {
      const id = buttonDel.getAttribute("id");
      console.log(id);
      let userToken = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
}

async function init() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  await deleteWork();
}

init();
