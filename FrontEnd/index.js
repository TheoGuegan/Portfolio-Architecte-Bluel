const gallery = document.querySelector(".gallery");
const filterBar = document.querySelector("#filter");
let cards = [];
let categories = [];

function createCard (works) {
    // console.log(works);
    for (let i = 0; i < works.length; i++){
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
};

fetch("http://localhost:5678/api/works")
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("error here !")
        }
    })
    .then((works) => {
        cards = works;    
        createCard (works);
    });

const boutonTous = document.querySelector("#btn-all");
const boutonObjets = document.querySelector(".btn-objets");

boutonTous.addEventListener("click", function() {
    const cardsAll = cards.filter(function (work) {
        // console.log(work.category.id);
        return work.category.id == 1 || 2 || 3;
    })
    gallery.innerHTML = "";
    createCard (cardsAll);
});

function createButton (categoriesData) {
    // console.log(categoriesData);
    for (let i = 0; i < categoriesData.length ; i++){
        const category = categoriesData[i];
        const buttonFilter = document.createElement("button");
        buttonFilter.classList = category.id;
        buttonFilter.innerText = category.name;
        filter.appendChild(buttonFilter);
        buttonFilter.addEventListener("click", function() {
            const cardsFiltered = cards.filter(function (work) {
                return work.category.id == buttonFilter.classList;
            })
            gallery.innerHTML = "";
            buttonFilter.style.color = "white";
            buttonFilter.style.background = "#1D6154";
            createCard (cardsFiltered);
        })
    }
};

// setTimeout(function() {
//     let buttonsFilter = document.querySelectorAll("#filter button");
//     console.log(buttonsFilter);
// }, 50)





fetch("http://localhost:5678/api/categories")
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("error here !")
        }
    })
    .then((categoriesData) => {
        categories = categoriesData;
        createButton (categoriesData);
    });