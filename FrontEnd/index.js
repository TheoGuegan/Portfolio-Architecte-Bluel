window.addEventListener("DOMContentLoaded", () => {

// fetch('http://localhost:5678/api/categories')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// Création Card

const gallery = document.querySelector(".gallery");

class MyCards {
    constructor(id, title, imageUrl,categoryId, userId, categoryIndex, categoryName) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.userId = userId;
        this.categoryIndex = categoryIndex;
        this.categoryName = categoryName;
    }
};

function createCard() {
    fetch("http://localhost:5678/api/works")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("error here !")
            }
        })
        .then((works) => {
            // jsondata correspond à la valeur retournée par le .then() précédent
    
                for (let work of works){
                const dataObj = new MyCards(work.id, work.title, work.imageUrl, work.categoryId, work.userId, work.category.id, work.category.name);
                let figure = document.createElement("figure");
                let image = document.createElement("img");
                let figcaption = document.createElement("figcaption");
                figure.appendChild(image);
                figure.appendChild(figcaption);
                image.setAttribute("crossorigin", "anonymous");
                image.setAttribute("src", dataObj.imageUrl);
                image.setAttribute("alt", dataObj.title);
                figure.id = categoryIndex;
                figcaption.innerText = dataObj.title ;
                gallery.appendChild(figure);
            }
        });
};

createCard();

// creation barre de filtres

const portFolioFilterBarPlace = document.querySelector("#filter");

class btnFilter {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }   
};

function createFilterBar () {
    fetch("http://localhost:5678/api/categories")
        .then ((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("err")
            }
        })
        .then((categories) => {
            for (let category of categories) {
            const catObj = new btnFilter(category.id, category.name);
            let div = document.createElement("div");
            div.classList.add('divBtnFilter');
            let button = document.createElement("input");
            button.classList.add('buttonFilter');
            button.id = catObj.name;
            div.appendChild(button);
            button.setAttribute("type", 'submit');
            button.setAttribute( "value", catObj.name)
            portFolioFilterBarPlace.appendChild(div);
            }
        })
};

createFilterBar ();

// Création bouton "all" dans barre de filtre

function btnAllFilterBar() { 
    
    let div = document.createElement("div");
    div.classList.add('divBtnFilter');
    div.setAttribute("id", 'divBtnAll');
    let button = document.createElement("input");
    button.classList.add('buttonFilter');
    button.setAttribute("id", 'btnAll');
    div.appendChild(button);
    button.setAttribute("type", 'submit');
    button.setAttribute("value", 'Tous')
    portFolioFilterBarPlace.appendChild(div);
    };

btnAllFilterBar ();

// function filter (button)
});

