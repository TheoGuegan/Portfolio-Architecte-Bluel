import { connexionUser } from './connect';

const gallery = document.querySelector(".gallery");
const filterBar = document.querySelector("#filter");
let cards = [];
let categories = [];

function createCard(works) {
  // console.log(works);
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const figureCard = document.createElement("figure");
    figureCard.classList = work.categoryId;
    const imageCard = document.createElement("img");
    imageCard.setAttribute("crossorigin", "anonymous");
    imageCard.setAttribute("src", work.imageUrl);
    imageCard.setAttribute("alt", work.title);
    const figCaptionCard = document.createElement("figcaption");
    figCaptionCard.innerText = work.title;
    gallery.appendChild(figureCard);
    figureCard.appendChild(imageCard);
    figureCard.appendChild(figCaptionCard);
  }
}

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
    createCard(works);
  });

const boutonTous = document.querySelector("#btn-all");
const boutonObjets = document.querySelector(".btn-objets");

boutonTous.addEventListener("click", function () {
  const cardsAll = cards.filter(function (work) {
    // console.log(work.category.id);
    return work.category.id == 1 || 2 || 3;
  });
  gallery.innerHTML = "";
  createCard(cardsAll);
});

function createButton(categoriesData) {
  // console.log(categoriesData);
  for (let i = 0; i < categoriesData.length; i++) {
    const category = categoriesData[i];
    const buttonFilter = document.createElement("button");
    buttonFilter.id = category.id;
    buttonFilter.innerText = category.name;
    filter.appendChild(buttonFilter);
    buttonFilter.addEventListener("click", function () {
      const cardsFiltered = cards.filter(function (work) {
        return work.category.id == buttonFilter.id;
      });
      gallery.innerHTML = "";
      createCard(cardsFiltered);
      buttonFilter.classList = "active";
    });
  }
  const tousLesBoutons = document.querySelectorAll("#filter button");
  console.log(tousLesBoutons);
  tousLesBoutons.forEach((button) => {
    button.addEventListener("click", () => {
      tousLesBoutons.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
}

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
  });


let loginForm = document.getElementById("loginform");
let chargeUtile = "";

loginForm.addEventListener("submit", function (event) {
event.preventDefault();
const user = {
    email : event.target.querySelector("#email").value,
    password : event.target.querySelector("#password").value,
};
connexionUser(user);
});







